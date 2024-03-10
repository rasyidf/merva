import { createTheme, MantineProvider, localStorageColorSchemeManager } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

export const defaultTheme = createTheme({
  fontFamily: "Poppins, sans-serif",
  headings: {
    fontFamily: "Inter, sans-serif",
  },
  defaultRadius: "md",
  components: {},
});

export const colorSchemeManager = localStorageColorSchemeManager({
  key: "merva-color-scheme",
});

export const ThemeProvider = (props: { children: React.ReactNode }) => {
  return (
    <>
      <MantineProvider
        classNamesPrefix="merva"
        defaultColorScheme="light"
        theme={defaultTheme}
        colorSchemeManager={colorSchemeManager}
      >
        <ModalsProvider modalProps={{ radius: "md", withinPortal: true, centered: true }}>
          {props.children}
          <Notifications />
        </ModalsProvider>
      </MantineProvider>
    </>
  );
};
