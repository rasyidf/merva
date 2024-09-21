import { Badge } from "@mantine/core";
import React from "react";

type ActiveStatusProps = {
  isActive: boolean;
};

export const ActiveStatus: React.FC<ActiveStatusProps> = ({ isActive }) => {
  const statusColor = isActive ? "green" : "gray";

  return (
    <Badge color={statusColor} m={0} p={8} variant="filled">
      {isActive ? "Aktif" : "Tidak Aktif"}
    </Badge>
  );
};

export default ActiveStatus;
