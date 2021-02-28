import { Fragment } from "react";
import Link from "next/link";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";

const NavBarDrawer = ({
  pages,
  title,
  openDownloadDatabaseDialog,
  ...otherProps
}) => (
  <Drawer
    {...otherProps}
    PaperProps={{ style: { minWidth: "60%", maxWidth: "80%" } }}
  >
    <List disablePadding>
      <Link href="/" passHref>
        <Box background="primary.main" clone>
          <ListItem
            button
            component="a"
            divider
            style={{
              padding: 0,
            }}
          >
            <img src="/static/logo.png" style={{ maxWidth: "100%" }} />
          </ListItem>
        </Box>
      </Link>
      <Link href="/" passHref>
        <ListItem button component="a" divider>
          <ListItemText primary="Home" />
        </ListItem>
      </Link>
      {pages.map(({ href, label }) => (
        <Fragment key={href}>
          <Link href={href} passHref>
            <ListItem button component="a" divider>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        </Fragment>
      ))}
    </List>
  </Drawer>
);

export default NavBarDrawer;
