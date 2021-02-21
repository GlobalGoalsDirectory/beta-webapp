import { Box, Container } from "@material-ui/core";
import Header from "components/Header";
import Footer from "components/Footer";

const FullScreenLayout = ({ children }) => (
  <Box display="flex" height="100vh" flexDirection="column">
    <Header />
    <Box display="flex" flexDirection="column" flexGrow={1}>
      {children}
    </Box>
    <Footer />
  </Box>
);

export default FullScreenLayout;
