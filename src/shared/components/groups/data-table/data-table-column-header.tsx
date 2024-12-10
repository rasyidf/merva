import { SvgIcon } from "@/shared/components/ui/icon";
import { ActionIcon, Button } from "@mantine/core";
import type { Column } from "@tanstack/react-table";

interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: React.ReactNode;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
}: Readonly<DataTableColumnHeaderProps<TData, TValue>>) {
  const toggleSort = () => {
    column.toggleSorting(column.getIsSorted() === "asc" ? true : column.getIsSorted() === "desc" ? undefined : false);
  };

  return (
    <Button
      variant="transparent"
      size="md"
      fullWidth
      radius="sm"
      color="dark"
      styles={() => ({
        label: { justifyContent: "start", textAlign: "start" },
        inner: { justifyContent: "space-between", width: "100%" },
      })}
      rightSection={
        <ActionIcon
          hidden={column.getIsSorted() === false}
          variant="subtle"
          size="sm"
          radius="sm"
          color="dark"
          onClick={toggleSort}
        >
          {column.getIsSorted() === "desc" ? (
            <SvgIcon name="chevronUp" />
          ) : column.getIsSorted() === "asc" ? (
            <SvgIcon name="chevronDown" />
          ) : (
            <SvgIcon name="chevronsUpDown" />
          )}
        </ActionIcon>
      }
    >
      {title}
    </Button>
  );
}
