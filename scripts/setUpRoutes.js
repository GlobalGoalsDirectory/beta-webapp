const fse = require("fs-extra");
const path = require("path");
const { ROUTES, LOCALES, DEFAULT_LOCALE } = require("../helpers/locales");

const PAGES_DIR = path.resolve(__dirname, "..", "pages");
const TEMPLATES_DIR = path.join(__dirname, "..", "templates");

// Reset /pages directory
fse.ensureDirSync(PAGES_DIR);
fse.emptyDirSync(PAGES_DIR);

// Copy over core files
PAGES = [];
PAGES.push({
  path: "_app.js",
  template: "_app.js",
});
PAGES.push({
  path: "_document.js",
  template: "_document.js",
});

// Copy pages for each locale
ROUTES.forEach((route) =>
  LOCALES.forEach((locale) => {
    const templateName = route.template.replace(/\/$/, "/index");
    const pageName = route[locale].replace(/\/$/, "/index") + ".js";

    PAGES.push({
      template: templateName,
      path: pageName,
    });
  })
);

// Set up pages
PAGES.map((page) => {
  const templatePath = path.join("templates", page.template);
  const pagePath = path.join(PAGES_DIR, page.path);

  // Set up required folders
  fse.ensureDirSync(path.dirname(pagePath));

  // Identify use of GSP
  const hasGetStaticProps = fse.existsSync(`${templatePath}.getStaticProps.js`);

  fse.writeFileSync(
    pagePath,
    [
      `export { default } from "${templatePath}";`,
      hasGetStaticProps &&
        `export { getStaticProps, getStaticPaths } from "${templatePath}.getStaticProps";`,
    ]
      .filter(Boolean)
      .join("\n\n"),
    {
      flag: "wx",
    }
  );
});

console.log(
  "Successfully set up",
  ROUTES.length,
  "routes each for",
  LOCALES.length,
  "locales."
);
