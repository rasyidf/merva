import { InputWrapper, MantineColorsTuple, createTheme } from "@mantine/core";
import type { ModalSettings } from "@mantine/modals/lib/context";
import { localStorageColorSchemeManager } from "./color-scheme-manager";

const violet: MantineColorsTuple = [
  '#f7ecff',
  '#e7d6fb',
  '#caaaf1',
  '#ac7ce8',
  '#9354e0',
  '#833bdb',
  '#7b2eda',
  '#6921c2',
  '#5d1cae',
  '#501599'
];
export const defaultTheme = createTheme({
  fontFamily: "'Poppins', sans-serif",
  headings: {
    fontFamily: "'Inter Variable', sans-serif",
  },
  colors:{
    violet,
  },
  
  primaryColor: "violet",
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
