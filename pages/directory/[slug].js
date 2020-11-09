import getOrganizations from "helpers/getOrganizations";

const OrganizationPage = ({ organization }) => (
  <p>Hello {organization.name}!</p>
);

export function getStaticPaths() {
  const organizations = getOrganizations();
  const slugs = organizations.map((organization) => organization.slug);

  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const { slug } = params;

  const organizations = getOrganizations();
  const organization = organizations.find((org) => org.slug === slug);

  return {
    props: { organization },
  };
}

export default OrganizationPage;
