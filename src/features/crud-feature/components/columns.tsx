
import { ColumnDef } from "@tanstack/react-table";

import DataTable from "@/components/groups/data-table";
import { DataTableToolbarOption } from "@/components/groups/data-table/DataTableToolbarProps";
import { SvgIcon } from "@/components/ui/icon";
import { categories, labels, statuses, teams, userRoles } from "@/shared/utils/constants/data";
import { Badge, Checkbox, Flex, Group, Progress, Text, ThemeIcon } from "@mantine/core";
import { Task } from "../data/schema";

type ActionProps = {
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  [key: string]: any;
};

export const useTaskColumns = ({ onEdit, onDelete }: ActionProps): ColumnDef<Task>[] => [
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
            {row.getValue<string>("title")}
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
    accessorKey: "assignedTeam",
    size: 100,
    header: ({ column }) => <DataTable.ColumnHeader column={column} title="Team" />,
    cell: ({ row }) => {
      const team = teams.find((team) => team.value === row.getValue("assignedTeam"));
      return <Text>{team ? team.label : row.getValue<string>("assignedTeam")}</Text>;
    },
  },
  {
    accessorKey: "progressPercentage",
    size: 100,
    header: ({ column }) => <DataTable.ColumnHeader column={column} title="Progress (%)" />,
    cell: ({ row }) => <Progress value={row.getValue<number>("progressPercentage")} />,
  },
  {
    accessorKey: "dueDate",
    size: 100,
    header: ({ column }) => <DataTable.ColumnHeader column={column} title="Due Date" />,
    cell: ({ row }) => <Text>{row.getValue<string>("dueDate")}</Text>,
  },
  {
    id: "actions",
    size: 30,
    cell: ({ row }) => (
      <DataTable.RowActions
        row={row}
        onEdit={() => onEdit(row.original)}
        onDelete={() => onDelete(row.original)}
      />
    ),
  },
];

export const filterableColumns = [
  { id: 'status', type: 'text', title: 'Status', options: statuses },
  { id: 'assignedUserRole', type: 'text', title: 'Role', options: userRoles },
  { id: 'assignedTeam', type: 'text', title: 'Team', options: teams },
  { id: 'category', type: 'text', title: 'Category', options: categories },
  { id: 'progressPercentage', title: 'Progress (%)', type: 'number', options: [] },
  { id: 'dueDate', type: 'date', title: 'Due Date', options: [] },
] satisfies DataTableToolbarOption<Task>[]; 