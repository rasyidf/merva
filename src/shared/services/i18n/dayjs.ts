import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/id";

import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("id");

dayjs.tz.setDefault("Asia/Jakarta");

import { type ThirdPartyLocalization } from "@/shared/types";
export const DayjsLocalization: ThirdPartyLocalization = {
  changeLanguage: (language: string): void => {
    dayjs.locale(language);
  },
};
