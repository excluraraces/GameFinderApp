const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const cache = new Map();
function load(file) {
  file = path.resolve(root, file);
  if (cache.has(file)) return cache.get(file);
  const exports = {};
  cache.set(file, exports);
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, { exports, require: name => load(path.resolve(path.dirname(file), name + '.ts')) });
  return exports;
}
const { buildPlayerProfile, PROFILE_IDS } = load('src/domain/player-profile.ts');
const { profileDescriptions } = load('src/data/player-profile-copy.ts');
const { translations } = load('src/data/translations.ts');
const questions = load('src/data/questions.ts');
const english = load('src/data/question.en.ts');
const plain = data => JSON.parse(JSON.stringify(data));
const answer = (id, field, value, weight = 1) => ({ questionId: id, scoreField: field, value, weight, label: value, kind: 'preference' });
const hard = (id, value) => ({ questionId: id, value, label: value, kind: 'hardFilter' });
const run = (...answers) => buildPlayerProfile(answers);

assert.equal(run().traits.length, 0);
assert.equal(run(hard('category', 'RPG'), hard('playMode', 'Arkadaşlarla')).traits.length, 0);
assert.equal(run(answer('common-graphics', 'graphics', 'Gerçekçi')).traits.length, 0);
assert.equal(run(answer('rpg-story', 'storyImportance', 'Önemli değil'), hard('category', 'RPG'), answer('challenge', 'difficulty', 'Zor', 3)).traits[0].id, 'challenger');
assert.equal(run(answer('puzzle-type', 'features', 'Optik bulmaca', 5), answer('challenge', 'challengeStyle', 'Rahatlatmalı', 3)).traits[0].id, 'solver');
assert.equal(run(answer('sim-realism', 'graphics', 'Gerçekçi', 3)).traits.length, 0);
assert.equal(run(answer('management', 'features', 'Ekonomi yönetimi', 5)).traits[0].id, 'manager');
assert.equal(run(answer('sports', 'features', 'Futbol', 5)).traits[0].id, 'sports');
assert.equal(run(answer('risk', 'features', 'Hayatta kalma', 5)).traits[0].id, 'survivor');
assert.equal(run(answer('length', 'length', 'Kısa', 3)).traits[0].id, 'quickplay');

const weighted = run(answer('story', 'storyImportance', 'Çok önemli', 5), answer('world', 'worldType', 'Açık dünya', 1));
assert.equal(weighted.traits[0].id, 'story');
assert.equal(weighted.traits[0].percent, 83);
assert.equal(weighted.traits[1].percent, 17);
const partial = run(answer('story', 'storyImportance', 'Biraz önemli', 5), answer('world', 'worldType', 'Açık dünya', 3));
assert.equal(partial.traits[0].id, 'explorer', 'Partial interest must be weaker');
assert.equal(partial.traits.find(t => t.id === 'story').points, 2);
const last = run(answer('same', 'features', 'Loot', 5), answer('same', 'features', 'Optik bulmaca', 5));
assert.equal(last.traits.length, 1); assert.equal(last.traits[0].id, 'solver');
const alias = answer('same', 'features', 'Loot', 5); alias.matchValues = ['Loot', 'Loot', 'Keşif'];
assert.deepEqual(plain(run(alias)), plain(run(answer('same', 'features', 'Loot', 5))));
for (const weight of [NaN, Infinity, -2, 0]) assert.equal(run(answer('invalid', 'features', 'Loot', weight)).traits.length, 0);
assert.equal(run(answer('invalid', 'features', 'unknown')).traits.length, 0);
assert.equal(run(answer('capped', 'features', 'Loot', 1000)).traits[0].points, 5);
const equal = run(answer('a', 'features', 'Keşif', 3), answer('b', 'features', 'Loot', 3));
assert.equal(equal.mixed, true);
assert.deepEqual(plain(equal), plain(run(answer('b', 'features', 'Loot', 3), answer('a', 'features', 'Keşif', 3))));

