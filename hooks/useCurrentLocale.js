import { useRouter } from "next/router";
import { parseUrl } from "helpers/locales";

const useCurrentLocale = () => {
  const router = useRouter();
  const currentUrl = router.asPath;

  // Default language for error pages
  if (["/404", "/500"].includes(currentUrl)) return "en";

  return parseUrl(currentUrl).locale;
};

export default useCurrentLocale;
