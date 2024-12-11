import { AppLogo } from "@/shared/components/ui/icon/appLogo";
import { Box, Card, Center, Stack } from "@mantine/core";
import { Outlet } from "react-router-dom";

export default function SignInLayout() {
  return (
    <Center
      style={{
        height: "100vh",
        width: "100vw",
      }}
      bg="gray.0"
    >
      <Stack>
        <Center>
          <AppLogo />
        </Center>
        <Card withBorder shadow="md" radius="md" p={24} miw={300}>
          <Outlet />
        </Card>

        <Box h="48px" />
      </Stack>
    </Center>
  );
}
