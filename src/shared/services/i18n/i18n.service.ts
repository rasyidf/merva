import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { I18nServiceState, LocalizationResources, SupportedLanguage, ThirdPartyLocalization } from "@/shared/types/i18n";
import { DayjsLocalization } from "./locale.dayjs";
import { ZodLocalization } from "./locale.zod";
import { i18nInstance } from "./i18n";

const thirdPartyLocalizations: Record<string, ThirdPartyLocalization> = {
  dayjs: DayjsLocalization,
  zod: ZodLocalization,
} as const;

export const LocalizationService = {
  changeLanguage: async (language: SupportedLanguage): Promise<void> => {
    await i18nInstance.changeLanguage(language);
  },
  getCurrentLanguage: (): SupportedLanguage => {
    return i18nInstance.language as SupportedLanguage;
  },
  addResources: (lang: SupportedLanguage, namespace: string, resources: LocalizationResources): void => {
    i18nInstance.addResourceBundle(lang, namespace, resources, true, true);
  },
};

export const I18nService = create(
  persist<I18nServiceState>(
    (set) => ({
      handleLanguageChange: async (language: SupportedLanguage): Promise<void> => {
        await LocalizationService.changeLanguage(language);
        await Promise.all(
          Object.values(thirdPartyLocalizations).map((localization) =>
            Promise.resolve(localization.changeLanguage(language))
          )
        );
      },
      getCurrentLanguage: (): SupportedLanguage => LocalizationService.getCurrentLanguage(),
      addResources: LocalizationService.addResources,
    }),
    {
      name: "i18nService",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
