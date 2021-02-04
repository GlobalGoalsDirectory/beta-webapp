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
import getFocusSdgs from "helpers/getFocusSdgs";

const OrganizationPage = ({ organization }) => {
  const { name, summary, url, address, twitter_handle } = organization;
  const focusSdgs = getFocusSdgs(organization);

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
          {summary && (
            <>
              <Divider />
              <Box marginTop={2} marginBottom={3}>
                <Typography variant="h2" gutterBottom>
                  About
                </Typography>
                <Typography variant="body1">{summary}</Typography>
              </Box>
            </>
          )}
          <Divider />
          <Box marginTop={2} marginBottom={3}>
            <Typography variant="h2" gutterBottom>
              Focus SDGs
            </Typography>
            <Grid container spacing={1}>
              {Array.from({ length: 17 }).map((_e, index) => (
                <Grid id={index + 1} item style={{}}>
                  <img
                    src={`/static/sdgs/sdg${index + 1}.jpg`}
                    style={{
                      height: 80,
                      filter: focusSdgs.includes(index + 1)
                        ? null
                        : "grayscale(1)",
                      opacity: focusSdgs.includes(index + 1) ? 1 : 0.5,
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          {twitter_handle && (
            <>
              <Divider />
              <Box marginTop={2} marginBottom={3}>
                <Typography variant="h2" gutterBottom>
                  Social Media
                </Typography>
                <Box marginY={2}>
                  {/* <Box display="flex">
                <Box marginRight={1}>
                  <Facebook />
                </Box>
                <Typography variant="body1">
                  <a href="https://www.facebook.com/TODO" target="_blank">
                    @company
                  </a>
                </Typography>
              </Box> */}
                  {twitter_handle && (
                    <Box display="flex">
                      <Box marginRight={1}>
                        <Twitter />
                      </Box>
                      <Typography variant="body1">
                        <a
                          href={`https://twitter.com/${twitter_handle}`}
                          target="_blank"
                        >
                          @{twitter_handle}
                        </a>
                      </Typography>
                    </Box>
                  )}
                  {/* <Box display="flex">
                <Box marginRight={1}>
                  <Linkedin />
                </Box>
                <Typography variant="body1">
                  <a href="https://www.linkedin.com/TODO" target="_blank">
                    @company
                  </a>
                </Typography>
              </Box> */}
                </Box>
              </Box>
            </>
          )}
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
