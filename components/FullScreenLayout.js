import { Box, Container } from "@material-ui/core";
import Header from "components/Header";
import Footer from "components/Footer";

const FullScreenLayout = ({ children }) => (
  <Box
    display="flex"
    height="100vh"
    maxHeight="100vh"
    flexDirection="column"
    overflow="hidden"
  >
    <Header />
    <Box
      display="flex"
      flexDirection="column"
      flexGrow={1}
      maxHeight="100%"
      overflow="hidden"
    >
      {children}
    </Box>
    <Footer />
  </Box>
);

export default FullScreenLayout;
