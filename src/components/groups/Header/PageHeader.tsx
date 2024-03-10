import { Flex, Stack, Text, Title } from "@mantine/core";

export function PageHeader(props: PageHeaderProps): JSX.Element {
  const { title, subtitle, children, ...rest } = props;
  return (
    <Flex justify="space-between" {...rest}>
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
