import { memo, useCallback, useEffect, useState, useRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { useRouter } from "next/router";
import { t } from "@lingui/macro";
import Leaflet from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  ZoomControl,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import { Avatar, Box, CircularProgress } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import OrganizationLogo from "components/OrganizationLogo";
import OrganizationPreview from "components/OrganizationPreview";
import { theme } from "helpers/getTheme";

const PopupStyle = createGlobalStyle`
  .leaflet-container {
    font: unset;
  }

  .leaflet-popup-content-wrapper {
    padding: 0;
    
    .leaflet-popup-content {
      margin: 0;

      p {
        margin: 0;
      }

      a {
        color: unset;
      }
    }
  }
`;

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
              variant="circular"
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
                  variant="circular"
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

const FitMapBounds = ({ bounds, trigger }) => {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(bounds, { animate: true, duration: 1 });
  }, [trigger]);

  return null;
};

const InteractiveMap = memo(
  ({ organizations, activeState }) => {
    const router = useRouter();
    const [isVisible, setVisibility] = useState(false);
    const timeoutRef = useRef(null);

    const showMap = useCallback(() => {
      if (timeoutRef.current) return;

      timeoutRef.current = setTimeout(() => setVisibility(true), 100);
    }, [timeoutRef.current]);

    const hideMap = useCallback(() => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setVisibility(false);
    }, [timeoutRef.current]);

    useEffect(() => {
      showMap();
      router.events.on("routeChangeStart", hideMap);
      router.events.on("routeChangeComplete", showMap);

      return () => {
        router.events.off("routeChangeStart", hideMap);
        router.events.off("routeChangeComplete", showMap);
        hideMap();
      };
    }, []);

    const bounds = organizations.map((org) => [org.latitude, org.longitude]);

    if (!isVisible)
      return (
        <Box
          width={1}
          height={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress disableShrink />
        </Box>
      );

    return (
      <>
        <PopupStyle />
        <MapContainer
          bounds={bounds}
          // We manually add zoom controls in the bottom-right corner
          zoomControl={false}
          style={{ height: "100%" }}
        >
          <TileLayer
            attribution={t`&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`}
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FitMapBounds bounds={bounds} trigger={activeState} />
          <MarkerClusterGroup
            key={Date.now()}
            iconCreateFunction={(cluster) =>
              getClusterIcon(cluster, organizations)
            }
          >
            {organizations.map((organization) => (
              <Marker
                key={organization.slug}
                icon={getIcon(organization)}
                position={[organization.latitude, organization.longitude]}
                dataSlug={organization.slug}
              >
                <Popup closeButton={false}>
                  <OrganizationPreview
                    organization={organization}
                    elevation={0}
                  />
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
          <ZoomControl position="bottomright" />
        </MapContainer>
      </>
    );
  },
  (prevProps, nextProps) => {
    // Re-render if the number of organizations has changed
    if (prevProps.organizations.length !== nextProps.organizations.length)
      return false;

    // Re-render if active state (filter) has changed
    if (prevProps.activeState !== nextProps.activeState) return false;

    // Re-render if we have different slugs
    return !prevProps.organizations
      .map((org) => org.slug)
      .every((slug) =>
        nextProps.organizations.some((org) => org.slug === slug)
      );
  }
);

export default InteractiveMap;
