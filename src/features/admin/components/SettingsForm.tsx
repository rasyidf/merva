import { Button, Group, Stack } from "@mantine/core";
import { ReactNode } from "react";

interface SettingsFormProps {
  onSubmit: (e: React.FormEvent) => void;
  saving?: boolean;
  children: ReactNode;
}

export const SettingsForm = ({ onSubmit, saving, children }: SettingsFormProps) => {
  return (
    <Stack w="100%" px="lg">
      <form onSubmit={onSubmit}>
        <Stack gap="lg">
          {children}
          <Group justify="flex-end">
            <Button
              type="submit"
              size="md"
              loading={saving}
            >
              Save Settings
            </Button>
          </Group>
        </Stack>
      </form>
    </Stack>
  );
};