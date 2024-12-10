import { ActionIcon, Avatar, Button, Flex, Group, Menu } from "@mantine/core";
import { ThemeSwitcher } from "@/shared/components/ui/theme-switcher";

import { SvgIcon } from "@/shared/components/ui/icon";
import { useAuth } from "@/shared/services";

export function MainHeader(
  props: Readonly<{
    navigate: (path: string) => void;
    toggleMobile: () => void;
    toggleDesktop: () => void;
    collapsed?: boolean;
  }>,
) {
  const { username = "Hehe" } = useAuth();
  return (
    <Flex align="center" h="100%" w="100%">
      <Group justify="space-between" p={0} w="100%" px={8} wrap="nowrap">
        <Group align="center" gap={8} m={0} p={0} wrap="nowrap">
          <ActionIcon hiddenFrom="md" variant="transparent" onClick={props.toggleMobile}>
            <SvgIcon name="menu" />
          </ActionIcon>
          {props.collapsed && (
            <ActionIcon visibleFrom="md" variant="transparent" onClick={props.toggleDesktop}>
              <SvgIcon name="caretRight" />
            </ActionIcon>
          )}
        </Group>

        <Group justify="right" m={0} p={0} px={8} gap={8} wrap="nowrap">
          <ThemeSwitcher />
          <Menu shadow="md" width={200} zIndex={300}>
            <Menu.Target>
              <Button
                variant="subtle"
                radius="xl"
                p={8}
                leftSection={
                  <Avatar size="sm" variant="default">
                    {username?.charAt(0).toUpperCase()}
                  </Avatar>
                }
              >
                {username}
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                component="button"
                leftSection={<SvgIcon name="settings" />}
                onClick={() => props.navigate("/app/settings")}
              >
                Pengaturan
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                color="red"
                leftSection={<SvgIcon name="logOut" />}
                onClick={() => props.navigate("/auth/logout")}
              >
                Keluar
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </Flex>
  );
}
