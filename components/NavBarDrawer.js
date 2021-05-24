import { Fragment } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import LocaleLink from "components/LocaleLink";
import { addOrganizationUrl } from "helpers/organization";

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
      <LocaleLink href="/" passHref>
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
      </LocaleLink>
      <LocaleLink href="/" passHref>
        <ListItem button component="a" divider>
          <ListItemText primary="Home" />
        </ListItem>
      </LocaleLink>
      {pages.map(({ href, label }) => (
        <Fragment key={href}>
          <LocaleLink href={href} passHref>
            <ListItem button component="a" divider>
              <ListItemText primary={label} />
            </ListItem>
          </LocaleLink>
        </Fragment>
      ))}
      <ListItem
        button
        component="a"
        target="_blank"
        href={addOrganizationUrl()}
        divider
      >
        <ListItemText primary="Add organization or startup" />
      </ListItem>
    </List>
  </Drawer>
);

export default NavBarDrawer;