const drivingAnswers = [...questions.categoryQuestionBooks['Simülasyon'], ...questions.getCommonPreferencesForCategory('Simülasyon')]
  .map(q => ({ questionId: q.id, kind: q.kind, scoreField: q.scoreField, weight: q.weight, ...q.options[0] }));
const driving = buildPlayerProfile(drivingAnswers);
assert(driving.traits.slice(0, 3).some(t => t.id === 'driver'), 'Driving must be visible in the main profile');
assert(driving.traits.find(t => t.id === 'driver').percent >= 20, 'Driving interest must not disappear into generic simulation');
assert(!driving.traits.some(t => t.id === 'speed'), 'Calm vehicle simulation is not evidence of speed seeking');
assert(driving.traits.find(t => t.id === 'driver').evidence.some(e => e.questionId === 'sim-type'));
const workAnswers = drivingAnswers.map(a => a.questionId === 'sim-type' ? { ...a, value: 'İş simülasyonu' } : a);
assert(!buildPlayerProfile(workAnswers).traits.some(t => t.id === 'driver'), 'Realistic work simulation must not imply driving');
assert.equal(run(answer('pace', 'tempo', 'Hızlı ve aksiyonlu', 5)).traits[0].id, 'speed', 'Explicit pace still signals speed');
const mastery = run(answer('sim-mood', 'features', 'Kariyer modu', 4));
assert.equal(mastery.traits[0].id, 'simulator');
assert(!mastery.traits.some(t => t.id === 'collector'), 'Learning simulation systems is not loot collecting');
for (const id of PROFILE_IDS) for (const language of ['tr', 'en']) {
  assert(translations[language].profiles[id]); assert(profileDescriptions[language][id]);
}

let seed = 1947, scenarios = 0;
const random = max => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed % max; };
const reached = new Set();
const leaders = new Set();
for (const [category, book] of Object.entries(questions.categoryQuestionBooks)) {
  const tr = [...book, ...questions.getCommonPreferencesForCategory(category)];
  const en = [...english.categoryQuestionBooksEn[category], ...english.commonPreferenceQuestionsEn.filter(q => category !== "Simülasyon" || q.id !== "common-graphics")];
  for (let sample = 0; sample < 200; sample++) {
    const indexes = tr.map(q => random(q.options.length));
    const selected = list => list.map((q, i) => ({ questionId: q.id, kind: q.kind, scoreField: q.scoreField, weight: q.weight, ...q.options[indexes[i]] }));
    const trAnswers = [hard('platform', 'PC'), hard('category', category), ...selected(tr)];
    const profile = buildPlayerProfile(trAnswers);
    assert(profile.informativeAnswers > 0 || profile.traits.length === 0, 'Neutral answers must not invent a profile');
    assert.equal(profile.traits.reduce((sum, t) => sum + t.percent, 0), profile.traits.length ? 100 : 0);
    assert.equal(new Set(profile.traits.map(t => t.id)).size, profile.traits.length);
    for (const trait of profile.traits) {
      reached.add(trait.id);
      assert(Number.isFinite(trait.points) && trait.points > 0);
      assert(trait.percent >= 0 && trait.percent <= 100);
      for (const evidence of trait.evidence) assert(trAnswers.some(a => a.questionId === evidence.questionId && a.label === evidence.label));
    }
    if (profile.traits.length) leaders.add(profile.traits[0].id);
    const enProfile = buildPlayerProfile([hard('platform', 'PC'), hard('category', category), ...selected(en)]);
    const metrics = p => p.traits.map(({ id, points, percent }) => ({ id, points, percent }));
    assert.deepEqual(plain(metrics(profile)), plain(metrics(enProfile)), 'Language must not change scores');
    assert.deepEqual(plain(profile), plain(buildPlayerProfile(trAnswers)), 'Scoring must be repeatable');
    scenarios++;
  }
}
assert.equal(reached.size, PROFILE_IDS.length, 'Every profile must be reachable from real questions');
console.log(`PASS: ${scenarios} real-question scenarios; ${reached.size} reachable styles, ${leaders.size} distinct leaders; weighting, neutrality, duplicates, ties, 100% totals and TR/EN parity`);
