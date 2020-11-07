import Link from "next/link";
import { Typography } from "@material-ui/core";

const HomePage = () => (
  <>
    <Typography variant="h1">Hello World!</Typography>
    <Link href="/other-page">
      <a>other page</a>
    </Link>
  </>
);

export default HomePage;
