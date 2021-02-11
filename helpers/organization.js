export const getLink = (organization) => `/organizations/${organization.slug}`;

export const getLogo = (organization) => {
  if (!organization.logo) return null;

  return `/static/logos/${organization.logo}`;
};
