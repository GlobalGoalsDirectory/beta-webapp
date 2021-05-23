import getOrganizations from "helpers/getOrganizations";

export function getStaticProps() {
  const organizations = getOrganizations();

  return {
    props: {
      organizationsCount: organizations.length,
    },
  };
}
