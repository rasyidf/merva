import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/spotlight/styles.css";

import type { PropsWithChildren } from "react";
import { colorSchemeManager, defaultTheme } from ".";

export const ThemeProvider = (props: PropsWithChildren) => {
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
