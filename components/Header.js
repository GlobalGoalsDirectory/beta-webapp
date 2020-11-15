import Link from "next/link";
import {
  AppBar,
  Box,
  ButtonBase,
  Toolbar,
  Typography,
} from "@material-ui/core";
import styled from "styled-components";

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

const Header = () => (
  <AppBar
    color="transparent"
    position="relative"
    elevation={1}
    style={{ background: "white" }}
  >
    <Toolbar disableGutters={true}>
      <Link href="/" passHref>
        <Button style={{ padding: 0 }}>
          <img src="/static/logo.png" />
        </Button>
      </Link>
      <Box display="flex" flexGrow={1} />
      <Link href="/organizations" passHref>
        <Button>
          <Typography variant="h4" component="p">
            Directory
          </Typography>
        </Button>
      </Link>
      <Link href="/mission" passHref>
        <Button>
          <Typography variant="h4" component="p">
            Mission
          </Typography>
        </Button>
      </Link>
      <Link href="/about" passHref>
        <Button>
          <Typography variant="h4" component="p">
            About
          </Typography>
        </Button>
      </Link>
    </Toolbar>
  </AppBar>
);

export default Header;
