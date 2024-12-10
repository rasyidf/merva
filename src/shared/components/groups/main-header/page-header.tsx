import { Flex, Stack, Text, Title } from "@mantine/core";

export function PageHeader({ title, subtitle, children, ...rest }: PageHeaderProps) {
  return (
    <Flex
      justify="space-between"
      bg="var(--mantine-color-background)"
      p="sm"
      pos="sticky"
      style={{
        zIndex: "var(--mantine-z-index-modal)",
        top: -1,
        left: 0,
        right: 0,
        // glass effect
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
      {...rest}
    >
      <Stack gap={0}>
        <Title order={3}>{title}</Title>
        {subtitle && (
          <Text size="sm" c="gray">
            {subtitle}
          </Text>
        )}
      </Stack>
      {children}
    </Flex>
  );
}
type PageHeaderProps = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<"div">;
