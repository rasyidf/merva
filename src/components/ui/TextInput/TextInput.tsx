import { TextInput as TextBase, TextInputProps } from "@mantine/core";

type Props = TextInputProps & React.RefAttributes<HTMLInputElement>;

const TextInput = (props: Props) => {
  return (
    <TextBase
      radius="sm"
      size="md"
      styles={(theme) => ({
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
      })}
      {...props}
    />
  );
};

export default TextInput;
