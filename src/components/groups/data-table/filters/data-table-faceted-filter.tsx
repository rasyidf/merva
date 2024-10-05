import { IconName } from '@/assets/icons/types';
import { SvgIcon } from '@/components/ui/icon';
import {
  Badge,
  Button,
  Checkbox,
  Divider,
  Flex,
  Group,
  Popover,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
} from '@mantine/core';
import { useCallback, useMemo, useState } from 'react';
import { Column } from '@tanstack/react-table';

interface Option {
  label: string;
  value: string;
  icon?: IconName;
}

interface CheckboxFilterProps<TData> {
  options: Option[];
  title: string;
  column?: Column<TData, unknown>;
}

export function DataTableFacetedFilter<TData>({
  options,
  title,
  column,
}: Readonly<CheckboxFilterProps<TData>>) {
  const [filterValue, setFilterValue] = useState<string>('');

  // Get the current filter value from the column
  const columnFilterValue = (column?.getFilterValue() ?? []) as string[];

  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.label.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [filterValue, options]);

  const handleSelect = useCallback(
    (value: string) => {
      const newSelected = new Set(columnFilterValue);
      if (newSelected.has(value)) {
        newSelected.delete(value);
      } else {
        newSelected.add(value);
      }
      column?.setFilterValue(Array.from(newSelected));
    },
    [columnFilterValue, column]
  );

  const handleSelectAll = useCallback(() => {
    if (columnFilterValue.length === options.length) {
      column?.setFilterValue([]);
    } else {
      column?.setFilterValue(options.map((option) => option.value));
    }
  }, [columnFilterValue, options, column]);

  const handleClearFilters = useCallback(() => {
    column?.setFilterValue([]);
  }, [column]);

  const selectAll = columnFilterValue.length === options.length;

  return (
    <Popover position="bottom-start">
      <Popover.Target>
        <Button
          variant="outline"
          size="sm"
          radius="md"
          rightSection={
            columnFilterValue.length > 0 && (
              <Flex>
                {columnFilterValue.length > 2 ? (
                  <Badge>{columnFilterValue.length} selected</Badge>
                ) : (
                  columnFilterValue.map((value) => (
                    <Badge key={value} variant="light">
                      {options.find((opt) => opt.value === value)?.label}
                    </Badge>
                  ))
                )}
              </Flex>
            )
          }
        >
          {title}
        </Button>
      </Popover.Target>
      <Popover.Dropdown p={8}>
        <Stack gap={8}>
          <TextInput
            size="xs"
            placeholder={`Filter ${title}`}
            value={filterValue}
            onChange={(event) => setFilterValue(event.target.value)}
          />
          <Checkbox
            label="Select All"
            checked={selectAll}
            indeterminate={
              columnFilterValue.length > 0 &&
              columnFilterValue.length < options.length
            }
            onChange={handleSelectAll}
          />
          {filteredOptions.map((option) => (
            <Checkbox
              key={option.value}
              label={
                <Group align="center">
                  {option.icon && (
                    <ThemeIcon size="xs" variant="transparent">
                      <SvgIcon name={option.icon} height={16} width={16} />
                    </ThemeIcon>
                  )}
                  <Text size="sm">{option.label}</Text>
                </Group>
              }
              checked={columnFilterValue.includes(option.value)}
              onChange={() => handleSelect(option.value)}
            />
          ))}
          {columnFilterValue.length > 0 && (
            <>
              <Divider />
              <Button size="xs" variant="transparent" onClick={handleClearFilters}>
                Clear filters
              </Button>
            </>
          )}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
