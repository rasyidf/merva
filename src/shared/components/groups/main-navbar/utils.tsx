import type { NavigationConfig } from "@/shared/types";
import { Menu, NavLink, Stack, Text } from "@mantine/core";
import { IconName, SvgIcon } from "../../ui/icon";
import clsx from "clsx";
import classes from "./main-navbar.module.css";
import { FC, useCallback, useMemo, useState } from "react";

interface NavItemsProps {
  navItems: NavigationConfig[];
  pathname: string;
  navigate: (path: string) => void;
  expanded: boolean;
  collapseOnClick?: boolean;
  toggle?: () => void;
  controlRefs: Record<string, HTMLElement | null>;
  setControlRefs: (refs: Record<string, HTMLElement | null>) => void;
  level?: number;
}

type GroupConfig = {
  items: NavigationConfig[];
  config: {
    groupLabel?: string;
    groupIcon?: string | React.ReactNode;
    groupOrder?: number;
  };
};

type GroupedItems = [string, GroupConfig][];

export const NavItems: FC<NavItemsProps> = ({
  navItems,
  pathname,
  navigate,
  expanded: navBarExpanded,
  collapseOnClick,
  toggle,
  controlRefs,
  setControlRefs,
  level = 0,
}) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  // Memoize grouped items to prevent unnecessary recalculations
  const groupedItems = useMemo<GroupedItems>(() => {
    // For top level only, handle feature groups
    if (level === 0) {
      const groups: Record<string, GroupConfig> = {};
      
      navItems.forEach(item => {
        if (item.visible === false || item.disabled) return;
        
        const groupKey = item.group || 'default';
        if (!groups[groupKey]) {
          groups[groupKey] = {
            items: [],
            config: {
              groupLabel: item.groupLabel,
              groupIcon: item.groupIcon,
              groupOrder: item.groupOrder
            }
          };
        }
        groups[groupKey].items.push(item);
      });

      return Object.entries(groups).sort(([,a], [,b]) => 
        (a.config.groupOrder || 0) - (b.config.groupOrder || 0)
      );
    }

    // For nested levels, don't process groups
    return [['default', { items: navItems, config: {} }]];
  }, [navItems, level]);

  // Memoize the ref handler
  const handleRef = useCallback((path: string) => (node: HTMLElement | null) => {
    if (node) {
      const newRefs = { ...controlRefs };
      if (newRefs[path] !== node) {
        newRefs[path] = node;
        setControlRefs(newRefs);
      }
    }
  }, [controlRefs, setControlRefs]);

  return (
    <>
      {groupedItems.map(([groupKey, { items, config }]) => {
        if (items.length === 0) return null;

        const groupContent = items.map((item: NavigationConfig) => {
          const childPaths = item.children?.map((child: NavigationConfig) => child.path) ?? [];
          const isItemExpanded = expandedItems[item.id] ?? false;
          const isActive = pathname === item.path || 
                          pathname.startsWith(item?.path ?? "#") || 
                          childPaths.some((path: string | undefined) => pathname.startsWith(path ?? "#"));
          const hasChildren = (item.children?.length ?? 0) > 0;

          const handleClick = useCallback(() => {
            if (hasChildren) {
              setExpandedItems(prev => ({ ...prev, [item.id]: !prev[item.id] }));
            } else if (item.path) {
              navigate(item.path);
              if (collapseOnClick) toggle?.();
            }
          }, [item.id, item.path, hasChildren]);

          const icon = useMemo(() => (
            typeof item.icon === "string" ? (
              <SvgIcon 
                name={item.icon as IconName} 
                className={classes.linkIcon} 
                stroke="1.5"
              />
            ) : (
              item.icon || <SvgIcon name="route" className={classes.linkIcon} stroke="1.5" />
            )
          ), [item.icon]);

          const navLink = (
            <NavLink
              key={`nav-${item.id}`}
              active={isActive}
              opened={isItemExpanded}
              ref={item.path ? handleRef(item.path) : undefined}
              data-path={item.path}
              defaultOpened={childPaths.includes(pathname)}
              disabled={item.disabled}
              onClick={handleClick}
              label={navBarExpanded || level > 0 ? item.title : undefined}
              leftSection={icon}
              rightSection={
                hasChildren && (navBarExpanded || level > 0) && (
                  <SvgIcon
                    name="chevronDown"
                    className={clsx(classes.linkCollapse, isItemExpanded && classes.linkCollapseRotated)}
                    stroke="1.5"
                  />
                )
              }
              classNames={{
                root: clsx(classes.link, navBarExpanded && classes.expanded),
                section: navBarExpanded ? classes.linkSection : classes.linkSectionCollapsed,
                body: navBarExpanded ? classes.linkBody : classes.linkBodyCollapsed,
                label: classes.linkLabel,
                description: classes.linkDescription,
                children: classes.linkChildren
              }}
            >
              {(navBarExpanded || level > 0) && hasChildren && item.children && (
                <NavItems
                  navItems={item.children}
                  pathname={pathname}
                  navigate={navigate}
                  expanded={navBarExpanded}
                  collapseOnClick={collapseOnClick}
                  toggle={toggle}
                  controlRefs={controlRefs}
                  setControlRefs={setControlRefs}
                  level={level + 1}
                />
              )}
            </NavLink>
          );

          // Only use Menu for items with children when navbar is collapsed
          return (!navBarExpanded && level === 0 && hasChildren) ? (
            <Menu
              key={`nav-menu-${item.id}`}
              position="right"
              withArrow
              opened={isItemExpanded}
              onChange={(opened) => setExpandedItems(prev => ({ ...prev, [item.id]: opened }))}
              trigger="hover"
              width={200}
            >
              <Menu.Target>
                {navLink}
              </Menu.Target>

              <Menu.Dropdown>
                {item.children?.map((child: NavigationConfig) => (
                  <Menu.Item
                    key={child.id}
                    leftSection={
                      typeof child.icon === "string" ? (
                        <SvgIcon 
                          name={child.icon as IconName} 
                          className={classes.linkIcon} 
                          stroke="1.5"
                        />
                      ) : (
                        child.icon || <SvgIcon name="route" className={classes.linkIcon} stroke="1.5" />
                      )
                    }
                    onClick={() => {
                      if (child.path) {
                        navigate(child.path);
                        if (collapseOnClick) toggle?.();
                      }
                    }}
                  >
                    {child.title}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          ) : navLink;
        });

        // Only show group labels at the top level
        return (
          <Stack key={`group-${groupKey}`} gap={2}>
            {level === 0 && groupKey !== 'default' && config.groupLabel && navBarExpanded && (
              <Text className={classes.groupLabel}>
                {config.groupIcon && typeof config.groupIcon === 'string' && (
                  <SvgIcon 
                    name={config.groupIcon as IconName} 
                    className={classes.groupIcon} 
                  />
                )}
                {config.groupLabel}
              </Text>
            )}
            {groupContent}
          </Stack>
        );
      })}
    </>
  );
};

// Export for backward compatibility
export const renderNavItems = NavItems;
