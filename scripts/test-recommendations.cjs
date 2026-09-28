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
    require: name => /\.(jpeg|png)$/.test(name) ? name : load(path.resolve(path.dirname(file), name + '.ts')),
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
        for (const last of [false, true]) {
          const preferences = [...questions.categoryQuestionBooks[category.value], ...questions.commonPreferenceQuestions];
          const answers = [{ questionId: 'platform', value: platform.value }, { questionId: 'category', value: category.value }, { questionId: 'playMode', value: mode.value },
            ...preferences.map(q => ({ questionId: q.id, kind: q.kind, scoreField: q.scoreField, weight: q.weight, ...q.options[last ? q.options.length - 1 : 0] }))];
          const maxPreferenceScore = preferences.reduce((sum, q) => sum + (q.weight ?? 1), 0);
          const context = { answers, activeGames: games, maxPreferenceScore, t, translateGameTag };
          const engine = createRecommendations(context);
          const result = engine.getRecommendation();
          assert(result.length <= 10);
          for (const game of result) {
            assert(game.platforms.includes(platform.value));
            assert(game.categories.includes(category.value));
            assert(mode.value === 'Fark etmez' || game.playModes.includes(mode.value));
            const expected = answers.filter(a => a.kind === 'preference').reduce((sum, a) =>
              sum + ((a.matchValues?.length ? a.matchValues : [a.value]).some(v => game[a.scoreField].includes(v)) ? a.weight ?? 1 : 0), 0);
            assert.equal(game.score, expected);
            assert.equal(engine.getMatchPercent(game.score), Math.round(expected / maxPreferenceScore * 100));
          }
          for (let i = 1; i < result.length; i++) assert(result[i - 1].score >= result[i].score);
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
