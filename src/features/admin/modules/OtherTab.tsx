import { Stack, Card, TextInput, Button } from "@mantine/core";



export const OtherTab = () => (
  <Stack w="100%" px="lg" >
    <Card>
      <TextInput label="Custom Setting 1" placeholder="Enter value" />
      <TextInput label="Custom Setting 2" placeholder="Enter value" />
      <Button>Save Other Settings</Button>
    </Card>
  </Stack>
);
