"use client";

import { Row } from "@tanstack/react-table";

import { ActionIcon, Menu, Tooltip } from "@mantine/core";
import { DotsThree, Pencil, PencilSimple, Trash, TrashSimple } from "@phosphor-icons/react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  return (
    <Menu position="bottom-end" shadow="md">
      <Menu.Target>
        <Tooltip label="Actions">
          <ActionIcon variant="transparent">
            <DotsThree width={24} height={24} />
          </ActionIcon>
        </Tooltip>
      </Menu.Target>
      <Menu.Dropdown w={200}>
        <Menu.Item leftSection={<PencilSimple />}>Edit</Menu.Item>
        <Menu.Divider />
        <Menu.Item leftSection={<TrashSimple />}>Delete</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
