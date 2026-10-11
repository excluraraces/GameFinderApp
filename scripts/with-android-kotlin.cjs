const { withGradleProperties, withProjectBuildGradle } = require('expo/config-plugins');

const kotlinVersion = '2.3.20';

// Ads 25.4 requires Kotlin 2.3 metadata support. Update both the Expo
// version catalog and the root compiler classpath (RN otherwise supplies 2.1).
module.exports = function withAndroidKotlin(config) {
  config = withGradleProperties(config, (config) => {
    const key = 'android.kotlinVersion';
    config.modResults = config.modResults.filter((item) => item.key !== key);
    config.modResults.push({ type: 'property', key, value: kotlinVersion });
    return config;
  });
  return withProjectBuildGradle(config, (config) => {
    const declaration = /classpath\(['"]org\.jetbrains\.kotlin:kotlin-gradle-plugin(?::[^'"]+)?['"]\)/g;
    if (!declaration.test(config.modResults.contents)) {
      throw new Error('Kotlin compiler classpath declaration missing; review the Android template.');
    }
    config.modResults.contents = config.modResults.contents.replace(
      declaration,
      `classpath('org.jetbrains.kotlin:kotlin-gradle-plugin:${kotlinVersion}')`,
    );
    return config;
  });
};
