const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const exportsObject = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(root, 'src/audio/controller.ts'), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText, { exports: exportsObject, setInterval, clearInterval, Date });
function player() { return { isLoaded: true, playing: false, loop: false, volume: 0, count: 0,
  play() { this.playing = true; this.count++; }, pause() { this.playing = false; }, async seekTo() {} }; }
const cueNames = ['select', 'navigate', 'back', 'start', 'favorite', 'unfavorite', 'result'];
const tick = () => new Promise(resolve => setTimeout(resolve, 70));
(async () => {
  const music = player(), cues = Object.fromEntries(cueNames.map(name => [name, player()]));
  const c = exportsObject.createAudioController(music, cues);
  c.configure({ musicEnabled: true, soundEnabled: true, volume: 80, ready: true });
  assert.equal(music.playing, false, 'No autoplay before a gesture');
  c.interact(); await c.play('select');
  assert.equal(music.playing, true); assert.equal(cues.select.count, 1);
  await c.play('select'); assert.equal(cues.select.count, 1, 'Rapid taps are throttled');
  c.configure({ soundEnabled: false }); assert.equal(cues.select.playing, false);
  await tick(); await c.play('favorite'); assert.equal(cues.favorite.count, 0);
  assert.equal(music.playing, true, 'Effects toggle is independent');
  c.configure({ musicEnabled: false, soundEnabled: true }); assert.equal(music.playing, false);
  await c.play('favorite'); assert.equal(cues.favorite.count, 1);
  c.configure({ musicEnabled: true, blocked: true });
  assert.equal(music.playing, false); assert.equal(cues.favorite.playing, false);
  await tick(); await c.play('result'); assert.equal(cues.result.count, 0, 'Ad blocks effects');
  c.configure({ blocked: false }); assert.equal(music.playing, true);
  c.configure({ foreground: false }); assert.equal(music.playing, false);
  await c.play('result'); assert.equal(cues.result.count, 0);
  c.configure({ foreground: true, volume: 0 }); assert.equal(music.playing, false);
  await c.play('result'); assert.equal(cues.result.count, 0);
  c.configure({ volume: 100 }); await c.play('result'); assert.equal(cues.result.count, 1);
  await tick();
  let resolve;
  cues.back.seekTo = () => new Promise(r => { resolve = r; });
  const pending = c.play('back');
  c.configure({ foreground: false }); resolve(); await pending;
  assert.equal(cues.back.count, 0, 'Pending seek must not play after backgrounding');
  c.configure({ foreground: true }); await tick();
  cues.start.seekTo = async () => { throw Error('decoder unavailable'); };
  await c.play('start'); assert.equal(cues.start.count, 0, 'Decode failure is contained');
  c.stop(); assert.equal(music.playing, false);
  c.configure({ volume: 50 }); assert.equal(music.playing, false, 'Stop cancels activation');
  for (const name of [...cueNames, 'ambient']) {
    const data = fs.readFileSync(path.join(root, 'assets/audio', name + '.wav'));
    assert.equal(data.toString('ascii', 0, 4), 'RIFF');
    assert.equal(data.readUInt32LE(24), 32000);
    let peak = 0;
    for (let i = 44; i < data.length; i += 2) peak = Math.max(peak, Math.abs(data.readInt16LE(i)));
    assert(peak > 1000 && peak < 20000, name + ': valid non-clipping signal');
    if (name === 'ambient') assert(Math.abs(data.readInt16LE(44) - data.readInt16LE(data.length - 2)) < 500, 'Loop seam');
    else assert.equal(data.readInt16LE(data.length - 2), 0, name + ': silent end');
  }
  console.log('PASS: gesture activation, independent toggles, mute, ads, background, rapid taps, seek cancellation, failure handling, WAV levels and loop seam');
})().catch(error => { console.error(error); process.exitCode = 1; });
