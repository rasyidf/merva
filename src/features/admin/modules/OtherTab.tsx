import { Select, Switch } from "@mantine/core";
import { useForm } from "react-hook-form";
import { SettingsCard, SettingsForm, SettingsFormGrid, FormField } from "../components";
import { useSettingsForm } from "../hooks";

interface GeneralSettingsFormValues {
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: string;
  emailFrequency: string;
  autoSave: boolean;
  betaFeatures: boolean;
}

export const OtherTab = () => {
  const form = useForm<GeneralSettingsFormValues>({
    defaultValues: {
      language: 'en',
      timezone: 'UTC',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
      emailFrequency: 'daily',
      autoSave: true,
      betaFeatures: false,
    },
  });

  const { saving, handleSubmit } = useSettingsForm<GeneralSettingsFormValues>({
    onSave: async (values) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(values);
    },
    successMessage: 'General settings updated successfully'
  });

  return (
    <SettingsForm onSubmit={form.handleSubmit(handleSubmit)} saving={saving}>
      <SettingsCard title="General Settings">
        <SettingsFormGrid>
          <FormField>
            <Select
              label="Language"
              placeholder="Select language"
              data={[
                { value: 'en', label: 'English' },
                { value: 'es', label: 'Spanish' },
                { value: 'fr', label: 'French' },
                { value: 'de', label: 'German' },
              ]}
              // {...form.register('language')}
            />
          </FormField>
          <FormField>
            <Select
              label="Timezone"
              placeholder="Select timezone"
              data={[
                { value: 'UTC', label: 'UTC' },
                { value: 'EST', label: 'Eastern Time' },
                { value: 'CST', label: 'Central Time' },
                { value: 'PST', label: 'Pacific Time' },
              ]}
              // {...form.register('timezone')}
            />
          </FormField>
        </SettingsFormGrid>
      </SettingsCard>

      <SettingsCard title="Display Preferences">
        <SettingsFormGrid>
          <FormField>
            <Select
              label="Date Format"
              placeholder="Select date format"
              data={[
                { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
                { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
                { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
              ]}
              // {...form.register('dateFormat')}
            />
          </FormField>
          <FormField>
            <Select
              label="Time Format"
              placeholder="Select time format"
              data={[
                { value: '12h', label: '12-hour (AM/PM)' },
                { value: '24h', label: '24-hour' },
              ]}
              // {...form.register('timeFormat')}
            />
          </FormField>
          <FormField fullWidth>
            <Select
              label="Email Digest Frequency"
              placeholder="Select frequency"
              data={[
                { value: 'daily', label: 'Daily Summary' },
                { value: 'weekly', label: 'Weekly Digest' },
                { value: 'never', label: 'Never' },
              ]}
              // {...form.register('emailFrequency')}
            />
          </FormField>
        </SettingsFormGrid>
      </SettingsCard>

      <SettingsCard title="Experimental Features">
        <SettingsFormGrid>
          <FormField fullWidth>
            <Switch 
              label="Enable auto-save" 
              description="Automatically save changes as you work"
              {...form.register('autoSave')}
            />
          </FormField>
          <FormField fullWidth>
            <Switch 
              label="Beta features" 
              description="Get access to upcoming features that are still in beta testing"
              {...form.register('betaFeatures')}
            />
          </FormField>
        </SettingsFormGrid>
      </SettingsCard>
    </SettingsForm>
  );
};
