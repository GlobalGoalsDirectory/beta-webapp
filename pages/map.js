import { useState } from "react";
import dynamic from "next/dynamic";
import { Box, Grid, Paper } from "@material-ui/core";
import FullScreenLayout from "components/FullScreenLayout";
import OrganizationSideView from "components/OrganizationSideView";
import getOrganizations from "helpers/getOrganizations";

const InteractiveMap = dynamic(() => import("components/InteractiveMap"), {
  ssr: false,
});

const Map = ({ organizations }) => {
  const [organizationToShow, showOrganization] = useState(null);

  return (
    <FullScreenLayout>
      <Grid container style={{ flexGrow: 1, maxHeight: "100%" }}>
        <Grid item xs={false} md={3} lg={3} style={{ maxHeight: "100%" }}>
          <Box
            height={1}
            maxHeight={1}
            position="relative"
            zIndex={1000}
            overflow="auto"
            clone
          >
            <Paper elevation={3}>
              {organizationToShow && (
                <OrganizationSideView organization={organizationToShow} />
              )}
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12} md={9} lg={9} style={{ maxHeight: "100%" }}>
          <Box height={1}>
            <InteractiveMap
              organizations={organizations}
              showOrganization={showOrganization}
            />
          </Box>
        </Grid>
      </Grid>
    </FullScreenLayout>
  );
};

export function getStaticProps() {
  let organizations = getOrganizations();

  // Keep only organizations with defined latitude and longitude
  organizations = organizations.filter(
    (org) => (org.latitude != null) & (org.longitude != null)
  );

  return {
    props: {
      organizations,
    },
  };
}

export default Map;
