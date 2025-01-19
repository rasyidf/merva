import { Stack, Card, Switch, Button } from "@mantine/core";



export const NotificationsTab = () => (
  <Stack w="100%" px="lg" >
    <Card>
      <Switch label="Email Notifications" />
      <Switch label="SMS Notifications" />
      <Button>Save Notifications</Button>
    </Card>
  </Stack>
);
