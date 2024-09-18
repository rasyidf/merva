import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/id";
import { ThirdPartyLocalization } from "./ThirdPartyLocalization";

export const DayjsLocalization: ThirdPartyLocalization = {
  changeLanguage: (language: string): void => {
    dayjs.locale(language);
  },
};
