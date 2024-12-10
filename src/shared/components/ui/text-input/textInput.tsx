import { TextInput as TextBase } from "@mantine/core";

export const TextInput = TextBase.withProps({
  radius: "sm",
  size: "md",
  styles: (theme) => ({
    label: {
      fontWeight: 700,
      fontSize: "0.875rem",
      lineHeight: "1.60rem",
      marginBottom: "6px",
    },
    item: {
      background: theme.white,
    },
    selected: { background: theme.colors.blue[1] },
  }),
});
