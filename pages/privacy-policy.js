import { Typography } from "@material-ui/core";
import Layout from "components/Layout";
import Section from "components/Section";

const PrivacyPolicy = () => (
  <Layout>
    <Typography variant="h1" gutterBottom>
      Privacy Policy
    </Typography>
    <Section>
      <Typography variant="h2" gutterBottom>
        What data does Global Goals Directory collect from visitors?
      </Typography>
      <Typography variant="body1">
        Global Goals Directory does not collect any data from the visitors of
        its website.
      </Typography>
    </Section>
    <Section>
      <Typography variant="h2" gutterBottom>
        What data does Global Goals Directory collect for the organizations
        listed in the directory?
      </Typography>
      <Typography variant="body1">
        Global Goals Directory collects public information about organizations
        from their websites, such as keywords, focus SDGs, a short blurb, and
        social media handles for Facebook, Twitter, and LinkedIn. Global Goals
        Directory also collects public information about organizations from
        Twitter and Google Maps, including name, logo, and street address.
      </Typography>
    </Section>
    <Section>
      <Typography variant="h2" gutterBottom>
        What are your data protection rights?
      </Typography>
      <Typography variant="body1" gutterBottom>
        You — whether you are a user or an organization listed in the directory
        — are entitled to the following:
      </Typography>
      <Typography variant="body1" gutterBottom>
        The right to access: You have the right to request copies of your
        personal data. We may charge you a small fee for this service.
      </Typography>
      <Typography variant="body1" gutterBottom>
        The right to rectification: You have the right to request that we
        correct any information you believe is inaccurate. You also have the
        right to request that we complete the information you believe is
        incomplete.
      </Typography>
      <Typography variant="body1" gutterBottom>
        The right to erasure: You have the right to request that we erase your
        personal data, under certain conditions.
      </Typography>
      <Typography variant="body1" gutterBottom>
        The right to restrict processing: You have the right to request that we
        restrict the processing of your personal data, under certain conditions.
      </Typography>
      <Typography variant="body1" gutterBottom>
        The right to object to processing: You have the right to object to our
        processing of your personal data, under certain conditions.
      </Typography>
      <Typography variant="body1" gutterBottom>
        The right to data portability: You have the right to request that we
        transfer the data that we have collected to another organization, or
        directly to you, under certain conditions.
      </Typography>
      <Typography variant="body1" gutterBottom>
        If you make a request, we have one month to respond to you. If you would
        like to exercise any of these rights, please contact us at our email:
        finn.woelm/at/gmail.com
      </Typography>
    </Section>
    <Section>
      <Typography variant="h2" gutterBottom>
        What cookies does Global Goals Directory use?
      </Typography>
      <Typography variant="body1">
        Global Goals Directory does not use any cookies on its website.
      </Typography>
    </Section>
    <Section>
      <Typography variant="h2" gutterBottom>
        Privacy policies of other websites
      </Typography>
      <Typography variant="body1">
        The Global Goals Directory contains links to other websites. Our privacy
        policy applies only to our website, so if you click on a link to another
        website, you should read their privacy policy.
      </Typography>
    </Section>
    <Section>
      <Typography variant="h2" gutterBottom>
        Changes to our privacy policy
      </Typography>
      <Typography variant="body1">
        Global Goals Directory keeps its privacy policy under regular review and
        places any updates on this web page. This privacy policy was last
        updated on 1 March 2021.
      </Typography>
    </Section>
    <Section>
      <Typography variant="h2" gutterBottom>
        How to contact Global Goals Directory
      </Typography>
      <Typography variant="body1" gutterBottom>
        If you have any questions about our privacy policy, the data we hold on
        you, or you would like to exercise one of your data protection rights,
        please do not hesitate to contact us.
      </Typography>
      <Typography variant="body1">
        Email us at finn.woelm/at/gmail.com
      </Typography>
    </Section>
  </Layout>
);

export default PrivacyPolicy;
