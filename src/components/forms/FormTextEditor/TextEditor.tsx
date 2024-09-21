
import { Stack, Textarea } from "@mantine/core";
import { ReactNode } from "react";
import { Control, Controller } from "react-hook-form";

export type TextEditorProps = {
  control: Control<any, any>;
  name: string;
  label: ReactNode;
  onChange?: (text: string) => void;
  editable?: boolean;
};

export function FormTextEditor(props: TextEditorProps) {
  const { control, name, label, onChange, ...textEditorProps } = props;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <Stack gap={0} w="100%">
            <Textarea
            />
          </Stack>
        );
      }}
    />
  );
}
