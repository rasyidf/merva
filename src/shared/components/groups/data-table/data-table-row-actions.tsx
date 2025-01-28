import type { Row } from "@tanstack/react-table";

import { ActionIcon, Menu, Tooltip } from "@mantine/core";
import { SvgIcon } from "@/shared/components/ui/icon";

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
            <SvgIcon name="dotsHorizontal" />
          </ActionIcon>
        </Tooltip>
      </Menu.Target>
      <Menu.Dropdown w={200}>
        <Menu.Item
          leftSection={<SvgIcon name="pencil" />}
          onClick={() => {
            onEdit?.(row);
          }}
        >
          Edit
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          leftSection={<SvgIcon name="trash" />}
          onClick={() => {
            onDelete?.(row);
          }}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
