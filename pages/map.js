import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import {
  Box,
  Drawer,
  Grid,
  Paper,
  Hidden,
  Typography,
} from "@material-ui/core";
import FullScreenLayout from "components/FullScreenLayout";
import OrganizationSideView from "components/OrganizationSideView";
import SideViewHeading from "components/SideViewHeading";
import getOrganizations from "helpers/getOrganizations";

const InteractiveMap = dynamic(() => import("components/InteractiveMap"), {
  ssr: false,
});

const Map = ({ organizations }) => {
  const [organizationToShow, setOrganizationToShow] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);

  const mapClickHandler = useCallback((org) => {
    setOrganizationToShow(org);
    setShowDrawer(true);
  }, []);

  const onCloseDesktop = useCallback(() => {
    setOrganizationToShow(null);
    setShowDrawer(false);
  }, []);
  const onCloseMobile = useCallback(() => setShowDrawer(false), []);

  return (
    <FullScreenLayout>
      <Grid container style={{ flexGrow: 1, maxHeight: "100%" }}>
        <Grid item xs={false} md={3} lg={3} style={{ maxHeight: "100%" }}>
          <Box height={1} clone>
            <Hidden implementation="css" smDown>
              <Box
                height={1}
                maxHeight={1}
                position="relative"
                zIndex={1000}
                overflow="auto"
                clone
              >
                <Paper elevation={3} square>
                  {organizationToShow ? (
                    <OrganizationSideView
                      organization={organizationToShow}
                      onClose={onCloseDesktop}
                    />
                  ) : (
                    <>
                      <SideViewHeading
                        image="/static/map/map.svg"
                        title="Global Goals Map"
                      />
                      <Box padding={2}>
                        <Typography variant="body1">
                          Explore startups, organizations, and companies in
                          Germany that are working on one of the 17 UN
                          Sustainable Development Goals. Click on a pin for
                          details.
                        </Typography>
                      </Box>
                    </>
                  )}
                </Paper>
              </Box>
            </Hidden>
          </Box>
        </Grid>
        <Grid item xs={12} md={9} lg={9} style={{ maxHeight: "100%" }}>
          <Box height={1}>
            <InteractiveMap
              organizations={organizations}
              onClick={mapClickHandler}
            />
          </Box>
        </Grid>
      </Grid>
      <Hidden implementation="js" mdUp>
        <Drawer
          anchor="bottom"
          open={showDrawer}
          PaperProps={{ style: { maxHeight: "80vh" } }}
          onClose={() => setShowDrawer(false)}
        >
          {organizationToShow && (
            <OrganizationSideView
              organization={organizationToShow}
              onClose={onCloseMobile}
            />
          )}
        </Drawer>
      </Hidden>
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
