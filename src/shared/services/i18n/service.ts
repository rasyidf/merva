import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { DayjsLocalization } from "./dayjs";
import { LocalizationService } from "./i18n";
import { ZodLocalization } from "./zod";

const thirdPartyLocalizations = {
  dayjs: DayjsLocalization,
  zod: ZodLocalization,
};

type i18nServiceState = {
  handleLanguageChange: (language: string) => Promise<void>;
  getCurrentLanguage: () => string;
};

export const I18nService = create(
  persist<i18nServiceState>(
    (set) => ({
      handleLanguageChange: async (language: string): Promise<void> => {
        await LocalizationService.changeLanguage(language);
        if (thirdPartyLocalizations) {
          for (const localization of Object.values(thirdPartyLocalizations)) {
            localization.changeLanguage(language);
          }
        }
      },
      getCurrentLanguage: (): string => {
        return LocalizationService.getCurrentLanguage();
      },
    }),
    {
      name: "i18nService",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
