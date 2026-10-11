const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const cache = new Map();
function compile(source) {
  return ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
}
function load(file) {
  file = path.resolve(file);
  if (cache.has(file)) return cache.get(file);
  const exports = {};
  cache.set(file, exports);
  vm.runInNewContext(compile(fs.readFileSync(file, 'utf8')), {
    exports,
    require: name => /\.(jpeg|png|webp)$/.test(name) ? name : load(path.resolve(path.dirname(file), name + '.ts')),
  });
  return exports;
}
const { games } = load('src/data/game.ts');
const questions = load('src/data/questions.ts');
const { translations } = load('src/data/translations.ts');
const { valueLabel } = load('src/data/question.en.ts');
const { createRecommendations } = load('src/domain/recommendations.ts');
let baseline;
if (process.argv[2]) {
  const old = fs.readFileSync(process.argv[2], 'utf8');
  baseline = compile(old.slice(old.indexOf('  function getAnswerValue('), old.indexOf('  async function selectLanguage('))
    + old.slice(old.indexOf('  function getPlayerProfile('), old.indexOf('  const isCategoryQuestion')));
}
const plain = value => JSON.parse(JSON.stringify(value));
let cases = 0;
for (const language of ['tr', 'en']) {
  const t = translations[language];
  const translateGameTag = value => t.gameTags[value] ?? (language === 'en' ? valueLabel[value] : undefined) ?? value;
  for (const platform of questions.hardFilterQuestions[0].options) {
    for (const category of questions.hardFilterQuestions[1].options) {
      for (const mode of questions.hardFilterQuestions[2].options) {
        for (const last of [0, 1, 2]) {
          const preferences = [...questions.categoryQuestionBooks[category.value], ...questions.getCommonPreferencesForCategory(category.value)];
          const answers = [{ questionId: 'platform', value: platform.value }, { questionId: 'category', value: category.value }, { questionId: 'playMode', value: mode.value },
            ...preferences.map(q => ({ questionId: q.id, kind: q.kind, scoreField: q.scoreField, weight: q.weight, requiredMatch: q.requiredMatch, ...q.options[last === 2 ? q.options.length - 1 : last ? q.options.length - 2 : 0] }))];
          const maxPreferenceScore = preferences.reduce((sum, q) => sum + (q.options[last === 2 ? q.options.length - 1 : last ? q.options.length - 2 : 0].noPreference ? 0 : q.weight ?? 1), 0);
          const context = { answers, activeGames: games, maxPreferenceScore, t, translateGameTag };
          const engine = createRecommendations(context);
          const result = engine.getRecommendation();
          assert(result.length <= 10);
          for (const game of result) {
            assert(game.platforms.includes(platform.value));
            assert(game.categories.includes(category.value));
            assert(mode.value === 'Fark etmez' || game.playModes.includes(mode.value));
            const expected = answers.filter(a => a.kind === 'preference' && !a.noPreference).reduce((sum, a) =>
              sum + ((a.matchValues?.length ? a.matchValues : [a.value]).some(v => game[a.scoreField].includes(v)) ? a.weight ?? 1 : 0), 0);
            assert.equal(game.score, expected);
            assert.equal(engine.getMatchPercent(game.score), maxPreferenceScore > 0 ? Math.round(expected / maxPreferenceScore * 100) : null);
          }
          for (let i = 0; i < result.length; i++) {
            for (let j = i + 1; j < result.length; j++) {
              assert(result[j].score - result[i].score <= Math.floor(maxPreferenceScore * 0.1), 'Clearly better matches stay ahead');
              assert(result[i].score > 0 || result[j].score === 0, 'Zero matches never displace positive matches');
            }
            for (const answer of answers.filter(a => a.requiredMatch && !a.noPreference)) {
              assert((answer.matchValues || [answer.value]).some(value => result[i][answer.scoreField].includes(value)), 'Core experience is required');
            }
          }
          if (baseline) {
            const original = vm.createContext({ ...context });
            vm.runInContext(baseline, original);
            assert.deepEqual(plain(result), plain(original.getRecommendation()));
            assert.deepEqual(plain(engine.getPlayerProfile()), plain(original.getPlayerProfile()));
            for (const game of result) assert.equal(engine.getMatchPercent(game.score), original.getMatchPercent(game.score));
          }
          cases++;
        }
      }
    }
  }
}
const empty = createRecommendations({ answers: [], activeGames: [], maxPreferenceScore: 0, t: translations.en, translateGameTag: v => v });
assert.equal(empty.getRecommendation().length, 0);
assert.equal(empty.getMatchPercent(0), null);
assert.equal(empty.getPlayerProfile().length, 3);
console.log(`PASS: ${cases} recommendation scenarios; filters, scores, sorting, empty results${baseline ? ', and original behavior comparison' : ''}`);

