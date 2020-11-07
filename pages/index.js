import { readJsonSync } from "fs-extra";
import path from "path";
import Link from "next/link";
import { Typography } from "@material-ui/core";

const HomePage = ({ organizations }) => (
  <>
    <Typography variant="h1">Hello World!</Typography>
    <Link href="/other-page">
      <a>other page</a>
    </Link>
    <pre>{JSON.stringify(organizations, null, 2)}</pre>
  </>
);

export function getStaticProps() {
  const dataPath = path.join(process.cwd(), "data", "organizations.json");
  const organizations = readJsonSync(dataPath);

  return {
    props: {
      organizations,
    },
  };
}

export default HomePage;
