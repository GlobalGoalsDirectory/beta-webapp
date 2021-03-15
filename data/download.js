// Download the organization data from a Google spreadsheet
const path = require("path");
const { writeJsonSync } = require("fs-extra");
const sheetrock = require("sheetrock");
const slugify = require("slugify");
const pick = require("lodash.pick");

const DATABASE_URL =
  "https://docs.google.com/spreadsheets/d/1kTPuzuE97nUL15_srlJhNuydSNBborNuLRObXXxkVsg/edit#gid=0";
const OUTPUT_PATH = path.join(__dirname, "organizations.json");

// Parse the data after downloading it from the Google spreadsheet
const parseData = (error, options, response) => {
  if (error) throw error;

  try {
    // Convert data row array into an array of objects
    let organizations = response.rows.map((row) => row.cells);

    // Keep only properties that we use in the app
    organizations = organizations.map((organization) => {
      const keys = Object.keys(organization);

      const keysToKeep = keys.filter((key) => {
        if (["domain", "url", "logo", "name", "summary"].includes(key))
          return true;

        if (["address", "latitude", "longitude"].includes(key)) return true;

        if (key.endsWith("_handle")) return true;

        if (key.endsWith("_score")) return true;

        return false;
      });

      return pick(organization, keysToKeep);
    });

    // Add slug (slugify title)
    organizations.forEach((organization) => {
      const slug = slugify(organization.name, { lower: true });

      // If slug is already assigned, try slug-2, slug-3, etc...
      let attempt = 1;
      let proposedSlug = slug;
      while (organizations.some((org) => org.slug === proposedSlug)) {
        attempt += 1;
        proposedSlug = `${slug}-${attempt}`;
      }

      organization.slug = proposedSlug;
    });

    // Assert that slug is unique
    organizations.forEach(({ slug }) => {
      const orgsWithSlug = organizations.filter((org) => org.slug === slug);
      if (orgsWithSlug.length != 1)
        throw `Duplicate slug found: ${orgsWithSlug
          .map((org) => org.domain)
          .join(", ")}`;
    });

    // Convert value to null, if empty string
    organizations.forEach((organization) => {
      Object.entries(organization).forEach(([key, value]) => {
        if (value == "") organization[key] = null;
      });
    });
    // TODO: Test that every slug is unique

    // Convert score to numeric
    organizations.forEach((organization) => {
      Object.keys(organization)
        .filter((key) => key.endsWith("_score"))
        .map((key) => (organization[key] = parseFloat(organization[key])));
    });

    // Sort organizations by total score
    organizations.sort((a, b) => b.total_score - a.total_score);

    // Remove organizations with a score of 0 (no SDG matches)
    organizations = organizations.filter(
      (organization) => organization.total_score > 0
    );

    // Write data to file
    writeJsonSync(OUTPUT_PATH, { organizations }, { spaces: 2 });
  } catch (error) {
    console.log(error);
  }
};

// Initiate the download
sheetrock({
  url: DATABASE_URL,
  callback: parseData,
});
