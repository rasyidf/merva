import { InputWrapper, createTheme } from "@mantine/core";
import type { ModalSettings } from "@mantine/modals/lib/context";
import { localStorageColorSchemeManager } from "./color-scheme-manager";

export const defaultTheme = createTheme({
  fontFamily: "'Poppins', sans-serif",
  headings: {
    fontFamily: "'Inter Variable', sans-serif",
  },
  primaryColor: "red",
  primaryShade: 6,
  defaultRadius: "sm",
  components: {
    InputWrapper: InputWrapper.extend({
      classNames: {
        root: "input-base_root",
      },
    }),
  },
});

export const modalTheme: ModalSettings = {
  radius: "md",
  withinPortal: true,
  centered: true,
};

export const colorSchemeManager = localStorageColorSchemeManager({
  key: "merva-color-scheme",
});
