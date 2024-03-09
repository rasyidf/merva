"use client";

import { Table } from "@tanstack/react-table";

import { DataTableViewOptions } from "./data-table-view-options";

import { priorities, statuses } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Button, Flex, TextInput } from "@mantine/core";
import { Cross, MagnifyingGlass, X } from "@phosphor-icons/react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <Flex align="center" justify="space-between" >
      <Flex flex={1} align="center" gap={4} >
        <TextInput
          leftSection={
            <MagnifyingGlass width={16} height={16} />}
          placeholder="Search..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
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
