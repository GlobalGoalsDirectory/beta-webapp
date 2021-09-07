export const getFacebookLink = (handle) =>
  `https://www.facebook.com/${handle}/`;

export const getTwitterLink = (handle) => `https://twitter.com/${handle}`;

export const getLinkedinLink = (handle) =>
  `https://www.linkedin.com/company/${handle}/`;

export const getMapsLink = (address) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(address)}`;
