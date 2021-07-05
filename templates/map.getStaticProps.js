import getOrganizations from "helpers/getOrganizations";

export function getStaticProps() {
  let organizations = getOrganizations();

  // Keep only organizations with defined latitude and longitude
  organizations = organizations.filter(
    (org) => (org.latitude != null) & (org.longitude != null)
  );

  return {
    props: {
      organizations,
    },
  };
}
