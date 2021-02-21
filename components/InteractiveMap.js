import { renderToStaticMarkup } from "react-dom/server";
import Leaflet from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { ThemeProvider } from "styled-components";
import OrganizationLogo from "components/OrganizationLogo";
import { theme } from "helpers/getTheme";

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

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

const InteractiveMap = ({ organizations }) => (
  <MapContainer center={[52.5, 13.4]} zoom={10} style={{ height: "100%" }}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {organizations.map((organization) => (
      <Marker
        key={organization.slug}
        icon={getIcon(organization)}
        position={[organization.latitude, organization.longitude]}
      >
        <Popup>{organization.name}</Popup>
      </Marker>
    ))}
  </MapContainer>
);

export default InteractiveMap;
