import { Grid } from "@mantine/core";
import { ReactNode } from "react";

interface SettingsFormGridProps {
  children: ReactNode;
}

export const SettingsFormGrid = ({ children }: SettingsFormGridProps) => {
  return (
    <Grid>
      {children}
    </Grid>
  );
};

interface FormFieldProps {
  children: ReactNode;
  fullWidth?: boolean;
}

export const FormField = ({ children, fullWidth }: FormFieldProps) => {
  return (
    <Grid.Col span={{ base: 12, md: fullWidth ? 12 : 6 }}>
      {children}
    </Grid.Col>
  );
};