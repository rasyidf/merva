import { InputWrapper, createTheme } from "@mantine/core";
import { localStorageColorSchemeManager } from "./colorSchemeManager";

export const defaultTheme = createTheme({
  fontFamily: "'Poppins', sans-serif",
  headings: {
    fontFamily: "'Inter Variable', sans-serif",
  },
  primaryColor: "grape",
  primaryShade: 5,
  defaultRadius: "md",
  components: {
    InputWrapper: InputWrapper.extend({
      classNames: {
        root: "input-base_root",
      },
    }),
  },
});

export const modalTheme = {
  radius: "md",
  withinPortal: true,
  centered: true,
};


export const colorSchemeManager = localStorageColorSchemeManager({
  key: "merva-color-scheme",
});