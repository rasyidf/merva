import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/id";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone); 

dayjs.locale("id");

dayjs.tz.setDefault("Asia/Jakarta");
