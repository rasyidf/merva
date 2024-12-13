import { PageHeader } from "@/shared/components/groups/main-header";
import { Tabs, Stack, Card, TextInput, Switch, Button } from "@mantine/core";
import { useParams, useNavigate } from "react-router-dom";

const ProfileTab = () => (
  <Stack>
    <Card>
      <TextInput label="Username" placeholder="Enter your username" />
      <TextInput label="Email" placeholder="Enter your email" />
      <Button>Save Profile</Button>
    </Card>
  </Stack>
);

const AppearanceTab = () => (
  <Stack>
    <Card>
      <Switch label="Dark Mode" />
      <Switch label="Compact Mode" />
      <Button>Save Appearance</Button>
    </Card>
  </Stack>
);

const NotificationsTab = () => (
  <Stack>
    <Card>
      <Switch label="Email Notifications" />
      <Switch label="SMS Notifications" />
      <Button>Save Notifications</Button>
    </Card>
  </Stack>
);

const OtherTab = () => (
  <Stack>
    <Card>
      <TextInput label="Custom Setting 1" placeholder="Enter value" />
      <TextInput label="Custom Setting 2" placeholder="Enter value" />
      <Button>Save Other Settings</Button>
    </Card>
  </Stack>
);

const AdvancedTab = () => (
  <Stack>
    <Card>
      <TextInput label="API Endpoint" placeholder="Enter API endpoint" />
      <Switch label="Enable Debug Mode" />
      <Button>Save Advanced Settings</Button>
    </Card>
  </Stack>
);

export const Settings = () => {
  const { tab } = useParams();
  const navigate = useNavigate();

  const handleTabChange = (value: string | null) => {
    navigate(`/app/settings/${value}`);
  };

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your settings" />
      <Tabs value={tab || "profile"} onChange={handleTabChange} orientation="vertical">
        <Tabs.List>
          <Tabs.Tab value="profile">Profile</Tabs.Tab>
          <Tabs.Tab value="appearance">Appearance</Tabs.Tab>
          <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
          <Tabs.Tab value="other">Other</Tabs.Tab>
          <Tabs.Tab value="advanced">Advanced</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="profile"><ProfileTab /></Tabs.Panel>
        <Tabs.Panel value="appearance"><AppearanceTab /></Tabs.Panel>
        <Tabs.Panel value="notifications"><NotificationsTab /></Tabs.Panel>
        <Tabs.Panel value="other"><OtherTab /></Tabs.Panel>
        <Tabs.Panel value="advanced"><AdvancedTab /></Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default Settings;
