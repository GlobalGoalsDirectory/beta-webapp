import { Trans, t } from "@lingui/macro";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import {
  Check,
  Earth,
  Facebook,
  Linkedin,
  MapMarker,
  OpenInNew,
  Twitter,
} from "mdi-material-ui";
import styled from "styled-components";
import Layout from "components/Layout";
import OrganizationLogo from "components/OrganizationLogo";
import Bold from "components/Bold";
import { getSdg } from "helpers/sdg";
import getFocusSdgs from "helpers/getFocusSdgs";
import {
  getFacebookLink,
  getLinkedinLink,
  getMapsLink,
  getTwitterLink,
} from "helpers/link";

const InfoTable = styled(Table).attrs({
  padding: "none",
})`
  && {
    width: unset;
  }

  td {
    border-bottom: none;
    padding: 8px;

    &:first-child {
      padding-left: 0;
    }
  }
`;

const InfoRow = ({ icon, label, value, href }) => {
  if (value == null) return null;

  return (
    <TableRow>
      <TableCell>
        <Box display="flex" alignItems="center" paddingRight={2}>
          <Box marginRight={1} clone>
            {icon}
          </Box>
          <Bold>{label}</Bold>
        </Box>
      </TableCell>
      <TableCell>
        <Link href={href} target="_blank">
          {value}
        </Link>
      </TableCell>
    </TableRow>
  );
};

