const fse = require("fs-extra");
const path = require("path");
const { ROUTES, LOCALES, DEFAULT_LOCALE } = require("../helpers/locales");

const PAGES_DIR = path.resolve(__dirname, "..", "pages");
const TEMPLATES_DIR = path.join(__dirname, "..", "templates");

// Reset /pages directory
fse.ensureDirSync(PAGES_DIR);
fse.emptyDirSync(PAGES_DIR);

// Copy over core files
["_app.js", "_document.js"].map((file) =>
  fse.copySync(path.join(TEMPLATES_DIR, file), path.join(PAGES_DIR, file), {
    overwrite: false,
    errorOnExist: true,
  })
);

// Write pages for each locale
ROUTES.forEach((route) =>
  LOCALES.forEach((locale) => {
    const templateName = route.template.replace(/\/$/, "/index");
    const templatePath = path.join("templates", templateName);

    const pageName = route[locale].replace(/\/$/, "/index") + ".js";
    const pagePath = path.join(PAGES_DIR, pageName);

    // Set up required folders
    fse.ensureDirSync(path.dirname(pagePath));

    // Identify use of GSP
    const hasGetStaticProps = fse.existsSync(
      `${templatePath}.getStaticProps.js`
    );

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
  })
);
