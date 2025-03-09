import { Select, ColorInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { SettingsCard, SettingsForm, SettingsFormGrid, FormField } from "../components";
import { useSettingsForm } from "../hooks";

interface AppearanceFormValues {
  theme: string;
  colorScheme: string;
  accentColor: string;
  density: string;
  fontSize: string;
  darkMode: boolean;
  compactMode: boolean;
  animationsEnabled: boolean;
  highContrastMode: boolean;
}

export const AppearanceTab = () => {
  const form = useForm<AppearanceFormValues>({
    defaultValues: {
      theme: 'system',
      colorScheme: 'blue',
      accentColor: '#1971c2',
      density: 'comfortable',
      fontSize: 'medium',
      darkMode: false,
      compactMode: false,
      animationsEnabled: true,
      highContrastMode: false,
    },
  });

  const { saving, handleSubmit } = useSettingsForm<AppearanceFormValues>({
    onSave: async (values) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(values);
    },
    successMessage: 'Appearance settings updated successfully'
  });

  return (
    <SettingsForm onSubmit={form.handleSubmit(handleSubmit)} saving={saving}>
      <SettingsCard title="Theme Options">
        <SettingsFormGrid>
          <FormField>
            <Select
              label="Theme"
              placeholder="Select theme"
              data={[
                { value: 'system', label: 'System Default' },
                { value: 'light', label: 'Light Theme' },
                { value: 'dark', label: 'Dark Theme' },
              ]}
              {...form.register('theme')}
            />
          </FormField>
          <FormField>
            <Select
              label="Color Scheme"
              placeholder="Select color scheme"
              data={[
                { value: 'blue', label: 'Blue (Default)' },
                { value: 'green', label: 'Green' },
                { value: 'purple', label: 'Purple' },
                { value: 'orange', label: 'Orange' },
              ]}
              {...form.register('colorScheme')}
            />
          </FormField>
          <FormField>
            <ColorInput 
              label="Accent Color" 
              placeholder="Pick a color"
              {...form.register('accentColor')}
            />
          </FormField>
        </SettingsFormGrid>
      </SettingsCard>

      <SettingsCard title="Layout & Density">
        <SettingsFormGrid>
          <FormField>
            <Select
              label="UI Density"
              placeholder="Select density"
              data={[
                { value: 'comfortable', label: 'Comfortable (Default)' },
                { value: 'compact', label: 'Compact' },
                { value: 'spacious', label: 'Spacious' },
              ]}
              {...form.register('density')}
            />
          </FormField>
          <FormField>
            <Select
              label="Font Size"
              placeholder="Select font size"
              data={[
                { value: 'small', label: 'Small' },
                { value: 'medium', label: 'Medium (Default)' },
                { value: 'large', label: 'Large' },
              ]}
              {...form.register('fontSize')}
            />
          </FormField>
        </SettingsFormGrid>
      </SettingsCard>
    </SettingsForm>
  );
};
