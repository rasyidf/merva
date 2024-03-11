import { flexRender, Table as CoreTable } from "@tanstack/react-table";
import { Paper, Table, rem } from "@mantine/core";
import { useMemo } from "react";

export function DataTableCore<TData>({ table }: { table: CoreTable<TData>; }) {

  const columnSizeVars = useMemo(() => {
    const headers = table?.getFlatHeaders();
    const colSizes: { [key: string]: number | string; } = {};
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]!;
      // if less than 1, but not 0, it will be treated as a percentage

      if (header.getSize() <= 1 && header.getSize() > 0) {
        colSizes[`--unit-${header.id}-size`] = "1%";
        colSizes[`--header-${header.id}-size`] = (header?.getSize() ?? 1) * 100;
        colSizes[`--col-${header.column.id}-size`] = (header?.column?.getSize() ?? 1) * 100;
        continue;
      }
      if (header.getSize() === 0) {
        colSizes[`--unit-${header.id}-size`] = "100%";
        colSizes[`--header-${header.id}-size`] = 1;
        colSizes[`--col-${header.column.id}-size`] = 1;
        continue;
      }
      colSizes[`--unit-${header.id}-size`] = "1px";
      colSizes[`--header-${header.id}-size`] = header?.getSize();
      colSizes[`--col-${header.column.id}-size`] = header?.column?.getSize();
    }
    return colSizes;
  }, [table.getState()?.columnSizingInfo]);

  return (
    <Paper radius="md" w="100%">
      <Table highlightOnHover striped withTableBorder stickyHeader stickyHeaderOffset={0} w="100%" style={{
        ...columnSizeVars,
        tableLayout: "fixed",
        borderSpacing: 0,
        textAlign: "left"
      }}>
        <Table.Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Table.Th key={header.id} {...(header.colSpan > 1 && { colSpan: header.colSpan })} style={{
                    width: `calc(var(--header-${header?.id}-size) * var(--unit-${header?.column.id}-size))`,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    boxSizing: "border-box"
                  }}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </Table.Th>
                );
              })}
            </Table.Tr>
          ))}
        </Table.Thead>
        <Table.Tbody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <Table.Tr key={row.id} data-state={row.getIsSelected() && "selected"} w={"auto"}
              >
                {row.getVisibleCells().map((cell) => (
                  <Table.Td key={cell.id} style={{
                    width: `calc(var(--header-${cell.column.id}-size) * var(--unit-${cell.column.id}-size))`,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    boxSizing: "border-box"
                  }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))
          ) : (
            <Table.Tr>
              <Table.Td colSpan={table.getAllColumns().length} h={rem(64)} ta="center">
                No results.
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </Paper >
  );
}
