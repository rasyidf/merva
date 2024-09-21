import { SvgIcon } from "@/components/ui/icon";
import { DatePickerInput, DatesRangeValue } from "@mantine/dates";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";
import { FormDatePickerType } from "./FormDatePickerType";

export function FormDateRangePicker(props: FormDatePickerType<"range">) {
  const { control, name, label, onChange, error, ...selectProps } = props;
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[dayjs().subtract(1, "month").toDate(), dayjs().toDate()]}
      render={({ field: { value, ...fields } }) => (
        <DatePickerInput
          {...selectProps}
          {...fields}
          leftSection={<SvgIcon name="calendar" width={16} height={16} />}
          size="sm"
          w="100%"
          error={error}
          labelProps={{ w: "100%" }}
          locale="id-ID"
          type="range"
          weekdayFormat="ddd"
          valueFormat="DD/MM/YYYY"
          label={label}
          value={(value as DatesRangeValue) ?? []}
          onChange={(val) => {
            fields.onChange(val as any);
            onChange?.(val);
          }}
        />
      )}
    />
  );
}
