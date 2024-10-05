import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ColumnFiltersState, SortingState, TableState } from "@tanstack/react-table";

interface DataFetchParams {
  sorting: SortingState;
  filters: ColumnFiltersState;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  globalFilter: string;
}

interface UseFetchDataOptions<TData> {
  key: string[];
  state: TableState;
  dataFetcher: (params: DataFetchParams) => Promise<{
    data: TData[];
    meta: {
      pageIndex: number;
      pageSize: number;
      pageCount: number;
    };
  }>;
}

export function useFetchData<TData>({ key, state, dataFetcher }: UseFetchDataOptions<TData>) {
  return useQuery(
    {
      queryKey: [...key, "data", state],
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
}