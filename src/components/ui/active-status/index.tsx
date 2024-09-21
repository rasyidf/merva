import { Badge } from "@mantine/core";
import React from "react";

type ActiveStatusProps = {
  isActive: boolean;
};

const ActiveStatusBadge = Badge.withProps({
  m: 0,
  p: 8,
  variant: "filled"
});

const ActiveStatus: React.FC<ActiveStatusProps> = ({ isActive }) => (
  <ActiveStatusBadge color={isActive ? "green" : "gray"} >
    {isActive ? "Aktif" : "Tidak Aktif"}
  </ActiveStatusBadge>
);


export default ActiveStatus;
