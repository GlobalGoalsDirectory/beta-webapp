import Link from "next/link";
import { Box, Grid, Typography } from "@material-ui/core";
import styled from "styled-components";

const FooterBox = styled(Box)`
  background: #000;
  color: white;
`;

const ImageLink = styled.a`
  display: block;
  transition: opacity 0.3s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
`;

const Image = styled.img`
  max-width: 100%;
  display: block;
  margin: auto;
`;

const PartnerLogo = styled(Image)`
  height: 60px;
`;

const Footer = () => (
  <FooterBox padding={2}>
    <Grid
      container
      spacing={2}
      justify="center"
      alignItems="center"
      style={{ textAlign: "center" }}
    >
      <Grid item style={{ padding: 0 }} xs={12} lg="auto">
        <Link href="/" passHref>
          <ImageLink>
            <Image src="/static/logo-white.png" />
          </ImageLink>
        </Link>
      </Grid>
      <Grid item xs lg style={{ padding: 0 }} />
      <Grid item xs={12} lg="auto">
        <Typography variant="body1">An initiative of</Typography>
      </Grid>
      <Grid item xs="auto" lg="auto">
        <ImageLink href="https://www.2030cabinet.com/" target="_blank">
          <PartnerLogo src="/static/2030-cabinet.jpeg" />
        </ImageLink>
      </Grid>
      <Grid item xs="auto" lg="auto">
        <ImageLink href="https://sdgx.org/" target="_blank">
          <PartnerLogo src="/static/sdgx.png" />
        </ImageLink>
      </Grid>
    </Grid>
  </FooterBox>
);

export default Footer;
