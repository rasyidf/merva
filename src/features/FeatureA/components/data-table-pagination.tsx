
import { Box, Button, ButtonGroup, Flex, Paper, Select, Text } from "@mantine/core";
import { CaretDoubleLeft, CaretDoubleRight, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Table } from "@tanstack/react-table";


interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <Paper pos="sticky" bottom={0} >
      <Flex align="center" justify="space-between" px={2} >
        <Box
          flex={1} fz="sm" c="gray.8"
        >
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </Box>
        <Flex align="center" columnGap={24}  >
          <Flex align="center" columnGap={16}>
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onChange={(value) => {
                table.setPageSize(Number(value));
              }}
              data={["10", "20", "30", "40", "50"]}
            />
          </Flex>
          <Flex w={100} align="center" justify="center" fz="sm" >
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </Flex>
          <Flex className="flex items-center space-x-2">
            <Button.Group >
              <Button
                variant="subtle" color="dark"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <Text hidden>Go to first page</Text>
                <CaretDoubleLeft width={16} height={16} />
              </Button>
              <Button
                variant="subtle" color="dark"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <Text hidden>Go to previous page</Text>
                <CaretLeft width={16} height={16} />
              </Button>
              <Button
                variant="subtle" color="dark"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <Text hidden>Go to next page</Text>
                <CaretRight width={16} height={16} />
              </Button>
              <Button
                variant="subtle" color="dark"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <Text hidden>Go to last page</Text>
                <CaretDoubleRight width={16} height={16} />
              </Button>
            </Button.Group>
          </Flex>
        </Flex>
      </Flex>
    </Paper>
  );
}
