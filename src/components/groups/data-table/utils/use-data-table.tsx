// src/hooks/useDataTable.ts

import { useState } from "react";
import { TableState, ColumnDef, SortingState, ColumnFiltersState, PaginationState } from "@tanstack/react-table";
import { initialTableState } from "../data-table-utils";
import { useSyncWithSearchParams } from "./use-sync-with-search-params";
import { useFetchData } from "./use-fetch-data";
import { useInitializeTable } from "./use-initialize-table";

interface DataFetchParams {
  sorting: SortingState;
  filters: ColumnFiltersState;
  pagination: PaginationState;
  globalFilter: string;
}

interface UseDataTableOptions<TData, TValue> {
  key: string[];
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
  key,
  columns,
  dataFetcher,
  initialState = {},
  enableSearchParamsSync = false,
}: UseDataTableOptions<TData, TValue>) {
  const [state, setState] = useState<TableState>({ ...initialTableState, ...initialState });

  useSyncWithSearchParams(enableSearchParamsSync, state, setState);

  const { data, error, isLoading } = useFetchData<TData>({ key, state, dataFetcher });

  const table = useInitializeTable<TData, TValue>({
    columns,
    data: data?.data || [],
    state,
    setState,
    pageCount: data?.meta.pageCount ?? -1,
  });

  return {
    table,
    data: data?.data || [],
    isLoading,
    error,
  };
}
