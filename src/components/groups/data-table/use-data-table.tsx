// src/hooks/useDataTable.ts

import { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  TableState,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { initialTableState } from "./data-table-utils";

interface DataFetchParams {
  sorting: SortingState;
  filters: ColumnFiltersState;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  globalFilter: string;
}

interface UseDataTableOptions<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  dataFetcher: (params: DataFetchParams) => Promise<{
    data: TData[];
    meta: {
      pageIndex: number;
      pageSize: number;
      pageCount: number;
    };
  }>;
  initialState?: Partial<TableState>;
  enableSearchParamsSync?: boolean;
}

export function useDataTable<TData, TValue>({
  columns,
  dataFetcher,
  initialState = {},
  enableSearchParamsSync = false,
}: UseDataTableOptions<TData, TValue>) {
  // Initialize state
  const [state, setState] = useState<TableState>({ ...initialTableState, ...initialState });

  // Synchronize with searchParams if enabled
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (enableSearchParamsSync) {
      // Parse searchParams and setState accordingly
      const pageIndex = parseInt(searchParams.get("page") ?? "0", 10);
      const pageSize = parseInt(searchParams.get("pageSize") ?? "10", 10);
      const sorting = JSON.parse(searchParams.get("sorting") ?? "[]");
      const columnFilters = JSON.parse(searchParams.get("filters") ?? "[]");
      const globalFilter = searchParams.get("globalFilter") ?? "";

      setState((prevState) => ({
        ...prevState,
        pagination: { pageIndex, pageSize },
        sorting,
        columnFilters,
        globalFilter,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (enableSearchParamsSync) {
      // Update searchParams when state changes
      const params = new URLSearchParams();

      params.set("page", state.pagination.pageIndex.toString());
      params.set("pageSize", state.pagination.pageSize.toString());
      if (state.sorting.length > 0) {
        params.set("sorting", JSON.stringify(state.sorting));
      }
      if (state.columnFilters.length > 0) {
        params.set("filters", JSON.stringify(state.columnFilters));
      }
      if (state.globalFilter) {
        params.set("globalFilter", state.globalFilter);
      }

      setSearchParams(params);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // Data fetching using React Query
  const { data, error, isLoading } = useQuery(
    {
      queryKey: ["data", state],
      queryFn: () =>
        dataFetcher({
          sorting: state.sorting,
          filters: state.columnFilters,
          pagination: state.pagination,
          globalFilter: state.globalFilter,
        }),
      placeholderData: keepPreviousData,
    }
  );

  // Initialize the table instance
  const table = useReactTable<TData>({
    data: data?.data || [],
    columns,
    state,
    onStateChange: setState,
    pageCount: data?.meta.pageCount ?? -1, // Use -1 if unknown
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return {
    table,
    data: data?.data || [],
    isLoading,
    error,
  };
}
