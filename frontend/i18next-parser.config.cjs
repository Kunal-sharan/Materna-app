module.exports = {
  locales: ["en", "es", "hindi", "ch"],
  output: "src/i18n/$LOCALE.json",
  input: ["src/**/*.{js,jsx,ts,tsx}"],
  defaultNamespace: "translation",
  keySeparator: false,
  namespaceSeparator: false,
  keepRemoved: false,
};
