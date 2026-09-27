const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const exportsObject = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/ads/interstitial-controller.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText, { exports: exportsObject, setTimeout, clearTimeout, Date });
const { createInterstitialController } = exportsObject;
const tick = () => new Promise(resolve => setImmediate(resolve));
function fixture(options = {}) {
  const handlers = new Map();
  let loads = 0, shows = 0, removals = 0;
  const ad = {
    listen(event, callback) { handlers.set(event, callback); return () => { handlers.delete(event); removals++; }; },
    load() { loads++; if (options.loadThrows) throw Error('load'); },
    show() { shows++; if (options.showThrows) throw Error('show'); return options.showRejects ? Promise.reject(Error('show')) : Promise.resolve(); },
  };
  const controller = createInterstitialController(options.create || (async () => ad), () => options.active !== false, options.timeout || 1000);
  return { controller, emit: event => handlers.get(event)?.(), ad, stats: () => ({ loads, shows, removals }) };
}
(async () => {
  let checks = 0;
  // No ad / unsupported target must not block results.
  const unavailable = fixture({ create: async () => null });
  unavailable.controller.prepare(); await tick(); await unavailable.controller.showBeforeResults(); checks++;
  // Repeated prepare does not issue duplicate requests; close unlocks only once.
  const normal = fixture();
  normal.controller.prepare(); normal.controller.prepare(); await tick();
  assert.equal(normal.stats().loads, 1);
  normal.emit('loaded');
  let completed = false;
  const shown = normal.controller.showBeforeResults();
  assert.equal(normal.controller.showBeforeResults(), shown);
  shown.then(() => { completed = true; }); await tick();
  assert.equal(completed, false); assert.equal(normal.stats().shows, 1);
  normal.emit('closed'); await shown; assert.equal(completed, true);
  normal.controller.prepare(); await normal.controller.showBeforeResults();
  assert.equal(normal.stats().shows, 1); assert.equal(normal.stats().removals, 3); checks++;
  // In-flight loading is discarded when the quiz finishes; cannot show late.
  const late = fixture(); late.controller.prepare(); await tick();
  await late.controller.showBeforeResults(); late.emit('loaded');
  await late.controller.showBeforeResults(); assert.equal(late.stats().shows, 0); checks++;
  // Initialization finishing after cancellation does not request an ad.
  let resolveCreate;
  const cancelled = fixture({ create: () => new Promise(resolve => { resolveCreate = resolve; }) });
  cancelled.controller.prepare(); cancelled.controller.discard(); resolveCreate(cancelled.ad); await tick();
  assert.equal(cancelled.stats().loads, 0); checks++;
  for (const options of [{ loadThrows: true }, { showThrows: true }, { showRejects: true }, { active: false }]) {
    const f = fixture(options); f.controller.prepare(); await tick(); f.emit('loaded');
    await f.controller.showBeforeResults(); assert(options.active !== false || f.stats().shows === 0); checks++;
  }
  const failed = fixture(); failed.controller.prepare(); await tick(); failed.emit('loaded');
  const waiting = failed.controller.showBeforeResults(); failed.emit('error'); await waiting; checks++;
  const loadError = fixture(); loadError.controller.prepare(); await tick(); loadError.emit('error');
  await loadError.controller.showBeforeResults(); assert.equal(loadError.stats().shows, 0); checks++;
  const timeout = fixture({ timeout: 5 }); timeout.controller.prepare(); await tick();
  await new Promise(resolve => setTimeout(resolve, 15)); timeout.emit('loaded');
  await timeout.controller.showBeforeResults(); assert.equal(timeout.stats().shows, 0); checks++;
  const initError = fixture({ create: async () => { throw Error('SDK unavailable'); } });
  initError.controller.prepare(); await tick(); await initError.controller.showBeforeResults(); checks++;
  const unmount = fixture(); unmount.controller.prepare(); await tick(); unmount.emit('loaded');
  const disposed = unmount.controller.showBeforeResults(); unmount.controller.discard(); await disposed; checks++;
  const expired = fixture(); expired.controller.prepare(); await tick(); expired.emit('loaded');
  const realNow = Date.now;
  try { Date.now = () => realNow() + 60 * 60_000; await expired.controller.showBeforeResults(); }
  finally { Date.now = realNow; }
  assert.equal(expired.stats().shows, 0); checks++;
  // Actual native entry point must not require the SDK in Expo Go or release.
  const nativeJs = ts.transpileModule(fs.readFileSync('src/ads/result-ad.native.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  }).outputText;
  for (const [dev, environment] of [[true, 'storeClient'], [false, 'bare']]) {
    const nativeExports = {};
    let sdkImports = 0;
    vm.runInNewContext(nativeJs, {
      exports: nativeExports, __DEV__: dev,
      require(name) {
        if (name === 'expo-constants') return { __esModule: true, default: { executionEnvironment: environment }, ExecutionEnvironment: { StoreClient: 'storeClient' } };
        if (name === 'react-native') return { AppState: { currentState: 'active' } };
        if (name === './interstitial-controller') return { createInterstitialController };
        sdkImports++; throw Error('Native SDK should not be imported');
      },
    });
    nativeExports.resultAd.prepare(); await tick(); await nativeExports.resultAd.showBeforeResults();
    assert.equal(sdkImports, 0); checks++;
  }
  console.log(`PASS: ${checks} ad lifecycle scenarios (close, failure, no fill, duplicate, late load, timeout, foreground, expiry, cleanup).`);
})().catch(error => { console.error(error); process.exitCode = 1; });
