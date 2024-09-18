import { ThemeSwitcher } from "../theme-switcher";
import {
  ActionIcon,
  Avatar,
  Button,
  Code,
  Flex,
  Group,
  Menu,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
  rem
} from "@mantine/core";
import { Spotlight, spotlight } from "@mantine/spotlight";
import { CaretRight, Gear, List, MagnifyingGlass, SignOut } from "@phosphor-icons/react";
import { useState } from "react";

import classes from "./MainHeader.module.css";

const data = ["Dashboard", "Settings", "Logout", "Tasks", "Users"];

export function MainHeader(props: Readonly<{
  navigate: (path: string) => void;
  toggleMobile: () => void;
  toggleDesktop: () => void;
  collapsed?: boolean;
}>) {
  const [query, setQuery] = useState("");

  const items = data
    .filter((item) => item.toLowerCase().includes(query.toLowerCase().trim()))
    .map((item) => <Spotlight.Action key={item} label={item} />);

  return (
    <Flex align="center" h="100%" w="100%">
      <Group justify="space-between" p={0} w="100%" px={8} wrap="nowrap">
        <Group align="center" gap={8} m={0} p={0} wrap="nowrap">
          <ActionIcon hiddenFrom="md" variant="transparent" onClick={props.toggleMobile}>
            <List style={{ width: rem(16), height: rem(16) }} />
          </ActionIcon>
          {props.collapsed && (
            <ActionIcon visibleFrom="md" variant="transparent" onClick={props.toggleDesktop}>
              <CaretRight style={{ width: rem(16), height: rem(16) }} />
            </ActionIcon>
          )}

          <UnstyledButton ml={16}>
            <Stack gap={0}>
              <Text fz="xs">Halo</Text>
              <Text fz="sm" fw="bold">
                Admin
              </Text>
            </Stack>
          </UnstyledButton>
        </Group>

        <TextInput
          placeholder="Cari"
          size="xs"
          radius="lg"
          leftSection={<MagnifyingGlass style={{ width: rem(12), height: rem(12) }} weight="bold" />}
          rightSectionWidth={70}
          rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
          styles={{ section: { pointerEvents: "none" }, input: { border: "none" } }}
          my="sm"
          onClick={spotlight.open}
        />

        <Spotlight.Root query={query} onQueryChange={setQuery}>
          <Spotlight.Search placeholder="Cari..." leftSection={<MagnifyingGlass />} />
          <Spotlight.ActionsList>
            {items.length > 0 ? items : <Spotlight.Empty>Tidak Ditemukan Apapun...</Spotlight.Empty>}
          </Spotlight.ActionsList>
        </Spotlight.Root>
        <Group justify="right" m={0} p={0} px={8} gap={8} wrap="nowrap">
          <ThemeSwitcher />
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button variant="subtle" radius="xl" p={8} leftSection={<Avatar size="sm" variant="default" >AD</Avatar>}></Button>
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
