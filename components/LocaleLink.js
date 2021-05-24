import Link from "next/link";
import { useRouter } from "next/router";
import {
  parseUrl,
  parseTemplateUrl,
  compileLocalizedUrl,
} from "helpers/locales";

const LocaleLink = ({ href, locale, ...componentParams }) => {
  const router = useRouter();

  // Get current locale, unless specified
  if (!locale) {
    const currentUrl = router.pathname;
    locale = parseUrl(currentUrl).locale;
  }

  // Localize href to desired (or current) locale
  const { template, params } = parseTemplateUrl(href);
  const localizedHref = compileLocalizedUrl({ template, locale, params });

  // Pass localized href to Link
  return <Link href={localizedHref} {...componentParams} />;
};

export default LocaleLink;
