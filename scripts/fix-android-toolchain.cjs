// React Native 0.85 ships Foojay 0.5, which references IBM_SEMERU removed in Gradle 9.
// Upstream: https://github.com/reactwg/react-native-releases/issues/1349
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const pluginPackage = require.resolve('@react-native/gradle-plugin/package.json', { paths: [root] });
const settings = path.join(path.dirname(pluginPackage), 'settings.gradle.kts');
const source = fs.readFileSync(settings, 'utf8');
const oldPlugin = 'id("org.gradle.toolchains.foojay-resolver-convention").version("0.5.0")';
const newPlugin = 'id("org.gradle.toolchains.foojay-resolver-convention").version("1.0.0")';
if (source.includes(oldPlugin)) {
  fs.writeFileSync(settings, source.replace(oldPlugin, newPlugin));
  console.log('Applied Gradle 9 / Foojay 1.0 compatibility fix.');
} else if (source.includes(newPlugin)) {
  console.log('Gradle / Foojay compatibility fix already applied.');
} else {
  console.log('Foojay declaration has changed upstream; no files modified. Review whether this workaround is still needed.');
}
