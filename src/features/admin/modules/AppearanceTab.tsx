import { Stack, Card, Switch, Button } from "@mantine/core";



export const AppearanceTab = () => (
  <Stack w="100%" px="lg" >
    <Card>
      <Switch label="Dark Mode" />
      <Switch label="Compact Mode" />
      <Button>Save Appearance</Button>
    </Card>
  </Stack>
);
