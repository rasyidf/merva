import { Highlight } from "@mantine/core";
import React, { forwardRef, useState } from "react";

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  label: string;
}

export const useAutoComplete = (searchable = false) => {
  const [searchValue, onSearchChange] = useState("");

  if (!searchable) {
    return {
      searchable,
    };
  }

  return {
    itemComponent: forwardRef<HTMLDivElement, ItemProps>(({ label, ...others }: ItemProps, ref) => {
      return (
        <div ref={ref} {...others}>
          <Highlight
            highlight={searchValue}
            highlightStyles={(theme) => ({
              fontWeight: 700,
              background: "none",
            })}
          >
            {label}
          </Highlight>
        </div>
      );
    }),
    onSearchChange,
    searchValue,
    searchable,
  };
};
