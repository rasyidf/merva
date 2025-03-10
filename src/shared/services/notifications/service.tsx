import type { IconName } from "@/shared/assets/icons/types";
import { SvgIcon } from "@/shared/components/ui/icon";
import type { PartialDeep } from "@/shared/types";
import { type NotificationData, notifications } from "@mantine/notifications";

// Common styles for notifications
const commonStyles = {
  root: {
    background: "var(--mantine-color-body)",
    paddingBlock: "0.8rem",
    paddingLeft: "0.5rem",
    paddingRight: "1.5rem",
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
  },
  title: {
    fontSize: "1rem",
    fontFamily: "Inter, Open-sans, sans-serif",
    lineHeight: "1.75rem",
  },
  description: {
    fontSize: "1rem",
    fontFamily: "Inter, Open-sans, sans-serif",
    lineHeight: "1.5rem",
  },
  closeButton: {
    borderRadius: "100%",
  },
  icon: {
    background: "transparent",
    marginLeft: "1rem",
    strokeWidth: 2,
  },
};

// Default options for notifications
const defaultOpts: PartialDeep<NotificationData> = {
  title: "",
  message: "",
  styles: {
    ...commonStyles,
    icon: {
      background: "transparent",
      marginLeft: "1rem",
      strokeWidth: 4,
    },
  },
  autoClose: 5000,
};

const createNotification = (
  type: string,
  title: string,
  message: string,
  opts?: PartialDeep<Omit<NotificationData, "title" | "message">>,
) => {
  const colorMap: Record<string, string> = {
    success: "green",
    error: "red",
    warning: "orange",
    info: "blue",
  };
  const iconNameMap: Record<string, IconName> = {
    success: "check",
    error: "xCircle",
    warning: "alertTriangle",
    info: "info",
  };

  const color = colorMap[type] ?? "blue";
  const iconName = iconNameMap[type] ?? "info";
  const iconColorVar = `var(--mantine-color-${color}-filled)`;

  return Notify.show({
    title,
    message,
    color,
    icon: <SvgIcon name={iconName} color={iconColorVar} width={32} height={32} />,
    styles: {
      ...commonStyles,

      title: {
        ...commonStyles.title,
        color: iconColorVar,
      },
      description: {
        ...commonStyles.description,
        color: iconColorVar,
      },
      closeButton: {
        ...commonStyles.closeButton,
        color: iconColorVar,
      },
    },
    ...opts,
  });
};

export const Notify = {
  show: (opts: PartialDeep<NotificationData>) => {
    const mergedOpts = { ...defaultOpts, ...opts } as NotificationData;
    notifications.show(mergedOpts);
  },

  success: (title: string, message: string, opts?: PartialDeep<Omit<NotificationData, "title" | "message">>) => {
    createNotification("success", title, message, opts);
  },

  error: (title: string, message: string, opts?: PartialDeep<Omit<NotificationData, "title" | "message">>) => {
    createNotification("error", title, message, opts);
  },

  warning: (title: string, message: string, opts?: PartialDeep<Omit<NotificationData, "title" | "message">>) => {
    createNotification("warning", title, message, opts);
  },

  info: (title: string, message: string, opts?: PartialDeep<Omit<NotificationData, "title" | "message">>) => {
    createNotification("info", title, message, opts);
  },
} as const;
