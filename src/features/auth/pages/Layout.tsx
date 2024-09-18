import AppLogo from '@/components/ui/icons/AppLogo';
import { Center, Stack } from '@mantine/core';
import { Outlet } from 'react-router-dom';


function SignInLayout() {
  return (
    <Center
      style={{
        height: '100vh',
        width: '100vw',
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

export default SignInLayout;