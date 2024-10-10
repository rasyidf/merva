import {
  ColumnDef,
  type Table,
  TableState,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Stack } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { DataTableCore } from "./data-table-core";
import { DataTableProvider } from "./data-table-context";

interface DataTableProps<TData, TValue> {
  table: Table<TData>;
  children?: React.ReactNode;
}

export function DataTable<TData, TValue>({ table, children }: Readonly<DataTableProps<TData, TValue>>) {
  return (
    <DataTableProvider table={table}>
      <Stack gap={6} mt={8}>
        {children ?? (
          <>
            <DataTableToolbar />
            <DataTableCore />
            <DataTablePagination />
          </>
        )}
      </Stack>
    </DataTableProvider>
  );
}
