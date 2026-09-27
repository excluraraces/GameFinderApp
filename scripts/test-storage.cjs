const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const data = new Map();
let failRead = false, failWrite = false;
const storage = {
 async getItem(key) { await new Promise(r => setTimeout(r, 2)); if (failRead) throw Error('read failed'); return data.get(key) ?? null; },
 async setItem(key, value) { await new Promise(r => setTimeout(r, 2)); if (failWrite) throw Error('write failed'); data.set(key, value); }
};
function load(file) {
 const exports = {};
 const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
 vm.runInNewContext(js, {exports, require: () => ({__esModule: true, default: storage})});
 return exports;
}
const f = load('src/storage/favorites.ts'), s = load('src/storage/settings.ts');
const fk = '@gamefinder_favorites', sk = '@gamefinder_settings';
const plain = value => JSON.parse(JSON.stringify(value));
(async () => {
 await Promise.all([f.addFavorite(1), f.addFavorite(2), f.addFavorite(3)]);
 assert.deepEqual(plain(await f.getFavorites()), [1,2,3]);
 await Promise.all([f.toggleFavorite(4), f.toggleFavorite(4)]);
 assert(!(await f.getFavorites()).includes(4));
 await Promise.all([s.updateSetting('musicEnabled', false), s.updateSetting('soundEnabled', false), s.updateSetting('volume', 30)]);
 assert.deepEqual(plain(await s.getSettings()), {musicEnabled:false,soundEnabled:false,volume:30,language:null});
 failWrite = true;
 await assert.rejects(f.toggleFavorite(1));
 await assert.rejects(s.updateSetting('volume', 90));
 failWrite = false;
 assert((await f.getFavorites()).includes(1));
 assert.equal((await s.getSettings()).volume,30);
 await s.updateSetting('volume',40);
 await f.addFavorite(5);
 assert.equal((await s.getSettings()).volume,40);
 assert((await f.getFavorites()).includes(5));
 const before = data.get(fk);
 failRead = true;
 await assert.rejects(f.addFavorite(6));
 await assert.rejects(s.updateSetting('volume',50));
 failRead = false;
 assert.equal(data.get(fk),before);
 for(const invalid of ['{broken','null','"wrong"']) {
  data.set(fk, invalid);data.set(sk, invalid);
  assert.deepEqual(plain(await f.getFavorites()),[]);
  assert.deepEqual(plain(await s.getSettings()),plain(s.DEFAULT_SETTINGS));
 }
 data.set(fk, '[1,1,"2",null,-1,0,2.5,3]');
 assert.deepEqual(plain(await f.getFavorites()),[1,3]);
 data.set(sk, '{"musicEnabled":"false","soundEnabled":false,"volume":999}');
 assert.deepEqual(plain(await s.getSettings()),{musicEnabled:true,soundEnabled:false,volume:100,language:null});
 await assert.rejects(f.addFavorite(-1));
 await s.updateSetting('language', 'en');
 const reloaded = load('src/storage/settings.ts');
 assert.equal((await reloaded.getSettings()).language, 'en');
 await reloaded.updateSetting('volume', 20);
 assert.equal((await reloaded.getSettings()).language, 'en');
 failWrite = true;
 await assert.rejects(reloaded.updateSetting('language', 'tr'));
 failWrite = false;
 assert.equal((await reloaded.getSettings()).language, 'en');
 data.set(sk, '{"language":"fr","volume":60}');
 assert.equal((await reloaded.getSettings()).language, null);
 assert.equal((await reloaded.getSettings()).volume, 60);

 console.log('PASS: concurrent writes, rapid toggles, read/write failures, queue recovery, corrupted JSON, invalid values, volume bounds');
})().catch(error=>{console.error(error);process.exitCode=1;});
