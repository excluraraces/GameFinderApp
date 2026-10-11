const { withGradleProperties } = require('expo/config-plugins');

// Native release compilation and lint exceed the template's 512 MB metaspace.
const properties = {
  'org.gradle.jvmargs': '-Xmx4096m -XX:MaxMetaspaceSize=2048m',
  'org.gradle.parallel': 'false',
  'org.gradle.workers.max': '2',
};
module.exports = function withAndroidBuildMemory(config) {
  return withGradleProperties(config, (config) => {
    config.modResults = config.modResults.filter((item) => !(item.key in properties));
    for (const [key, value] of Object.entries(properties)) {
      config.modResults.push({ type: 'property', key, value });
    }
    return config;
  });
};
