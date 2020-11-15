import { readJsonSync } from "fs-extra";
import path from "path";
import Link from "next/link";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import styled from "styled-components";
import Layout from "components/Layout";

const LargeButton = styled(Button).attrs({
  size: "large",
})`
  && {
    width: 100%;
    padding: 16px 30px;
  }
`;

const Emphasis = styled.span`
  font-weight: 700;
  font-size: 1.5em;
  line-height: 1em;
`;

const HomePage = ({ organizationsCount }) => (
  <Layout
    containerProps={{
      style: { display: "flex", alignItems: "center", flexGrow: 1 },
    }}
  >
    <Box marginTop={8} marginBottom={8}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={12} lg={8}>
          <Typography variant="h1" gutterBottom>
            Find <Emphasis>{organizationsCount}</Emphasis> startups and
            organizations working on the SDGs in Berlin
          </Typography>
        </Grid>
        <Grid item xs={0} lg={4} />
        <Grid item xs={12} lg={4}>
          <Link href="/organizations" passHref>
            <LargeButton component="a" variant="contained" color="primary">
              <Typography
                variant="h4"
                component="span"
                style={{ fontWeight: 500 }}
              >
                Explore Directory
              </Typography>
            </LargeButton>
          </Link>
        </Grid>
      </Grid>
    </Box>
  </Layout>
);

export function getStaticProps() {
  const dataPath = path.join(process.cwd(), "data", "organizations.json");
  const { organizations } = readJsonSync(dataPath);

  return {
    props: {
      organizationsCount: organizations.length,
    },
  };
}

export default HomePage;
