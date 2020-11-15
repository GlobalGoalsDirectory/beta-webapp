import { Box, Container } from "@material-ui/core";
import Header from "components/Header";
import Footer from "components/Footer";

const Layout = ({ children }) => (
  <Box display="flex" minHeight="100vh" flexDirection="column">
    <Header />
    <Box flexGrow={1} marginY={3}>
      <Container>{children}</Container>
    </Box>
    <Footer />
  </Box>
);

export default Layout;
