module.exports = {
  locales: ["en", "de"],
  catalogs: [
    {
      path: "locales/{locale}/messages",
      include: ["templates", "components", "helpers"],
    },
  ],
  format: "po",
  sourceLocale: "en",
};
