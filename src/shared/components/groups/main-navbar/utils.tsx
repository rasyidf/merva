// Import statements
import type { NavigationConfig } from "@/shared/types";
import { Menu, NavLink, Popover } from "@mantine/core";
import classes from "./main-navbar.module.css";
import { useMemo, useState } from "react";
import { IconName, SvgIcon } from "../../ui/icon";
import clsx from "clsx";

export function renderNavItems({
  navItems,
  pathname,
  navigate,
  expanded: navBarExpanded,
  collapseOnClick,
  toggle,
  level = 0,
}: {
  navItems: NavigationConfig[];
  pathname: string;
  navigate: (path: string) => void;
  expanded: boolean;
  collapseOnClick?: boolean;
  toggle?: () => void;
  level?: number;
}) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  return navItems.map((feature) => {
    const flatChildPaths = feature.children?.map((child) => child.path) ?? [];
    const isItemExpanded = expandedItems[feature.id] ?? false;

    const handleClick = () => {
      navigate(feature.path ?? "#");
      collapseOnClick && toggle && toggle();
      setExpandedItems(prev => ({ ...prev, [feature.id]: !isItemExpanded }));
    };

    const Label = useMemo(() => (navBarExpanded || level > 0) && <span>{feature.title}</span>, [feature.title, navBarExpanded]);

    const icon = typeof feature.icon === "string" ? (
      <SvgIcon name={feature.icon as IconName} className={classes.linkIcon} stroke={'1.5px'} />
    ) : (
      feature.icon || <SvgIcon name="route" className={classes.linkIcon} stroke={'1.5px'} />
    );

    const childrens = renderNavItems({ navItems: feature.children ?? [], pathname, navigate, expanded: navBarExpanded, collapseOnClick, toggle, level: level + 1 });

    return (
      <Menu
        key={`nav-${feature.id}`}
        position="right"
        withArrow
        disabled={navBarExpanded || !feature.children || feature.children.length === 0}
        opened={isItemExpanded || (!navBarExpanded && flatChildPaths.includes(pathname))}>
        <Menu.Target>
          <NavLink
            variant="light"
            onClick={handleClick}
            classNames={{
              root: clsx(classes.link, navBarExpanded && classes.expanded),
              section: navBarExpanded ? classes.linkSection : classes.linkSectionCollapsed,
              body: navBarExpanded ? classes.linkBody : classes.linkBodyCollapsed,
              label: classes.linkLabel,
              collapse: classes.linkCollapse,
              description: classes.linkDescription,
            }}
            label={navBarExpanded ? Label : undefined}
            leftSection={icon}
            active={pathname.startsWith(feature?.path ?? "#") || flatChildPaths.includes(pathname)}
            defaultOpened={flatChildPaths.includes(pathname)}
          >
            {(navBarExpanded && feature.children) ? childrens : null}
          </NavLink>
        </Menu.Target>
        <Menu.Dropdown>

          {feature.children ? childrens : null}
        </Menu.Dropdown>
      </Menu>
    );
  });
}
