
import { ColumnDef } from "@tanstack/react-table";

import DataTable from "@/components/groups/data-table";
import { SvgIcon } from "@/components/ui/icon";
import { labels, priorities, statuses } from "@/shared/utils/constants/data";
import { Badge, Checkbox, Flex, Group, Text, ThemeIcon } from "@mantine/core";
import { Task } from "../data/schema";

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    minSize: 24,
    size: 24,
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
        onChange={(e) => table.toggleAllPageRowsSelected(!!e.currentTarget.checked)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        key={row.id}
        checked={row.getIsSelected()}
        onChange={(e) => row.toggleSelected(!!e.currentTarget.checked)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    minSize: 80,
    size: 80,
    header: ({ column }) => <DataTable.ColumnHeader column={column} title="Task" />,
    cell: ({ row }) => <Text>{`${row.getValue("id")}`}</Text>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    size: 0.7,
    header: ({ column }) => <DataTable.ColumnHeader column={column} title="Title" />,
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);
      return (
        <Group align="center" gap={4} w="100%" style={{ overflow: "hidden" }} wrap="nowrap">
          {label && <Badge variant="default">{label.label}</Badge>}
          <Text maw="100%" truncate fz="md">
            {JSON.stringify(row.getValue("title"))}
          </Text>
        </Group>
      );
    },
  },
  {
    accessorKey: "status",
    size: 64,
    header: ({ column }) => <DataTable.ColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = statuses.find((status) => status.value === row.getValue("status"));

      if (!status) {
        return null;
      }

      return (
        <Flex align="center">
          {status.icon && (
            <ThemeIcon variant="transparent">
              <SvgIcon name={status.icon} height={16} width={16} />
            </ThemeIcon>
          )}
          <span>{status.label}</span>
        </Flex>
      );
    },
  },
  {
    accessorKey: "priority",
    size: 64,
    header: ({ column }) => <DataTable.ColumnHeader column={column} title="Priority" />,
    cell: ({ row }) => {
      const priority = priorities.find((priority) => priority.value === row.getValue("priority"));

      if (!priority) {
        return null;
      }

      return (
        <Flex align="center">
          {priority.icon && (
            <ThemeIcon variant="transparent">
              <SvgIcon name={priority.icon} height={16} width={16} />
            </ThemeIcon>
          )}
          <span>{priority.label}</span>
        </Flex>
      );
    },
  },
  {
    id: "actions",
    size: 30,
    cell: ({ row }) => <DataTable.RowActions row={row} />,
  },
];

export const filterableColumns = [
  { id: 'status', title: 'Status', options: statuses },
  { id: 'priority', title: 'Priority', options: priorities },
];