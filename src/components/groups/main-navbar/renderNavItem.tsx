import { type NavigationConfig } from "@/shared/types/NavigationConfig";
import { NavLink } from "@mantine/core";
import classes from "./MainNavbar.module.scss";

export function renderNavItem({
  navItem,
  activePath,
  navigate,
}: { navItem: NavigationConfig; activePath: string; navigate: (path: string) => void }) {
  const flatChildPaths = navItem.children?.map((child) => child.path) ?? [];

  return (
    <NavLink
      className={classes.link}
      variant="light"
      key={`nav-${navItem.id}`}
      onClick={() => {
        navItem.children && navItem.children.length > 0
          ? null // navItem.children[0]?.path ??
          : navigate(navItem.path ?? "#");
      }}
      my={2}
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
