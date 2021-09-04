import faunadb from "faunadb";
import fse from "fs-extra";
import slugify from "slugify";
import pick from "lodash.pick";

// Fetch published organizations
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_KEY,
});
let { data: organizations } = await client.query(
  q.Map(
    q.Paginate(q.Match(q.Index("published_organizations"), true), {
      size: 5000,
    }),
    q.Lambda("X", q.Get(q.Select(2, q.Var("X"))))
  )
);

// Keep published data only
organizations = organizations.map(({ data }) => ({
  domain: data.domain,
  ...data.data,
}));

// Keep only organizations based in Germany
organizations = organizations.filter((org) => org.country === "Germany");

// Keep only properties that we use in the app
organizations = organizations.map((organization) => {
  const keys = Object.keys(organization);

  const keysToKeep = keys.filter((key) => {
    if (["domain", "homepage", "logo", "name", "about"].includes(key))
      return true;

    if (["address", "state", "latitude", "longitude"].includes(key))
      return true;

    if (key.endsWith("_handle")) return true;

    if (key.endsWith("_score")) return true;

    return false;
  });

  return pick(organization, keysToKeep);
});

// Add slug (slugify title)
organizations.forEach((organization) => {
  const slug = slugify(organization.name, { lower: true });

  // If slug is already assigned, try slug-2, slug-3, etc...
  let attempt = 1;
  let proposedSlug = slug;
  while (organizations.some((org) => org.slug === proposedSlug)) {
    attempt += 1;
    proposedSlug = `${slug}-${attempt}`;
  }

  organization.slug = proposedSlug;
});

// Assert that slug is unique
organizations.forEach(({ slug }) => {
  const orgsWithSlug = organizations.filter((org) => org.slug === slug);
  if (orgsWithSlug.length != 1)
    throw `Duplicate slug found: ${orgsWithSlug
      .map((org) => org.domain)
      .join(", ")}`;
});

// Convert value to null, if empty string
organizations.forEach((organization) => {
  Object.entries(organization).forEach(([key, value]) => {
    if (value == "") organization[key] = null;
  });
});

// Convert score to numeric
organizations.forEach((organization) => {
  Object.keys(organization)
    .filter((key) => key.endsWith("_score"))
    .map((key) => (organization[key] = parseFloat(organization[key])));
});

// Sort organizations by total score
organizations.sort((a, b) => b.total_score - a.total_score);

// Remove organizations with a score of 0 (no SDG matches)
organizations = organizations.filter(
  (organization) => organization.total_score > 0
);

// Write data to file
const OUTPUT_PATH = new URL("./organizations.json", import.meta.url).pathname;
await fse.writeJson(OUTPUT_PATH, { organizations }, { spaces: 2 });
