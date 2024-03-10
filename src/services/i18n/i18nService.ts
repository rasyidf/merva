import { PreferenceService } from "../preference/PreferenceService";
import { DayjsLocalization } from "./DayjsLocalization";
import { ZodLocalization } from "./ZodLocalization";
import { LocalizationService } from "./localization";

const thirdPartyLocalizations = {
  dayjs: DayjsLocalization,
  zod: ZodLocalization,
};

export const I18nService = {
  handleLanguageChange: async (language: string): Promise<void> => {
    await LocalizationService.changeLanguage(language);
    PreferenceService.setPreference("language", language);

    if (thirdPartyLocalizations) {
      Object.values(thirdPartyLocalizations).forEach((localization) => {
        localization.changeLanguage(language);
      });
    }
  },
};
