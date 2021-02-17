import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import Emphasis from "components/Emphasis";

const Objective = ({ label, image, children }) => (
  <Card>
    <CardMedia
      style={{
        height: 140,
        backgroundSize: "contain",
        margin: 16,
        marginBottom: 0,
      }}
      image={`/static/mission/${image}`}
      title={label}
    />
    <CardContent>
      <Typography variant="h6" component="p" gutterBottom>
        <Emphasis>{label}</Emphasis>
      </Typography>
      <Typography variant="body1">{children}</Typography>
    </CardContent>
  </Card>
);

export default Objective;
