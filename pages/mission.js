import { Box, Grid, Typography } from "@material-ui/core";
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
        With less than a decade to go until 2030, we are still facing many major
        challenges when it comes to the achievement of the UN Sustainable
        Development Goals: from climate change and pollution to extreme poverty
        and widening inequalities. What these challenges have in common is that
        they are global, interconnected, and systemic. Issues like these cannot
        be solved by a single organization, company, or government alone.
        Collaboration and partnerships are critical for advancing the 2030
        Agenda on our world's toughest problems during this Decade of Action.
      </Typography>
      <Box marginTop={2}>
        <Typography variant="body1">
          The Global Goals Directory exists to accelerate our progress on the UN
          Sustainable Development Goals by supporting and facilitating
          collaboration and partnerships between non-profit organizations,
          private companies, think tanks, universities, and governments. We
          pursue this mission in three ways: 1) Championing the UN Sustainable
          Development Goals by highlighting the countless number of
          organizations and companies working on this global agenda, 2)
          facilitating the creation of new partnerships by helping organizations
          find suitable collaborators through our public directory, and 3)
          supporting cities and communities with analyses of their local
          ecosystem of SDG actors and identifying gaps and opportunities.
        </Typography>
      </Box>
    </Section>
    <Section>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Objective
            label="Championing the SDGs"
            image="championing-the-sdgs.svg"
          >
            Around the world, tens of thousands of organizations, companies, and
            governments are working towards the achievement of the UN
            Sustainable Development Goals. Our mission is to give visibility to
            this great SDG community and to champion the 2030 Agenda.
          </Objective>
        </Grid>
        <Grid item xs={12} md={4}>
          <Objective
            label="Facilitating Partnerships"
            image="real-time-collaboration.svg"
          >
            Collaboration is critical for tackling the world's toughest
            problems, like climate change and extreme poverty. We facilitate the
            creation of new partnerships by helping organizations and companies
            identify new collaborators through our public directory.
          </Objective>
        </Grid>
        <Grid item xs={12} md={4}>
          <Objective
            label="Supporting Cities and Communities"
            image="quiet-town.svg"
          >
            Cities and communities play a pivotal role in the implementation of
            the 2030 Agenda. We help cities understand their local ecosystem of
            SDG actors by analyzing and identifying the gaps and challenges that
            exist across each of the 17 SDGs and 169 targets.
          </Objective>
        </Grid>
      </Grid>
    </Section>
  </Layout>
);

export default MissionPage;