// More tied candidates than slots: catalog position must not lock games out.
const tiedGames = games.slice(0, 24);
const tieContext = { answers: [], activeGames: tiedGames, maxPreferenceScore: 0, t: translations.tr, translateGameTag: v => v };
const ids = result => plain(result.map(game => game.id));
const recommend = (context, seed) => createRecommendations({ ...context, tieBreakSeed: seed }).getRecommendation();
const originalCatalog = JSON.stringify(tiedGames);
const seen = new Set();
const leaders = new Set();
const orders = new Set();
for (let seed = 0; seed < 256; seed++) {
  const result = recommend(tieContext, seed);
  const order = ids(result);
  assert.equal(order.length, 10);
  assert.equal(new Set(order).size, 10);
  assert.deepEqual(order, ids(recommend(tieContext, seed)), 'Same quiz must keep its order');
  assert.deepEqual(order, ids(recommend({ ...tieContext, activeGames: [...tiedGames].reverse() }, seed)), 'Catalog order must not affect ties');
  assert.deepEqual(order, ids(recommend({ ...tieContext, t: translations.en }, seed)), 'Language must not affect ties');
  order.forEach(id => seen.add(id));
  leaders.add(order[0]);
  orders.add(order.join(','));
}
assert.equal(seen.size, tiedGames.length, 'Every tied candidate can reach the top ten');
assert.equal(leaders.size, tiedGames.length, 'Every tied candidate can lead');
assert(orders.size > 240, 'Different quizzes should produce diverse orders');
assert.equal(JSON.stringify(tiedGames), originalCatalog, 'Input catalog must remain untouched');

// A matching game must always outrank every nonmatching game, regardless of seed.
const weightedContext = {
  ...tieContext,
  activeGames: tiedGames.map((game, i) => ({ ...game, features: i < 3 ? ['tie-test'] : [] })),
  answers: [{ questionId: 'tie-test', kind: 'preference', scoreField: 'features', value: 'tie-test', weight: 5 }],
  maxPreferenceScore: 5,
};
for (let seed = 0; seed < 256; seed++) {
  const result = recommend(weightedContext, seed);
  assert.deepEqual(plain(result.map(game => game.score)), [5, 5, 5, 0, 0, 0, 0, 0, 0, 0]);
  assert.deepEqual(ids(result.slice(0, 3)).sort((a, b) => a - b), ids(tiedGames.slice(0, 3)).sort((a, b) => a - b));
}
assert.equal(recommend({ ...tieContext, activeGames: [] }, 42).length, 0);
assert.deepEqual(ids(recommend({ ...tieContext, activeGames: tiedGames.slice(0, 1) }, 42)), [tiedGames[0].id]);
console.log('PASS: 512 seeded tie scenarios; stable results, language/catalog independence, diversity, top-ten cutoff, score priority, no mutation');

