import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableCore } from "./data-table-core";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableRowActions } from "./data-table-row-actions";
import { DataTableToolbar } from "./data-table-toolbar";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTable as DataTableContainer } from "./data-table";
import { DataTableFacetedFilter } from "./filters";
export { useDataTable } from "./utils/use-data-table";

export const DataTable = {
  ColumnHeader: DataTableColumnHeader,
  Core: DataTableCore,
  Pagination: DataTablePagination,
  RowActions: DataTableRowActions,
  Toolbar: DataTableToolbar,
  ViewOptions: DataTableViewOptions,
  Container: DataTableContainer,
  Filters: DataTableFacetedFilter,
};
