import { Card, Text } from "@mantine/core";
import { ReactNode } from "react";

interface SettingsCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export const SettingsCard = ({ title, subtitle, children }: SettingsCardProps) => {
  return (
    <Card withBorder>
      {title && (
        <Text fw={500} size="lg" mb={subtitle ? "xs" : "md"}>
          {title}
        </Text>
      )}
      {subtitle && (
        <Text size="sm" c="dimmed" mb="md">
          {subtitle}
        </Text>
      )}
      {children}
    </Card>
  );
};