const { getRecoveryOptions, applyRecoveryOption } = load('src/domain/recommendation-recovery.ts');
let recoveryCases = 0;
let emptyCases = 0;
for (const platform of questions.hardFilterQuestions[0].options) {
  for (const category of questions.hardFilterQuestions[1].options) {
    for (const mode of questions.hardFilterQuestions[2].options) {
      const answers = [
        { questionId: 'platform', kind: 'hardFilter', value: platform.value, label: platform.label },
        { questionId: 'category', kind: 'hardFilter', value: category.value, label: category.label },
        { questionId: 'playMode', kind: 'hardFilter', value: mode.value, label: mode.label },
        { questionId: 'preference', kind: 'preference', scoreField: 'tempo', value: 'test', label: 'test' },
      ];
      const before = JSON.stringify(answers);
      const current = recommend({ ...tieContext, activeGames: games, answers }, 7);
      const alternatives = getRecoveryOptions(answers, games);
      if (current.length) assert.equal(alternatives.length, 0);
      else {
        emptyCases++;
        assert(alternatives.length > 0 && alternatives.length <= 3);
        assert.deepEqual(plain(alternatives), plain(getRecoveryOptions(answers, [...games].reverse())));
        for (const option of alternatives) {
          const updated = applyRecoveryOption(answers, option, value => value);
          assert.equal(updated.find(a => a.questionId === 'platform').value, platform.value);
          assert.equal(updated.filter(a => a.kind === 'preference').length, option.categoryChanged ? 0 : 1);
          const eligible = games.filter(game => game.platforms.includes(platform.value) && game.categories.includes(option.category)
            && (option.playMode === 'Fark etmez' || game.playModes.includes(option.playMode)));
          assert.equal(option.count, eligible.length);
          const result = recommend({ ...tieContext, activeGames: games, answers: updated }, 7);
          assert(result.length > 0);
          assert(result.every(game => eligible.some(candidate => candidate.id === game.id)));
          assert.equal(getRecoveryOptions(updated, games).length, 0);
        }
      }
      assert.equal(JSON.stringify(answers), before);
      recoveryCases++;
    }
  }
}
assert.equal(getRecoveryOptions([], games).length, 0);
const recoveryAnswers = [
  { questionId: 'platform', kind: 'hardFilter', value: 'PC' },
  { questionId: 'category', kind: 'hardFilter', value: 'RPG' },
  { questionId: 'playMode', kind: 'hardFilter', value: 'Arkadaşlarla' },
];
assert.equal(getRecoveryOptions(recoveryAnswers, []).length, 0);
const doubleChange = getRecoveryOptions(recoveryAnswers, [{ ...games[0], platforms: ['PC'], categories: ['Bulmaca'], playModes: ['Tek kişilik'] }]);
assert.equal(doubleChange.length, 1);
assert(doubleChange[0].categoryChanged && doubleChange[0].modeChanged);
assert.equal(getRecoveryOptions(recoveryAnswers, [{ ...games[0], platforms: ['Mobil'] }]).length, 0);
console.log(`PASS: ${recoveryCases} recovery combinations (${emptyCases} empty); accurate counts, preserved platform, valid alternatives, category answer reset, two-filter fallback and empty library`);

