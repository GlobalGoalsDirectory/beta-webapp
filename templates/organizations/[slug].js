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
  const {
    name,
    summary,
    url,
    address,
    twitter_handle,
    facebook_handle,
    linkedin_handle,
  } = organization;
  const focusSdgs = getFocusSdgs(organization);

  return (
    <Layout>
      <Card>
        <CardContent>
          <OrganizationLogo size={128} organization={organization} />
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
            {address && (
              <Box display="flex">
                <Box marginRight={1}>
                  <MapMarker />
                </Box>
                <Typography variant="body1">{address}</Typography>
              </Box>
            )}
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
                <Grid key={index + 1} item>
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
          {(twitter_handle || facebook_handle || linkedin_handle) && (
            <>
              <Divider />
              <Box marginTop={2} marginBottom={3}>
                <Typography variant="h2" gutterBottom>
                  Social Media
                </Typography>
                <Box marginY={2}>
                  {facebook_handle && (
                    <Box display="flex">
                      <Box marginRight={1}>
                        <Facebook />
                      </Box>
                      <Typography variant="body1">
                        <a
                          href={`https://www.facebook.com/${facebook_handle}/`}
                          target="_blank"
                        >
                          @{decodeURI(facebook_handle)}
                        </a>
                      </Typography>
                    </Box>
                  )}
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
                  {linkedin_handle && (
                    <Box display="flex">
                      <Box marginRight={1}>
                        <Linkedin />
                      </Box>
                      <Typography variant="body1">
                        <a
                          href={`https://www.linkedin.com/company/${linkedin_handle}/`}
                          target="_blank"
                        >
                          @{linkedin_handle}
                        </a>
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </>
          )}
          {twitter_handle && (
            <>
              <Divider />
              <Box marginTop={2} marginBottom={2}>
                <a
                  className="twitter-timeline"
                  href={`https://twitter.com/${twitter_handle}`}
                  data-chrome="noheader nofooter noborders"
                  data-tweet-limit="4"
                  data-width="400"
                >
                  Latest tweets by {twitter_handle}
                </a>{" "}
                <script
                  async
                  src="https://platform.twitter.com/widgets.js"
                  charSet="utf-8"
                ></script>
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
