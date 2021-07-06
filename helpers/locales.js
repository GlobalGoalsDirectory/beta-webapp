const pathToRegexp = require("path-to-regexp");

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

// Match a url against a given route
// The route is turned into express format and then matched with the
// path-to-regexp npm package.
const matchRoute = (url, route) =>
  pathToRegexp.match(expressifyRoute(route), { decode: decodeURIComponent })(
    url
  );

// Compile the provided route into a URL with the provided parameters
const compileUrl = (route, params) =>
  pathToRegexp.compile(expressifyRoute(route), { encode: encodeURIComponent })(
    params
  );

// Convert Next.js route into Express route format, e.g., [slug] into :slug
const expressifyRoute = (route) =>
  route.replace(/\/\[([^/]+?)\](\/|$)/, "/:$1$2");

// Attempts to find a match for the url in the array of routes
// Returns route and params if found.
// Returns null if none.
const findRoute = (url, routes) => {
  let matchedRoute = null;
  for (let route of routes) {
    if (matchRoute(url, route)) {
      matchedRoute = route;
      break;
    }
  }

  // No match found
  if (matchedRoute == null) return null;

  // Return match
  return {
    route: matchedRoute,
    params: { ...matchRoute(url, matchedRoute).params },
  };
};

const parseUrl = (url) => {
  const match = findRoute(
    url,
    ROUTES.flatMap((route) => LOCALES.map((locale) => route[locale]))
  );

  if (!match) throw Error(`Could not parse url: ${url}`);

  // Identify the locale of the route and the corresponding template
  const route = ROUTES.find((route) =>
    Object.values(route).includes(match.route)
  );
  const locale = LOCALES.find((locale) => route[locale] === match.route);
  const template = route.template;

  return {
    locale,
    template,
    ...match,
  };
};

const parseTemplateUrl = (url) => {
  const match = findRoute(
    url,
    ROUTES.map((route) => route.template)
  );

  if (!match) throw Error(`Could not parse template url: ${url}`);

  return {
    template: match.route,
    params: match.params,
  };
};

const compileLocalizedUrl = ({ template, locale, params }) => {
  const route = ROUTES.find((route) => route.template === template);

  if (!route) throw Error(`Could not find route for template: ${template}`);

  const localeRoute = route[locale];

  return compileUrl(localeRoute, params);
};

module.exports = {
  LOCALES,
  ROUTES,
  parseUrl,
  parseTemplateUrl,
  compileLocalizedUrl,
};
