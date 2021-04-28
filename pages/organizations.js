import getOrganizations from "helpers/getOrganizations";

import { useState } from "react";
import Link from "next/link";
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import Layout from "components/Layout";
import OrganizationPreview from "components/OrganizationPreview";
import InfiniteScroll from "components/InfiniteScroll";

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

  return (
    <Layout>
      <Typography variant="h1" gutterBottom>
        Directory
      </Typography>
      <Box marginBottom={2}>
        <Box display="flex">
          <Box marginRight={2}>
            <FormControl variant="filled">
              <InputLabel id="sdgFilter">Focus</InputLabel>
              <Select
                labelId="sdgFilter"
                value={sdgFilter}
                onChange={(event) => setSdgFilter(event.target.value)}
                autoWidth={true}
              >
                <MenuItem value={"all"}>All SDGs</MenuItem>
                {Array.from({ length: 17 }).map((_e, index) => (
                  <MenuItem key={index} value={index + 1}>
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
            <FormControl variant="filled">
              <InputLabel id="stateFilter">Location</InputLabel>
              <Select
                labelId="stateFilter"
                value={stateFilter}
                onChange={(event) => setStateFilter(event.target.value)}
                autoWidth={true}
              >
                <MenuItem value={"all"}>All states</MenuItem>
                {STATES.map((state) => (
                  <MenuItem key={state} value={state}>
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
        </InfiniteScroll>
      </Grid>
    </Layout>
  );
};

export function getStaticProps() {
  const organizations = getOrganizations();

  return {
    props: {
      organizations,
    },
  };
}

export default DirectoryPage;
