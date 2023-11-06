import { useFeatureFlags } from "@/contexts/FeatureProvider";
import { AppShell, Box, NavLink, ScrollArea, Space } from "@mantine/core";
import { Link, NavLink as nLink, useLocation, useNavigate } from "react-router-dom";
import { Gauge } from "@phosphor-icons/react";
import classes from "./Dashboardlayout.module.scss";
import AppLogo from "../../elements/AppLogo";
import { getNavigationItems } from "./getNavigationItems";
import { renderNavItem } from "./renderNavItem";


export function MainNavbar({ expanded, toggle }: { expanded: boolean; toggle?: () => void; }) {
	const { enabledFeatures } = useFeatureFlags();
	const { navItems } = getNavigationItems(enabledFeatures);

	const { pathname } = useLocation();
	const navigate = useNavigate();
	const navitems = navItems.map((feature) => {
		return renderNavItem({ navItem: feature, activePath: pathname, navigate });
	});

	return (
		<>
			<AppShell.Section>
				<Box h={80} p={16} pl={46}>
					<Link to="/app/dashboard">
						<AppLogo fit="contain" w={83} />
					</Link>
				</Box>
			</AppShell.Section>
			<AppShell.Section grow my="md" component={ScrollArea}>
				<NavLink
					className={classes.link}
					leftSection={<Gauge />}
					component={nLink}
					variant="subtle"
					active={pathname === "/app/dashboard"}
					to="/app/dashboard"
					label="Dashboard" />
				{navitems}
			</AppShell.Section>
			<AppShell.Section>
				<Space h={16} />
			</AppShell.Section>
		</>
	);
}
