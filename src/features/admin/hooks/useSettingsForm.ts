import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { notifications } from "@mantine/notifications";

interface UseSettingsFormProps<T> {
  onSave?: (values: T) => Promise<void> | void;
  successMessage?: string;
}

export function useSettingsForm<T>({ 
  onSave, 
  successMessage = 'Settings updated successfully' 
}: UseSettingsFormProps<T> = {}) {
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (values: T) => {
    setSaving(true);
    try {
      if (onSave) {
        await onSave(values);
      }
      notifications.show({
        title: 'Success',
        message: successMessage,
        color: 'green',
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error instanceof Error ? error.message : 'Failed to save settings',
        color: 'red',
      });
    } finally {
      setSaving(false);
    }
  };

  return {
    saving,
    handleSubmit,
  };
}