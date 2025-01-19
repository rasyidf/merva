import { PageHeader } from "@/shared/components/groups/main-header";
import { Box, Flex, Tabs } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { AdvancedTab } from "../modules/AdvancedTab";
import { AppearanceTab } from "../modules/AppearanceTab";
import { NotificationsTab } from "../modules/NotificationsTab";
import { OtherTab } from "../modules/OtherTab";
import { ProfileTab } from "../modules/ProfileTab";

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
