import { IconName, SvgIcon } from "@/shared/components/ui/icon";
import { TextInput, TextInputProps } from "@mantine/core";

interface FormFieldWithIconProps extends Omit<TextInputProps, 'leftSection'> {
  icon: IconName;
}

export const FormFieldWithIcon = ({ icon, ...props }: FormFieldWithIconProps) => {
  return (
    <TextInput
      {...props}
      leftSection={<SvgIcon name={icon} />}
    />
  );
};