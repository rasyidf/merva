import { Stack, Card, TextInput, Switch, Button } from "@mantine/core";


export const AdvancedTab = () => (
  <Stack w="100%" px="lg" >
    <Card>
      <TextInput label="API Endpoint" placeholder="Enter API endpoint" />
      <Switch label="Enable Debug Mode" />
      <Button>Save Advanced Settings</Button>
    </Card>
  </Stack>
);
