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
assert.equal(empty.getMatchPercent(0), 100);
assert.equal(empty.getPlayerProfile().length, 3);
console.log(`PASS: ${cases} recommendation scenarios; filters, scores, sorting, empty results${baseline ? ', and original behavior comparison' : ''}`);
