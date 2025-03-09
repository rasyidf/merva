import { SvgIcon } from "@/shared/components/ui/icon";
import { AppLogo } from "@/shared/components/ui/icon/appLogo";
import { useNavigationItems } from "@/shared/services/features/utils";
import { APP_NAME_SHORT, APP_VERSION } from "@/shared/utils/constants";
import { ActionIcon, AppShell, Box, Flex, FloatingIndicator, ScrollArea, Stack, Text, Title, Tooltip } from "@mantine/core";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import classes from "./main-navbar.module.css";
import { NavItems } from "./utils";
import clsx from "clsx";

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

  // Memoize navigation items to prevent unnecessary re-renders
  const { topNavItems, bottomNavItems } = useMemo(() => ({
    topNavItems: navItems.filter(item => !item.placement || item.placement === 'top'),
    bottomNavItems: navItems.filter(item => item.placement === 'bottom')
  }), [navItems]);

  // Memoize the control refs setter to prevent unnecessary re-renders
  const handleSetControlRefs = useCallback((refs: Record<string, HTMLElement | null>) => {
    setControlRefs(prev => {
      // Only update if refs have actually changed
      const hasChanges = Object.entries(refs).some(
        ([key, value]) => prev[key] !== value
      );
      return hasChanges ? refs : prev;
    });
  }, []);

  useEffect(() => {
    // Only update active path if it's different from current pathname
    if (activeItemPath !== pathname) {
      setActiveItemPath(pathname);
    }
  }, [pathname, activeItemPath]);

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
            setControlRefs={handleSetControlRefs}
          />
        </Stack>
      </AppShell.Section>

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
              setControlRefs={handleSetControlRefs}
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
