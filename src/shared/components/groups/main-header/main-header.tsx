import { ActionIcon, Avatar, Button, Flex, Group, Menu, Text } from "@mantine/core";
import { ThemeSwitcher } from "@/shared/components/ui/theme-switcher";
import { SvgIcon } from "@/shared/components/ui/icon";
import { useAuth } from "@/shared/services";
import { SpotlightBox } from "./spotlight";
import classes from "./main-header.module.css";
import LanguageSwitcher from "../../ui/language-switcher/language-switcher";

export function MainHeader({
  navigate,
  toggleMobile,
  toggleDesktop,
  collapsed,
}: Readonly<{
  navigate: (path: string) => void;
  toggleMobile: () => void;
  toggleDesktop: () => void;
  collapsed?: boolean;
}>) {
  const { username, logout } = useAuth();

  const handleLogout = async () => {
    await logout?.();
    navigate("/auth/login");
  };

  return (
    <Flex align="center" h="100%" w="100%">
      <Group justify="space-between" p={0} w="100%" px="xs" wrap="nowrap">
        <Group align="center" gap="sm" m={0} p={0} wrap="nowrap">
          <ActionIcon
            hiddenFrom="md"
            variant="subtle"
            onClick={toggleMobile}
            title="Toggle mobile menu"
          >
            <SvgIcon name="menu" />
          </ActionIcon>


          <ActionIcon
            visibleFrom="md"
            variant="subtle"
            onClick={toggleDesktop}
            title="Expand sidebar"
          >
            <SvgIcon name="menu" />
          </ActionIcon>

          <SpotlightBox />
        </Group>

        <Group justify="flex-end" gap="sm" wrap="nowrap">
          <LanguageSwitcher />
          <ThemeSwitcher />

          <Menu
            shadow="md"
            width={200}
            position="bottom-end"
            withArrow
          >
            <Menu.Target>
              <Button
                variant="subtle"
                radius="xl"
                className={classes.userButton}
                leftSection={
                  <Avatar size="sm" radius="xl" variant="filled">
                    {username?.charAt(0).toUpperCase()}
                  </Avatar>
                }
              >
                <Text size="sm" visibleFrom="sm">{username}</Text>
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={<SvgIcon name="user" size={16} />}
                onClick={() => navigate("/app/profile")}
              >
                Profile
              </Menu.Item>

              <Menu.Item
                leftSection={<SvgIcon name="settings" size={16} />}
                onClick={() => navigate("/app/settings")}
              >
                Settings
              </Menu.Item>

              <Menu.Divider />

              <Menu.Item
                color="red"
                leftSection={<SvgIcon name="logOut" size={16} />}
                onClick={handleLogout}
              >
                Log out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </Flex>
  );
}
