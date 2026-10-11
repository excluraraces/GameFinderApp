const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const globals = require('globals');

module.exports = defineConfig([
  expoConfig,
  { files: ['scripts/**/*.{js,cjs}', '*.config.js'], languageOptions: { globals: globals.node } },
  { ignores: ['dist/**', 'web-build/**', 'example/**'] },
]);
