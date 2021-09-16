import { useState } from "react";
import { useRouter } from "next/router";
import { Trans } from "@lingui/macro";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { Plus, ShapePlus } from "mdi-material-ui";
import Layout from "components/Layout";
import OrganizationPreview from "components/OrganizationPreview";
import InfiniteScroll from "components/InfiniteScroll";
import SdgFilter from "components/SdgFilter";
import StateFilter from "components/StateFilter";
import { addOrganizationUrl } from "helpers/organization";
import useOrganizationFilters from "hooks/useOrganizationFilters";

const DirectoryPage = ({ organizations }) => {
  const {
    filteredOrganizations,
    activeSdg,
    filterBySdg,
    sdgOptions,
    activeState,
    filterByState,
    stateOptions,
  } = useOrganizationFilters(organizations);

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
            <SdgFilter
              activeSdg={activeSdg}
              sdgOptions={sdgOptions}
              filterBySdg={filterBySdg}
            />
          </Box>
          <Box marginRight={{ md: 2 }} marginBottom={{ xs: 2, md: 0 }}>
            <StateFilter
              activeState={activeState}
              stateOptions={stateOptions}
              filterByState={filterByState}
            />
          </Box>
          <Box justifyContent={{ md: "flex-end" }} flexGrow={1} display="flex">
            <Box height={{ md: 56 }} display="flex" alignItems="center">
              <Typography variant="h6" component="p" color="textSecondary">
                <Trans>Showing {filteredOrganizations.length} results</Trans>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <InfiniteScroll>
          {filteredOrganizations.map((organization) => (
            <Grid key={organization.slug} xs={12} sm={4} md={3} item>
              <OrganizationPreview organization={organization} />
            </Grid>
          ))}
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
