import { AppLogo } from "@/components/ui/icon/appLogo";
import { Center, Stack } from "@mantine/core";
import { Outlet } from "react-router-dom";

export default function SignInLayout() {
  return (
    <Center
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <Stack>
        <Center>
          <AppLogo />
        </Center>
        <Outlet />
      </Stack>
    </Center>
  );
}
