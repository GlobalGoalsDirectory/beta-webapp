import { readJsonSync } from "fs-extra";
import path from "path";

const getOrganizations = () => {
  const dataPath = path.join(process.cwd(), "data", "organizations.json");
  const { organizations } = readJsonSync(dataPath);

  return organizations;
};

export default getOrganizations;
