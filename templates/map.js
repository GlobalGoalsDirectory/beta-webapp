import dynamic from "next/dynamic";
import { Trans } from "@lingui/macro";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Hidden,
  Typography,
} from "@material-ui/core";
import { Plus } from "mdi-material-ui";
import FullScreenLayout from "components/FullScreenLayout";
import SdgFilter from "components/SdgFilter";
import StateFilter from "components/StateFilter";
import { addOrganizationUrl } from "helpers/organization";
import useOrganizationFilters from "hooks/useOrganizationFilters";

const InteractiveMap = dynamic(() => import("components/InteractiveMap"), {
  ssr: false,
});

const Map = ({ organizations }) => {
  const {
    filteredOrganizations,
    activeSdg,
    filterBySdg,
    sdgOptions,
    activeState,
    filterByState,
    stateOptions,
  } = useOrganizationFilters(organizations);

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
                display="flex"
                flexDirection="column"
                clone
              >
                <Paper elevation={3} square>
                  <>
                    <Box
                      padding={2}
                      display="flex"
                      flexGrow={1}
                      flexDirection="column"
                    >
                      <Typography variant="h2" component="h1" gutterBottom>
                        <Trans>Map</Trans>
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <Trans>
                          Explore startups, organizations, and companies in
                          Germany that are working on one of the 17 UN
                          Sustainable Development Goals.
                        </Trans>
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <Trans>Click on a pin for details.</Trans>
                      </Typography>
                      <Box marginY={2}>
                        <Divider />
                      </Box>
                      <Box marginY={1}>
                        <SdgFilter
                          activeSdg={activeSdg}
                          sdgOptions={sdgOptions}
                          filterBySdg={filterBySdg}
                        />
                      </Box>
                      <Box marginY={1}>
                        <StateFilter
                          activeState={activeState}
                          stateOptions={stateOptions}
                          filterByState={filterByState}
                        />
                      </Box>
                      <Box flexGrow={1} />
                      <Box>
                        <Button
                          component="a"
                          target="_blank"
                          href={addOrganizationUrl()}
                          startIcon={<Plus />}
                          variant="outlined"
                          fullWidth
                        >
                          <Trans>Add Organization or Startup</Trans>
                        </Button>
                      </Box>
                    </Box>
                  </>
                </Paper>
              </Box>
            </Hidden>
          </Box>
        </Grid>
        <Grid item xs={12} md={9} lg={9} style={{ maxHeight: "100%" }}>
          <Box height={1}>
            <InteractiveMap
              organizations={filteredOrganizations}
              activeState={activeState}
            />
          </Box>
        </Grid>
      </Grid>
    </FullScreenLayout>
  );
};

export default Map;
