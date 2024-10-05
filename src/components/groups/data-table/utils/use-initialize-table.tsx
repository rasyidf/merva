import { ColumnDef, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, TableState, Updater, useReactTable } from "@tanstack/react-table";

interface UseInitializeTableOptions<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  state: TableState;
  setState: (state: Updater<TableState>) => void;
  pageCount: number;
}

export function useInitializeTable<TData, TValue>({
  columns,
  data,
  state,
  setState,
  pageCount,
}: UseInitializeTableOptions<TData, TValue>) {
  return useReactTable<TData>({
    data,
    columns,
    state,
    onStateChange: setState,
    pageCount,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
}