// Explain actual matched tags, ordered by contribution, without changing the score.
for (const language of ['tr', 'en']) {
  const t = translations[language];
  const translateGameTag = value => t.gameTags[value] ?? (language === 'en' ? valueLabel[value] : undefined) ?? value;
  const example = { ...games[0], graphics: ['Pixel'], worldType: ['Açık dünya'], features: ['crafting'] };
  const answers = [
    { questionId: 'visual', kind: 'preference', scoreField: 'graphics', value: 'Pixel', weight: 1 },
    { questionId: 'world', kind: 'preference', scoreField: 'worldType', value: 'Açık dünya', weight: 5 },
    { questionId: 'feature', kind: 'preference', scoreField: 'features', value: 'building', matchValues: ['absent', 'crafting'], weight: 3 },
    { questionId: 'missing', kind: 'preference', scoreField: 'graphics', value: 'Anime', weight: 9 },
  ];
  const result = recommend({ ...tieContext, t, translateGameTag, activeGames: [example], answers }, 2)[0];
  assert.equal(result.score, 9);
  assert.deepEqual(plain(result.reasons), [
    t.reasons.matched(t.reasons.fields.worldType, translateGameTag('Açık dünya'), translateGameTag('Açık dünya')),
    t.reasons.matched(t.reasons.fields.features, translateGameTag('building'), translateGameTag('crafting')),
    t.reasons.matched(t.reasons.fields.graphics, translateGameTag('Pixel'), translateGameTag('Pixel')),
  ]);
  assert(!result.reasons.some(reason => reason.includes('Anime') || reason.includes('absent')));
  const unmatched = recommend({ ...tieContext, t, activeGames: [example], answers: answers.slice(-1) }, 2)[0];
  assert.equal(unmatched.score, 0);
  assert.equal(unmatched.reasons[0], t.reasons.filtersOnly);
  const zeroWeight = recommend({ ...tieContext, t, activeGames: [example], answers: [{ ...answers[0], weight: 0 }] }, 2)[0];
  assert.equal(zeroWeight.reasons[0], t.reasons.filtersOnly);
}
console.log('PASS: TR/EN explanations; strongest matches first, actual alternative tag, excluded nonmatches and zero-weight evidence, honest filter-only fallback');

const percentEngine = createRecommendations({ ...tieContext, maxPreferenceScore: 100 });
for (const [score, level] of [[0, 'filtersOnly'], [1, 'limited'], [39, 'limited'], [40, 'partial'], [69, 'partial'], [70, 'good'], [89, 'good'], [90, 'strong'], [100, 'strong']]) {
  assert.deepEqual(plain(percentEngine.getMatchSummary(score)), { percent: score, level });
  for (const language of ['tr', 'en']) assert(translations[language].matchLevels[level]);
}
assert.equal(percentEngine.getMatchPercent(-10), 0);
assert.equal(percentEngine.getMatchPercent(150), 100);
assert.equal(percentEngine.getMatchPercent(NaN), null);
assert.equal(percentEngine.getMatchPercent(Infinity), null);
for (const maxPreferenceScore of [0, -1, NaN, Infinity]) {
  const engine = createRecommendations({ ...tieContext, maxPreferenceScore });
  assert.deepEqual(plain(engine.getMatchSummary(0)), { percent: null, level: 'unavailable' });
}
assert.equal(createRecommendations({ ...tieContext, maxPreferenceScore: 25 }).getMatchPercent(18), 72);
assert.equal(createRecommendations({ ...tieContext, maxPreferenceScore: 3 }).getMatchPercent(2), 67);
console.log('PASS: match percentage boundaries, weighted calculation, rounding, 0–100 bounds and missing-data display');

// Reproduce the reported PC / simulation / driving / calm session with real questions.
const simBook = [...questions.categoryQuestionBooks['Simülasyon'], ...questions.getCommonPreferencesForCategory('Simülasyon')];
const simAnswers = [
  { questionId: 'platform', kind: 'hardFilter', value: 'PC' },
  { questionId: 'category', kind: 'hardFilter', value: 'Simülasyon' },
  { questionId: 'playMode', kind: 'hardFilter', value: 'Tek kişilik' },
  ...simBook.map(q => ({ questionId: q.id, kind: q.kind, scoreField: q.scoreField,
    weight: q.weight, requiredMatch: q.requiredMatch, ...q.options[0] })),
];
const simContext = { ...tieContext, activeGames: games, answers: simAnswers,
  maxPreferenceScore: simBook.reduce((sum, q) => sum + q.weight, 0) };
const drivingIds = games.filter(g => g.platforms.includes('PC') && g.categories.includes('Simülasyon') &&
  g.playModes.includes('Tek kişilik') && g.features.some(f => ['Simülasyon sürüş', 'Araç simülasyonu'].includes(f))).map(g => g.id).sort((a,b) => a-b);
