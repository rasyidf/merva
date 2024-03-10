"use client";

import { Row } from "@tanstack/react-table";

import { ActionIcon, Menu, Tooltip } from "@mantine/core";
import { DotsThree } from "@phosphor-icons/react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  return (
    <Menu position="bottom-end">
      <Menu.Target>
        <Tooltip label="Open Menu">
          <ActionIcon variant="transparent">
            <DotsThree width={16} height={16} />
          </ActionIcon>
        </Tooltip>
      </Menu.Target>
      <Menu.Dropdown w={120}>
        <Menu.Item>Edit</Menu.Item>
        <Menu.Divider />
        <Menu.Item>Delete</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
