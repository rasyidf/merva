
import { Box, Button, Flex, Group, Pagination, Paper, Select, Text, rem, useMantineColorScheme } from "@mantine/core";
import { CaretDoubleLeft, CaretDoubleRight, CaretLeft, CaretRight, DotsThree } from "@phosphor-icons/react";
import { Table } from "@tanstack/react-table";


interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const { colorScheme } = useMantineColorScheme();
  const meta = table.options.meta;
  return (
    <Paper pos="sticky" bottom={0} >
      <Flex align="center" justify="space-between" px={2} >
        <Box
          flex={1} fz="sm" c={colorScheme === "dark" ? "gray.3" : "gray.8"}
        >
          {table.getSelectedRowModel().rows.length} of{" "}
          {table.getRowModel().rows.length} row(s) selected.
        </Box>
        <Flex align="center" columnGap={24}  >
          <Flex align="center" columnGap={16}>
            <p className="text-sm font-medium">Rows per page</p>
            <Select

              value={`${table.getState().pagination.pageSize}`}
              onChange={value => {
                table.setPageSize(Number(value));
              }}
              w={rem(80)}
              data={["10", "20", "30", "40", "50"]}
            />
          </Flex>
          <Flex w={rem(120)} align="center" justify="center" fz="sm" >
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </Flex>
          <Flex gap={8} align="center">
            <Pagination.Root
              defaultValue={0} total={
                table.getPageCount()
              } value={table.getState().pagination.pageIndex + 1} onChange={(page) => {
                table.setPageIndex(page - 1);
              }}
              onNextPage={() => table.nextPage()}
              onPreviousPage={() => table.previousPage()}
              radius="sm"

            >

              <Group gap={7}  >
                <Pagination.Previous icon={CaretLeft} />
                <Pagination.Items dotsIcon={DotsThree} />
                <Pagination.Next icon={CaretRight} />
              </Group>
            </Pagination.Root>
          </Flex>
        </Flex>
      </Flex>
    </Paper>
  );
}
