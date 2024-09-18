
import { Table } from "@tanstack/react-table";

import { DataTableViewOptions } from "./data-table-view-options";

import { Button, Flex, TextInput } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { useEffect } from "react";
import { DataTableFacetedFilter } from "./filters/data-table-faceted-filter";
import { priorities, statuses } from "@/shared/utils/constants/data";
import { useDataTableContext } from "./data-table-context";

interface DataTableToolbarProps<TData> {
  meta?: {
    filterableColumns: {
      id: string; title: string; options: {
        label: string;
        value: string;
        [key: string]: any;
      }[];
    }[];
  };
}

export function DataTableToolbar<TData>({ meta }: Readonly<DataTableToolbarProps<TData>>) {
  const { table } = useDataTableContext<TData>();
  const isFiltered = table.getState().columnFilters.length > 0;

  const [debouncedValue, setDebouncedValue] = useDebouncedState(table.getState().globalFilter, 500);

  useEffect(() => {
    table.setGlobalFilter(debouncedValue);
  }, [debouncedValue]);

  const filterableColumns = [
    // Add more filterable columns as needed
    ...(meta?.filterableColumns ?? []),
  ];

  return (
    <Flex align="center" justify="space-between">
      <Flex flex={1} align="center" gap={4}>
        <TextInput
          leftSection={<MagnifyingGlass width={16} height={16} />}
          placeholder="Search..."
          defaultValue={debouncedValue}
          onChange={(event) => setDebouncedValue(event.target.value)}
          w={170}
        />
        {filterableColumns.map(({ id, title, options }) =>
          table.getColumn(id) ? (
            <DataTableFacetedFilter
              key={id}
              column={table.getColumn(id)}
              title={title}
              options={options}
            />
          ) : null
        )}
        {isFiltered && (
          <Button
            variant="transparent"
            color="dark"
            onClick={() => table.resetColumnFilters()}
            rightSection={<X width={16} height={16} />}
          >
            Reset
          </Button>
        )}
      </Flex>
      <DataTableViewOptions />
    </Flex>
  );
}
