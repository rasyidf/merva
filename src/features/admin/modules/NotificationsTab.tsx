import { Button, Card, Grid, Group, Stack, Text, Switch } from "@mantine/core";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { notifications } from "@mantine/notifications";

interface NotificationsFormValues {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  newFeatures: boolean;
  securityAlerts: boolean;
  marketingEmails: boolean;
  weeklyDigest: boolean;
  teamUpdates: boolean;
  systemAlerts: boolean;
}

export const NotificationsTab = () => {
  const [saving, setSaving] = useState(false);
  
  const form = useForm<NotificationsFormValues>({
    defaultValues: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      newFeatures: true,
      securityAlerts: true,
      marketingEmails: false,
      weeklyDigest: true,
      teamUpdates: true,
      systemAlerts: true,
    },
  });

  const handleSubmit = (values: NotificationsFormValues) => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setSaving(false);
      notifications.show({
        title: 'Success',
        message: 'Notification settings updated successfully',
        color: 'green',
      });
    }, 1000);
  };

  return (
    <Stack w="100%" px="lg">
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Stack gap="lg">
          <Card withBorder>
            <Text fw={500} size="lg" mb="md">Communication Channels</Text>
            <Stack>
              <Switch 
                label="Email Notifications" 
                description="Receive notifications via email"
                {...form.register('emailNotifications')}
              />
              <Switch 
                label="SMS Notifications" 
                description="Receive important alerts via SMS"
                {...form.register('smsNotifications')}
              />
              <Switch 
                label="Push Notifications" 
                description="Receive notifications on your browser or mobile device"
                {...form.register('pushNotifications')}
              />
            </Stack>
          </Card>

          <Card withBorder>
            <Text fw={500} size="lg" mb="md">Notification Types</Text>
            <Grid>
              <Grid.Col span={12}>
                <Switch 
                  label="Security Alerts" 
                  description="Get notified about important security events"
                  {...form.register('securityAlerts')}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Switch 
                  label="New Features & Updates" 
                  description="Be the first to know about new features and platform updates"
                  {...form.register('newFeatures')}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Switch 
                  label="Marketing Emails" 
                  description="Receive promotional offers and marketing communications"
                  {...form.register('marketingEmails')}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Switch 
                  label="Weekly Digest" 
                  description="Get a summary of activity from the past week"
                  {...form.register('weeklyDigest')}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Switch 
                  label="Team Updates" 
                  description="Notifications about team members' activities"
                  {...form.register('teamUpdates')}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Switch 
                  label="System Alerts" 
                  description="Receive notifications about system status and maintenance"
                  {...form.register('systemAlerts')}
                />
              </Grid.Col>
            </Grid>
          </Card>

          <Group justify="flex-end">
            <Button
              type="submit"
              size="md"
              loading={saving}
            >
              Save Notification Preferences
            </Button>
          </Group>
        </Stack>
      </form>
    </Stack>
  );
};
