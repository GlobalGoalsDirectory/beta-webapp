// Return the SDGs that this organization is focused on.
// Optionally, limit to max X orgs
const getFocusSdgs = (organization, max = 17) => {
  return (
    Object.keys(organization)
      .filter((key) => key.match(/sdg[0-9]{1,2}_matches_score/))
      .filter((key) => organization[key])
      // Sort by score in descending order
      .sort((a, b) => organization[b] - organization[a])
      // Limit to max number of sdgs
      .splice(0, max)
      .map((key) => parseInt(key.match(/sdg([0-9]{1,2})_matches_score/)[1]))
      .sort((a, b) => a - b)
  );
};

export default getFocusSdgs;
