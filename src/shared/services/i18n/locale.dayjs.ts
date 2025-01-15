import dayjs from "dayjs";
import type { ThirdPartyLocalization } from "@/shared/types/i18n";
import { SupportedLanguage } from "@/core/configs/locale";

export const DayjsLocalization: ThirdPartyLocalization = {
  changeLanguage: (language: SupportedLanguage): void => {
    dayjs.locale(language);
  },
};
