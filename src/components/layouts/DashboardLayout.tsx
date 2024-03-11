import { ActionIcon, AppShell, Drawer, Paper, ScrollArea } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useCallback, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { CaretUp } from "@phosphor-icons/react";
import { MainHeader } from "../groups/Header/MainHeader";
import { MainNavbar } from "../groups/MainNavbar";

export const DashboardLayout = () => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const viewport = useRef<HTMLDivElement>(null);
  const scrollToTop = useCallback(() => viewport.current?.scrollTo({ top: 0, behavior: "smooth" }), [viewport]);
  const navigate = useNavigate();

  return (
    <AppShell
      padding={{ base: 0 }}
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      layout="alt"
    >
      <Drawer opened={mobileOpened} onClose={toggleMobile} withCloseButton={false} withinPortal p={0} title="">
        <MainNavbar expanded={true} toggle={toggleMobile} />
      </Drawer>
      <AppShell.Header style={{ border: "none" }}>
        <MainHeader isMobile={isMobile} navigate={navigate} toggleMobile={toggleMobile} toggleDesktop={toggleDesktop} />
      </AppShell.Header>
      {!isMobile && (
        <AppShell.Navbar>
          <MainNavbar expanded={desktopOpened} />
        </AppShell.Navbar>
      )}
      <AppShell.Main>
        <Paper radius={0}>
          <ScrollArea
            h="calc(100vh - var(--app-shell-header-offset))"
            p={16}
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
              <CaretUp />
            </ActionIcon>
          </ScrollArea>
        </Paper>
      </AppShell.Main>
    </AppShell>
  );
};

export default DashboardLayout;
