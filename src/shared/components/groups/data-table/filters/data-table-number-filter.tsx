import { Badge, Button, Group, Popover, Stack, TextInput, Combobox, useCombobox, InputBase, Input } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks"; // Add this import
import type { Column } from "@tanstack/react-table";
import { useCallback, useState } from "react";

interface NumberFilterProps<TData> {
  column?: Column<TData, unknown>;
  title: string;
}

export function DataTableNumberFilter<TData>({ column, title }: Readonly<NumberFilterProps<TData>>) {
  const [filterValue, setFilterValue] = useState<string>("");
  const [filterOperator, setFilterOperator] = useState<string>(">");
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [opened, { open, close }] = useDisclosure(false); // Add this line

  const operatorOptions = [
    { value: ">", label: "Greater Than" },
    { value: "<", label: "Less Than" },
    { value: ">=", label: "At Least" },
    { value: "<=", label: "At Most" },
    { value: "=", label: "Equal" },
    { value: "!=", label: "Not Equal" },
  ];

  const selectedOperator = operatorOptions.find(option => option.value === filterOperator);

  // Get the current filter value from the column
  const columnFilterData = (column?.getFilterValue() as string) || "";
  // split the filter value into operator and value from '>0' to ['>', '0'] and >=0 to ['>=', '0']
  const [op, val] = new RegExp(/([><=]+)(\d+)/).exec(columnFilterData) || ["", ""];
  const columnFilterValue = {
    operator: op,
    value: val,
  } as {
    operator: string;
    value: string;
  };

  const handleFilterChange = useCallback(() => {
    column?.setFilterValue(`${filterOperator}${filterValue}`);
    close();
  }, [filterOperator, filterValue, column]);

  const handleClearFilters = useCallback(() => {
    setFilterValue("");
    setFilterOperator(">");
    column?.setFilterValue(undefined);
    close();
  }, [column]);

  return (
    <Popover
      position="bottom-start"
      trapFocus
      shadow="md"
      opened={opened} // Control the popover's open state
      onClose={close} // Close the popover when needed
    >
      <Popover.Target>
        <Button
          color="dark.4"
          variant="light"
          size="xs"
          radius="md"
          onClick={open} // Open the popover on button click
          rightSection={
            columnFilterValue.value && (
              <Group gap={0}>
                <Badge color="dark.4" variant="light" style={{ borderRadius: "4px 0 0 4px" }}>
                  {filterOperator}
                </Badge>
                <Badge color="dark.4" variant="light" style={{ borderRadius: "0 4px 4px 0" }}>
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
          <Combobox
            withinPortal
            store={combobox}
            onOptionSubmit={(val) => {
              setFilterOperator(val);
              combobox.closeDropdown();
            }}
          >
            <Combobox.Target>
              <InputBase
                component="button"
                type="button"
                pointer
                rightSection={<Combobox.Chevron />}
                rightSectionPointerEvents="none"
                onClick={() => combobox.toggleDropdown()}
              >
                {selectedOperator && (
                  <Group gap={4}>
                    <Badge size="xs" miw={32} radius="sm" color="dark.4" variant="light">
                      {selectedOperator.value}
                    </Badge>
                    {selectedOperator.label}
                  </Group>
                )}
                {!selectedOperator && <Input.Placeholder>Pick operator</Input.Placeholder>}
              </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown>
              <Combobox.Options>
                {operatorOptions.map((option) => (
                  <Combobox.Option value={option.value} key={option.value}>
                    <Group gap={4}>
                      <Badge size="xs" miw={32} radius="sm" color="dark.4" variant="light">
                        {option.value}
                      </Badge>
                      {option.label}
                    </Group>
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Combobox.Dropdown>
          </Combobox>
          {/* Input for filter value */}
          <TextInput
            size="xs"
            placeholder={"Value"}
            value={filterValue}
            onChange={(event) => setFilterValue(event.target.value)}
            type="number"
          />
          <Button size="xs" onClick={handleFilterChange}>
            Apply
          </Button>
          {/* Clear filters button if a filter is applied */}
          {columnFilterValue.value !== "" && (
            <Button size="xs" variant="transparent" onClick={handleClearFilters}>
              Clear filters
            </Button>
          )}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
