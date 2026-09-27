export type AdEvent = "loaded" | "closed" | "error";
export interface ResultAd {
  listen(event: AdEvent, callback: () => void): () => void;
  load(): void;
  show(): Promise<void>;
}

// One presentation attempt per app session. Loading never blocks recommendations.
export function createInterstitialController(
  createAd: () => Promise<ResultAd | null>,
  canShow: () => boolean,
  loadTimeoutMs = 15_000,
) {
  let generation = 0;
  let loading = false;
  let readyAt: number | null = null;
  let attempted = false;
  let ad: ResultAd | null = null;
  let listeners: (() => void)[] = [];
  let timer: ReturnType<typeof setTimeout> | undefined;
  let pending: Promise<void> | null = null;
  let complete: (() => void) | undefined;

  function discard() {
    generation++;
    clearTimeout(timer);
    listeners.forEach(remove => remove());
    listeners = [];
    loading = false;
    readyAt = null;
    ad = null;
    complete?.();
    complete = undefined;
    pending = null;
  }

  function prepare() {
    if (attempted || loading || ad) return;
    loading = true;
    const token = ++generation;
    timer = setTimeout(discard, loadTimeoutMs);
    void (async () => {
      try {
        const instance = await createAd();
        if (token !== generation) return;
        if (!instance) { discard(); return; }
        ad = instance;
        listeners = [
          instance.listen("loaded", () => {
            if (token !== generation) return;
            clearTimeout(timer);
            loading = false;
            readyAt = Date.now();
          }),
          instance.listen("closed", discard),
          instance.listen("error", discard),
        ];
        instance.load();
      } catch { if (token === generation) discard(); }
    })();
  }

  function showBeforeResults(): Promise<void> {
    if (pending) return pending;
    if (attempted || !ad || readyAt === null || !canShow() || Date.now() - readyAt > 55 * 60_000) {
      discard(); // A late load must never interrupt results already on screen.
      return Promise.resolve();
    }
    attempted = true;
    const instance = ad;
    const result = new Promise<void>(resolve => { complete = resolve; });
    pending = result;
    try {
      // show() resolves on presentation, not dismissal. Wait for CLOSED/ERROR.
      void instance.show().catch(discard);
    } catch { discard(); }
    return result;
  }

  return { prepare, showBeforeResults, discard };
}
