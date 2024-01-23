import { ActionIcon, AppShell, Avatar, Button, Drawer, Flex, Group, Menu, ScrollArea, rem } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { CaretUp, Gear, List, SignOut } from "@phosphor-icons/react";
import { MainNavbar } from "../groups/MainNavbar";
import { ThemeSwitcher } from "../elements/ThemeSwitcher";

export const DashboardLayout = () => {

	const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
	const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
	const isMobile = useMediaQuery("(max-width: 768px)");
	const viewport = useRef<HTMLDivElement>(null);
	const scrollToTop = () => viewport.current?.scrollTo({ top: 0, behavior: "smooth" });
	const navigate = useNavigate();

	return (
		<AppShell
			padding={{ base: 0 }}
			header={{ height: 60 }}
			navbar={{
				width: 300,
				breakpoint: "sm",
				collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
			}}
			layout="alt"
		>
			<Drawer opened={mobileOpened} onClose={toggleMobile} withCloseButton={false} withinPortal p={0} title="">
				<MainNavbar expanded={true} toggle={toggleMobile} />
			</Drawer>
			<AppShell.Header>
				<Flex align="center" h="100%" w="100%">
					<Group justify="space-between" w="100%" p={0} px={8}>
						<Group justify="space-around" m={0} p={0} px={8}>
							{isMobile ? (
								<ActionIcon variant="light" onClick={toggleMobile}>
									<List weight="bold" size={16} />
								</ActionIcon>
							) : (
								<ActionIcon variant="light" onClick={toggleDesktop}>
									<List weight="bold" size={16} />
								</ActionIcon>
							)}
						</Group>
						<Group justify="right" m={0} p={0} px={8}>
							<ThemeSwitcher />
							<Menu shadow="md" width={200}>
								<Menu.Target>
									<Button variant="subtle" radius="xl" p={8} leftSection={<Avatar size="sm" color="blue" />}>
										Hallo, Guest
									</Button>
								</Menu.Target>

								<Menu.Dropdown>
									<Menu.Item
										component="button"
										leftSection={<Gear style={{ width: rem(14), height: rem(14) }} />}
										onClick={() => navigate("/app/settings")}
									>
										Pengaturan
									</Menu.Item>
									<Menu.Divider />
									<Menu.Item
										color="red"
										leftSection={<SignOut style={{ width: rem(14), height: rem(14) }} />}
										onClick={() => navigate("/app/logout")}
									>
										Keluar
									</Menu.Item>
								</Menu.Dropdown>
							</Menu>
						</Group>
					</Group>
				</Flex>
			</AppShell.Header>
			{!isMobile && (
				<AppShell.Navbar>
					<MainNavbar expanded={desktopOpened} />
				</AppShell.Navbar>
			)}
			<AppShell.Main  >
				<ScrollArea
					h="calc(100vh - var(--app-shell-header-offset))"
					p={16}
					type="hover"
					offsetScrollbars
					viewportRef={viewport}
				>
					<Outlet />
					<ActionIcon
						variant="filled"
						radius="xl"
						size="md"
						style={{ position: "fixed", bottom: 20, right: 20, zIndex: 300 }}
						onClick={scrollToTop}
					>
						<CaretUp />
					</ActionIcon>
				</ScrollArea>
			</AppShell.Main>
		</AppShell>
	);
};

export default DashboardLayout;



