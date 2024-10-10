import dayjs from "dayjs";
import type { ThirdPartyLocalization } from "@/shared/types";

export const DayjsLocalization: ThirdPartyLocalization = {
  changeLanguage: (language: string): void => {
    dayjs.locale(language);
  },
};
