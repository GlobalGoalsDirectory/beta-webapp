import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { Plus, ShapePlus } from "mdi-material-ui";
import Layout from "components/Layout";
import OrganizationPreview from "components/OrganizationPreview";
import InfiniteScroll from "components/InfiniteScroll";
import { addOrganizationUrl } from "helpers/organization";

const applyFilters = (organizations, { sdgFilter, stateFilter }) => {
  return filterByState(filterBySdg(organizations, sdgFilter), stateFilter);
};

const filterBySdg = (organizations, sdg) => {
  let key = "total_score";
  if (sdg != "all") key = `sdg${sdg}_score`;

  return [...organizations]
    .filter((organization) => organization[key] > 0)
    .sort((a, b) => b[key] - a[key]);
};

const filterByState = (organizations, state) => {
  if (state === "all") return organizations;

  return organizations.filter((organization) => organization.state === state);
};

const GOALS = [
  "No poverty",
  "Zero hunger",
  "Good health and well-being",
  "Quality education",
  "Gender equality",
  "Clean water and sanitation",
  "Affordable and clean energy",
  "Decent work and economic growth",
  "Industry, innovation and infrastructure",
  "Reduced inequalities",
  "Sustainable cities and communities",
  "Responsible consumption and production",
  "Climate action",
  "Life below water",
  "Life on land",
  "Peace, justice and strong institutions",
  "Partnerships for the goals",
];

const STATES = [
  "Baden-Württemberg",
  "Bavaria",
  "Berlin",
  "Brandenburg",
  "Bremen",
  "Hamburg",
  "Hesse",
  "Lower Saxony",
  "Mecklenburg-Vorpommern",
  "North Rhine-Westphalia",
  "Rhineland-Palatinate",
  "Saarland",
  "Saxony",
  "Saxony-Anhalt",
  "Schleswig-Holstein",
  "Thuringia",
];

const DirectoryPage = ({ organizations }) => {
  const [sdgFilter, setSdgFilter] = useState("all");
  const [stateFilter, setStateFilter] = useState("all");
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  // TODO: Reenable after making compatible with multiple locales
  // useEffect(() => {
  //   if (isInitialized) return;
  //   const queryParams = new URLSearchParams(window.location.search);
  //   setSdgFilter(queryParams.get("sdg") || "all");
  //   setStateFilter(queryParams.get("state") || "all");
  //   setIsInitialized(true);
  // }, []);
  //
  // // Run this effect only after we have parsed the initial URL params
  // // (see above)
  // useEffect(() => {
  //   if (!isInitialized) return;
  //
  //   // Construct query params
  //   const queryParams = {};
  //
  //   // Set new or modify existing parameter value.
  //   if (sdgFilter != "all") queryParams.sdg = sdgFilter;
  //   if (stateFilter != "all") queryParams.state = stateFilter;
  //
  //   // Replace current querystring with the new one
  //   router.replace(
  //     { pathname: "/organizations" },
  //     {
  //       pathname: "/organizations",
  //       query: queryParams,
  //     },
  //     { scroll: false, shallow: true }
  //   );
  // }, [sdgFilter, stateFilter]);

  return (
    <Layout>
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography variant="h1" gutterBottom>
            Directory
          </Typography>
        </Box>
        <Box display={{ xs: "none", md: "block" }}>
          <Button
            component="a"
            target="_blank"
            href={addOrganizationUrl()}
            startIcon={<Plus />}
            variant="outlined"
          >
            Add Organization or Startup
          </Button>
        </Box>
      </Box>
      <Box marginBottom={2}>
        <Box display={{ md: "flex" }}>
          <Box marginRight={{ md: 2 }} marginBottom={{ xs: 2, md: 0 }}>
            <FormControl variant="filled" style={{ maxWidth: "100%" }}>
              <InputLabel id="sdgFilter">Focus</InputLabel>
              <Select
                labelId="sdgFilter"
                value={sdgFilter}
                onChange={(event) => setSdgFilter(event.target.value)}
                autoWidth={true}
              >
                <MenuItem value={"all"}>All SDGs</MenuItem>
                {Array.from({ length: 17 }).map((_e, index) => (
                  <MenuItem
                    key={index}
                    value={index + 1}
                    disabled={
                      applyFilters(organizations, {
                        sdgFilter: index + 1,
                        stateFilter,
                      }).length == 0
                    }
                  >
                    SDG {index + 1}: {GOALS[index]}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                Filter by one of the 17 Sustainable Development Goals
              </FormHelperText>
            </FormControl>
          </Box>
          <Box>
            <FormControl variant="filled" style={{ maxWidth: "100%" }}>
              <InputLabel id="stateFilter">Location</InputLabel>
              <Select
                labelId="stateFilter"
                value={stateFilter}
                onChange={(event) => setStateFilter(event.target.value)}
                autoWidth={true}
              >
                <MenuItem value={"all"}>All states</MenuItem>
                {STATES.map((state) => (
                  <MenuItem
                    key={state}
                    value={state}
                    disabled={
                      applyFilters(organizations, {
                        sdgFilter,
                        stateFilter: state,
                      }).length == 0
                    }
                  >
                    {state}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                Filter by one of the 16 German states
              </FormHelperText>
            </FormControl>
          </Box>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <InfiniteScroll sdgFilter={sdgFilter} stateFilter={stateFilter}>
          {applyFilters(organizations, { sdgFilter, stateFilter }).map(
            (organization) => (
              <Grid key={organization.slug} xs={12} sm={4} md={3} item>
                <OrganizationPreview organization={organization} />
              </Grid>
            )
          )}
          <Grid xs={12} sm={4} md={3} item>
            <Box bgcolor="black" color="white" clone>
              <Card style={{ height: "100%" }}>
                <CardActionArea
                  component="a"
                  target="_blank"
                  style={{ height: "100%" }}
                  href={addOrganizationUrl()}
                >
                  <CardContent>
                    <Box width={64} height={64} display="block" clone>
                      <ShapePlus />
                    </Box>
                    <Box marginTop={1}>
                      <Typography variant="h5" style={{ fontWeight: 500 }}>
                        Know another organization, startup, or company?
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      We would love to feature them in the Global Goals
                      Directory. Click here to add an organization.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          </Grid>
        </InfiniteScroll>
      </Grid>
    </Layout>
  );
};

export default DirectoryPage;
