// Verify that all organizations have data
import fse from "fs-extra";
import groupby from "lodash.groupby";

const { organizations } = fse.readJsonSync(
  new URL("./organizations.json", import.meta.url).pathname
);

const errors = [];
const ALL_SCORES_NULL_ERROR = 1;
const NO_NAME_ERROR = 2;
const NO_HOMEPAGE_ERROR = 3;
const NO_COMMITMENT_URL_ERROR = 4;

const addError = (organization, type) => errors.push({ organization, type });
const printError = (type) => {
  switch (type) {
    case ALL_SCORES_NULL_ERROR:
      return "All SDG scores are null";
    case NO_NAME_ERROR:
      return "Org has no name";
    case NO_HOMEPAGE_ERROR:
      return "Org has no homepage";
    case NO_COMMITMENT_URL_ERROR:
      return "Org has no commitment URL";
  }
};

// Ensure at least one SDG score for every organization
organizations
  .filter((org) =>
    Object.keys(org)
      .filter((key) => key.match(/sdg\d{1,2}_score/))
      .every((key) => org[key] == null)
  )
  .forEach((org) => addError(org, ALL_SCORES_NULL_ERROR));

// Ensure name for every organization
organizations
  .filter((org) => org.name == null)
  .forEach((org) => addError(org, NO_NAME_ERROR));

// Ensure homepage for every organization
organizations
  .filter((org) => org.homepage == null)
  .forEach((org) => addError(org, NO_HOMEPAGE_ERROR));

// Ensure commitment URL for every organization
organizations
  .filter((org) => org.commitment_url == null)
  .forEach((org) => addError(org, NO_COMMITMENT_URL_ERROR));

Object.values(groupby(errors, (error) => error.organization.slug)).forEach(
  (orgErrors) => {
    console.log(orgErrors[0].organization.slug);
    orgErrors.forEach((error) => console.log("  -", printError(error.type)));
  }
);
