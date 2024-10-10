import {
  Anchor,
  Box,
  Burger,
  Button,
  Center,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { AppLogo } from "@/components/ui/icon/appLogo";
import { useViewNavigate } from "@/shared/utils/routers";
import classes from "./header.module.scss";
import { SvgIcon } from "@/components/ui/icon";

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const theme = useMantineTheme();

  const viewNavigate = useViewNavigate();

  const isAuthenticated = true;

  const authButton = isAuthenticated ? (
    <Button variant="filled" onClick={() => viewNavigate("/app/dashboard")}>
      Dashboard
    </Button>
  ) : (
    <>
      <Button variant="outline" onClick={() => viewNavigate("/app/register")}>
        Daftar Sekarang
      </Button>
      <Button variant="filled" onClick={() => viewNavigate("/app/login")}>
        Login
      </Button>
    </>
  );

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <AppLogo width={30} />

          <Group h="100%" gap={0} visibleFrom="sm">
            <Anchor component="a" href="#home" className={classes.link}>
              Home
            </Anchor>
            <Anchor component="a" href="#" className={classes.link}>
              <Center inline>
                <Box component="span" mr={5}>
                  Layanan Kami
                </Box>
                <SvgIcon name="caretDown" color={theme.colors.grape[6]} />
              </Center>
            </Anchor>
            <Anchor component="a" href="#testimoni" className={classes.link}>
              Testimoni
            </Anchor>
          </Group>

          <Group visibleFrom="sm">{authButton}</Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <Anchor component="a" href="#" className={classes.link}>
            Home
          </Anchor>

          <Anchor component="a" href="#" className={classes.link}>
            Layanan Kami
          </Anchor>

          <Anchor component="a" href="#" className={classes.link}>
            Testimoni
          </Anchor>
          <Anchor component="a" href="#" className={classes.link}>
            Daftar Client
          </Anchor>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            {authButton}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
