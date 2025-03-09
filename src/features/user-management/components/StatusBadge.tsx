import { Badge, BadgeProps } from "@mantine/core";
import { UserStatus } from "../types";

interface StatusBadgeProps extends Omit<BadgeProps, 'color'> {
  status: UserStatus;
}

export const StatusBadge = ({ status, ...rest }: StatusBadgeProps) => {
  const getStatusColor = (status: UserStatus): string => {
    switch (status) {
      case "active":
        return "green";
      case "inactive":
        return "gray";
      case "pending":
        return "yellow";
      case "suspended":
        return "red";
      default:
        return "gray";
    }
  };

  const getStatusLabel = (status: UserStatus): string => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <Badge color={getStatusColor(status)} {...rest}>
      {getStatusLabel(status)}
    </Badge>
  );
};