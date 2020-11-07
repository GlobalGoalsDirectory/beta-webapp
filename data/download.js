// Download the organization data from a Google spreadsheet
const path = require("path");
const { writeJsonSync } = require("fs-extra");
const sheetrock = require("sheetrock");

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
    const organizations = dataRows.map((row) =>
      keys.reduce((obj, key, index) => ((obj[key] = row[index]), obj), {})
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
