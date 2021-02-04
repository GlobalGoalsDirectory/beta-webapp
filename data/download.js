// Download the organization data from a Google spreadsheet
const path = require("path");
const { writeJsonSync } = require("fs-extra");
const sheetrock = require("sheetrock");
const slugify = require("slugify");

const DATABASE_URL =
  "https://docs.google.com/spreadsheets/d/1kTPuzuE97nUL15_srlJhNuydSNBborNuLRObXXxkVsg/edit#gid=0";
const OUTPUT_PATH = path.join(__dirname, "organizations.json");

// Parse the data after downloading it from the Google spreadsheet
const parseData = (error, options, response) => {
  if (error) throw error;

  try {
    // Collect header row and data rows
    const [headerRow, ...dataRows] = response.rows.map((row) => row.cellsArray);

    // Identify data keys/variables
    keys = headerRow.filter((key) => key.length);

    // Convert data row array into an array of objects
    let organizations = dataRows.map((row) =>
      keys.reduce((obj, key, index) => ((obj[key] = row[index]), obj), {})
    );

    // Add slug (slugify title)
    organizations.forEach((organization) => {
      organization.slug = slugify(organization.name, { lower: true });
    });

    // Convert score to numeric
    organizations.forEach((organization) => {
      Object.keys(organization)
        .filter((key) => key.endsWith("_score"))
        .map((key) => (organization[key] = parseFloat(organization[key])));
    });

    // Sort organizations by total score
    organizations.sort((a, b) => b.total_score - a.total_score);

    // TEMP: Add address
    organizations.forEach((organization) => {
      organization.address = "Oranienburger Straße 54, 10117 Berlin";
    });

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