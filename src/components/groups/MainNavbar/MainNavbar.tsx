import { useFeatureFlags } from "@/contexts/FeatureProvider";
import { ActionIcon, AppShell, Box, Flex, Group, NavLink, ScrollArea, Title, Tooltip, rem } from "@mantine/core";
import { Gauge, List, Sidebar } from "@phosphor-icons/react";
import { Link, NavLink as nLink, useLocation, useNavigate } from "react-router-dom";
import AppLogo from "../../elements/icons/AppLogo";
import classes from "./MainNavbar.module.scss";
import { getNavigationItems } from "./getNavigationItems";
import { renderNavItem } from "./renderNavItem";

export function MainNavbar({ toggle, isMobile, toggleMobile, toggleDesktop }: { expanded: boolean; toggle?: () => void; isMobile?: boolean; toggleMobile?: () => void; toggleDesktop?: () => void; }) {
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
        toggle && toggle();
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
          <Tooltip label="Toggle navigation" position="right">
            <ActionIcon variant="transparent" onClick={isMobile ? toggleMobile : toggleDesktop}>
              {isMobile ? (
                <List
                  style={{
                    width: rem(16),
                    height: rem(16),
                  }}
                />
              ) : (
                <Sidebar />
              )}
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
        />
        {navitems}
      </AppShell.Section>
      <AppShell.Section>
        <Box p={6}>

          <Title order={5} tt="uppercase" opacity={0.5} style={{
            userSelect: 'none',
            pointerEvents: 'none',
          }}>MERVA v 0.1.0
          </Title>

        </Box>
      </AppShell.Section>
    </>
  );
}
