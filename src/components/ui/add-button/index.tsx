
import { Button, ButtonProps } from "@mantine/core";
import { PropsWithChildren } from "react";
import { SvgIcon } from "../icon";
import { useViewNavigate } from "@/shared/utils/routers";

export const AddButtonBase = Button.withProps({
  leftSection: <SvgIcon name="plus" width={16} height={16} />,
  variant: "filled",
});

export const AddButton = ({
  children,
  onClick,
}: PropsWithChildren<Omit<ButtonProps, "children">> & { onClick?: () => void; }) => {
  const navigate = useViewNavigate();
  return (
    <AddButtonBase
      onClick={() => onClick?.() ?? navigate("./add")}
    >
      {children ?? "Tambah Data"}
    </AddButtonBase>
  );
};
