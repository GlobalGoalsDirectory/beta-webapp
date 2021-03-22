import { Avatar, Box, Button, Grid, Typography } from "@material-ui/core";
import styled from "styled-components";
import Layout from "components/Layout";
import Section from "components/Section";
import Bold from "components/Bold";

const LinkWrapper = ({ href, children }) => {
  if (!href) return <>{children}</>;

  return (
    <Button
      href={href}
      target="_blank"
      disableFocusRipple
      style={{ textTransform: "none", padding: 0 }}
    >
      {children}
    </Button>
  );
};

const Person = ({
  image,
  name,
  title,
  href = null,
  children,
  ImageComponent = Avatar,
  imageStyle = null,
}) => (
  <Grid item sm={12} md={4} lg={4}>
    <LinkWrapper href={href}>
      <Box align="center" padding={1}>
        <ImageComponent
          src={`/static/about/${image}`}
          style={
            imageStyle || {
              width: 160,
              height: 160,
            }
          }
        />
        <Box marginTop={1}>
          <Typography variant="h6" component="p">
            <Bold>{name}</Bold>
          </Typography>
          {title && (
            <Typography variant="body1">
              <Bold color="primary.dark">{title}</Bold>
            </Typography>
          )}
          <Box marginTop={1}>
            <Typography variant="body1">{children}</Typography>
          </Box>
        </Box>
      </Box>
    </LinkWrapper>
  </Grid>
);

const Partner = styled(Person).attrs({
  ImageComponent: "img",
  imageStyle: { maxWidth: "100%", maxHeight: 100 },
  title: null,
})``;

const AboutPage = () => (
  <Layout>
    <Typography variant="h1" gutterBottom>
      About
    </Typography>
    <Section>
      <Typography variant="body1">
        <Bold>
          The Global Goals Directory is a public list of startups,
          organizations, and companies working on the 17 UN Sustainable
          Development Goals. The directory is a public good and is completely
          free.
        </Bold>{" "}
        The idea for the Global Goals Directory was born in 2019, out of many
        conversations with thought leaders and innovators from the SDG
        community. Throughout these conversations, we observed one theme
        re-emerging over and over again: The importance of partnerships and
        their critical role for tackling the UN Sustainable Development Goals.
        While many partnerships exist in the SDG community today, a large share
        of them are formed from serendipitous connections — people and
        organizations we meet at a workshop, an event, or a webinar. But in a
        network as big as the SDG community, there are thousands of potential
        partners that we have not yet met. The Global Goals Directory exists to
        put the entire SDG community at your fingertips and to make it easy to
        find new collaborators and build new partnerships, so that we as an
        ecosystem can become more connected, more collaborative, and accelerate
        our progress on the 2030 Agenda.
      </Typography>
    </Section>
    <Section>
      <Typography variant="h2" gutterBottom>
        Team
      </Typography>
      <Grid container spacing={3}>
        <Person
          name="Nadim Choucair"
          image="nadim-choucair.jpeg"
          title="Founder at 2030 Cabinet"
          href="https://www.linkedin.com/in/nadimchoucair/"
        >
          Nadim convenes people &amp; ideas to build partnerships for achieving
          the UN Sustainable Development Goals. His background is in mechanical
          engineering, business, and diplomacy.
        </Person>
        <Person
          name="Christian Walter"
          image="christian-walter.jpeg"
          title="Founding Partner at SDGx"
          href="https://www.linkedin.com/in/chrwalter/"
        >
          Christian's expertise is in digital business model development and
          applications for social impact. He focuses on building organizations
          that are financially sustainable, return a profit to their
          shareholders, and achieve social responsibility.
        </Person>
        <Person
          name="Finn Woelm"
          image="finn-woelm.jpeg"
          title="Data Scientist and Analyst, UN Sustainable Development Solutions Network"
          href="https://www.linkedin.com/in/finnwoelm/"
        >
          Finn is a software developer working at the intersection of technology
          and the UN Sustainable Development Goals. His focus is web
          development, web scraping, and text mining.
        </Person>
      </Grid>
    </Section>
    <Section>
      <Typography variant="h2" gutterBottom>
        Advisors
      </Typography>
      <Grid container spacing={3}>
        <Person
          name="Antonia Schiller"
          image="antonia-schiller.jpeg"
          title="Expert in SDG Mapping"
          href="https://www.linkedin.com/in/antonia-schiller-36578b208/"
        >
          Antonia previously worked with Movement Map, a Canadian initiative
          that mapped 10,000+ non-profits by SDG. Antiona also played a key role
          in adapting their methodology to Germany.
        </Person>
      </Grid>
    </Section>
    <Section>
      <Typography variant="h2" gutterBottom>
        Partners
      </Typography>
      <Grid container spacing={3}>
        <Partner
          name="2030 Cabinet"
          image="2030-cabinet.jpeg"
          href="https://www.2030cabinet.com/"
        >
          2030 Cabinet is an impact oriented ecosystem builder and partnership
          architect to enable sustainable innovation, using the UN's Sustainable
          Development Goals.
        </Partner>
        <Partner name="SDGx" image="sdgx.png" href="https://sdgx.org/">
          SDGx is a private UN Sustainable Development Goals technology funds
          management and advisory group, headquartered in Singapore with offices
          in Sydney, Bangkok, and Berlin.
        </Partner>
        <Partner
          name="Lightwave"
          image="lightwave.png"
          href="https://lightwave.ch/"
        >
          Lightwave promotes regenerative social change by connecting
          organizations & people with an IT platform, content & events.
          Lightwave has mapped more than 1,500 SDG organizations in Switzerland.
        </Partner>
        <Partner
          name="British Columbia Council for International Cooperation (BCCIC)"
          image="bccic.png"
          href="https://www.bccic.ca/"
        >
          The BCCIC is a network engaged in the SDGs, sustainable development,
          and social justice issues. As part of its Movement Map initiative, the
          BCCIC has mapped over 12,000 organizations working on the SDGs in
          Canada and around the globe.
        </Partner>
      </Grid>
    </Section>
  </Layout>
);

export default AboutPage;
