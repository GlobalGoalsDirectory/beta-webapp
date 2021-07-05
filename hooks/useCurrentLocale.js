import { useRouter } from "next/router";
import { parseUrl } from "helpers/locales";

const useCurrentLocale = () => {
  const router = useRouter();
  const currentUrl = router.asPath;
  return parseUrl(currentUrl).locale;
};

export default useCurrentLocale;
