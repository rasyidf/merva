import { IconName, SvgIcon } from "@/shared/components/ui/icon";
import { ActionIcon, Group, Paper, Stack, Text, Tooltip } from "@mantine/core";
import { ReactNode } from "react";

import classes from "./stats-card.module.css";

export type StatCardProps = {
  title: string;
  subtitle: string;
  value: string;
  footer?: ReactNode;
  tooltip?: string;
  icon?: IconName;
  diff?: number;
  onClick?: () => void;
};

export const StatsCard = (props: StatCardProps) => {
  return (
    <Paper style={{ flexGrow: 1 }} withBorder radius="md" p="md" onClick={props.onClick}>
      <Stack gap={16}>
        <Group justify="space-between">
          <Tooltip label={props.tooltip}>
            <Group justify="left" gap="xs">
              <Text fz={14} c="gray.8">
                {props.title}
              </Text>
              {props.tooltip && <SvgIcon name="info" size="xs" />}
            </Group>
          </Tooltip>


          {props.onClick && (
            <ActionIcon size="xs" onClick={props.onClick}>
              <SvgIcon name="caretRight" size="xs" />
            </ActionIcon>
          )}
          {
            props.icon ? <SvgIcon name={props.icon} size="xs" /> : null
          }
        </Group>
        <Group align="flex-end" gap="xs">
          <Text className={classes.value}>{props.value}</Text>
          {
            props.diff && (
              <Text c={props.diff > 0 ? 'teal' : 'red'} fz="sm" fw={500} className={classes.diff}>
                <span>{props.diff}%</span>
                <SvgIcon name={props.diff > 0 ? 'arrowUpRight' : 'arrowDownRight'} size="xs" />
              </Text>
            )
          }
        </Group>

        <Text fz={12} c="gray">
          {props.subtitle}
        </Text>
        {props.footer}
      </Stack>
    </Paper>
  );
};
