import { Badge, Button, Group, Popover, Select, Stack, TextInput } from '@mantine/core';
import { Column } from '@tanstack/react-table';
import { useCallback, useState } from 'react';

interface NumberFilterProps<TData> {
  column?: Column<TData, unknown>;
  title: string;
}

export function DataTableNumberFilter<TData>({ column, title }: Readonly<NumberFilterProps<TData>>) {
  const [filterValue, setFilterValue] = useState<string>('');
  const [filterOperator, setFilterOperator] = useState<string>('>');

  // Get the current filter value from the column
  const columnFilterData = column?.getFilterValue() as string || '';
  // split the filter value into operator and value from '>0' to ['>', '0'] and >=0 to ['>=', '0']
  const [op, val] = RegExp(/([><=]+)(\d+)/).exec(columnFilterData) || ['', ''];
  const columnFilterValue = ({
    operator: op,
    value: val,
  }) as {
    operator: string;
    value: string;
  };

  const handleFilterChange = useCallback(() => {
    column?.setFilterValue(`${filterOperator}${filterValue}`);
  }, [filterOperator, filterValue, column]);

  const handleClearFilters = useCallback(() => {
    setFilterValue('');
    setFilterOperator('>');
    column?.setFilterValue(undefined);
  }, [column]);

  return (
    <Popover position="bottom-start" trapFocus shadow="md">
      <Popover.Target>
        <Button
          color='dark.4'
          variant="outline"
          style={{ borderStyle: 'dashed', borderWidth: 1 }}
          size="sm"
          radius="md"
          rightSection={
            columnFilterValue.value && (
              <Group gap={0}>
                <Badge color='dark.4' variant='light' style={{ borderRadius: '4px 0 0 4px' }}>
                  {filterOperator}
                </Badge>
                <Badge color='dark.4' variant='light' style={{ borderRadius: '0 4px 4px 0' }}>
                  {filterValue}
                </Badge>
              </Group>
            )
          }
        >
          {title}
        </Button>
      </Popover.Target>
      <Popover.Dropdown p={8}>
        <Stack gap={8}>
          <Select
            value={filterOperator}
            withCheckIcon={false}
            comboboxProps={{ withinPortal: false }}
            onChange={(value) => setFilterOperator(value as string)}
            data={[
              { value: '>', label: '(> ) GreaterThan' },
              { value: '<', label: '(< ) LessThan' },
              { value: '>=', label: '(>=) Greater Than Or Equal' },
              { value: '<=', label: '(<=) Less Than Or Equal' },
              { value: '=', label: '(= ) Equal' },
              { value: '!=', label: '(!=) Not Equal' },
            ]}
            size="xs"
          />
          {/* Input for filter value */}
          <TextInput
            size="xs"
            placeholder={`Value`}
            value={filterValue}
            onChange={(event) => setFilterValue(event.target.value)}
            type="number"
          />
          <Button size="xs" onClick={handleFilterChange}>
            Apply
          </Button>
          {/* Clear filters button if a filter is applied */}
          {(columnFilterValue.value !== '') && (
            <Button size="xs" variant="transparent" onClick={handleClearFilters}>
              Clear filters
            </Button>
          )}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}

export default DataTableNumberFilter;