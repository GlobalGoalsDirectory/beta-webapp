import getOrganizations from "helpers/getOrganizations";

import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
} from "@material-ui/core";
import OrganizationLogo from "components/OrganizationLogo";

const OrganizationPage = ({ organization }) => {
  const { name, url } = organization;

  return (
    <Container>
      <Card>
        <CardContent>
          <OrganizationLogo size={128}>{name}</OrganizationLogo>
          <Box marginY={2}>
            <Typography variant="h1">{name}</Typography>
          </Box>
          <Divider />
          <Box marginY={2}>
            <Typography variant="body1">{url}</Typography>
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
          </Box>
          <Divider />
          <Box marginTop={2} marginBottom={3}>
            <Typography variant="h2" gutterBottom>
              Social Media
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
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
