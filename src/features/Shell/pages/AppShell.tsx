import { useFeatureFlags } from "@/contexts/FeatureProvider";
import { FeatureMetadata } from "@/types/FeatureMetadata";
import { APP_NAME } from "@/utils/constants";
import { AppShell, Badge, Divider, Header, NavLink, Navbar, Title } from "@mantine/core";
import { Outlet, Link, useLocation } from "react-router-dom";

type Props = {};

export const Dashboard = (props: Props) => {
	const { enabledFeatures } = useFeatureFlags();
	// mantine app shell layout
	return (
		<AppShell
			padding="md"
			styles={(theme) => ({
				main: {
					backgroundColor:
						theme.colorScheme === "dark"
							? theme.colors.dark[8]
							: theme.colors.gray[0],
				},
			})}
			header={
				<Header height={56} p="xs">

				</Header>
			}
			layout="alt"
			navbar={
				MainNavbar(enabledFeatures)
			}
		>
			<Outlet />
		</AppShell>
	);
};

export default Dashboard;

function MainNavbar(enabledFeatures: FeatureMetadata[]) {
	const { pathname } = useLocation();
	return <Navbar width={{ base: 200 }} p={0}>
		<Navbar.Section my="sm" >
			<Title color="blue" order={3} >
				{APP_NAME}
			</Title>
			<Divider mt={12} color="gray.2" />
		</Navbar.Section>
		<Navbar.Section p={10}>
			<NavLink component={Link}
				active={pathname === "/"} to="/" label="Home" />
			{enabledFeatures.filter(x => !x.placement || (x.placement && !["shell", "hidden", "none"].includes(x.placement))).map((feature) => {
				return (
					<NavLink
						// variant="subtle"
						component={Link}
						key={`nav-${feature.id}`}
						to={`${feature.routes?.[0].path ?? ""}`}
						label={`${feature.name}`}
						active={feature.routes?.some(x => x.path === pathname) ?? false}
						rightSection={<Badge
							color={feature.activeVersion === "dev" ? "blue" : "green"}
						>
							{feature.activeVersion}
						</Badge>} />
				);
			})}
		</Navbar.Section>

	</Navbar>;
}

