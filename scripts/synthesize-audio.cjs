// Original GameFinder sound palette. No samples, network calls or extra dependencies.
// Run from the project root: node scripts/synthesize-audio.cjs
const fs = require('node:fs');
const path = require('node:path');
const rate = 32000;
const tau = Math.PI * 2;
const out = path.resolve(__dirname, '../assets/audio');
fs.mkdirSync(out, { recursive: true });
const hz = midi => 440 * 2 ** ((midi - 69) / 12);
const buffer = seconds => new Float64Array(Math.round(seconds * rate));
function note(target, at, duration, midi, gain, soft = false, wrap = false) {
  const frequency = hz(midi);
  for (let i = 0; i < duration * rate; i++) {
    const t = i / rate, u = t / duration;
    const attack = Math.min(1, t / (soft ? 0.65 : 0.008));
    const release = Math.min(1, (duration - t) / (soft ? 0.9 : 0.045));
    const envelope = soft ? attack * release : attack * release * Math.exp(-5 * u);
    const tone = soft
      ? (Math.sin(tau * frequency * t) + 0.32 * Math.sin(tau * frequency * 1.002 * t) + 0.12 * Math.sin(tau * frequency * 2 * t)) / 1.44
      : Math.sin(tau * frequency * t) + 0.2 * Math.sin(tau * frequency * 2 * t) * Math.exp(-12 * t);
    const position = Math.round(at * rate) + i;
    if (wrap || position < target.length) target[position % target.length] += gain * envelope * tone;
  }
}
function ambience(samples, wrap = false) {
  const dry = samples.slice();
  for (const [delay, gain] of [[0.091, 0.12], [0.173, 0.08], [0.287, 0.04]]) {
    const offset = Math.round(delay * rate);
    for (let i = 0; i < dry.length; i++) {
      if (wrap || i + offset < samples.length) samples[(i + offset) % samples.length] += dry[i] * gain;
    }
  }
}
function write(name, samples, ceiling) {
  let peak = 0;
  for (const x of samples) peak = Math.max(peak, Math.abs(x));
  const scale = peak > 0 ? ceiling / peak : 1;
  const wav = Buffer.alloc(44 + samples.length * 2);
  wav.write('RIFF'); wav.writeUInt32LE(wav.length - 8, 4); wav.write('WAVE', 8);
  wav.write('fmt ', 12); wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20);
  wav.writeUInt16LE(1, 22); wav.writeUInt32LE(rate, 24); wav.writeUInt32LE(rate * 2, 28);
  wav.writeUInt16LE(2, 32); wav.writeUInt16LE(16, 34); wav.write('data', 36);
  wav.writeUInt32LE(samples.length * 2, 40);
  for (let i = 0; i < samples.length; i++) wav.writeInt16LE(Math.round(samples[i] * scale * 32767), 44 + i * 2);
  fs.writeFileSync(path.join(out, name + '.wav'), wav);
  console.log(`${name}: ${(samples.length / rate).toFixed(2)}s, ${(wav.length / 1024).toFixed(0)} KB`);
}
const cues = {
  select: { duration: 0.24, notes: [[0, 0.16, 76, 0.8], [0.025, 0.13, 83, 0.15]] },
  navigate: { duration: 0.30, notes: [[0, 0.20, 72, 0.6], [0.065, 0.18, 76, 0.4]] },
  back: { duration: 0.30, notes: [[0, 0.17, 74, 0.5], [0.075, 0.17, 69, 0.45]] },
  start: { duration: 0.70, notes: [[0, 0.28, 69, 0.6], [0.10, 0.30, 72, 0.6], [0.21, 0.37, 76, 0.6]] },
  favorite: { duration: 0.55, notes: [[0, 0.22, 76, 0.5], [0.10, 0.32, 81, 0.6]] },
  unfavorite: { duration: 0.37, notes: [[0, 0.18, 76, 0.45], [0.07, 0.23, 72, 0.4]] },
  result: { duration: 1.55, notes: [[0, 0.48, 69, 0.5], [0.13, 0.48, 72, 0.5], [0.26, 0.50, 76, 0.5], [0.43, 0.90, 81, 0.42], [0.43, 0.85, 72, 0.18], [0.43, 0.85, 76, 0.18]] },
};
for (const [name, cue] of Object.entries(cues)) {
  const samples = buffer(cue.duration);
  for (const args of cue.notes) note(samples, ...args);
  ambience(samples);
  // Fade the final tail to silence to avoid a click when the player ends.
  for (let i = 0; i < 320; i++) samples[samples.length - 1 - i] *= i / 320;
  write(name, samples, name === 'result' ? 0.46 : 0.40);
}
// 80 BPM / eight bars. A minor 9 -> F major 7 -> C major 9 -> G suspended.
// Tails wrap around the loop, preserving continuity without a silent seam.
const music = buffer(24);
const chords = [[45, 60, 64, 71], [41, 60, 64, 69], [48, 59, 62, 67], [43, 60, 62, 69]];
chords.forEach((chord, bar) => {
  chord.forEach((midi, voice) => note(music, bar * 6, 7.2, midi, voice === 0 ? 0.09 : 0.045, true, true));
  [0, 1.5, 3.75, 4.5].forEach((time, i) => note(music, bar * 6 + time, 1.8, chord[1 + i % 3] + 12, 0.035, false, true));
});
ambience(music, true);
write('ambient', music, 0.36);
