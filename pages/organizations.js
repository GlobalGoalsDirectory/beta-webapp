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

const filterBySdg = (organizations, sdg) => {
  let key = "total_score";
  if (sdg != "all") key = `sdg${sdg}_score`;

  return [...organizations]
    .filter((organization) => organization[key] > 0)
    .sort((a, b) => b[key] - a[key]);
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

const DirectoryPage = ({ organizations }) => {
  const [filter, setFilter] = useState("all");

  return (
    <Layout>
      <Typography variant="h1" gutterBottom>
        Directory
      </Typography>
      <Box marginBottom={2}>
        <FormControl variant="filled">
          <InputLabel id="filter">Filter</InputLabel>
          <Select
            labelId="filter"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
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
            Filter the directory by one of the 17 Sustainable Development Goals
          </FormHelperText>
        </FormControl>
      </Box>
      <Grid container spacing={3}>
        <InfiniteScroll filter={filter}>
          {filterBySdg(organizations, filter).map((organization) => (
            <Grid key={organization.slug} xs={12} sm={4} md={3} item>
              <OrganizationPreview organization={organization} />
            </Grid>
          ))}
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
