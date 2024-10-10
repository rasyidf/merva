import { Combobox, Flex, Loader, ScrollArea, TextInput, type InputBaseProps } from "@mantine/core";
import { useDebouncedValue, useIntersection } from "@mantine/hooks";
import type { UseInfiniteQueryResult } from "@tanstack/react-query";
import { type ReactNode, useEffect, useRef } from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

type OptionsProps = {
  label?: string;
  value?: string;
  code?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  active?: boolean;
  [key: string]: any;
};

type InfiniteScrollProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<InputBaseProps, "value" | "defaultValue"> & {
    placeholder?: string;
    data?: OptionsProps[];
    label?: string | ReactNode;
    query: UseInfiniteQueryResult<any, any>;
    onSearch?: (e?: string) => void;
    searchValue?: string;
    inputProps?: InputBaseProps;
    valueKey?: string;
    onChange?: (e: string, i?: OptionsProps) => void;
  };

export function InfiniteScroll<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  label,
  query,
  placeholder,
  onSearch,
  searchValue,
  inputProps,
  onChange,
  ...props
}: InfiniteScrollProps<T>) {
  const { data, hasNextPage, fetchNextPage, isFetching } = query || {};
  const {
    field: { value, onChange: fieldOnChange, ...field },
    fieldState,
  } = useController<T>({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  const containerRef = useRef(null);

  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });

  const [debounced] = useDebouncedValue(entry?.isIntersecting, 500);

  useEffect(() => {
    if (debounced) {
      fetchNextPage?.();
    }
  }, [debounced, fetchNextPage]);

  const options = data?.pages.flatMap((page: any) =>
    page.data.map((item: any) => (
      <Combobox.Option value={item.value} key={item.value}>
        {item.label}
      </Combobox.Option>
    )),
  );

  return (
    <Combobox>
      <input
        type="hidden"
        name={name}
        value={value as string}
        onChange={(e) => fieldOnChange(e.target.value as string)}
      />
      <Combobox.Target>
        <TextInput
          value={searchValue}
          onChange={(event) => {
            fieldOnChange(event.target.value);
            onSearch?.(event.target.value);
          }}
          error={fieldState.error?.message}
          {...field}
          {...inputProps}
          {...props}
        />
      </Combobox.Target>
      <Combobox.Dropdown>
        <ScrollArea.Autosize
          mah={200}
          type="scroll"
          ref={containerRef}
          // placeholder="Loading..." // TODO: soka move this code
          // onPointerEnterCapture={undefined}
          // onPointerLeaveCapture={undefined}
        >
          <Combobox.Options>
            {options && options.length > 0 ? options : <Combobox.Empty>Nothing found</Combobox.Empty>}
          </Combobox.Options>
          {
            <div ref={ref}>
              {hasNextPage && isFetching && (
                <Flex h="1.5rem">
                  <Loader />
                </Flex>
              )}
            </div>
          }
        </ScrollArea.Autosize>
      </Combobox.Dropdown>
    </Combobox>
  );
}
