import { ActionIcon, CopyButton, Group, Text, type TextProps, Tooltip, rem } from "@mantine/core";
import { SvgIcon } from "../icon";
type Props = {
  value: string;
  disabled?: boolean;
  timeout: number;
  labelProps: TextProps;
};

export const CopyableLabel = ({ value, timeout = 2000, labelProps, disabled }: Props) => {
  return (
    <Group justify="space-between" wrap="nowrap">
      <Text {...labelProps} c={disabled ? "gray" : (labelProps.c ?? "orange")}>
        {value}
      </Text>
      {disabled ? null : (
        <CopyButton value={value} timeout={timeout}>
          {({ copied, copy }) => (
            <Tooltip label={copied ? "Kode voucher disalin" : "Salin"} withArrow position="right">
              <ActionIcon size="md" color={copied ? "teal" : "gray"} variant="subtle" onClick={copy}>
                {copied ? (
                  <SvgIcon name="check" width={14} height={14} />
                ) : (
                  <SvgIcon name="copy" width={14} height={14} />
                )}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
      )}
    </Group>
  );
};
