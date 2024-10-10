import { SvgIcon } from "@/components/ui/icon";
import { AppLogo } from "@/components/ui/icon/appLogo";
import { useNavigationItems } from "@/shared/services/features/utils";
import { APP_NAME, APP_NAME_SHORT, APP_VERSION } from "@/shared/utils/constants";
import { ActionIcon, AppShell, Box, Flex, NavLink, ScrollArea, Stack, Text, Title, Tooltip } from "@mantine/core";
import { Link, NavLink as nLink, useLocation, useNavigate } from "react-router-dom";
import classes from "./main-navbar.module.scss";
import { renderNavItem } from "./utils";

export function MainNavbar({
  toggle,
  collapseOnClick,
}: Readonly<{
  expanded: boolean;
  toggle?: () => void;
  collapseOnClick?: boolean;
}>) {
  const { navItems } = useNavigationItems();

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const navitems = navItems.map((feature) => {
    return renderNavItem({
      navItem: feature,
      activePath: pathname,
      navigate: (path: string) => {
        navigate(path);
        collapseOnClick && toggle && toggle();
      },
    });
  });

  return (
    <>
      <AppShell.Section>
        <Flex h={56} p={6} justify="space-between" align="center">
          <Link to="/app/dashboard">
            <AppLogo width={64} />
          </Link>
          <Title order={4} tt="uppercase" flex={1}>
            {APP_NAME_SHORT}
          </Title>
          <Tooltip label="Close" position="right">
            <ActionIcon variant="transparent" hiddenFrom="md" onClick={toggle}>
              <SvgIcon name="x" />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Menus" position="right">
            <ActionIcon variant="transparent" visibleFrom="md" onClick={toggle}>
              <SvgIcon name="menu" />
            </ActionIcon>
          </Tooltip>
        </Flex>
      </AppShell.Section>
      <AppShell.Section grow my="md" mx="sm" component={ScrollArea}>
        <Stack gap="2">
          <NavLink
            className={classes.link}
            leftSection={<SvgIcon name="gauge" />}
            component={nLink}
            variant="light"
            active={pathname === "/app/dashboard"}
            to="/app/dashboard"
            onClick={toggle}
            label="Dashboard"
            hiddenFrom="md"
          />

          <NavLink
            className={classes.link}
            leftSection={<SvgIcon name="gauge" />}
            component={nLink}
            variant="light"
            active={pathname === "/app/dashboard"}
            to="/app/dashboard"
            label="Dashboard"
            visibleFrom="md"
          />

          {navitems}
        </Stack>
      </AppShell.Section>
      <AppShell.Section>
        <Box p={6}>
          <Text
            size="sm"
            tt="uppercase"
            opacity={0.5}
            style={{
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            {APP_NAME} v {APP_VERSION}
          </Text>
        </Box>
      </AppShell.Section>
    </>
  );
}
