const fse = require("fs-extra");
const path = require("path");
const { ROUTES, LOCALES, DEFAULT_LOCALE } = require("../helpers/locales");

const PAGES_DIR = path.join(__dirname, "..", "pages");
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

// Copy over pages for each locale
ROUTES.forEach((route) =>
  LOCALES.forEach((locale) => {
    const templateName = route.template.replace(/\/$/, "/index") + ".js";
    const pageName = route[locale].replace(/\/$/, "/index") + ".js";
    fse.copySync(
      path.join(TEMPLATES_DIR, templateName),
      path.join(PAGES_DIR, pageName),
      {
        overwrite: false,
        errorOnExist: true,
      }
    );
  })
);
