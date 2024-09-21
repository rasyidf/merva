import { Group } from "@mantine/core";
import {
  Badge,
  BadgeGroup,
  Checkbox,
  DatePickerInput,
  DateTimePicker,
  MultiSelect,
  NumberInput,
  PasswordInput,
  Radio,
  Select,
  TextInput,
  TextView,
  Textarea
} from "./components";
import { FormLabel } from "./components/FormLabel";
import { Fields } from "./form-builder.types";

export const fields: Fields = {
  text: {
    editor: ({ optional, type, ...props }) => (
      <TextInput {...props} label={<FormLabel label={props.label} optional={optional} />} />
    ),
    view: ({ value, error, ...props }) => <TextView {...props} />
  },
  phone: {
    editor: ({ optional, type, ...props }) => (
      <TextInput
        {...props}
        label={<FormLabel label={props.label} optional={optional} />}
        inputMode="tel"
        type="number"
        pattern="{62}[0-9]{11,14}"
        onWheel={(e) => {
          e.currentTarget.blur();
          e.preventDefault();
        }}
      />
    ),
    view: ({ value, error, type, ...props }) => <TextView {...props} />
  },
  email: {
    editor: ({ optional, type, ...props }) => (
      <TextInput {...props} label={<FormLabel label={props.label} optional={optional} />} inputMode="email" />
    ),
    view: ({ value, error, ...props }) => <TextView {...props} />
  },
  number: {
    editor: ({ optional, type, ...props }) => (
      <NumberInput {...props} label={<FormLabel label={props.label} optional={optional} />} />
    ),
    view: ({ value, error, ...props }) => <TextView {...props} />
  },
  password: {
    editor: ({ optional, type, ...props }) => (
      <PasswordInput {...props} label={<FormLabel label={props.label} optional={optional} />} />
    )
  },
  date: {
    editor: ({ optional, type, ...props }) => (
      <DatePickerInput {...props} label={<FormLabel label={props.label} optional={optional} />} />
    ),
    view: ({ value, error, type, ...props }) => <TextView {...props} />
  },
  datetime: {
    editor: ({ optional, type, ...props }) => <DateTimePicker {...props} />,
    view: ({ value, error, type, ...props }) => <TextView {...props} />
  },
  multiselect: {
    editor: ({ options, type, ...props }) => <MultiSelect {...props} data={options} />,
    view: ({ type, ...props }) => <BadgeGroup {...props} />
  },
  checkbox: {
    editor: ({ options, type, ...props }) => (
      <Checkbox.Group {...props}>
        <Group mt="xs">
          {options?.map((option: any) =>
            typeof option === "object" ? (
              <Checkbox.Item key={option.value} value={option.value} label={option.label} />
            ) : (
              <Checkbox.Item key={option} value={option} label={option} />
            )
          )}
        </Group>
      </Checkbox.Group>
    )
  },
  radio: {
    editor: ({ options, type, ...props }) => (
      <Radio.Group {...props}>
        <Group mt="xs">
          {options?.map((option: any) =>
            typeof option === "object" ? (
              <Radio.Item key={option.value} value={option.value} label={option.label} />
            ) : (
              <Radio.Item key={option} value={option} label={option} />
            )
          )}
        </Group>
      </Radio.Group>
    ),
    view: ({ optional, type, ...props }) => <Badge {...props} />
  },
  select: {
    editor: ({ options, searchable, allowDeselect, type, ...props }) => (
      <Select {...props} data={options} searchable={searchable} allowDeselect={allowDeselect} />
    )
  },
  textarea: {
    editor: ({ optional, type, ...props }) => (
      <Textarea {...props} label={<FormLabel label={props.label} optional={optional} />} />
    )
  },
};
