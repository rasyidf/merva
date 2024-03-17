import { useFeatureFlags } from "@/contexts/FeatureProvider";
import { ActionIcon, AppShell, Box, Flex, Group, NavLink, ScrollArea, Text, Title, Tooltip, rem } from "@mantine/core";
import { CaretLeft, Gauge, List, Sidebar, X } from "@phosphor-icons/react";
import { Link, NavLink as nLink, useLocation, useNavigate } from "react-router-dom";
import AppLogo from "../../elements/icons/AppLogo";
import classes from "./MainNavbar.module.scss";
import { getNavigationItems } from "./getNavigationItems";
import { renderNavItem } from "./renderNavItem";
import { APP_VERSION } from "@/utils/constants";

export function MainNavbar({ toggle, collapseOnClick }: { expanded: boolean; toggle?: () => void; collapseOnClick?: boolean; }) {
  const { enabledFeatures } = useFeatureFlags();
  const { navItems } = getNavigationItems(enabledFeatures);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const navitems = navItems.map((feature) => {
    return renderNavItem({
      navItem: feature,
      activePath: pathname,
      navigate: (path: string) => {
        navigate(path);
        (collapseOnClick && toggle) && toggle();
      },
    });
  });

  return (
    <>
      <AppShell.Section>
        <Flex h={56} p={6} justify="space-between" align="center">
          <Link to="/app/dashboard">
            <AppLogo fit="contain" w={64} />
          </Link>
          <Title order={4} tt="uppercase" flex={1}>MERVA</Title>
          <Tooltip label="Close" position="right">
            <ActionIcon variant="transparent" hiddenFrom="md" onClick={toggle}>
              <X
                style={{
                  width: rem(16),
                  height: rem(16),
                }}
              />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Menus" position="right" >
            <ActionIcon variant="transparent" visibleFrom="md" onClick={toggle}>
              <CaretLeft
                style={{
                  width: rem(16),
                  height: rem(16),
                }}
              />
            </ActionIcon>
          </Tooltip>


        </Flex>
      </AppShell.Section>
      <AppShell.Section grow my="md" mx="sm" component={ScrollArea}>
        <NavLink
          className={classes.link}
          leftSection={<Gauge />}
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
          leftSection={<Gauge />}
          component={nLink}
          variant="light"
          active={pathname === "/app/dashboard"}
          to="/app/dashboard"
          label="Dashboard"
          visibleFrom="md"
        />

        {navitems}
      </AppShell.Section>
      <AppShell.Section>
        <Box p={6}>

          <Text size="sm" tt="uppercase" opacity={0.5} style={{
            userSelect: 'none',
            pointerEvents: 'none',
          }}>MERVA v {APP_VERSION}
          </Text>

        </Box>
      </AppShell.Section>
    </>
  );
}
