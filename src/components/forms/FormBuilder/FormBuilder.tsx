import { SvgIcon } from "@/components/ui/icon";
import { getObjectByString, toTitleCase } from "@/shared/utils";
import { DevTool } from "@hookform/devtools";
import {
  Checkbox,
  CheckboxProps,
  Divider,
  Flex,
  Grid,
  Group,
  MultiSelectProps,
  NumberInputProps,
  PasswordInputProps,
  PinInputProps,
  Radio,
  RadioProps,
  Rating,
  SelectProps,
  Stack,
  Text,
  TextInput,
  TextInputProps,
  Textarea,
  TextareaProps,
  Title,
} from "@mantine/core";
import { DatePickerInput, DatePickerInputProps, DateTimePicker, DateValue } from "@mantine/dates";
import { DropzoneProps } from "@mantine/dropzone";
import React, { Fragment } from "react";
import { Controller, Path } from "react-hook-form";
import {
  FormDropzone,
  FormLabel,
  FormMultiSelect,
  FormNumber,
  FormSelect,
  FormText,
  FormTextEditor,
} from "../../forms";
import { FormPassword } from "../../forms/FormPassword";
import { FormPinInput } from "../../forms/FormPinInput";
import { FormCreatableSelect } from "../FormCreatableSelect";
import { getDetailSchema } from "./getDetailSchema";
import { FormBuilderProps, FormField } from "./types";

/**
 * Builds a form based on the given fields with optional dev tool.
 *
 * @template T - The type of the form data.
 * @param {Object} props - The props object.
 * @param {Array} props.fields - An array of fields to build the form with.
 * @param {boolean} [props.devTool] - Optional dev tool.
 * @param {Object} props.hooks - React hook object.
 * @param {Function} props.hooks.register - Function to register inputs.
 * @param {Function} props.hooks.control - Function to control input state.
 * @param {Object} props.hooks.formState - Form state object.
 * @param {Object} props.hooks.formState.errors - Form errors object.
 * @return {JSX.Element} The form element.
 */
