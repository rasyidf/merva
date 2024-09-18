
import { Row } from "@tanstack/react-table";

import { ActionIcon, Menu, Tooltip } from "@mantine/core";
import { DotsThree, PencilSimple, TrashSimple } from "@phosphor-icons/react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit?: (row: Row<TData>) => void;
  onDelete?: (row: Row<TData>) => void;
}

export function DataTableRowActions<TData>({ row, onDelete, onEdit }: Readonly<DataTableRowActionsProps<TData>>) {
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
        <Menu.Item leftSection={<PencilSimple />}
          onClick={() => {
            onEdit?.(row);

          }}>Edit</Menu.Item>
        <Menu.Divider />
        <Menu.Item leftSection={<TrashSimple />}
          onClick={() => {
            onDelete?.(row);
          }}>Delete</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