const OrganizationPage = ({ organization, sdgChampionsCount }) => {
  const {
    name,
    about,
    homepage,
    commitment_url,
    address,
    twitter_handle,
    facebook_handle,
    linkedin_handle,
  } = organization;
  const focusSdgs = getFocusSdgs(organization);

  return (
    <Layout>
      <Box marginY={4}>
        <Card>
          <CardContent>
            <OrganizationLogo size={128} organization={organization} />
            <Box marginTop={2}>
              <Typography variant="h2" component="h1">
                {name}
              </Typography>
            </Box>
            <Box marginTop={1}>
              <Typography variant="body1" color="textPrimary">
                {about}
              </Typography>
            </Box>
            <Box marginTop={2} display="flex" alignItems="center">
              <Box marginRight={2} clone>
                <Button
                  href={homepage}
                  target="_blank"
                  variant="contained"
                  color="primary"
                >
                  <Trans>Website</Trans>
                </Button>
              </Box>
              {facebook_handle && (
                <IconButton
                  href={getFacebookLink(facebook_handle)}
                  target="_blank"
                >
                  <Facebook />
                </IconButton>
              )}
              {twitter_handle && (
                <IconButton
                  href={getTwitterLink(twitter_handle)}
                  target="_blank"
                >
                  <Twitter />
                </IconButton>
              )}
              {linkedin_handle && (
                <IconButton
                  href={getLinkedinLink(twitter_handle)}
                  target="_blank"
                >
                  <Linkedin />
                </IconButton>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box marginY={4}>
        <Card>
          <Box
            height="8px"
            width={1}
            style={{
              background:
                "linear-gradient( to right,rgb(229,36,59) 0px,rgb(229,36,59) 5.88235%,rgb(221,166,58) 5.88235%,rgb(221,166,58) 11.7647%,rgb(76,159,56) 11.7647%,rgb(76,159,56) 17.6471%,rgb(197,25,45) 17.6471%,rgb(197,25,45) 23.5294%,rgb(255,58,33) 23.5294%,rgb(255,58,33) 29.4118%,rgb(38,189,226) 29.4118%,rgb(38,189,226) 35.2941%,rgb(252,195,11) 35.2941%,rgb(252,195,11) 41.1765%,rgb(162,25,66) 41.1765%,rgb(162,25,66) 47.0588%,rgb(253,105,37) 47.0588%,rgb(253,105,37) 52.9412%,rgb(221,19,103) 52.9412%,rgb(221,19,103) 58.8235%,rgb(253,157,36) 58.8235%,rgb(253,157,36) 64.7059%,rgb(191,139,46) 64.7059%,rgb(191,139,46) 70.5882%,rgb(63,126,68) 70.5882%,rgb(63,126,68) 76.4706%,rgb(10,151,217) 76.4706%,rgb(10,151,217) 82.3529%,rgb(86,192,43) 82.3529%,rgb(86,192,43) 88.2353%,rgb(0,104,157) 88.2353%,rgb(0,104,157) 94.1176%,rgb(25,72,106) 94.1176%,rgb(25,72,106) 100% )",
            }}
          ></Box>
          <CardContent>
            <Box display="flex" alignItems="center">
              <Typography component="h2">
                <Bold fontSize="h2.fontSize">
                  <Trans>SDG Champion</Trans>
                </Bold>
              </Typography>
              <Box marginLeft={1} clone>
                <Chip icon={<Check />} label={t`Verified`} size="small" />
              </Box>
            </Box>
            <Box marginTop={1}>
              <Typography variant="body1">
                <Trans>
                  {name} is supporting the implementation of the 17 UN
                  Sustainable Development Goals (SDGs). This goal is explicitly
                  anchored on the website of {name}. For this, we award {name}{" "}
                  with the title "SDG Champion". {name} is thus one of the{" "}
                  {sdgChampionsCount} SDG Champions in Germany that are
                  committed to the 17 global goals and are making a
                  contribution.
                </Trans>
              </Typography>
            </Box>
            <Box marginTop={2}>
              <Button
                color="primary"
                variant="outlined"
                target="_blank"
                href={commitment_url}
                endIcon={<OpenInNew />}
              >
                <Trans>View commitment</Trans>
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box marginY={4}>
        <Card>
          <CardContent>
            <Box marginBottom={2}>
              <Typography component="h2">
                <Bold fontSize="h2.fontSize">
                  <Trans>Focus Areas</Trans>
                </Bold>
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <Trans>
                  {name} contributes to the following Sustainable Development
                  Goals.
                </Trans>
              </Typography>
            </Box>
            {focusSdgs.map(getSdg).map((sdg) => (
              <Box marginTop={{ xs: 3, sm: 1 }} key={sdg.number}>
                <Grid container spacing={1}>
                  <Grid key={sdg.number} lg={1} md={1} sm={2} xs={3} item>
                    <img
                      src={`/static/sdgs/sdg${sdg.number}.jpg`}
                      style={{
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Grid>
                  <Grid item lg={11} md={11} sm={10} xs={12}>
                    <Typography variant="body1">
                      <Bold>
                        <Trans>SDG {sdg.number}:</Trans>{" "}
                        <Trans id={sdg.label.id} />
                      </Bold>
                    </Typography>
                    <Typography variant="body2">
                      <Trans id={sdg.description.id} />
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Box>
      <Box marginY={4}>
        <Card>
          <CardContent>
            <Box marginBottom={1}>
              <Typography component="h2">
                <Bold fontSize="h2.fontSize">
                  <Trans>Infos</Trans>
                </Bold>
              </Typography>
            </Box>
            <InfoTable>
              <TableBody>
                <InfoRow
                  icon={<Earth />}
                  label={t`Website`}
                  value={homepage}
                  href={homepage}
                />
                <InfoRow
                  icon={<MapMarker />}
                  label={t`Address`}
                  value={address}
                  href={getMapsLink(address)}
                />
                {facebook_handle && (
                  <InfoRow
                    icon={<Facebook />}
                    label={t`Facebook`}
                    value={`@${decodeURI(facebook_handle)}`}
                    href={getFacebookLink(facebook_handle)}
                  />
                )}
                {twitter_handle && (
                  <InfoRow
                    icon={<Twitter />}
                    label={t`Twitter`}
                    value={`@${twitter_handle}`}
                    href={getTwitterLink(twitter_handle)}
                  />
                )}
                {linkedin_handle && (
                  <InfoRow
                    icon={<Linkedin />}
                    label={t`LinkedIn`}
                    value={`@${linkedin_handle}`}
                    href={getLinkedinLink(linkedin_handle)}
                  />
                )}
              </TableBody>
            </InfoTable>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
};

export default OrganizationPage;
