import { Flex, Group, Stack, Text, Title } from "@mantine/core";
import clsx from "clsx";
import { useRef } from "react";
import classes from "./page-header.module.css";

export interface PageHeaderProps extends React.ComponentPropsWithoutRef<"div"> {
  title: string;
  subtitle?: string;
  extras?: React.ReactNode;
  backLink?: string;
  fixed?: boolean;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  extras,
  fixed = true,
  children,
  className,
  ...rest
}: PageHeaderProps) {


  return (
    <>
      <Flex
        justify="space-between"
        bg="var(--mantine-color-body)"
        p="md"
        className={clsx(
          classes.header,
          className
        )}
        {...rest}
      >
        <Stack gap={4}>
          <Group gap="xs" align="center">
            <Title order={3} className={classes.title}>{title}</Title>
            {extras}
          </Group>
          {subtitle && (
            <Text size="sm" c="dimmed" className={classes.subtitle}>
              {subtitle}
            </Text>
          )}
        </Stack>
        {children && <Group gap="sm">{children}</Group>}
      </Flex>
    </>
  );
}
