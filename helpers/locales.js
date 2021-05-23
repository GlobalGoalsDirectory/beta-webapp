const LOCALES = ["de", "en"];

const ROUTES = [
  {
    template: "/",
    en: "/en",
    de: "/",
  },
  {
    template: "/about",
    en: "/en/about",
    de: "/ueber-uns",
  },
  {
    template: "/mission",
    en: "/en/mission",
    de: "/mission",
  },
  {
    template: "/how-it-works",
    en: "/en/how-it-works",
    de: "/methode",
  },
  {
    template: "/privacy-policy",
    en: "/en/privacy-policy",
    de: "/datenschutz",
  },
  {
    template: "/organizations",
    en: "/en/organizations",
    de: "/organisationen",
  },
  {
    template: "/map",
    en: "/en/map",
    de: "/karte",
  },
  {
    template: "/organizations/[slug]",
    en: "/en/organizations/[slug]",
    de: "/organisationen/[slug]",
  },
];

module.exports = {
  LOCALES,
  ROUTES,
};
