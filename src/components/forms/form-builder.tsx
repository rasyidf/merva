import {
  Loader,
  LoadingOverlay as LoadingOverlayComponent,
  type LoadingOverlayProps,
  Stack,
  Text,
} from "@mantine/core";
import { FormBuilderComponent } from "./form-builder.component";
import type { FormBuilderProps } from "./form-builder.types";

export const FormBuilder = (props: Readonly<FormBuilderProps>) => {
  if (props?.loading) {
    return <LoadingOverlay visible />;
  }
  return <FormBuilderComponent {...props} />;
};

export const LoadingOverlay = (props: LoadingOverlayProps) => {
  return (
    <LoadingOverlayComponent
      {...props}
      loaderProps={{
        children: (
          <Stack justify="center" align="center">
            <Loader />
            <Text c="primary" fw="bold">
              Sedang diproses...
            </Text>
          </Stack>
        ),
      }}
    />
  );
};
