import { SvgIcon } from "@/components/ui/icon";
import { ActionIcon, Button, Flex, TextInput } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useDataTableContext } from "./data-table-context";
import { DataTableViewOptions } from "./data-table-view-options";
import type { DataTableToolbarProps } from "./DataTableToolbarProps";
import { DataTableDateFilter } from "./filters/data-table-date-filter";
import { DataTableFacetedFilter } from "./filters/data-table-faceted-filter";
import { DataTableNumberFilter } from "./filters/data-table-number-filter";

export function DataTableToolbar<TData>({ meta }: Readonly<DataTableToolbarProps<TData>>) {
  const { table } = useDataTableContext<TData>();
  const isFiltered = table.getState().columnFilters.length > 0;

  const [debouncedValue, setDebouncedValue] = useDebouncedState(table.getState().globalFilter, 500);
  const [filtersVisible, setFiltersVisible] = useState<boolean>(true);

  useEffect(() => {
    table.setGlobalFilter(debouncedValue);
  }, [debouncedValue, table]);

  const filterableColumns = meta?.filterableColumns ?? [];

  const handleClearAllFilters = () => {
    table.resetColumnFilters();
    table.setGlobalFilter(undefined);
  };

  const handleToggleFilters = () => {
    setFiltersVisible((prev) => !prev);
  };

  return (
    <Flex align="center" justify="space-between">
      <Flex flex={1} align="center" gap={4}>
        <TextInput
          leftSection={<SvgIcon name="magnifyingGlass" width={16} height={16} />}
          placeholder="Search..."
          defaultValue={debouncedValue}
          size="sm"
          onChange={(event) => setDebouncedValue(event.target.value)}
          w={170}
        />

        <ActionIcon variant={filtersVisible ? "subtle" : "light"} size="sm" onClick={handleToggleFilters}>
          <SvgIcon name="filter" width={16} height={16} />
        </ActionIcon>

        {filtersVisible &&
          filterableColumns.map((columnMeta) => {
            if (!columnMeta) {
              return null;
            }

            const { id, title, type, ...rest } = columnMeta;
            const column = table.getColumn(id.toString());
            if (!column) {
              return null;
            }

            switch (type) {
              case "number":
                return <DataTableNumberFilter key={`${id.toString()}-${type}`} column={column} title={title} />;
              case "date":
                return <DataTableDateFilter key={`${id.toString()}-${type}`} column={column} title={title} />;
              case "text":
                return (
                  <DataTableFacetedFilter
                    key={`${id.toString()}-${type}`}
                    column={column}
                    options={(rest as any).options ?? []}
                    title={title}
                  />
                );
              default:
                return null;
            }
          })}

        {isFiltered && (
          <Button
            variant="transparent"
            color="dark"
            onClick={handleClearAllFilters}
            rightSection={<SvgIcon name="x" width={16} height={16} />}
          >
            Reset
          </Button>
        )}
      </Flex>
      <DataTableViewOptions />
    </Flex>
  );
}
