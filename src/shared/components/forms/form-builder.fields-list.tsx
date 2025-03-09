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
  Textarea,
} from "./components";
import type { FieldRenderer, SelectOption } from "./form-builder.types";

const ViewWrapper = ({ value, ...props }: any) => {
  return <TextView {...props} />;
};

const BadgeGroupWrapper = ({ value, ...props }: any) => {
  return <BadgeGroup {...props} />;
};

export const fields = {
  text: {
    editor: (props) => <TextInput
      name={props.name} {...props} />,
    view: ViewWrapper,
  } as FieldRenderer,

  phone: {
    editor: (props) => (
      <TextInput
        name={props.name}
        {...props}
        inputMode="tel"
        pattern="{62}[0-9]{11,14}"
      />
    ),
    view: ViewWrapper,
    parse: (value: string) => value?.replace(/\D/g, ''),
    format: (value: string) => {
      if (!value) return '';
      const cleaned = value.replace(/\D/g, '');
      return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)}-${cleaned.slice(5, 8)}-${cleaned.slice(8)}`;
    },
  } as FieldRenderer,

  email: {
    editor: (props) => <TextInput
      name={props.name} {...props} inputMode="email" />,
    view: ViewWrapper,
  } as FieldRenderer,

  number: {
    editor: ({ min, max, ...props }) => (
      <NumberInput
        name={props.name} {...props} min={min} max={max} />
    ),
    view: ViewWrapper,
    parse: (value: string) => (typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value),
    format: (value: number) => value?.toLocaleString(),
  } as FieldRenderer,

  password: {
    editor: (props) => <PasswordInput
      name={props.name} {...props} />,
  } as FieldRenderer,

  date: {
    editor: (props) => <DatePickerInput
      name={props.name} {...props} />,
    view: ViewWrapper,
    parse: (value: string | Date) => (typeof value === 'string' ? new Date(value) : value),
    format: (value: Date) => value instanceof Date ? value.toLocaleDateString() : value,
  } as FieldRenderer,

  datetime: {
    editor: (props) => <DateTimePicker
      name={props.name} {...props} />,
    view: ViewWrapper,
    parse: (value: string | Date) => (typeof value === 'string' ? new Date(value) : value),
    format: (value: Date) => value instanceof Date ? value.toLocaleString() : value,
  } as FieldRenderer,

  multiselect: {
    editor: ({ searchable = true, ...props }) => (
      <MultiSelect
        name={props.name} {...props} searchable={searchable} />
    ),
    view: BadgeGroupWrapper,
  } as FieldRenderer,

  checkbox: {
    editor: (props) => (
      <Checkbox.Group
        name={props.name} {...props}>
        <Group mt="xs">
          {props.options?.map((option: SelectOption) => (
            <Checkbox.Item
              key={option.value}
              value={String(option.value)}
              label={option.label}
              disabled={option.disabled}
            />
          ))}
        </Group>
      </Checkbox.Group>
    ),
    view: ({ value, options, ...props }) => (
      <ViewWrapper
        {...props}
        value={Array.isArray(value)
          ? value.map(v => options?.find((o: SelectOption) => o.value === v)?.label || v).join(', ')
          : value}
      />
    ),
  } as FieldRenderer,

  radio: {
    editor: ({ name, ...props }) => (
      <Radio.Group
        name={props.name} {...props}>
        <Group mt="xs">
          {props.options?.map((option: SelectOption) => (
            <Radio.Item
              key={option.value}
              value={String(option.value)}
              label={option.label}
              disabled={option.disabled}
            />
          ))}
        </Group>
      </Radio.Group>
    ),
    view: ({ value, options, ...props }) => (
      <ViewWrapper
        {...props}
        value={options?.find((o: SelectOption) => o.value === value)?.label || value}
      />
    ),
  } as FieldRenderer,

  select: {
    editor: (props) => (
      <Select name={props.name} {...props} searchable={props.searchable} allowDeselect={props.allowDeselect} />
    ),
    view: ({ value, options, ...props }) => (
      <ViewWrapper
        {...props}
        value={options?.find((o: SelectOption) => o.value === value)?.label || value}
      />
    ),
  } as FieldRenderer,

  textarea: {
    editor: (props) => <Textarea
      name={props.name} {...props} />,
    view: ViewWrapper,
  } as FieldRenderer,

  badge: {
    editor: (props) => <Badge
      name={props.name} {...props} />,
    view: (props) => <Badge
      name={props.name} {...props} />,
  } as FieldRenderer,

  tags: {
    editor: (props) => (
      <MultiSelect
        name={props.name} {...props}
        data={props.value || []}
        searchable
      // getCreateLabel={(query: string) => `+ Create "${query}"`}
      />
    ),
    view: BadgeGroupWrapper,
  } as FieldRenderer,

  custom: {
    editor: ({ render, ...props }) => render(props),
    view: ({ render, ...props }) => render(props),
  } as FieldRenderer,
};
