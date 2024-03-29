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
import LocaleLink from "components/LocaleLink";
import { getLink } from "helpers/organization";
import getFocusSdgs from "helpers/getFocusSdgs";

const trim = (text, length) => {
  if (!text || text.length <= length) return text;

  return text.substr(0, text.lastIndexOf(" ", length)) + "...";
};

const OrganizationPreview = ({ organization, elevation = 1 }) => {
  const { name, about } = organization;
  const focusSdgs = getFocusSdgs(organization, 3);
  const hiddenSdgsCount = getFocusSdgs(organization).length - 3;

  return (
    <Card style={{ height: "100%" }} elevation={elevation}>
      <LocaleLink href={getLink(organization)} passHref>
        <CardActionArea component="a" style={{ height: "100%" }}>
          <CardContent
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <Box flexGrow={1}>
              <OrganizationLogo organization={organization} size={64} />
              <Box
                fontSize="h5.fontSize"
                marginTop={1.5}
                marginBottom={1}
                style={{
                  fontWeight: 500,
                  overflowWrap: "break-word",
                  lineHeight: 1.25,
                }}
              >
                {name}
              </Box>
              <Typography variant="body2">
                {trim(about, 200) || (
                  <Box fontStyle="italic" component="span">
                    No description.
                  </Box>
                )}
              </Typography>
            </Box>
            <Box display="flex" marginTop={1}>
              {focusSdgs.map((goal) => (
                <img
                  key={goal}
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
      </LocaleLink>
    </Card>
  );
};

export default OrganizationPreview;
