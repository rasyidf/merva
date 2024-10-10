
import { Button, Badge, Group, Popover, Select, Stack, TextInput } from '@mantine/core';
import { Column } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';

interface DateFilterProps<TData> {
  column?: Column<TData, unknown>;
  title: string;
}

export function DataTableDateFilter<TData>({ column, title }: Readonly<DateFilterProps<TData>>) {
  const [filterType, setFilterType] = useState<string>('today');
  const [customDate, setCustomDate] = useState<string>('');

  // Get the current filter value from the column
  const columnFilterValue = (column?.getFilterValue()) as string;

  const handleFilterChange = useCallback(() => {
    const filterValue = filterType === 'custom' ? customDate : filterType;
    column?.setFilterValue(filterValue);
  }, [filterType, customDate, column]);

  const handleClearFilters = useCallback(() => {
    setFilterType('today');
    setCustomDate('');
    column?.setFilterValue(undefined);
  }, [column]);

  return (
    <Popover position="bottom-start" trapFocus shadow="md">
      <Popover.Target>
        <Button
          color="dark.4"
          variant="outline"
          style={{ borderStyle: 'dashed', borderWidth: 1 }}
          size="sm"
          rightSection={
            columnFilterValue && (
              <Group>
                <Badge color="dark.3" variant="light" style={{ borderRadius: '4px 0 0 4px' }}>

                  {filterType === 'custom' ? dayjs(columnFilterValue).format('YYYY-MM-DD') : dayjs(columnFilterValue).fromNow(true)}
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
          <Group align="center">
            {/* Select dropdown for date filter type */}
            <Select
              value={filterType}
              comboboxProps={{ withinPortal: false }}
              onChange={(value) => setFilterType(value as string)}
              data={[
                { value: dayjs().format('YYYY-MM-DD'), label: 'Today' },
                { value: dayjs().subtract(1, 'day').format('YYYY-MM-DD'), label: 'Yesterday' },
                { value: dayjs().startOf('week').format('YYYY-MM-DD'), label: 'This week' },
                { value: dayjs().startOf('month').format('YYYY-MM-DD'), label: 'This month' },
                { value: dayjs().startOf('year').format('YYYY-MM-DD'), label: 'This year' },
                { value: 'custom', label: 'Custom' },
              ]}
              size="xs"
            />
            {/* Input for custom date value */}
            {filterType === 'custom' && (
              <TextInput
                size="xs"
                placeholder={`YYYY-MM-DD`}
                value={customDate}
                onChange={(event) => setCustomDate(event.target.value)}
                type="date"
              />
            )}
            <Button size="xs" onClick={handleFilterChange}>
              Apply
            </Button>
          </Group>
          {/* Clear filters button if a filter is applied */}
          {(columnFilterValue !== '') && (
            <Button size="xs" variant="transparent" onClick={handleClearFilters}>
              Clear filters
            </Button>
          )}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}

export default DataTableDateFilter;