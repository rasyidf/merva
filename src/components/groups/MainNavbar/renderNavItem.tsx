import { NavLink } from "@mantine/core";
import { NavigationConfig } from "@/types/NavigationConfig";
import classes from "./Dashboardlayout.module.scss";



export function renderNavItem({ navItem, activePath, navigate }: { navItem: NavigationConfig; activePath: string; navigate: (path: string) => void; }) {
	return (
		<NavLink
			className={classes.link}
			variant="subtle"

			key={`nav-${navItem.id}`}
			onClick={() => {
				navItem.children && navItem.children.length > 0 ? navigate(navItem.children[0]?.path ?? "#") : navigate(navItem.path ?? "#");
			}}
			label={`${navItem.title}`}
			active={navItem.path === activePath ?? false}
			leftSection={navItem.icon}
		>
			{navItem.children && navItem.children.length > 0
				? navItem.children.map((child) => {
					return renderNavItem({ navItem: child, activePath, navigate });
				})
				: null}
		</NavLink>
	);
}
