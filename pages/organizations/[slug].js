import getOrganizations from "helpers/getOrganizations";

import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import { Earth, Facebook, Linkedin, MapMarker, Twitter } from "mdi-material-ui";
import Layout from "components/Layout";
import OrganizationLogo from "components/OrganizationLogo";

const OrganizationPage = ({ organization }) => {
  const { name, url, address } = organization;

  return (
    <Layout>
      <Card>
        <CardContent>
          <OrganizationLogo size={128}>{name}</OrganizationLogo>
          <Box marginY={2}>
            <Typography variant="h1">{name}</Typography>
          </Box>
          <Divider />
          <Box marginY={2}>
            <Box display="flex">
              <Box marginRight={1}>
                <Earth />
              </Box>
              <Typography variant="body1">
                <a href={url} target="_blank">
                  {url}
                </a>
              </Typography>
            </Box>
            <Box display="flex">
              <Box marginRight={1}>
                <MapMarker />
              </Box>
              <Typography variant="body1">{address}</Typography>
            </Box>
          </Box>
          <Divider />
          <Box marginTop={2} marginBottom={3}>
            <Typography variant="h2" gutterBottom>
              About
            </Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              rutrum eros vitae nisi consectetur rhoncus. Mauris ultrices magna
              sit amet neque tincidunt maximus. Pellentesque velit lectus,
              interdum sed velit eu, elementum tincidunt nisi. Praesent quis
              interdum urna. Proin facilisis placerat massa, vel consequat leo
              suscipit quis. Curabitur convallis est erat, ac posuere lectus
              pellentesque sit amet. Praesent bibendum dignissim ex id porta. Ut
              non condimentum sapien. Praesent in neque ut odio pulvinar
              vehicula.
            </Typography>
          </Box>
          <Divider />
          <Box marginTop={2} marginBottom={3}>
            <Typography variant="h2" gutterBottom>
              Focus SDGs
            </Typography>
            <Grid container spacing={1}>
              {[1, 2, 3].map((goal) => (
                <Grid id={goal} item>
                  <img
                    src={`/static/sdgs/sdg${goal}.jpg`}
                    style={{ height: 120 }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Divider />
          <Box marginTop={2} marginBottom={3}>
            <Typography variant="h2" gutterBottom>
              Social Media
            </Typography>
            <Box marginY={2}>
              <Box display="flex">
                <Box marginRight={1}>
                  <Facebook />
                </Box>
                <Typography variant="body1">
                  <a href="https://www.facebook.com/TODO" target="_blank">
                    @company
                  </a>
                </Typography>
              </Box>
              <Box display="flex">
                <Box marginRight={1}>
                  <Twitter />
                </Box>
                <Typography variant="body1">
                  <a href="https://www.twitter.com/TODO" target="_blank">
                    @company
                  </a>
                </Typography>
              </Box>
              <Box display="flex">
                <Box marginRight={1}>
                  <Linkedin />
                </Box>
                <Typography variant="body1">
                  <a href="https://www.linkedin.com/TODO" target="_blank">
                    @company
                  </a>
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Layout>
  );
};

export function getStaticPaths() {
  const organizations = getOrganizations();
  const slugs = organizations.map((organization) => organization.slug);

  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const { slug } = params;

  const organizations = getOrganizations();
  const organization = organizations.find((org) => org.slug === slug);

  return {
    props: { organization },
  };
}

export default OrganizationPage;
