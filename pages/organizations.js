import getOrganizations from "helpers/getOrganizations";

import Link from "next/link";
import { Grid, Typography } from "@material-ui/core";
import Layout from "components/Layout";
import OrganizationPreview from "components/OrganizationPreview";

const DirectoryPage = ({ organizations }) => (
  <Layout>
    <Typography variant="h1" gutterBottom>
      Directory
    </Typography>
    <Grid container spacing={3}>
      {organizations.map((organization) => (
        <Grid key={organization.slug} xs={12} sm={4} md={3} item>
          <OrganizationPreview organization={organization} />
        </Grid>
      ))}
    </Grid>
  </Layout>
);

export function getStaticProps() {
  const organizations = getOrganizations();

  return {
    props: {
      organizations,
    },
  };
}

export default DirectoryPage;
