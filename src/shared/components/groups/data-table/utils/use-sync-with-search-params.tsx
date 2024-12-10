import type { ColumnFilter, SortingState, TableState, Updater } from "@tanstack/react-table";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { parse, type ParsedQs, stringify } from "qs-esm";

export function useSyncWithSearchParams(
  enableSync: boolean,
  state: TableState,
  setState: (state: Updater<TableState>) => void,
) {
  const location = useLocation();
  const navigate = useNavigate();
  const isInitialRender = useRef(true);
  const prevQueryString = useRef(location.search);

  useEffect(() => {
    if (enableSync) {
      const queryString = location.search;
      const queryParams = parse(queryString, {
        ignoreQueryPrefix: true,
        depth: 10,
        arrayLimit: 1000,
        parseArrays: true,
      }) as ParsedQs;

      const pageIndex = Number.parseInt((queryParams.p as string) ?? "0", 10);
      const pageSize = Number.parseInt((queryParams.z as string) ?? "10", 10);
      const sorting = (queryParams.sort as unknown as SortingState) ?? [];
      const columnFilters = (queryParams.f as unknown as ColumnFilter[]) ?? [];
      const globalFilter = (queryParams.q as string) ?? "";

      setState((prevState) => {
        // Compare prevState and new state to prevent unnecessary updates
        const newState = {
          ...prevState,
          pagination: { pageIndex, pageSize },
          sorting,
          columnFilters,
          globalFilter,
        };
        if (JSON.stringify(prevState) !== JSON.stringify(newState)) {
          return newState;
        }
        return prevState;
      });
    }
  }, [enableSync, location.search, setState]);

  useEffect(() => {
    if (enableSync) {
      const queryParams: any = {
        p: state.pagination.pageIndex,
        z: state.pagination.pageSize,
        ...(state.sorting.length > 0 && { sort: state.sorting }),
        ...(state.columnFilters.length > 0 && { f: state.columnFilters }),
        ...(state.globalFilter && { q: state.globalFilter }),
      };

      const newQueryString = stringify(queryParams, {
        addQueryPrefix: true,
        encodeValuesOnly: true,
        arrayFormat: "indices",
      });

      if (location.search !== newQueryString && prevQueryString.current !== newQueryString) {
        if (isInitialRender.current) {
          // Skip navigating on the initial render to prevent infinite loop
          isInitialRender.current = false;
        } else {
          navigate({ search: newQueryString }, { replace: true });
        }
        prevQueryString.current = newQueryString;
      }
    }
  }, [enableSync, state, navigate, location.search]);

  // Reset to default page on infinite loop detection
  useEffect(() => {
    if (enableSync && location.search === "") {
      navigate({ search: "?p=0&z=10" }, { replace: true });
    }
  }, [enableSync, location.search, navigate]);
}
