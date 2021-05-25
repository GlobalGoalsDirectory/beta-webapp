import { memo } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { t } from "@lingui/macro";
import Leaflet from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import { Avatar, Box } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { ThemeProvider } from "styled-components";
import OrganizationLogo from "components/OrganizationLogo";
import { theme } from "helpers/getTheme";

const getIcon = (organization) => {
  return Leaflet.divIcon({
    className: "logo-icon",
    html: renderToStaticMarkup(
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <Box
            position="absolute"
            bgcolor="black"
            width={40}
            height={40}
            left="50%"
            top="50%"
            style={{
              borderRadius: "50% 50% 50% 0",
              transform: "rotate(-45deg)",
              margin: "-20px 0 0 -20px",
            }}
          />
          <Box position="absolute" width={36} left={2} top={11}>
            <OrganizationLogo
              variant="circle"
              organization={organization}
              size={36}
            />
          </Box>
        </ThemeProvider>
      </MuiThemeProvider>
    ),
    iconSize: [40, 58],
    iconAnchor: [20, 58],
    popupAnchor: [0, -47],
  });
};

const getClusterIcon = (cluster, organizations) => {
  const clusterOrgs = cluster
    .getAllChildMarkers()
    .splice(0, 3)
    .map((child) =>
      organizations.find((org) => org.slug === child.options.dataSlug)
    );

  const clusterCount = cluster.getChildCount();

  return Leaflet.divIcon({
    className: "logo-cluster-icon",
    html: renderToStaticMarkup(
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <Box
            borderRadius="100%"
            bgcolor="black"
            position="absolute"
            left="50%"
            top="50%"
            style={{ padding: 2, margin: "-20px 0 0 -20px" }}
            width={40}
            height={40}
          >
            <Avatar style={{ width: 36, height: 36, background: "#202029" }}>
              <Box component="span" fontSize=".9rem">
                {clusterCount}
              </Box>
            </Avatar>
          </Box>
          <Box
            display="flex"
            position="absolute"
            left={clusterCount >= 3 ? -12 : -2}
            top={42}
          >
            {clusterOrgs.map((organization, index) => (
              <Box
                className="logo"
                key={organization.slug}
                borderRadius="100%"
                bgcolor="black"
                marginRight={index != 2 ? -1 : 0}
                zIndex={3 - index}
                position="relative"
                width={26}
                height={26}
                style={{ padding: 1 }}
              >
                <OrganizationLogo
                  variant="circle"
                  organization={organization}
                  size={24}
                />
              </Box>
            ))}
          </Box>
        </ThemeProvider>
      </MuiThemeProvider>
    ),
    iconSize: [40, 70],
    iconAnchor: [20, 35],
    // popupAnchor: [0, -47],
  });
};
const InteractiveMap = memo(({ organizations, onClick }) => (
  <MapContainer
    bounds={organizations.map((org) => [org.latitude, org.longitude])}
    // We manually add zoom controls in the bottom-right corner
    zoomControl={false}
    style={{ height: "100%" }}
  >
    <TileLayer
      attribution={t`&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`}
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <MarkerClusterGroup
      iconCreateFunction={(cluster) => getClusterIcon(cluster, organizations)}
    >
      {organizations.map((organization) => (
        <Marker
          key={organization.slug}
          icon={getIcon(organization)}
          position={[organization.latitude, organization.longitude]}
          eventHandlers={{
            click: () => {
              onClick(organization);
            },
          }}
          dataSlug={organization.slug}
        >
          <Popup>{organization.name}</Popup>
        </Marker>
      ))}
    </MarkerClusterGroup>
    <ZoomControl position="bottomright" />
  </MapContainer>
));

export default InteractiveMap;
