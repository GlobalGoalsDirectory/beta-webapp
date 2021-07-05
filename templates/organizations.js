import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { Trans, defineMessage } from "@lingui/macro";
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

const GOALS = {
  1: defineMessage({ message: "No poverty" }),
  2: defineMessage({ message: "Zero hunger" }),
  3: defineMessage({ message: "Good health and well-being" }),
  4: defineMessage({ message: "Quality education" }),
  5: defineMessage({ message: "Gender equality" }),
  6: defineMessage({ message: "Clean water and sanitation" }),
  7: defineMessage({ message: "Affordable and clean energy" }),
  8: defineMessage({ message: "Decent work and economic growth" }),
  9: defineMessage({ message: "Industry, innovation and infrastructure" }),
  10: defineMessage({ message: "Reduced inequalities" }),
  11: defineMessage({ message: "Sustainable cities and communities" }),
  12: defineMessage({ message: "Responsible consumption and production" }),
  13: defineMessage({ message: "Climate action" }),
  14: defineMessage({ message: "Life below water" }),
  15: defineMessage({ message: "Life on land" }),
  16: defineMessage({ message: "Peace, justice and strong institutions" }),
  17: defineMessage({ message: "Partnerships for the goals" }),
};

const STATES = {
  "Baden-Württemberg": defineMessage({ message: "Baden-Württemberg" }),
  Bavaria: defineMessage({ message: "Bavaria" }),
  Berlin: defineMessage({ message: "Berlin" }),
  Brandenburg: defineMessage({ message: "Brandenburg" }),
  Bremen: defineMessage({ message: "Bremen" }),
  Hamburg: defineMessage({ message: "Hamburg" }),
  Hesse: defineMessage({ message: "Hesse" }),
  "Lower Saxony": defineMessage({ message: "Lower Saxony" }),
  "Mecklenburg-Vorpommern": defineMessage({
    message: "Mecklenburg-Vorpommern",
  }),
  "North Rhine-Westphalia": defineMessage({
    message: "North Rhine-Westphalia",
  }),
  "Rhineland-Palatinate": defineMessage({ message: "Rhineland-Palatinate" }),
  Saarland: defineMessage({ message: "Saarland" }),
  Saxony: defineMessage({ message: "Saxony" }),
  "Saxony-Anhalt": defineMessage({ message: "Saxony-Anhalt" }),
  "Schleswig-Holstein": defineMessage({ message: "Schleswig-Holstein" }),
  Thuringia: defineMessage({ message: "Thuringia" }),
};

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
            <Trans>Directory</Trans>
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
            <Trans>Add Organization or Startup</Trans>
          </Button>
        </Box>
      </Box>
      <Box marginBottom={2}>
        <Box display={{ md: "flex" }}>
          <Box marginRight={{ md: 2 }} marginBottom={{ xs: 2, md: 0 }}>
            <FormControl variant="filled" style={{ maxWidth: "100%" }}>
              <InputLabel id="sdgFilter">
                <Trans>Focus</Trans>
              </InputLabel>
              <Select
                labelId="sdgFilter"
                value={sdgFilter}
                onChange={(event) => setSdgFilter(event.target.value)}
                autoWidth={true}
              >
                <MenuItem value={"all"}>
                  <Trans>All SDGs</Trans>
                </MenuItem>
                {Object.entries(GOALS).map(([key, value]) => (
                  <MenuItem
                    key={key}
                    value={key}
                    disabled={
                      applyFilters(organizations, {
                        sdgFilter: key,
                        stateFilter,
                      }).length == 0
                    }
                  >
                    <Trans>SDG {key}:</Trans> <Trans id={value.id} />
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                <Trans>
                  Filter by one of the 17 Sustainable Development Goals
                </Trans>
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
                <MenuItem value={"all"}>
                  <Trans>All states</Trans>
                </MenuItem>
                {Object.entries(STATES).map(([key, value]) => (
                  <MenuItem
                    key={key}
                    value={key}
                    disabled={
                      applyFilters(organizations, {
                        sdgFilter,
                        stateFilter: key,
                      }).length == 0
                    }
                  >
                    <Trans id={value.id} />
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                <Trans>Filter by one of the 16 German states</Trans>
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
                        <Trans>
                          Know another organization, startup, or company?
                        </Trans>
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      <Trans>
                        We would love to feature them in the Global Goals
                        Directory. Click here to add an organization.
                      </Trans>
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
