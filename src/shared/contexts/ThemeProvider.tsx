import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/spotlight/styles.css";
import { colorSchemeManager, defaultTheme } from "../services/theme";

export const ThemeProvider = (props: { children: React.ReactNode; }) => {
  return (
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
  );
};
