
export type DataTableToolbarOption<TData = any> = {
  id: keyof TData;
  title: string;
  type: 'number' | 'date' | 'text';
  options: {
    label: string;
    value: string;
    [key: string]: any;
  }[];
};

export interface DataTableToolbarProps<TData> {
  meta?: {
    filterableColumns: DataTableToolbarOption<TData>[];
  };
}
