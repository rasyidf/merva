import { RowSelectionState, SortingState, ColumnFiltersState, ColumnSizingState, TableState } from "@tanstack/react-table";


export const initialTableState = {
  pagination: {
    pageIndex: 0,
    pageSize: 10,
  },
  rowSelection: {} as RowSelectionState,
  sorting: [] as SortingState,
  columnFilters: [] as ColumnFiltersState,
  globalFilter: "",
  columnPinning: {},
  columnVisibility: {},
  columnSizing: {} as ColumnSizingState,
} as TableState;