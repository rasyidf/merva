import { SvgIcon } from "@/shared/components/ui/icon";
import { AppLogo } from "@/shared/components/ui/icon/appLogo";
import { useNavigationItems } from "@/shared/services/features/utils";
import { APP_NAME_SHORT, APP_VERSION } from "@/shared/utils/constants";
import { ActionIcon, AppShell, Box, Flex, FloatingIndicator, ScrollArea, Stack, Text, Title, Tooltip } from "@mantine/core";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import classes from "./main-navbar.module.css";
import { NavItems } from "./utils";
import clsx from "clsx";
import { NavigationConfig } from "@/shared/types";

interface MainNavbarProps {
  expanded: boolean;
  toggle?: () => void;
  collapseOnClick?: boolean;
}

export function MainNavbar({ expanded, toggle, collapseOnClick }: Readonly<MainNavbarProps>) {
  const { navItems } = useNavigationItems();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const [controlRefs, setControlRefs] = useState<Record<string, HTMLElement | null>>({});
  const [activeItemPath, setActiveItemPath] = useState(pathname);

  // Separate navigation items by placement
  const topNavItems = navItems.filter(item => !item.placement || item.placement === 'top');
  const bottomNavItems = navItems.filter(item => item.placement === 'bottom');

  useEffect(() => {
    setActiveItemPath(pathname);
  }, [pathname]);

  return (
    <Flex h="100%" direction="column">
      <AppShell.Section>
        <Flex h={48} px="md" justify="space-between" align="center">
          <Flex align="center" gap="xs">
            <Link to="/app/dashboard">
              <AppLogo width={expanded ? 36 : 32} />
            </Link>
            {expanded && (
              <Title order={5} tt="uppercase" fw="bold" size="xs" className={classes.appName}>
                {APP_NAME_SHORT}
              </Title>
            )}
          </Flex>
          {expanded && (
            <Tooltip label="Close" position="right" openDelay={500}>
              <ActionIcon variant="subtle" hiddenFrom="md" onClick={toggle} size="sm">
                <SvgIcon name="x" size={16} />
              </ActionIcon>
            </Tooltip>
          )}
        </Flex>
      </AppShell.Section>

      <AppShell.Section grow component={ScrollArea} className={classes.scrollArea}>
        <Stack gap={4} px="xs" className={classes.navRoot} ref={rootRef}>
          {rootRef.current && controlRefs[activeItemPath] && (
            <FloatingIndicator
              target={controlRefs[activeItemPath]}
              parent={rootRef.current} 
              className={classes.navIndicator}
            />
          )}
          <NavItems
            navItems={topNavItems}
            pathname={pathname}
            navigate={navigate}
            expanded={expanded}
            collapseOnClick={collapseOnClick}
            toggle={toggle}
            controlRefs={controlRefs}
            setControlRefs={setControlRefs}
          />
        </Stack>
      </AppShell.Section>

      {/* Bottom Navigation Section */}
      {bottomNavItems.length > 0 && (
        <AppShell.Section py="xs">
          <Stack gap={4} px="xs">
            <NavItems
              navItems={bottomNavItems}
              pathname={pathname}
              navigate={navigate}
              expanded={expanded}
              collapseOnClick={collapseOnClick}
              toggle={toggle}
              controlRefs={controlRefs}
              setControlRefs={setControlRefs}
            />
          </Stack>
        </AppShell.Section>
      )}

      <AppShell.Section py="xs">
        <Box px="xs">
          <Text
            size="xs"
            c="dimmed"
            style={{
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            v{APP_VERSION}
          </Text>
        </Box>
      </AppShell.Section>
    </Flex>
  );
}
