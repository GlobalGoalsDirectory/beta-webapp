import { Trans, t } from "@lingui/macro";
import { Box, Grid, Typography } from "@material-ui/core";
import Layout from "components/Layout";
import Section from "components/Section";
import WideFeatureCard from "components/WideFeatureCard";

const HowItWorksPage = () => (
  <Layout>
    <Typography variant="h1">
      <Trans>How It Works</Trans>
    </Typography>
    <Box fontSize="h3.fontSize" color="text.secondary" component="p" margin={0}>
      <Trans>
        Our AI-based methodology for identifying and analyzing organizations
      </Trans>
    </Box>
    <Section>
      <Typography variant="body1">
        <Trans>
          We have developed a novel approach for the automatic identification
          and classification of startups and organization working on the SDGs,
          based on artificial intelligence, natural language processing, and
          text analysis. Our AI-based approach yields two key advantages over
          manual analysis and classification of organizations: First, artificial
          intelligence requires a fraction of the time that a human needs to
          both find and assess organizations (about 2 minutes per organization),
          while simultaneously ensuring a greater degree of consistency and
          comparability. Second, our program can continuously run in the
          background, automatically re-analyzing organizations at least every 90
          days to ensure that results are always up to date. While our specific
          approach and its application are novel, our methodology builds upon
          similar methods for classifying content by SDG that have been tried
          and proven by the{" "}
          <a
            href="https://www.sciencedirect.com/science/article/abs/pii/S0959652619329221"
            target="_blank"
          >
            TU Berlin and MIT
          </a>{" "}
          and the{" "}
          <a
            href="https://publications.jrc.ec.europa.eu/repository/handle/JRC122301"
            target="_blank"
          >
            European Commission's Joint Research Center
          </a>
          .
        </Trans>
      </Typography>
    </Section>
    <Section>
      <Typography variant="h2" gutterBottom>
        <Trans>Our Approach: Artificial Intelligence</Trans>
      </Typography>
      <Typography variant="body1">
        <Trans>
          Our AI-based approach has been refined over hundreds of hours of
          research and coding. It can be broadly classified into four phases:
          First, an autonomous web scraper crawls the Internet and identifies
          relevant organizations and websites. The content of each website is
          then matched against a list of keywords based on the 17 Sustainable
          Development Goals and their 169 targets to identify which SDGs an
          organization contributes to. Next, a bot queries several public APIs
          to enrich each profile with key metadata, including address, name, and
          logo. Finally, a team of SDG experts reviews the results produced by
          the AI, verifies their accuracy, and makes any changes necessary.
        </Trans>
      </Typography>
      <Box marginY={2}>
        <WideFeatureCard
          image="/static/how-it-works/connected-world.svg"
          title={t`1. Organization Discovery`}
        >
          <Trans>
            Our autonomous web scraper crawls the Internet and identifies
            relevant organizations and websites. Our scraper downloads a copy of
            every selected website, which is later used for content analysis in
            phase 2. We follow a recursive network approach, similar to what is
            used by search engines like Google: When we find an organization
            that contributes to the UN SDGs, we follow all external, outgoing
            links from the organization's website and scrape those external
            websites as well. This approach allows us to rapidly find and
            identify the large majority of actors across the SDG community.
          </Trans>
        </WideFeatureCard>
      </Box>
      <Box marginY={2}>
        <WideFeatureCard
          image="/static/how-it-works/file-analysis.svg"
          title={t`2. Content Analysis`}
        >
          <Trans>
            We scan each scraped website for certain keywords to classify
            startups and organizations by the Sustainable Development Goals that
            they are contributing to. We developed these keywords, over 100 in
            total, based on the official language of the 17 SDGs and the 169
            targets and compiled them in both English and German versions. We
            then count the number of matches found and the frequencies with
            which these keywords appear on the website to assess whether an
            organization contributes to a specific goal. We also determine which
            goals are an organization's primary focus and which ones are side
            objectives.
          </Trans>
        </WideFeatureCard>
      </Box>
      <Box marginY={2}>
        <WideFeatureCard
          image="/static/how-it-works/buffer.svg"
          title={t`3. Metadata Collection`}
        >
          <Trans>
            After identifying that a startup or organization does indeed
            contribute to the Sustainable Development Goals, we enrich each
            profile with relevant metadata that allows users to make the most
            from the Global Goals Directory. Our fully automatic metadata bot
            queries several public APIs, including social networks, like
            Twitter, Facebook, and LinkedIn, but also service providers, like
            Google Maps, to identify and collect name, logo, address, a short
            summary, and social media profiles for each of the organizations in
            the directory. We take privacy seriously and only collect
            information that is publicly available.
          </Trans>
        </WideFeatureCard>
      </Box>
      <Box marginY={2}>
        <WideFeatureCard
          image="/static/how-it-works/reviewed-docs.svg"
          title={t`4. Human Review`}
        >
          <Trans>
            A team of SDG experts carefully reviews all profiles before they
            appear on the Global Goals Directory. Even though our algorithm has
            been fine-tuned over hundreds of hours of careful research and
            correctly assesses nine out of ten startups and organizations, there
            still remain edge cases and exceptions. In addition to verifying the
            accuracy of the information, the SDG experts are also able to
            manually correct any information on the organizations' profiles. The
            feedback and information provided by the review team feeds back into
            the algorithm, so that the AI becomes more intelligent over time.
          </Trans>
        </WideFeatureCard>
      </Box>
    </Section>
    {/* <Section>
      <Typography variant="h2" gutterBottom>
        Iterative by Design
      </Typography>
      <Typography variant="body1">
        - our work is not done, our approach is not finished
        <br />- many frontiers left untouched
        <br />- current approach is our best attempt yet
        <br />- to iterate again and again to make sure that not only we
        discover all organizations working on the SDGs and classify them
        correctly, but also that we provide all the information necessary that
        is needed for building partnerships.
      </Typography>
    </Section> */}
    <Section>
      <Typography variant="h2" gutterBottom>
        <Trans>We &#10084;&#65039; Open Source</Trans>
      </Typography>
      <Typography variant="body1">
        <Trans>
          The Global Goals Directory is completely free. Our directory is a
          non-commercial project and we consider it a public good. Our objective
          is to inspire more partnerships for tackling the Agenda 2030. It's as
          simple as that.
          <br />
          <br />
          The content on this website is licensed under the Creative Commons
          license{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
          >
            CC BY 4.0
          </a>{" "}
          — a permissive license, that provides a lot of freedom under the sole
          condition that appropriate credit is given and a link back to the
          Global Goals Directory website is provided. Our software code for the
          analysis as well as for this website are open source and licensed
          under the{" "}
          <a
            href="https://choosealicense.com/licenses/gpl-3.0/"
            target="_blank"
          >
            GNU General Public License 3.0
          </a>
          , meaning that reuse and adaptation of our code is permitted (and
          encouraged!) as long as any copies and derivatives are made available
          under the same GNU GPLv3 open source license. You can find our GitHub
          repositories at{" "}
          <a href="https://github.com/GlobalGoalsDirectory" target="_blank">
            https://github.com/GlobalGoalsDirectory
          </a>
          . Contributions welcome!
        </Trans>
      </Typography>
    </Section>
  </Layout>
);

export default HowItWorksPage;