let previous = [];
const simOrders = new Set();
for (let seed = 1; seed <= 30; seed++) {
  const context = { ...simContext, previousRecommendationIds: previous };
  const result = recommend(context, seed);
  assert.deepEqual(ids(result).sort((a,b) => a-b), plain(drivingIds), 'Do not pad driving recommendations with unrelated games');
  assert.equal(result[0].title, 'Euro Truck Simulator 2', 'Calm driving match outranks racing-only matches');
  assert(result[0].reasons.some(reason => reason.includes('Rahat sürüş')));
  assert.deepEqual(ids(result), ids(recommend(context, seed)), 'Same quiz stays stable after re-render');
  const translated = recommend({ ...context, t: translations.en, activeGames: [...games].reverse() }, seed);
  assert.deepEqual(ids(result), ids(translated), 'Language/catalog order never change recommendations');
  simOrders.add(ids(result).join(','));
  previous = ids(result);
}
assert(simOrders.size > 15, 'Repeated real simulation quizzes should vary similar matches');
// Spreading an option without aliases must clear aliases of the prior answer.
const sandboxAnswers = simAnswers.map(a => a.questionId === 'sim-mood'
  ? { ...a, matchValues: undefined, ...questions.categoryQuestionBooks['Simülasyon'][2].options[3] } : a);
assert.equal(recommend({ ...simContext, answers: sandboxAnswers }, 1)[0].title, 'BeamNG.drive', 'Sandbox driving should prefer BeamNG');

const noDriving = { ...simContext, activeGames: games.filter(g => !drivingIds.includes(g.id)) };
assert.equal(recommend(noDriving, 1).length, 0, 'No driving candidates must produce an honest empty result');
const recovery = getRecoveryOptions(simAnswers, noDriving.activeGames);
assert(recovery.length > 0);
for (const option of recovery) {
  const answers = applyRecoveryOption(simAnswers, option, value => value);
  const result = recommend({ ...noDriving, answers }, 1);
  assert(result.length > 0, 'Every advertised recovery must actually produce recommendations');
  if (!option.categoryChanged) assert(result.every(g => g.features.some(f => ['Simülasyon sürüş', 'Araç simülasyonu'].includes(f))));
}

// Close scores may move; large gaps and zero-match candidates may not.
const diverseContext = { ...tieContext, maxPreferenceScore: 20,
  activeGames: games.slice(0, 4).map((g, i) => ({ ...g, features: [['a','b'],['a'],['c'],[]][i] })),
  answers: [ ['a',8], ['b',2], ['c',4] ].map(([value,weight]) =>
    ({ questionId: value, kind:'preference', scoreField:'features', value, weight })) };
const first = recommend(diverseContext, 3);
const second = recommend({ ...diverseContext, previousRecommendationIds: ids(first) }, 3);
assert.notEqual(first[0].id, second[0].id, 'An equally/closely matched alternative should lead next time');
assert.deepEqual(ids(first.slice(0,2)).sort(), ids(second.slice(0,2)).sort(), 'Only the close top band may change');
assert(second[2].score === 4 && second[3].score === 0);
const fresh = recommend({ ...tieContext, previousRecommendationIds: ids(recommend(tieContext, 1)) }, 1);
assert(fresh.every(g => !ids(recommend(tieContext, 1)).includes(g.id)), 'Unseen tied games get discovery slots');
const pair = { ...tieContext, activeGames: tiedGames.slice(0,2) };
const pairFirst = recommend(pair, 1);
assert.notEqual(recommend({ ...pair, previousRecommendationIds: ids(pairFirst) }, 1)[0].id, pairFirst[0].id);
console.log('PASS: driving-only results, calm/sandbox relevance, honest empty/recovery, close-score discovery and repeated quiz history');

