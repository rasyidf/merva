import type { PropsWithChildren } from "react";
import { I18nextProvider } from "react-i18next";
import { i18n } from ".";

export const LanguageProvider = (props: PropsWithChildren) => {
  return <I18nextProvider i18n={i18n}>{props.children}</I18nextProvider>;
};
