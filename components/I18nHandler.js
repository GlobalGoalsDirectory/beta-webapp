import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { messages as germanTranslations } from "@lingui/loader!../locales/de/messages.po";
import { messages as englishTranslations } from "@lingui/loader!../locales/en/messages.po";
import { en, de } from "make-plural/plurals";
import useCurrentLocale from "hooks/useCurrentLocale";
import { parseUrl } from "helpers/locales";

// Pre-load German and English translations
i18n.loadLocaleData({
  de: { plurals: de },
  en: { plurals: en },
});

i18n.load("de", germanTranslations);
i18n.load("en", englishTranslations);

const I18nHandler = ({ children }) => {
  const currentLocale = useCurrentLocale();

  i18n.activate(currentLocale);

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};

export default I18nHandler;
