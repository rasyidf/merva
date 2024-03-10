"use client";

import { Table } from "@tanstack/react-table";

import { DataTableViewOptions } from "./data-table-view-options";

import { Button, Flex, TextInput } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { useEffect } from "react";
import { priorities, statuses } from "../data/data";
import { DataTableFacetedFilter } from "./filters/data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const [debouncedValue, setDebouncedValue] = useDebouncedState(table.getState().globalFilter, 500);

  useEffect(() => {
    table.setGlobalFilter(debouncedValue);
  }, [debouncedValue, table]);

  return (
    <Flex align="center" justify="space-between" >
      <Flex flex={1} align="center" gap={4} >
        <TextInput
          leftSection={
            <MagnifyingGlass width={16} height={16} />}
          placeholder="Search..."
          defaultValue={debouncedValue}
          onChange={(event) => setDebouncedValue(event.target.value)}
          w={170}
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="transparent"
            color="dark"
            onClick={() => table.resetColumnFilters()}
            rightSection={
              <X width={16} height={16} />}
          >
            Reset
          </Button>
        )}
      </Flex>
      <DataTableViewOptions table={table} />
    </Flex>
  );
}
