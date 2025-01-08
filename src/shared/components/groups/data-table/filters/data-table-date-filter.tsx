import { Button, Badge, Group, Popover, Stack, Radio } from "@mantine/core";
import { DatePicker } from '@mantine/dates';
import type { Column } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useCallback, useState } from "react";

interface DateFilterProps<TData> {
  column?: Column<TData, unknown>;
  title: string;
}

export function DataTableDateFilter<TData>({ column, title }: Readonly<DateFilterProps<TData>>) {
  const [filterType, setFilterType] = useState<string>("today");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  const columnFilterValue = column?.getFilterValue() as { from: string; to: string };

  const handleFilterChange = useCallback(() => {
    const dateMap: Record<string, { from: string; to: string }> = {
      today: {
        from: dayjs().startOf("day").format("YYYY-MM-DD HH:mm:ss"),
        to: dayjs().format("YYYY-MM-DD HH:mm:ss")
      },
      yesterday: {
        from: dayjs().subtract(1, "day").startOf("day").format("YYYY-MM-DD HH:mm:ss"),
        to: dayjs().subtract(1, "day").endOf("day").format("YYYY-MM-DD HH:mm:ss")
      },
      thisWeek: {
        from: dayjs().startOf("week").format("YYYY-MM-DD HH:mm:ss"),
        to: dayjs().format("YYYY-MM-DD HH:mm:ss")
      },
      thisMonth: {
        from: dayjs().startOf("month").format("YYYY-MM-DD HH:mm:ss"),
        to: dayjs().format("YYYY-MM-DD HH:mm:ss")
      },
      thisYear: {
        from: dayjs().startOf("year").format("YYYY-MM-DD HH:mm:ss"),
        to: dayjs().format("YYYY-MM-DD HH:mm:ss")
      },
    };

    column?.setFilterValue(dateMap[filterType]);
  }, [filterType, column]);

  const handleClearFilters = useCallback(() => {
    setFilterType("today");
    setDateRange([null, null]);
    column?.setFilterValue(undefined);
  }, [column]);

  const getDisplayDate = useCallback((value: { from: string; to: string }) => {
    return `${dayjs(value.from).format("DD/MM/YY HH:mm")} - ${dayjs(value.to).format("DD/MM/YY HH:mm")}`;
  }, []);

  return (
    <Popover position="bottom-start" trapFocus shadow="md">
      <Popover.Target>
        <Button
          color="dark.4"
          variant="outline"
          style={{ borderStyle: "dashed", borderWidth: 1 }}
          size="sm"
          rightSection={
            columnFilterValue && (
              <Group>
                <Badge color="dark.3" variant="light" style={{ borderRadius: "4px 0 0 4px" }}>
                  {getDisplayDate(columnFilterValue)}
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
          <Group align="flex-start" gap="md">
            <Radio.Group
              value={filterType}
              onChange={setFilterType}
              size="xs"
            >
              <Stack gap={8}>
                <Radio value="today" label="Today" />
                <Radio value="yesterday" label="Yesterday" />
                <Radio value="thisWeek" label="This week" />
                <Radio value="thisMonth" label="This month" />
                <Radio value="thisYear" label="This year" />
              </Stack>
            </Radio.Group>
            <DatePicker
              value={dateRange}
              type="range"
              onChange={setDateRange}
              numberOfColumns={2}
            />
          </Group>
          <Button size="xs" onClick={handleFilterChange}>
            Apply
          </Button>
          {columnFilterValue && (
            <Button size="xs" variant="transparent" onClick={handleClearFilters}>
              Clear filters
            </Button>
          )}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
