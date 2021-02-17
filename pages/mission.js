import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import Layout from "components/Layout";
import Section from "components/Section";
import Objective from "components/Objective";

const MissionPage = () => (
  <Layout>
    <Typography variant="h1" gutterBottom>
      Mission
    </Typography>
    <Box>
      <Box fontSize="h2.fontSize" fontStyle="italic" marginBottom={1}>
        "To implement the Global Goals, we need all hands on deck."
      </Box>
      <Box fontSize="h3.fontSize" fontStyle="italic">
        {/* source: https://twitter.com/UN_Spokesperson/status/690185351437094912 */}
        — Ban Ki-Moon
      </Box>
    </Box>
    <Section>
      <Typography variant="body1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae
        erat at enim ultricies dapibus nec consectetur mi. Etiam tempus mi
        iaculis efficitur consequat. Nulla ac faucibus mi, euismod faucibus
        tortor. Interdum et malesuada fames ac ante ipsum primis in faucibus.
        Etiam sed urna consequat, venenatis libero non, eleifend quam. Nulla
        blandit interdum mi, id interdum sapien euismod a. In hac habitasse
        platea dictumst. Duis in lorem tincidunt, vulputate est ac, bibendum
        odio. Mauris eget commodo arcu. Morbi sodales lectus nibh, quis iaculis
        urna hendrerit sed. Nunc scelerisque lorem arcu, vitae cursus ante
        auctor vitae. Pellentesque rutrum venenatis ipsum et tempus. Curabitur
        fermentum vitae neque ac vehicula. Nulla feugiat dictum dolor non
        scelerisque. Aenean vehicula nisl a tortor venenatis ullamcorper.
      </Typography>
    </Section>
    <Section>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Objective
            label="Championing the SDGs"
            image="championing-the-sdgs.svg"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            vitae erat at enim ultricies dapibus nec consectetur mi. Etiam
            tempus mi iaculis efficitur consequat. Nulla ac faucibus mi, euismod
            faucibus tortor.
          </Objective>
        </Grid>
        <Grid item xs={12} md={4}>
          <Objective
            label="Facilitating Partnerships"
            image="real-time-collaboration.svg"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            vitae erat at enim ultricies dapibus nec consectetur mi. Etiam
            tempus mi iaculis efficitur consequat. Nulla ac faucibus mi, euismod
            faucibus tortor.
          </Objective>
        </Grid>
        <Grid item xs={12} md={4}>
          <Objective
            label="Supporting Cities and Communities"
            image="quiet-town.svg"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            vitae erat at enim ultricies dapibus nec consectetur mi. Etiam
            tempus mi iaculis efficitur consequat. Nulla ac faucibus mi, euismod
            faucibus tortor.
          </Objective>
        </Grid>
      </Grid>
    </Section>
  </Layout>
);

export default MissionPage;
