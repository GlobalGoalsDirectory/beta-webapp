import { Box, Container, Hidden } from "@material-ui/core";
import NavBar from "components/NavBar";
import Footer from "components/Footer";

const FullScreenLayout = ({ children }) => (
  <Box
    display="flex"
    height="100vh"
    maxHeight="100vh"
    flexDirection="column"
    overflow="hidden"
  >
    <NavBar />
    <Box
      display="flex"
      flexDirection="column"
      flexGrow={1}
      maxHeight="100%"
      overflow="hidden"
    >
      {children}
    </Box>
    <Hidden implementation="css" smDown>
      <Footer />
    </Hidden>
  </Box>
);

export default FullScreenLayout;
