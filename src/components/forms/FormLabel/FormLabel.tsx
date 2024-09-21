import { SvgIcon } from "@/components/ui/icon";
import { Group, GroupProps, Text, TextProps } from "@mantine/core";
import { PropsWithChildren, ReactNode } from "react";

export type FormLabelProps = {
  optional?: ReactNode;
  containerProps?: GroupProps;
  optionalProps?: TextProps;
  labelProps?: TextProps;
  hideAsterisk?: boolean;
} & PropsWithChildren;

/**
 * Render a label for form inputs, with optional text if specified.
 *
 * @param props.children - the label text to display as a string
 * @param props.optional - whether or not to display optional text as a string or a boolean
 * @returns a React element representing the label
 */
export function FormLabel({
  children,
  hideAsterisk,
  optional,
  containerProps,
  optionalProps,
  labelProps,
}: FormLabelProps): JSX.Element {
  const optionalText =
    typeof optional === "string" ? (
      <Text c="gray.4" fz="md" {...optionalProps}>
        {optional}
      </Text>
    ) : typeof optional === "boolean" && optional ? (
      <Text c="gray.4" fz="md" {...optionalProps}>
        Opsional
      </Text>
    ) : null;

  const childrens =
    typeof children === "string" ? (
      <Group gap={0} align="end">
        <Text fz="md" fw={500} lh="20px" {...labelProps}>
          {children}
        </Text>
        {optional ? null : children.trim().length > 0 && !hideAsterisk ? (
          <SvgIcon name="dot" color="red" width={20} height={24} />
        ) : null}
      </Group>
    ) : (
      <Group gap={0} align="end">
        {children}
      </Group>
    );

  return (
    <Group justify="space-between" mb="sm" w="100%" {...containerProps}>
      {childrens}
      {optionalText}
    </Group>
  );
}
