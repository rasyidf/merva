import {
  ColumnDef,
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
import { DataTablePagination } from "../components/data-table-pagination";
import { DataTableToolbar } from "../components/data-table-toolbar";
import { DataTableCore } from "./data-table-core";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data:
  | {
    data: TData[];
    meta: {
      pageIndex: number;
      pageSize: number;
      pageCount: number;
    };
  }
  | undefined;
  state: TableState;
  setState: Dispatch<SetStateAction<TableState>>;
}

export function DataTable<TData, TValue>({ columns, data, state, setState }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    meta: data?.meta,
    pageCount: data?.meta.pageCount ?? 1,
  });

  table.setOptions((prev) => {
    return {
      ...prev,
      state,
      defaultColumn: {
        minSize: 0,
        maxSize: 800,
      },
      onStateChange: setState,
      enableRowSelection: true,
      columnResizeMode: 'onChange',
      enableColumnResizing: true,
      manualFiltering: true,
      manualPagination: true,
      manualSorting: true,
      enableGlobalFilter: false,
    };
  });

  return (
    <Stack gap={6} mt={8}>
      <DataTableToolbar table={table} />
      <DataTableCore table={table} />
      <DataTablePagination table={table} />
    </Stack>
  );
}
