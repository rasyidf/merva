"use client";

import { Row } from "@tanstack/react-table";



import { labels } from "../data/data";
import { taskSchema } from "../data/schema";
import { ActionIcon, Button, Menu, Text } from "@mantine/core";
import { DotsThree } from "@phosphor-icons/react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original);

  return (
    <Menu>
      <Menu.Target>
        <ActionIcon
          variant="transparent"
        >
          <DotsThree width={16} height={16} />
          <Text hidden>Open menu</Text>
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item>Edit</Menu.Item>
        <Menu.Item>Make a copy</Menu.Item>
        <Menu.Item>Favorite</Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
