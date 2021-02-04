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

const trim = (text, length) => {
  if (!text || text.length <= length) return text;

  return text.substr(0, text.lastIndexOf(" ", length)) + "...";
};

const OrganizationPreview = ({ organization }) => {
  const { name, summary } = organization;

  return (
    <Card style={{ height: "100%" }}>
      <Link href={getLink(organization)} passHref>
        <CardActionArea component="a" style={{ height: "100%" }}>
          <CardContent>
            <OrganizationLogo size={64}>{name}</OrganizationLogo>
            <Box marginTop={1}>
              <Typography variant="h5" style={{ fontWeight: 500 }}>
                {name}
              </Typography>
            </Box>
            <Typography variant="body2">
              {trim(summary, 200) || (
                <Box fontStyle="italic">No description.</Box>
              )}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default OrganizationPreview;
