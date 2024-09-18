import { ActionIcon, Group, Paper, Stack, Text, Tooltip } from "@mantine/core";
import { CaretRight, Info } from "@phosphor-icons/react";
import { ReactNode } from "react";

type Props = {
  title: string;
  value: string;
  icon?: ReactNode;
  color?: string;
  tooltip?: string;
  onClick?: () => void;
};
export const StatsCard = (props: Props) => {
  return (
    <Paper style={{ flexGrow: 1 }} withBorder radius="md" p="md" onClick={props.onClick}>
      <Stack gap="xs">
        <Group justify="space-between">
          <Tooltip label={props.tooltip}>
            <Group justify="left" gap="xs">
              <Text size="sm" c="gray">
                {props.title}
              </Text>
              {props.tooltip && <Info size="xs" />}
            </Group>
          </Tooltip>

          {props.onClick && (
            <ActionIcon size="xs" onClick={props.onClick}>
              <CaretRight />
            </ActionIcon>
          )}
        </Group>
        <Text size="xl" fw="bold">
          {props.value}
        </Text>
      </Stack>
    </Paper>
  );
};
