import { SvgIcon } from "@/shared/components/ui/icon";
import { AppLogo } from "@/shared/components/ui/icon/appLogo";
import { useNavigationItems } from "@/shared/services/features/utils";
import { APP_NAME, APP_NAME_SHORT, APP_VERSION } from "@/shared/utils/constants";
import { ActionIcon, AppShell, Box, Card, Flex, NavLink, ScrollArea, Stack, Text, Title, Tooltip, Button, Popover } from "@mantine/core";
import { Link, NavLink as nLink, useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import classes from "./main-navbar.module.css";
import { renderNavItems } from "./utils";
import clsx from "clsx";

export function MainNavbar({
  expanded,
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

  const navitems = renderNavItems({ navItems, pathname, navigate, expanded, collapseOnClick, toggle });

  return (
    <>
      <AppShell.Section>
        <Flex h={56} p={6} justify="space-between" align="center">
          <Link to="/app/dashboard">
            <AppLogo width={64} />
          </Link>
          {expanded && (
            <>
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
            </>
          )}
        </Flex>
      </AppShell.Section>
      <AppShell.Section grow my="md" mx="sm" component={ScrollArea}> 
          {navitems} 
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
      <Button
        className={clsx(classes.toggleButton, expanded && classes.expanded)}
        onClick={toggle}
        variant="white"
      >
        <SvgIcon name="caretRight" />
      </Button>
    </>
  );
}
