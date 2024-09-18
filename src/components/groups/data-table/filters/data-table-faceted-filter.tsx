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
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { PlusCircle } from "@phosphor-icons/react";
import { Column } from "@tanstack/react-table";
import * as React from "react";

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: Readonly<DataTableFacetedFilterProps<TData, TValue>>) {
  const selectedValues = new Set(column?.getFilterValue() as string[]);
  const [filterValue, setFilterValue] = React.useState<string | undefined>(undefined);
  const [filter] = useDebouncedValue(filterValue, 200);

  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes((filter ?? "").toLowerCase()));

  return (
    <Popover position="bottom-start">
      <Popover.Target>
        <Button
          color="var(--mantine-color-text)"
          style={{
            border: "1px dashed",
          }}
          leftSection={<PlusCircle width={16} height={16} />}
          rightSection={
            selectedValues?.size > 0 && (
              <>
                <Divider orientation="vertical" mr={8} />
                <Flex columnGap={4}>
                  {selectedValues.size > 2 ? (
                    <Badge variant="light" color="gray" radius="sm">
                      {selectedValues.size} selected
                    </Badge>
                  ) : (
                    options
                      .filter((option) => selectedValues.has(option.value))
                      .map((option) => (
                        <Badge variant="light" color="gray" radius="sm" key={option.value}>
                          {option.label}
                        </Badge>
                      ))
                  )}
                </Flex>
              </>
            )
          }
          variant="outline"
          size="sm"
          radius="md"
        >
          {title}
        </Button>
      </Popover.Target>
      <Popover.Dropdown p={8}>
        <Stack gap={8} justify="stretch">
          <TextInput
            size="xs"
            placeholder={title}
            value={filterValue}
            onChange={(event) => setFilterValue(event.target.value)}
          />
          {filteredOptions.map((option, index) => {
            return (
              <Checkbox
                w="100%"
                size="sm"
                key={option.value + index + selectedValues.size}
                defaultChecked={selectedValues.has(option.value)}
                onClick={() => {
                  const newSelectedValues = new Set(selectedValues);
                  if (newSelectedValues.has(option.value)) {
                    newSelectedValues.delete(option.value);
                  } else {
                    newSelectedValues.add(option.value);
                  }
                  const filterValues = Array.from(newSelectedValues);
                  column?.setFilterValue(filterValues.length ? filterValues : undefined);
                }}                
                label={
                  <Group justify="space-between" align="center">
                    {option.icon && (
                      <ThemeIcon size="xs" variant="transparent">
                        <option.icon />
                      </ThemeIcon>
                    )}
                    <Text size="sm" miw={80}>
                      {option.label}
                    </Text>
                    {/* {facets?.get(option.value) && (
                      <Text size="sm">
                        {facets.get(option.value)}
                      </Text>
                    )} */}
                  </Group>
                }
              />
            );
          })}

          {selectedValues.size > 0 && (
            <>
              <Divider />
              <Button py={0} size="xs" variant="transparent" onClick={() => column?.setFilterValue(undefined)}>
                Clear filters
              </Button>
            </>
          )}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
