export type SoundCue = 'select' | 'navigate' | 'back' | 'start' | 'favorite' | 'unfavorite' | 'result';
type Player = {
  isLoaded: boolean;
  playing: boolean;
  loop: boolean;
  volume: number;
  play(): void;
  pause(): void;
  seekTo(seconds: number): Promise<void>;
};
export type AudioPreferences = { musicEnabled: boolean; soundEnabled: boolean; volume: number };
type Options = AudioPreferences & { ready: boolean; blocked: boolean; foreground: boolean };

// Playback failures must never block navigation, saving, or showing recommendations.
export function createAudioController(music: Player, cues: Record<SoundCue, Player>) {
  let options: Options = { musicEnabled: false, soundEnabled: false, volume: 0, ready: false, blocked: false, foreground: true };
  let unlocked = false;
  let sequence = 0;
  let fade: ReturnType<typeof setInterval> | undefined;
  let lastCueAt = -Infinity;
  const attempt = (action: () => void) => { try { action(); } catch { /* Audio is optional feedback. */ } };
  const level = () => Math.max(0, Math.min(100, options.volume)) / 100;
  const available = () => unlocked && options.ready && options.foreground && !options.blocked;
  function clearFade() { if (fade !== undefined) clearInterval(fade); fade = undefined; }
  function stopEffects() {
    sequence++;
    Object.values(cues).forEach(player => attempt(() => player.pause()));
  }
  function refreshMusic() {
    clearFade();
    if (!available() || !options.musicEnabled || level() === 0) {
      attempt(() => { music.volume = 0; music.pause(); });
      return;
    }
    if (!music.isLoaded) return;
    const target = level() * 0.22;
    attempt(() => {
      music.loop = true;
      if (!music.playing) { music.volume = 0; music.play(); }
      const initial = music.volume;
      let step = 0;
      fade = setInterval(() => {
        step++;
        attempt(() => { music.volume = initial + (target - initial) * Math.min(1, step / 10); });
        if (step >= 10) clearFade();
      }, 40);
    });
  }
  function configure(next: Partial<Options>) {
    options = { ...options, ...next };
    if (!available() || !options.soundEnabled || level() === 0) stopEffects();
    Object.values(cues).forEach(player => attempt(() => { player.volume = level() * 0.65; }));
    refreshMusic();
  }
  function activate() { unlocked = true; refreshMusic(); }
  async function play(cue: SoundCue) {
    if (!available() || !options.soundEnabled || level() === 0) return;
    const now = Date.now();
    if (now - lastCueAt < 65) return;
    const player = cues[cue];
    if (!player.isLoaded) return; // Never replay an old interaction after a slow load.
    lastCueAt = now;
    stopEffects();
    const current = sequence;
    try {
      await player.seekTo(0);
      if (current !== sequence || !available() || !options.soundEnabled || level() === 0) return;
      player.volume = level() * 0.65;
      player.play();
    } catch { /* Missing/blocked audio never breaks the app. */ }
  }
  function interact(cue?: SoundCue) { activate(); if (cue) void play(cue); }
  function stop() {
    unlocked = false;
    clearFade();
    stopEffects();
    attempt(() => { music.volume = 0; music.pause(); });
  }
  return { configure, interact, play, refreshMusic, stop };
}
