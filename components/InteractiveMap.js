import Leaflet from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const InteractiveMap = ({ organizations }) => (
  <MapContainer center={[52.5, 13.4]} zoom={10} style={{ height: "100%" }}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {organizations.map((organization) => (
      <Marker position={[organization.latitude, organization.longitude]}>
        <Popup>{organization.name}</Popup>
      </Marker>
    ))}
  </MapContainer>
);

export default InteractiveMap;
