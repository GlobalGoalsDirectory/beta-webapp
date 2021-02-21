import dynamic from "next/dynamic";
import FullScreenLayout from "components/FullScreenLayout";
import getOrganizations from "helpers/getOrganizations";

const InteractiveMap = dynamic(() => import("components/InteractiveMap"), {
  ssr: false,
});

const Map = ({ organizations }) => (
  <FullScreenLayout>
    <InteractiveMap organizations={organizations} />
  </FullScreenLayout>
);

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

export default Map;
