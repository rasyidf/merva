import { ActionIcon, AppShell, Drawer, Flex, Paper, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { MainHeader } from "../groups/main-header/main-header";
import { MainNavbar } from "../groups/main-navbar";
import { SvgIcon } from "../ui/icon";

import classes from "./DashboardLayout.module.css";

export const DashboardLayout = () => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const viewport = useRef<HTMLDivElement>(null);
  const scrollToTop = useCallback(() => viewport.current?.scrollTo({ top: 0, behavior: "smooth" }), []);
  const navigate = useNavigate();

  return (
    <AppShell
      padding={{ base: 0 }}
      header={{ height: 56 }}
      navbar={{
        width: { base: 0, md: 280 },
        breakpoint: "md",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      layout="alt"
    >
      <Drawer
        opened={mobileOpened}
        hiddenFrom="md"
        onClose={toggleMobile}
        withCloseButton={false}
        withinPortal
        radius='md'
        p={0}
        title=""
      >
        
        <Flex h="calc(100dvh - 32px)" direction="column" p={6} justify="space-between" align="stretch">
          <MainNavbar expanded={true} toggle={toggleMobile} collapseOnClick />
        </Flex>
      </Drawer>
      <AppShell.Header  withBorder={false}  className={classes.header}>
        <MainHeader
          navigate={navigate}
          collapsed={!desktopOpened}
          toggleMobile={toggleMobile}
          toggleDesktop={toggleDesktop}
        />
      </AppShell.Header>

      <AppShell.Navbar withBorder={false} visibleFrom="md" className={classes.navbar}>
        <MainNavbar expanded={desktopOpened} toggle={toggleDesktop} />
      </AppShell.Navbar>

      <AppShell.Main>
        <Paper radius={0}>
          <ScrollArea
            h="calc(100vh - var(--app-shell-header-offset))"
            // p={16}
            scrollbars="y"
            type="hover"
            offsetScrollbars
            viewportRef={viewport}
          >
            <Outlet />
            <ActionIcon
              variant="filled"
              radius="xl"
              size="md"
              style={{ position: "fixed", bottom: 20, right: 20, zIndex: 300 }}
              onClick={scrollToTop}
            >
              <SvgIcon name="caretUp" />
            </ActionIcon>
          </ScrollArea>
        </Paper>
      </AppShell.Main>
    </AppShell>
  );
};
