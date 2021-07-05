import { useCallback, useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Box, Button, Menu, MenuItem, MenuList } from "@material-ui/core";
import useCurrentLocale from "hooks/useCurrentLocale";
import { LOCALES, parseUrl, compileLocalizedUrl } from "helpers/locales";

const LOCALE_NAMES = {
  de: "Deutsch",
  en: "English",
};

const LocaleWithFlag = ({ locale }) => (
  <Box component="span" display="flex" alignItems="center">
    <img
      src={`/static/locales/${locale}.svg`}
      style={{ height: "1em", marginRight: 8 }}
    />
    {LOCALE_NAMES[locale]}
  </Box>
);

const LocaleSelect = ({
  ButtonComponent = Button,
  MenuItemComponent = MenuItem,
}) => {
  const router = useRouter();
  const currentLocale = useCurrentLocale();
  const [isOpen, setOpen] = useState(false);
  const buttonRef = useRef(null);

  const handleClose = useCallback(() => setOpen(false), []);

  // Identify current template
  const { template, params } = parseUrl(router.asPath);

  return (
    <>
      <ButtonComponent ref={buttonRef} onClick={() => setOpen(true)}>
        <LocaleWithFlag locale={currentLocale} />
      </ButtonComponent>
      <Menu open={isOpen} anchorEl={buttonRef.current} onClose={handleClose}>
        <MenuList disablePadding>
          {LOCALES.map((locale) => (
            <Link
              key={locale}
              href={compileLocalizedUrl({ template, locale, params })}
              passHref
            >
              <MenuItemComponent
                component="a"
                value={locale}
                onClick={handleClose}
                selected={locale === currentLocale}
              >
                <LocaleWithFlag locale={locale} />
              </MenuItemComponent>
            </Link>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};

export default LocaleSelect;
