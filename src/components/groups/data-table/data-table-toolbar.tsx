import { SvgIcon } from '@/components/ui/icon';
import { Button, Flex, TextInput } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDataTableContext } from './data-table-context';
import { DataTableViewOptions } from './data-table-view-options';
import { DataTableFacetedFilter } from './filters/data-table-faceted-filter';

interface DataTableToolbarProps<TData> {
  meta?: {
    filterableColumns: {
      id: string;
      title: string;
      options: {
        label: string;
        value: string;
        [key: string]: any;
      }[];
    }[];
  };
}

export function DataTableToolbar<TData>({
  meta,
}: Readonly<DataTableToolbarProps<TData>>) {
  const { table } = useDataTableContext<TData>();
  const isFiltered = table.getState().columnFilters.length > 0;

  const [debouncedValue, setDebouncedValue] = useDebouncedState(table.getState().globalFilter, 500);

  useEffect(() => {
    table.setGlobalFilter(debouncedValue);
  }, [debouncedValue, table]);

  const filterableColumns = meta?.filterableColumns ?? [];

  const handleClearAllFilters = () => {
    table.resetColumnFilters();
    table.setGlobalFilter(undefined);
  };

  return (
    <Flex align="center" justify="space-between">
      <Flex flex={1} align="center" gap={4}>
        <TextInput
          leftSection={<SvgIcon name="magnifyingGlass" width={16} height={16} />}
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
              options={options}
              title={title}
            />
          ) : null
        )}
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