// Audit regressions: core sport, corrected catalog facts, neutral preferences,
// duplicate answers and the actual UI denominator.
const quiz = (category, choices, platform = 'PC') => {
  const book = questions.getQuestionsForCategory(category);
  const answers = book.map(q => {
    const value = ({ platform, category, playMode: 'Fark etmez', ...choices })[q.id];
    const option = q.options.find(o => o.value === value) ?? q.options.find(o => o.noPreference);
    assert(option, q.id + ': missing test choice');
    return { questionId: q.id, kind: q.kind, scoreField: q.scoreField, weight: q.weight,
      requiredMatch: q.requiredMatch, ...option };
  });
  const context = { ...tieContext, activeGames: games, answers,
    maxPreferenceScore: questions.getPreferenceScoreBudget(book, answers) };
  return { ...context, engine: createRecommendations(context) };
};
const football = quiz('Spor', { 'sports-type': 'Futbol' }, 'PlayStation');
assert.equal(football.maxPreferenceScore, 5);
assert(football.engine.getRecommendation().length > 0);
assert(football.engine.getRecommendation().every(g => g.features.includes('Futbol')));
assert(!football.engine.getRecommendation().some(g => g.id === 181), 'UFC cannot satisfy football');
assert(football.engine.getRecommendation().every(g => football.engine.getMatchPercent(g.score) === 100), 'Neutral preferences must not lower the denominator');
const combat = quiz('Spor', { 'sports-type': 'Dövüş sporu' }, 'PlayStation');
assert(combat.engine.getRecommendation().some(g => g.id === 181), 'UFC must remain discoverable as a combat sport');
const city = quiz('Yönetim / Kurma', { 'management-type': 'Şehir kurma' });
assert(city.engine.getRecommendation().every(g => g.features.includes('Şehir kurma')));
assert(city.engine.getRecommendation().some(g => g.id === 134), 'Anno belongs among city builders');
const neutral = quiz('Spor', {});
assert.equal(neutral.maxPreferenceScore, 0);
assert(neutral.engine.getRecommendation().every(g => g.score === 0));
assert.equal(neutral.engine.getMatchPercent(0), null);
assert.equal(neutral.engine.getPlayerProfileDetails().traits.length, 0);
const repeated = [...football.answers, { ...football.answers.find(a => a.questionId === 'sports-type'), value: 'Dövüş sporu' }];
assert.deepEqual(ids(createRecommendations({ ...football, answers: repeated }).getRecommendation()), ids(combat.engine.getRecommendation()), 'Last answer replaces earlier answer instead of scoring/filtering twice');
const cartoonRacing = quiz('Yarış', { 'common-graphics': 'Cartoon' }, 'Nintendo Switch');
assert(cartoonRacing.engine.getRecommendation().find(g => g.id === 172)?.score === 2, 'Mario Kart must match stylized visuals');
const sciFi = quiz('Hayatta Kalma', { 'common-atmosphere': 'Bilim kurgu' });
assert(sciFi.engine.getRecommendation().find(g => g.id === 116)?.score === 3, 'No Mans Sky must match science fiction');
const byId = id => games.find(g => g.id === id);
for (const id of [99,165,166,196]) assert(!byId(id).challengeStyle.includes('Rahatlatmalı'), byId(id).title + ': no blanket relaxing tag');
for (const id of [146,148,149]) assert(!byId(id).features.includes('Hızlı çatışma'), byId(id).title + ': puzzle gameplay is not fast shooting');
for (const category of Object.keys(questions.categoryQuestionBooks)) {
  const book = questions.getQuestionsForCategory(category);
  for (const field of ['length','graphics','challengeStyle']) assert(book.filter(q => q.scoreField === field).length <= 1, category + ': duplicate preference dimension ' + field);
  const englishBook = load('src/data/question.en.ts').getQuestionsForCategoryEn(category);
  assert.deepEqual(plain(book.map(q=>q.id)), plain(englishBook.map(q=>q.id)));
  for (const q of book.filter(q=>q.requiredMatch)) for (const option of q.options.filter(o=>!o.noPreference)) {
    assert(games.some(g=>g.categories.includes(category) && (option.matchValues ?? [option.value]).some(v=>g[q.scoreField].includes(v))), category + ': unreachable core option '+option.value);
  }
}
console.log('PASS: sport/city relevance, 100% neutral denominator, no invented profile, last-answer wins, corrected game tags, unique question dimensions, TR/EN flow and reachable core options');
