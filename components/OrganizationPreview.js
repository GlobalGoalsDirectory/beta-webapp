import Link from "next/link";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
import OrganizationLogo from "components/OrganizationLogo";
import { getLink } from "helpers/organization";

const OrganizationPreview = ({ organization }) => {
  const { name } = organization;

  return (
    <Card>
      <Link href={getLink(organization)} passHref>
        <CardActionArea component="a">
          <CardContent>
            <OrganizationLogo size={64}>{name}</OrganizationLogo>
            <Box marginTop={1}>
              <Typography variant="h5" style={{ fontWeight: 500 }}>
                {name}
              </Typography>
            </Box>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              rutrum eros vitae nisi consectetur rhoncus. Mauris ultrices magna
              sit amet neque tincidunt maximus. Pellentesque velit lectus,
              interdum sed velit eu, elementum tincidunt nisi.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default OrganizationPreview;
