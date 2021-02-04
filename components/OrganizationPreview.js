import Link from "next/link";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import OrganizationLogo from "components/OrganizationLogo";
import { getLink } from "helpers/organization";
import getFocusSdgs from "helpers/getFocusSdgs";

const trim = (text, length) => {
  if (!text || text.length <= length) return text;

  return text.substr(0, text.lastIndexOf(" ", length)) + "...";
};

const OrganizationPreview = ({ organization }) => {
  const { name, summary } = organization;
  const focusSdgs = getFocusSdgs(organization, 3);
  const hiddenSdgsCount = getFocusSdgs(organization).length - 3;

  return (
    <Card style={{ height: "100%" }}>
      <Link href={getLink(organization)} passHref>
        <CardActionArea component="a" style={{ height: "100%" }}>
          <CardContent
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <Box flexGrow={1}>
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
            </Box>
            <Box display="flex" marginTop={1}>
              {focusSdgs.map((goal) => (
                <img
                  src={`/static/sdgs/sdg${goal}.jpg`}
                  style={{ height: 40, marginRight: 4 }}
                />
              ))}
              {hiddenSdgsCount > 0 && (
                <Avatar variant="square" height={40} style={{ color: "#666" }}>
                  +{hiddenSdgsCount}
                </Avatar>
              )}
            </Box>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default OrganizationPreview;
