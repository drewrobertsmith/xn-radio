// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const refined = require("eslint-plugin-refined");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
    plugins: {
      refined,
    },
    rules: {
      ...refined.configs.recommended.rules,
    },
  },
]);
