import { useState } from "react";
import { Trans, defineMessage } from "@lingui/macro";
import {
  AppBar,
  Box,
  ButtonBase,
  Container,
  Divider,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Menu } from "mdi-material-ui";
import styled from "styled-components";
import NavBarDrawer from "components/NavBarDrawer";
import LocaleLink from "components/LocaleLink";

const Button = styled(ButtonBase).attrs({
  component: "a",
})`
  && {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-self: stretch;
    padding: 0 16px;
  }
`;

const SdgBar = styled(Box)`
  background: linear-gradient(
    to right,
    rgb(229, 36, 59) 0px,
    rgb(229, 36, 59) 5.88235%,
    rgb(221, 166, 58) 5.88235%,
    rgb(221, 166, 58) 11.7647%,
    rgb(76, 159, 56) 11.7647%,
    rgb(76, 159, 56) 17.6471%,
    rgb(197, 25, 45) 17.6471%,
    rgb(197, 25, 45) 23.5294%,
    rgb(255, 58, 33) 23.5294%,
    rgb(255, 58, 33) 29.4118%,
    rgb(38, 189, 226) 29.4118%,
    rgb(38, 189, 226) 35.2941%,
    rgb(252, 195, 11) 35.2941%,
    rgb(252, 195, 11) 41.1765%,
    rgb(162, 25, 66) 41.1765%,
    rgb(162, 25, 66) 47.0588%,
    rgb(253, 105, 37) 47.0588%,
    rgb(253, 105, 37) 52.9412%,
    rgb(221, 19, 103) 52.9412%,
    rgb(221, 19, 103) 58.8235%,
    rgb(253, 157, 36) 58.8235%,
    rgb(253, 157, 36) 64.7059%,
    rgb(191, 139, 46) 64.7059%,
    rgb(191, 139, 46) 70.5882%,
    rgb(63, 126, 68) 70.5882%,
    rgb(63, 126, 68) 76.4706%,
    rgb(10, 151, 217) 76.4706%,
    rgb(10, 151, 217) 82.3529%,
    rgb(86, 192, 43) 82.3529%,
    rgb(86, 192, 43) 88.2353%,
    rgb(0, 104, 157) 88.2353%,
    rgb(0, 104, 157) 94.1176%,
    rgb(25, 72, 106) 94.1176%,
    rgb(25, 72, 106) 100%
  );
`;

const StyledToolbar = styled(Toolbar)`
  && {
    min-height: 64px;
    height: 64px;
    max-height: 64px;

    ${SdgBar} {
      height: 2px;
    }

    img {
      max-height: 62px;
    }

    ${(props) => props.theme.breakpoints.up("sm")} {
      min-height: 88px;
      height: 88px;
      max-height: 88px;

      ${SdgBar} {
        height: 3px;
      }

      img {
        max-height: 81px;
      }
    }
  }
`;

const DesktopOnlyBox = styled(Box).attrs({
  flexGrow: 1,
})`
  height: 100%;
  display: flex;

  ${(props) => props.theme.breakpoints.down("sm")} {
    display: none;
  }
`;

const pages = [
  {
    label: defineMessage({ message: "Directory" }),
    href: "/organizations",
  },
  {
    label: defineMessage({ message: "Map" }),
    href: "/map",
  },
  {
    label: defineMessage({ message: "Mission" }),
    href: "/mission",
  },
  {
    label: defineMessage({ message: "How it works" }),
    href: "/how-it-works",
  },
  {
    label: defineMessage({ id: "About us", message: "About" }),
    href: "/about",
  },
];

const NavBar = ({ fluid = true }) => {
  let containerProps = { maxWidth: "lg" };

  if (fluid) containerProps = { maxWidth: false };

  const [showNavDrawer, setShowNavDrawer] = useState(false);
  const toggleNavDrawer = () => setShowNavDrawer(!showNavDrawer);

  return (
    <>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={1}
        style={{ background: "white" }}
      >
        <StyledToolbar disableGutters={true}>
          <Box
            display="flex"
            flexDirection="column"
            justifyItems="center"
            width={1}
            height={1}
          >
            <Box flexGrow={1} display="flex">
              <Container
                {...containerProps}
                disableGutters={true}
                style={{
                  alignSelf: "stretch",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Hidden implementation="css" mdUp>
                  <Box display="flex" marginLeft={1}>
                    <IconButton
                      color="inherit"
                      aria-label="menu"
                      onClick={toggleNavDrawer}
                    >
                      <Menu />
                    </IconButton>
                  </Box>
                </Hidden>
                <LocaleLink href="/" passHref>
                  <Button style={{ padding: 0 }}>
                    <img src="/static/logo.png" />
                  </Button>
                </LocaleLink>
                <Hidden implementation="js" mdUp>
                  <NavBarDrawer
                    open={showNavDrawer}
                    onClose={toggleNavDrawer}
                    pages={pages}
                  />
                </Hidden>
                <DesktopOnlyBox>
                  <Box display="flex" flexGrow={1} />
                  {pages.map(({ label, href }) => (
                    <LocaleLink key={href} href={href} passHref>
                      <Button>
                        <Typography variant="h4" component="p">
                          <Trans id={label.id} />
                        </Typography>
                      </Button>
                    </LocaleLink>
                  ))}
                </DesktopOnlyBox>
              </Container>
            </Box>
            <SdgBar />
          </Box>
        </StyledToolbar>
      </AppBar>
      <StyledToolbar />
    </>
  );
};

export default NavBar;
