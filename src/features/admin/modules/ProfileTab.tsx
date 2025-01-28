


import { Stack, Card, TextInput, Button } from "@mantine/core";


export const ProfileTab = () => (
  <Stack w="100%" px="lg" >
    <Card withBorder>
      <Stack gap="xs">
        <TextInput label="Username" placeholder="Enter your username" />
        <TextInput label="Email" placeholder="Enter your email" />
        <Button>Save Profile</Button>
      </Stack>
    </Card>
  </Stack>
);
