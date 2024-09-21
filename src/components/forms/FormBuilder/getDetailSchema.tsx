import { InputProps } from "@mantine/core";

export const getDetailSchema = (formType: string) => {
  return {
    variant: "unstyled",
    readOnly: true,
    styles: {
      input: {
        padding: "0",
        height: formType === "checkbox" ? "inherit" : "auto",
        lineHeight: "inherit",
      },
      icon: {
        display: formType === "checkbox" || formType === "radio" ? "default" : "none",
      },
      value: {
        backgroundColor: "var(--mantine-color-blue-100)",
        color: "var(--mantine-color-blue-500)",
        fontWeight: "bold",
        borderRadius: "10rem",
      },
      rightSection: {
        display: "none",
      },
    },
    optional: false,
    placeholder: "-",
  } as InputProps;
};
