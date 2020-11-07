import Link from "next/link";
import { Typography } from "@material-ui/core";

const OtherPage = () => (
  <>
    <Typography variant="h1">Hello from the other page!</Typography>
    <Link href="/">
      <a>main page</a>
    </Link>
  </>
);

export default OtherPage;
