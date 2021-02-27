import { readJsonSync } from "fs-extra";
import path from "path";
import Link from "next/link";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import styled from "styled-components";
import Layout from "components/Layout";

const LargeButton = styled(Button).attrs({
  size: "large",
  // fullWidth: true,
})`
  && {
    padding: 16px 30px;
  }
`;

const SdgsText = styled(Box).attrs({
  component: "span",
  color: "white",
})`
  background: linear-gradient(
      -45deg,
      rgb(229, 36, 59) 0px,
      rgb(229, 36, 59) 5.88235%,
      rgb(221, 166, 58) 5.88235%,
      rgb(221, 166, 58) 11.7647%,
      rgb(76, 159, 56) 11.7647%,
      rgb(76, 159, 56) 17.6471%,
      rgb(197, 25, 45) 17.6471%,
      rgb(197, 25, 45) 23.5294%,
      rgb(255, 58, 33) 23.5294%,
      rgb(255, 58, 33) 29.4118%,
      rgb(38, 189, 226) 29.4118%,
      rgb(38, 189, 226) 35.2941%,
      rgb(252, 195, 11) 35.2941%,
      rgb(252, 195, 11) 41.1765%,
      rgb(162, 25, 66) 41.1765%,
      rgb(162, 25, 66) 47.0588%,
      rgb(253, 105, 37) 47.0588%,
      rgb(253, 105, 37) 52.9412%,
      rgb(221, 19, 103) 52.9412%,
      rgb(221, 19, 103) 58.8235%,
      rgb(253, 157, 36) 58.8235%,
      rgb(253, 157, 36) 64.7059%,
      rgb(191, 139, 46) 64.7059%,
      rgb(191, 139, 46) 70.5882%,
      rgb(63, 126, 68) 70.5882%,
      rgb(63, 126, 68) 76.4706%,
      rgb(10, 151, 217) 76.4706%,
      rgb(10, 151, 217) 82.3529%,
      rgb(86, 192, 43) 82.3529%,
      rgb(86, 192, 43) 88.2353%,
      rgb(0, 104, 157) 88.2353%,
      rgb(0, 104, 157) 94.1176%,
      rgb(25, 72, 106) 94.1176%,
      rgb(25, 72, 106) 100%
    )
    0px 0px repeat scroll;
  background-clip: text;
  -webkit-background-clip: text;
  text-fill-color: transparent;
  -webkit-text-fill-color: transparent;
`;

const Bold = styled(Box).attrs({
  component: "span",
})`
  font-weight: 700;
`;

const Bigger = styled(Box).attrs({
  component: "span",
})`
  font-size: 1.2em;
  line-height: 1em;
`;

const ResponsiveGridContainer = styled(Grid).attrs({
  container: true,
})`
  ${(props) => props.theme.breakpoints.down("xs")} {
    flex-direction: column-reverse;
  }
`;

const HomePage = ({ organizationsCount }) => (
  <Layout
    containerProps={{
      style: {
        display: "flex",
        alignItems: "center",
        flexGrow: 1,
      },
    }}
  >
    <Box marginY={6} paddingY={2} paddingX={2}>
      <ResponsiveGridContainer alignItems="center" spacing={5}>
        <Grid item xs={12} lg={8}>
          <Typography variant="h1" gutterBottom style={{ fontWeight: 400 }}>
            Discover{" "}
            <Bold>
              <Bigger>{organizationsCount}</Bigger>
            </Bold>{" "}
            <Bold>startups</Bold> and <Bold>organizations</Bold> working on the{" "}
            <Bold>
              <SdgsText>Sustainable Development Goals</SdgsText>
            </Bold>{" "}
            in Berlin
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm="auto">
              <Link href="/map" passHref>
                <LargeButton component="a" variant="contained" color="primary">
                  <Typography
                    variant="h4"
                    component="span"
                    style={{ fontWeight: 500 }}
                  >
                    Explore Map
                  </Typography>
                </LargeButton>
              </Link>
            </Grid>
            <Grid item xs={12} sm="auto">
              <Link href="/organizations" passHref>
                <LargeButton
                  component="a"
                  variant="contained"
                  style={{ background: "white" }}
                >
                  <Typography
                    variant="h4"
                    component="span"
                    color="primary"
                    style={{ fontWeight: 500 }}
                  >
                    View Directory
                  </Typography>
                </LargeButton>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <img
            src="/static/home/championing-the-sdgs.svg"
            style={{ maxWidth: "100%" }}
          />
        </Grid>
      </ResponsiveGridContainer>
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
