// Import statements
import type { NavigationConfig } from "@/shared/types";
import { NavLink } from "@mantine/core";
import classes from "./main-navbar.module.scss";

// Render navigation item
export function renderNavItem({
  navItem,
  activePath,
  navigate,
}: {
  navItem: NavigationConfig;
  activePath: string;
  navigate: (path: string) => void;
}) {
  const flatChildPaths = navItem.children?.map((child) => child.path) ?? [];

  const handleClick = () => {
    if (navItem.children && navItem.children.length > 0) {
      return;
    }
    navigate(navItem.path ?? "#");
  };

  return (
    <NavLink
      className={classes.link}
      variant="light"
      key={`nav-${navItem.id}`}
      onClick={handleClick}
      label={`${navItem.title}`}
      active={activePath.startsWith(navItem?.path ?? "#") || flatChildPaths.includes(activePath)}
      leftSection={navItem.icon}
      defaultOpened={flatChildPaths.includes(activePath)}
    >
      {navItem.children && navItem.children.length > 0
        ? navItem.children.map((child) => {
            return renderNavItem({ navItem: child, activePath, navigate });
          })
        : null}
    </NavLink>
  );
}
