import { readJsonSync } from "fs-extra";
import path from "path";
import Link from "next/link";
import { Container, Grid, Typography } from "@material-ui/core";
import OrganizationPreview from "components/OrganizationPreview";

const DirectoryPage = ({ organizations }) => (
  <>
    <Container>
      <Typography variant="h1" gutterBottom>
        Directory
      </Typography>
      <Grid container spacing={3}>
        {organizations.map((organization) => (
          <Grid key={organization.name} xs={12} sm={4} md={3} item>
            <OrganizationPreview organization={organization} />
          </Grid>
        ))}
      </Grid>
    </Container>
  </>
);

export function getStaticProps() {
  const dataPath = path.join(process.cwd(), "data", "organizations.json");
  const data = readJsonSync(dataPath);

  return {
    props: {
      ...data,
    },
  };
}

export default DirectoryPage;
