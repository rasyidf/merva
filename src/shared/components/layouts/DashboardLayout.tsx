import { ActionIcon, AppShell, Drawer, Flex, Paper, ScrollArea } from "@mantine/core";
import { useDisclosure, useWindowScroll } from "@mantine/hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { MainHeader } from "../groups/main-header/main-header";
import { MainNavbar } from "../groups/main-navbar";
import { SvgIcon } from "../ui/icon";
import classes from "./DashboardLayout.module.css";
import cx from "clsx";

export const DashboardLayout = () => {
  const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] = useDisclosure();
  const [expanded, setExpanded] = useState<boolean>(() => {
    const savedState = localStorage.getItem("navbar-expanded");
    return savedState ? JSON.parse(savedState) : false;
  });

  const viewport = useRef<HTMLDivElement>(null);
  const [scroll] = useWindowScroll();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navigate = useNavigate();

  const scrollToTop = useCallback(() => {
    viewport.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleToggle = () => {
    setExpanded((prev: boolean) => {
      const newState = !prev;
      localStorage.setItem("navbar-expanded", JSON.stringify(newState));
      return newState;
    });
  };

  useEffect(() => {
    const savedState = localStorage.getItem("navbar-expanded");
    if (savedState !== null) {
      setExpanded(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    setShowScrollTop(scroll.y > 100);
  }, [scroll.y]);

  return (
    <AppShell
      padding={0}
      header={{ height: 56 }}
      navbar={{
        width: { base: 0, md: expanded ? 280 : 64 },
        breakpoint: "md",
        collapsed: { mobile: !mobileOpened }
      }}
      layout="alt"
    >
      <Drawer
        opened={mobileOpened}
        hiddenFrom="md"
        onClose={closeMobile}
        withCloseButton={false}
        withinPortal
        radius="md"
        padding={0}
      >
        <Flex h="calc(100dvh - 32px)" direction="column" p={6} justify="space-between" align="stretch">
          <MainNavbar expanded={true} toggle={closeMobile} collapseOnClick />
        </Flex>
      </Drawer>

      <AppShell.Header withBorder={false} className={classes.header}>
        <MainHeader
          navigate={navigate}
          collapsed={!expanded}
          toggleMobile={toggleMobile}
          toggleDesktop={handleToggle}
        />
      </AppShell.Header>

      <AppShell.Navbar withBorder={false} visibleFrom="md" className={classes.navbar}>
        <MainNavbar expanded={expanded} toggle={handleToggle} />
      </AppShell.Navbar>

      <AppShell.Main>
        <Paper radius={0}>
          <ScrollArea
            h="calc(100vh - var(--app-shell-header-offset))"
            scrollbarSize={8}
            scrollHideDelay={500}
            type="hover"
            offsetScrollbars
            viewportRef={viewport}
            className={classes.scrollArea}
          >
            <Outlet />
          </ScrollArea>
        </Paper>
      </AppShell.Main>

      <ActionIcon
        variant="filled"
        radius="xl"
        size="md"
        className={cx(classes.scrollToTop, showScrollTop && classes.visible)}
        onClick={scrollToTop}
      >
        <SvgIcon name="caretUp" />
      </ActionIcon>
    </AppShell>
  );
};
