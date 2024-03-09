
import { Button, Menu, ThemeIcon } from "@mantine/core";
import { ArrowDown, ArrowUp, ArrowsDownUp, EyeSlash } from "@phosphor-icons/react";
import { Column } from "@tanstack/react-table";


interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={className}>{title}</div>;
  }

  return (
    <div className={className}>
      <Menu>
        <Menu.Target >
          <Button
            variant="subtle"
            size="sm"
            radius="md"
            color="dark"
            rightSection={
              column.getIsSorted() === "desc" ? (
                <ArrowDown width={16} height={16} style={{ marginLeft: 8 }} />
              ) : column.getIsSorted() === "asc" ? (
                <ArrowUp width={16} height={16} style={{ marginLeft: 8 }} />
              ) : (
                <ArrowsDownUp width={16} height={16} style={{ marginLeft: 8 }} />
              )
            }
          >
            {title}
          </Button>
        </Menu.Target>
        <Menu.Dropdown w={150}>
          <Menu.Item leftSection={
            <ThemeIcon variant="transparent" size="sm"
              color={
                column.getIsSorted() === "asc" ? "blue" : "dark"
              }>
              <ArrowUp />
            </ThemeIcon>
          } onClick={() => {
            if (column.getIsSorted() === "asc") {
              return column.toggleSorting(undefined);
            }
            return column.toggleSorting(false);
          }}>
            Asc
          </Menu.Item>
          <Menu.Item leftSection={
            <ThemeIcon variant="transparent" size="sm"
              color={
                column.getIsSorted() === "desc" ? "blue" : "dark"
              }>
              <ArrowDown />
            </ThemeIcon>
          } onClick={() => {
            if (column.getIsSorted() === "desc") {
              return column.toggleSorting(undefined);
            }
            return column.toggleSorting(true);
          }}>
            Desc
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item leftSection={
            <ThemeIcon variant="transparent" size="sm" color={"dark"}>
              <EyeSlash />
            </ThemeIcon>

          } onClick={() => column.toggleVisibility(false)}>

            Hide
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
