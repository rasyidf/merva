import { TextInput, Switch, Select, Textarea, NumberInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { SvgIcon } from "@/shared/components/ui/icon";
import { SettingsCard, SettingsForm, SettingsFormGrid, FormField, FormFieldWithIcon } from "../components";
import { useSettingsForm } from "../hooks";

interface AdvancedSettingsFormValues {
  apiEndpoint: string;
  apiKey: string;
  webhookUrl: string;
  debugMode: boolean;
  logLevel: string;
  customScripts: string;
  cacheTimeout: number;
  maxConnections: number;
  enableMultithreading: boolean;
  enableCloudSync: boolean;
  experimentalFeatures: boolean;
  dataRetentionDays: number;
}

export const AdvancedTab = () => {
  const form = useForm<AdvancedSettingsFormValues>({
    defaultValues: {
      apiEndpoint: 'https://api.example.com/v2',
      apiKey: '',
      webhookUrl: '',
      debugMode: false,
      logLevel: 'info',
      customScripts: '',
      cacheTimeout: 3600,
      maxConnections: 10,
      enableMultithreading: true,
      enableCloudSync: false,
      experimentalFeatures: false,
      dataRetentionDays: 90,
    },
  });

  const { saving, handleSubmit } = useSettingsForm<AdvancedSettingsFormValues>({
    onSave: async (values) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(values);
    },
    successMessage: 'Advanced settings updated successfully'
  });

  return (
    <SettingsForm onSubmit={form.handleSubmit(handleSubmit)} saving={saving}>
      <SettingsCard
        title="API Configuration"
        subtitle="Configure API endpoints and authentication"
      >
        <SettingsFormGrid>
          <FormField fullWidth>
            <FormFieldWithIcon
              icon="server"
              label="API Endpoint"
              placeholder="Enter API endpoint URL"
              {...form.register('apiEndpoint')}
            />
          </FormField>
          <FormField fullWidth>
            <FormFieldWithIcon
              icon="key"
              label="API Key"
              placeholder="Enter API key"
              type="password"
              {...form.register('apiKey')}
            />
          </FormField>
          <FormField fullWidth>
            <FormFieldWithIcon
              icon="bell"
              label="Webhook URL"
              placeholder="Enter webhook URL for notifications"
              {...form.register('webhookUrl')}
            />
          </FormField>
        </SettingsFormGrid>
      </SettingsCard>

      <SettingsCard
        title="Debug & Logging"
        subtitle="Configure debugging and logging options"
      >
        <SettingsFormGrid>
          <FormField>
            <Switch
              label="Debug Mode"
              description="Enable detailed logging and debugging tools"
              {...form.register('debugMode')}
            />
          </FormField>
          <FormField>
            <Select
              label="Log Level"
              placeholder="Select log level"
              data={[
                { value: 'error', label: 'Error' },
                { value: 'warn', label: 'Warning' },
                { value: 'info', label: 'Info' },
                { value: 'debug', label: 'Debug' },
                { value: 'trace', label: 'Trace' },
              ]}
              // {...form.register('logLevel')}
            />
          </FormField>
        </SettingsFormGrid>
      </SettingsCard>

      <SettingsCard
        title="Performance & Storage"
        subtitle="Configure performance and data retention settings"
      >
        <SettingsFormGrid>
          <FormField>
            <NumberInput
              label="Cache Timeout (seconds)"
              placeholder="Enter cache timeout"
              min={0}
              max={86400}
              // {...form.register('cacheTimeout', { valueAsNumber: true })}
            />
          </FormField>
          <FormField>
            <NumberInput
              label="Max Connections"
              placeholder="Enter maximum connections"
              min={1}
              max={100}
              // {...form.register('maxConnections', { valueAsNumber: true })}
            />
          </FormField>
          <FormField>
            <NumberInput
              label="Data Retention (days)"
              placeholder="Enter data retention period"
              min={1}
              max={3650}
              // {...form.register('dataRetentionDays', { valueAsNumber: true })}
            />
          </FormField>
          <FormField fullWidth>
            <Switch
              label="Enable Multithreading"
              description="Use multiple threads for better performance"
              {...form.register('enableMultithreading')}
            />
          </FormField>
          <FormField fullWidth>
            <Switch
              label="Enable Cloud Sync"
              description="Automatically sync data with cloud storage"
              {...form.register('enableCloudSync')}
            />
          </FormField>
        </SettingsFormGrid>
      </SettingsCard>

      <SettingsCard
        title="Custom Code"
        subtitle="Enter custom scripts and configurations"
      >
        <SettingsFormGrid>
          <FormField fullWidth>
            <Textarea
              label="Custom Scripts"
              placeholder="Enter custom JavaScript/JSON configuration"
              minRows={4}
              {...form.register('customScripts')}
            />
          </FormField>
        </SettingsFormGrid>
      </SettingsCard>

      <SettingsCard
        title="Experimental Features"
        subtitle="Enable or disable experimental features"
      >
        <SettingsFormGrid>
          <FormField fullWidth>
            <Switch
              label="Enable Experimental Features"
              description="Warning: These features are unstable and may cause system issues"
              color="orange"
              {...form.register('experimentalFeatures')}
            />
          </FormField>
        </SettingsFormGrid>
      </SettingsCard>
    </SettingsForm>
  );
};
