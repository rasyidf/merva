import { SvgIcon } from "@/components/elements/Icon";
import { NotificationData, notifications } from "@mantine/notifications";
import { merge } from "lodash";

export const Notify = {
  show: (opts: NotificationData) => {
    const defaultOpts = {
      title: "",
      message: "",
      styles: {
        root: {
          paddingBlock: "0.8rem",
          paddingLeft: "0.5rem",
          paddingRight: "1.5rem",
          boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        },
        icon: {
          background: "transparent",
          marginLeft: "1rem",
          strokeWidth: 4,
        },
        title: {
          fontSize: "1.125rem",
          fontFamily: "Satoshi, Open-sans, sans-serif",
          fontWeight: 700,
          lineHeight: "1.75rem",
        },
        description: {
          fontSize: "1rem",
          fontFamily: "Satoshi, Open-sans, sans-serif",
          lineHeight: "1.5rem",
        },
        closeButton: {
          borderRadius: "100%",
        },
      },
      autoClose: 5000,
    } satisfies Partial<NotificationData>;

    // deep merge

    const mergedOpts = merge(defaultOpts, opts);

    notifications.show(mergedOpts);
  },

  success: (title: string, message: string, opts?: Partial<Omit<NotificationData, "title" | "message">>) => {
    Notify.show({
      title: title,
      message: message,
      color: "green",
      styles: {
        root: {
          background: "var(--mantine-color-body)",
        },
        icon: {
          color: "var(--mantine-color-green-filled)",
        },
        title: {
          color: "var(--mantine-color-green-filled)",
        },
        description: {
          color: "var(--mantine-color-green-filled)",
        },
        closeButton: {
          color: "var(--mantine-color-green-filled)",
        },
      },
      icon: <SvgIcon name="check-circle" stroke="var(--mantine-color-green-filled)" width={128} height={128} />,
      ...opts,
    });
  },
  error: (title: string, message: string, opts?: Partial<Omit<NotificationData, "title" | "message">>) => {
    Notify.show({
      title: title,
      message: message,
      icon: <SvgIcon name="x-circle" width={128} height={128} stroke="var(--mantine-color-red-filled)" />,
      styles: {
        root: {
          background: "var(--mantine-color-body)",
        },
        icon: {
          color: "var(--mantine-color-red-filled)",
        },
        title: {
          color: "var(--mantine-color-red-filled)",
        },
        description: {
          color: "var(--mantine-color-red-filled)",
        },
        closeButton: {
          color: "var(--mantine-color-red-filled)",
        },
      },
      color: "red",
      ...opts,
    });
  },
  warning: (title: string, message: string, opts?: Partial<Omit<NotificationData, "title" | "message">>) => {
    Notify.show({
      title: title,
      message: message,
      styles: {
        root: {
          background: "var(--mantine-color-body)",
        },
        icon: {
          color: "var(--mantine-color-orange-filled)",
        },
        title: {
          color: "var(--mantine-color-orange-filled)",
        },
        description: {
          color: "var(--mantine-color-orange-filled)",
        },
        closeButton: {
          color: "var(--mantine-color-orange-filled)",
        },
      },
      icon: <SvgIcon name="alert-triangle" width={128} height={128} stroke="var(--mantine-color-orange-filled)" />,
      color: "orange",
      ...opts,
    });
  },
  info: (title: string, message: string, opts?: Partial<Omit<NotificationData, "title" | "message">>) => {
    Notify.show({
      title: title,
      message: message,
      styles: {
        root: {
          background: "var(--mantine-color-body)",
        },
        icon: {
          color: "var(--mantine-color-blue-filled)",
        },
        title: {
          color: "var(--mantine-color-blue-filled)",
        },
        description: {
          color: "var(--mantine-color-blue-filled)",
        },
        closeButton: {
          color: "var(--mantine-color-blue-filled)",
        },
      },
      icon: <SvgIcon name="info" width={128} height={128} stroke="var(--mantine-color-blue-filled)" />,
      color: "blue",
      ...opts,
    });
  },
} as const;
