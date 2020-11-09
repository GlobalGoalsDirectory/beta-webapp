import { Box, Card, CardContent, Typography } from "@material-ui/core";
import OrganizationLogo from "components/OrganizationLogo";

const OrganizationPreview = ({ organization }) => {
  const { name } = organization;

  return (
    <Card>
      <CardContent>
        <OrganizationLogo>{name}</OrganizationLogo>
        <Box marginTop={1}>
          <Typography variant="h5" style={{ fontWeight: 500 }}>
            {name}
          </Typography>
        </Box>
        <Typography variant="body2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          rutrum eros vitae nisi consectetur rhoncus. Mauris ultrices magna sit
          amet neque tincidunt maximus. Pellentesque velit lectus, interdum sed
          velit eu, elementum tincidunt nisi.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OrganizationPreview;
