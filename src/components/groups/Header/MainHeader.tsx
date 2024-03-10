import { ActionIcon, Avatar, Button, Flex, Group, Menu, rem } from "@mantine/core";
import { Gear, List, SignOut } from "@phosphor-icons/react";
import { ThemeSwitcher } from "../../elements/ThemeSwitcher";

export function MainHeader(props: {
  isMobile?: boolean;
  navigate: (path: string) => void;
  toggleMobile: () => void;
  toggleDesktop: () => void;
  collapsed?: boolean;
}) {
  return (
    <Flex align="center" h="100%" w="100%">
      <Group justify="space-between" w="100%" p={0} px={8}>
        <ActionIcon variant="transparent" onClick={props.isMobile ? props.toggleMobile : props.toggleDesktop}>
          {props.isMobile ? (
            <List
              style={{
                width: rem(14),
                height: rem(14),
              }}
            />
          ) : (
            <List
              style={{
                width: rem(14),
                height: rem(14),
              }}
            />
          )}
        </ActionIcon>

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
                leftSection={
                  <Gear
                    style={{
                      width: rem(14),
                      height: rem(14),
                    }}
                  />
                }
                onClick={() => props.navigate("/app/settings")}
              >
                Pengaturan
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                color="red"
                leftSection={
                  <SignOut
                    style={{
                      width: rem(14),
                      height: rem(14),
                    }}
                  />
                }
                onClick={() => props.navigate("/app/logout")}
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
