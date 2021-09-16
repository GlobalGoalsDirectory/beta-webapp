import dynamic from "next/dynamic";
import { Trans } from "@lingui/macro";
import {
  Box,
  Button,
  Grid,
  Paper,
  Hidden,
  Typography,
} from "@material-ui/core";
import { Plus } from "mdi-material-ui";
import FullScreenLayout from "components/FullScreenLayout";
import { addOrganizationUrl } from "helpers/organization";

const InteractiveMap = dynamic(() => import("components/InteractiveMap"), {
  ssr: false,
});

const Map = ({ organizations }) => (
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
                        Germany that are working on one of the 17 UN Sustainable
                        Development Goals.
                      </Trans>
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <Trans>Click on a pin for details.</Trans>
                    </Typography>
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
          <InteractiveMap organizations={organizations} />
        </Box>
      </Grid>
    </Grid>
  </FullScreenLayout>
);

export default Map;
