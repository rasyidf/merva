import { SvgIcon } from "@/components/ui/icon";
import { Combobox, ComboboxItem, InputBase, ScrollArea, SelectProps, Stack, useCombobox } from "@mantine/core";
import { ReactNode, forwardRef, useEffect, useState } from "react";
import { Control, useController } from "react-hook-form";

type FormCreateableSelectType = {
  control: Control<any, any>;
  name: string;
  label: ReactNode;
} & SelectProps;

export const FormCreatableSelect = forwardRef((props: FormCreateableSelectType, ref) => {
  const { control, name, label, onChange, searchable, ...selectProps } = props;
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const { field } = useController({ control: control, name: name });
  const [data, setData] = useState(selectProps.data as ComboboxItem[]);
  const [value, setValue] = useState<string | null>("");
  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    if (selectProps.data && data?.length === 0) {
      setData(selectProps.data as ComboboxItem[]);
    }
  }, [selectProps.data, data]);

  useEffect(() => {
    if (field.value && data.length) {
      const currentOption = data.find((item) => item.value === field.value);
      currentOption?.label && setSearch(currentOption?.label);
    }
  }, [field.value, data]);

  const exactOptionMatch = data.some((item) => item.label === search);
  const filteredOptions = exactOptionMatch
    ? data
    : data.filter((item) => item.label.toLowerCase().includes(search.toLowerCase().trim()));

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item.value} key={item.value}>
      {item.label}
    </Combobox.Option>
  ));

  return (
    <Stack gap={2} w={"100%"}>
      {label}
      <Combobox
        store={combobox}
        withinPortal={true}
        onOptionSubmit={(val) => {
          let temp = val;
          if (val === "$create") {
            const newItem = { label: search, value: search.toLowerCase() };
            setData((current) => [...current, newItem]);
            setValue(newItem.value);
            temp = search;
          } else {
            const label = filteredOptions.find((item) => item.value === val)?.label ?? "";
            setValue(val);
            setSearch(label);
          }
          field.onChange(temp);
          onChange?.(temp, { value: temp, label: search } as ComboboxItem);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <InputBase
            rightSection={<SvgIcon name="caret-down" />}
            value={search}
            w="100%"
            onChange={(event) => {
              combobox.openDropdown();
              combobox.updateSelectedOptionIndex();
              setSearch(event.currentTarget.value);
            }}
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => {
              combobox.closeDropdown();
              const label = filteredOptions.find((item) => item.value === value)?.label ?? "";
              setSearch(label || "");
              if (label) {
                setValue("");
              }
              field.onBlur();
            }}
            placeholder={selectProps.placeholder}
            rightSectionPointerEvents="none"
          />
        </Combobox.Target>

        <Combobox.Dropdown mah={250} style={{ overflow: "auto" }}>
          <ScrollArea h="100%">
            <Combobox.Options>
              {options}
              {!exactOptionMatch && search.trim().length > 0 && (
                <Combobox.Option value="$create">+ {search}</Combobox.Option>
              )}
            </Combobox.Options>
          </ScrollArea>
        </Combobox.Dropdown>
      </Combobox>
    </Stack>
  );
});
