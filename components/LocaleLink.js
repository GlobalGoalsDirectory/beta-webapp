import Link from "next/link";
import useCurrentLocale from "hooks/useCurrentLocale";
import { parseTemplateUrl, compileLocalizedUrl } from "helpers/locales";

const LocaleLink = ({ href, locale, ...componentParams }) => {
  const currentLocale = useCurrentLocale();

  // Get current locale, unless specified
  if (!locale) locale = currentLocale;

  // Localize href to desired (or current) locale
  const { template, params } = parseTemplateUrl(href);
  const localizedHref = compileLocalizedUrl({ template, locale, params });

  // Pass localized href to Link
  return <Link href={localizedHref} {...componentParams} />;
};

export default LocaleLink;
