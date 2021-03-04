import { Box, Card, CardContent, Grid, Typography } from "@material-ui/core";
import Bold from "components/Bold";

const WideFeatureCard = ({ number, title, children, image }) => (
  <Card>
    <Box padding={2} color="white" bgcolor="#202029">
      <Typography variant="body1">
        <Bold fontSize="h3.fontSize">{title}</Bold>
      </Typography>
    </Box>
    <CardContent>
      <Grid container>
        <Box order={{ xs: 3, sm: 3, md: 1 }} clone>
          <Grid item lg={9} md={8} xs={12}>
            <Typography variant="body1">{children}</Typography>
          </Grid>
        </Box>
        <Box
          order={{ xs: 2, sm: 2, md: 3 }}
          justifyContent="center"
          display="flex"
          clone
        >
          <Grid item lg={3} md={4} sm={4} xs={6}>
            <img src={image} style={{ maxHeight: 100 }} />
          </Grid>
        </Box>
      </Grid>
    </CardContent>
  </Card>
);

export default WideFeatureCard;