export const FormBuilder = <T extends object>({
  fields,
  devTool,
  hooks,
  bodyProps,
  isDetail,
  labels,
}: FormBuilderProps<T>): JSX.Element => {
  const {
    register,
    control,
    formState: { errors },
  } = hooks;

  const renderField = (field: FormField) => {
    const flaggedField = isDetail ? { ...field, ...getDetailSchema(field.formType) } : field;

    const {
      name,
      label,
      formType,
      options,
      component = null,
      optional,
      inputGroupProps,
      columnSize: _,
      offset: __,
      singleRow: ___,
      group: ____,
      actionButton: _____,
      gridFieldProps: ______,
      ...props
    } = flaggedField;

    const errorCheck = getObjectByString(errors, name);
    const error = errorCheck?.message as string;

    switch (
    typeof hooks.getValues(name as Path<T>) === "undefined" && isDetail && formType !== "custom" ? "empty" : formType
    ) {
      case "text":
        return (
          <FormText
            control={control}
            name={name}
            label={<FormLabel optional={optional}>{label}</FormLabel>}
            labelProps={{ w: "100%" }}
            w="100%"
            error={error}
            {...(props as TextInputProps)}
          />
        );
      case "number":
        return (
          <FormNumber
            control={control}
            inputMode="decimal"
            name={name}
            label={<FormLabel optional={optional}>{label}</FormLabel>}
            labelProps={{ w: "100%" }}
            w="100%"
            error={error}
            {...(props as NumberInputProps)}
          />
        );
      case "password":
        return (
          <FormPassword
            control={control}
            name={name}
            label={<FormLabel optional={optional}>{label}</FormLabel>}
            labelProps={{ w: "100%" }}
            w="100%"
            error={error}
            {...(props as PasswordInputProps)}
          />
        );
      case "checkbox":
        return (
          <Controller
            name={name as Path<T>}
            control={control}
            render={({ field }) => (
              <Checkbox.Group
                {...field}
                label={<FormLabel optional={optional}>{label}</FormLabel>}
                labelProps={{ w: "100%" }}
                error={error}
                onChange={(val) => {
                  field.onChange(val);
                  (props as CheckboxProps).onChange?.(val as any);
                }}
              >
                <Group justify="space-between" {...inputGroupProps}>
                  {options?.map((option) => (
                    <Checkbox
                      {...(props as CheckboxProps)}
                      key={option.value}
                      label={option.label}
                      value={option.value}
                    />
                  ))}
                </Group>
              </Checkbox.Group>
            )}
          />
        );
      case "select":
        return (
          <FormSelect
            control={control}
            name={name}
            w="100%"
            labelProps={{ w: "100%" }}
            label={<FormLabel optional={optional}>{label}</FormLabel>}
            error={error}
            {...(props as SelectProps)}
          />
        );
      case "multiselect":
        return (
          <FormMultiSelect
            control={control}
            name={name}
            w="100%"
            labelProps={{ w: "100%" }}
            label={<FormLabel optional={optional}>{label}</FormLabel>}
            error={error}
            {...(props as MultiSelectProps)}
          />
        );
      case "radio":
        return (
          <Controller
            name={name as Path<T>}
            control={control}
            render={({ field }) => (
              <Radio.Group
                {...field}
                label={<FormLabel optional={optional}>{label}</FormLabel>}
                w="100%"
                error={error}
                labelProps={{ w: "100%" }}
                onChange={(val) => {
                  field.onChange(val);
                  (props as RadioProps).onChange?.(val as any);
                }}
              >
                {(props as any).orientation === "vertical" ? (
                  <Stack gap={16}>
                    {options?.map((option) => (
                      <Radio {...(props as RadioProps)} key={option.value} label={option.label} value={option.value} />
                    ))}
                  </Stack>
                ) : (
                  <Group justify="space-between" {...inputGroupProps}>
                    {options?.map((option) => (
                      <Radio {...(props as RadioProps)} key={option.value} label={option.label} value={option.value} />
                    ))}
                  </Group>
                )}
              </Radio.Group>
            )}
          />
        );
      case "textarea":
        return (
          <Textarea
            label={<FormLabel optional={optional}>{label}</FormLabel>}
            labelProps={{ w: "100%" }}
            w="100%"
            error={error}
            {...(props as TextareaProps)}
            {...register(name as Path<T>)}
          />
        );

      case "date":
        return (
          <Controller
            name={name as Path<T>}
            control={control}
            render={({ field }) => {
              return (
                <DatePickerInput
                  {...field}
                  leftSection={<SvgIcon name="calendar" width={16} height={16} />}
                  {...(props as DatePickerInputProps<"default">)}
                  w="100%"
                  error={error}
                  labelProps={{ w: "100%" }}
                  locale="id-ID"
                  weekdayFormat="ddd"
                  valueFormat="DD/MM/YYYY"
                  label={<FormLabel optional={optional}>{label}</FormLabel>}
                  onChange={(value) => {
                    field.onChange(value as any);
                    (props as DatePickerInputProps).onChange?.(value as DateValue);
                  }}
                />
              );
            }}
          />
        );

      case "datetime":
        return (
          <Controller
            name={name as Path<T>}
            control={control}
            render={({ field }) => {
              return (
                <DateTimePicker
                  {...field}
                  leftSection={<SvgIcon name="calendar" width={16} height={16} />}
                  {...(props as DatePickerInputProps)}
                  w="100%"
                  error={error}
                  labelProps={{ w: "100%" }}
                  locale="id-ID"
                  weekdayFormat="ddd"
                  label={<FormLabel optional={optional}>{label}</FormLabel>}
                  onChange={(value) => {
                    field.onChange(value as any);
                    (props as DatePickerInputProps).onChange?.(value as DateValue);
                  }}
                />
              );
            }}
          />
        );
      case "daterange":
        return (
          <Controller
            name={name as Path<T>}
            control={control}
            render={({ field }) => {
              return (
                <DatePickerInput
                  {...field}
                  leftSection={<SvgIcon name="calendar" width={16} height={16} />}
                  size="sm"
                  {...(props as DatePickerInputProps<"range">)}
                  type="range"
                  w="100%"
                  error={error}
                  labelProps={{ w: "100%" }}
                  locale="id-ID"
                  weekdayFormat="ddd"
                  valueFormat="DD/MM/YYYY"
                  label={<FormLabel optional={optional}>{label}</FormLabel>}
                  onChange={(value) => {
                    field.onChange(value as any);
                    (props as DatePickerInputProps<"range">).onChange?.(value);
                  }}
                />
              );
            }}
          />
        );
      case "pininput":
        return <FormPinInput control={control} {...(props as PinInputProps)} name={name} w="100%" />;
      case "dropzone":
        return (
          <FormDropzone
            label={<FormLabel optional={optional}>{label}</FormLabel>}
            {...(props as DropzoneProps)}
            control={control}
            name={name}
            w="100%"
          />
        );
      case "rating":
        return (
          <Controller
            name={name as Path<T>}
            control={control}
            render={({ field }) => {
              return (
                <Stack gap={0}>
                  <FormLabel optional={optional}>{label}</FormLabel>
                  <Group justify="space-between">
                    <Rating
                      {...field}
                      {...(props as any)}
                      name={name}
                      fractions={1}
                      size="md"
                      error={error}
                      onChange={(value) => {
                        field.onChange(value);
                        (props as any).onChange?.(value);
                      }}
                    />
                    <TextInput
                      tabIndex={-1}
                      variant="unstyled"
                      value={field.value}
                      onChange={field.onChange}
                      size="sm"
                    />
                  </Group>
                </Stack>
              );
            }}
          />
        );
      case "createableSelect":
        return (
          <FormCreatableSelect
            control={control}
            name={name}
            w="100%"
            labelProps={{ w: "100%" }}
            label={<FormLabel optional={optional}>{label}</FormLabel>}
            error={error}
            {...(props as SelectProps)}
          />
        );
      case "hidden":
        return <input type="hidden" {...register(name as Path<T>)} />;
      case "custom":
        return React.cloneElement(component as React.ReactElement<any>, {
          control,
        });
      case "empty":
        return (
          <TextInput
            label={<FormLabel optional={optional}>{label}</FormLabel>}
            labelProps={{ w: "100%" }}
            w="100%"
            {...(props as TextInputProps)}
            value={"-"}
          />
        );
      default:
        return null;
    }
  };

  const groupedFields = fields.reduce(
    (groups, field) => {
      const { group = "" } = field;
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group]?.push(field);
      return groups;
    },
    {} as Record<string, FormField[]>,
  );

  return (
    <>
      {Object.entries(groupedFields).map(([group, fields], index) => (
        <Fragment key={group}>
          <Group mx={"1.5rem"} {...bodyProps}>
            {group && (
              <Stack gap={4}>
                <Title order={6} w="100%" fz="md">
                  {labels?.group?.[group] ?? toTitleCase(group.replace(/-/g, " "))}
                </Title>
                <Text size="xs" c="gray" w="100%">
                  {labels?.groupDescription?.[group]}
                </Text>
              </Stack>
            )}
            <Grid gutter={16} w="100%">
              {fields.map((field: FormField, index) => (
                <Fragment key={`Grid-${group}-${field.name}-${index}`}>
                  <Grid.Col offset={field.offset || 0} span={{ md: field.columnSize || 12, sm: 12 }}>
                    <Flex mih={80} {...field.gridFieldProps}>
                      {renderField(field)}
                      {field.actionButton ? (
                        <Flex mx={16} mt={32} align="center">
                          {field.actionButton}
                        </Flex>
                      ) : null}
                    </Flex>
                  </Grid.Col>
                  {field.singleRow ? (
                    <Grid.Col span={12 - (field.columnSize || 0)}>
                      <span />
                    </Grid.Col>
                  ) : null}
                </Fragment>
              ))}
            </Grid>
          </Group>
          {(Object.entries(groupedFields).length > index + 1 && (
            <Divider w="100%" my={16} color="gray.2" p={0} mx={0} />
          )) ||
            null}
        </Fragment>
      ))}
      {(devTool && <DevTool control={control} />) || null}
    </>
  );
};
