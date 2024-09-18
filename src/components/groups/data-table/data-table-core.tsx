import { Paper, Table, rem } from "@mantine/core";
import { flexRender } from "@tanstack/react-table";
import { useDataTableContext } from "./data-table-context";

export function DataTableCore<TData>() {
  const { table } = useDataTableContext<TData>();

  return (
    <Paper radius="md" w="100%">
      <Table
        highlightOnHover
        striped
        withTableBorder
        stickyHeader
        stickyHeaderOffset={0}
        w="100%"
        style={{
          tableLayout: 'auto',
          borderSpacing: 0,
          textAlign: 'left',
        }}
      >
        <Table.Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.Th key={header.id}>
                  {header.isPlaceholder ? null : (flexRender(header.column.columnDef.header, header.getContext())
                  )}
                </Table.Th>
              ))}
            </Table.Tr>
          ))}
        </Table.Thead>
        <Table.Tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <Table.Tr key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Td key={cell.id}>
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
    </Paper>
  );
}
