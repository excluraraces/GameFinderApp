const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
let checked = 0;

function inspect(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) { inspect(file); continue; }
    const extension = path.extname(file).toLowerCase();
    if (!['.jpeg', '.jpg', '.png', '.webp', '.wav'].includes(extension)) continue;
    const bytes = fs.readFileSync(file);
    const signature = bytes.subarray(0, 12);
    const valid = extension === '.jpeg' || extension === '.jpg'
      ? bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
      : extension === '.png'
        ? signature.subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex'))
        : signature.toString('ascii', 0, 4) === 'RIFF' &&
          signature.toString('ascii', 8, 12) === (extension === '.webp' ? 'WEBP' : 'WAVE');
    assert(valid, `${path.relative(root, file)}: contents do not match ${extension}`);
    checked++;
  }
}
inspect(path.join(root, 'assets'));
console.log(`PASS: ${checked} image/audio file signatures match their extensions`);
