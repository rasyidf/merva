import { useEffect, useState } from "react";
import { Button, Flex, Popover, ScrollArea, rem } from "@mantine/core";
import { TimeInput, type TimeInputProps as BaseTimeInputProps } from "@mantine/dates";

import { type FieldValues, type UseControllerProps, useController } from "react-hook-form";
import { SvgIcon } from "../icon";

export type TimeInputProps<T extends FieldValues> = UseControllerProps<T> & BaseTimeInputProps;
export function TimeInputForm<T extends FieldValues>({ name, control, defaultValue, ...props }: TimeInputProps<T>) {
  const {
    field: { value: fieldValue, onChange: fieldOnChange, ...field },
    fieldState,
  } = useController({
    name,
    control,
    defaultValue,
  });
  const hourItem = new Array(24).fill(0).map((_, i) => (i < 10 ? `0${i}` : String(i)));

  const minuteItem = new Array(60).fill(0).map((_, i) => (i < 10 ? `0${i}` : String(i)));

  const [hour, setHour] = useState<string>("00");
  const [minute, setMinute] = useState<string>("00");

  const displayHourItem = hourItem.map((hr) => String(Number.parseInt(hr, 10)));

  useEffect(() => {
    if (fieldValue) {
      const [newHour, newMinute] = fieldValue.split(":");
      setHour(newHour);
      setMinute(newMinute);
    }
  }, [fieldValue]);

  return (
    <Popover position="bottom-start" shadow="md">
      <Popover.Target>
        <TimeInput
          leftSection={<SvgIcon name="calendar" width={20} color="black" />} // TODO: clock
          value={fieldValue}
          error={fieldState.error?.message}
          onChange={(e) => {
            fieldOnChange(e.target.value);
          }}
          {...field}
          {...props}
        />
      </Popover.Target>
      <Popover.Dropdown>
        <Flex justify="space-between" style={{ height: rem(248), width: rem(312) }} gap={8}>
          <ScrollArea scrollbarSize={0} style={{ height: "100%", width: "50%" }}>
            <Flex direction="column" align="center">
              {hourItem.map((hr, i) => (
                <Button
                  key={hr}
                  onClick={() => {
                    setHour(hr);
                    fieldOnChange(`${hr}:${minute}`);
                  }}
                  variant={hour === hr ? "light" : "default"}
                  style={{ fontWeight: 500, border: 0 }}
                  fullWidth
                >
                  {displayHourItem[i]}
                </Button>
              ))}
            </Flex>
          </ScrollArea>
          <ScrollArea scrollbarSize={0} style={{ height: "100%", width: "50%" }}>
            <Flex direction="column" align="center">
              {minuteItem.map((min) => (
                <Button
                  key={min}
                  onClick={() => {
                    setMinute(min);
                    fieldOnChange(`${hour}:${min}`);
                  }}
                  variant={minute === min ? "light" : "default"}
                  style={{ fontWeight: 500, border: 0 }}
                  fullWidth
                >
                  {min}
                </Button>
              ))}
            </Flex>
          </ScrollArea>
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );
}
