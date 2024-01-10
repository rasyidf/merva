import { create } from "zustand";

type Notification = {
  id: number;
  message: string;
  type: "info" | "error";
};

type NotificationStore = {
  notifications: Notification[];
  pushNotification: (message: string, type: "info" | "error") => void;
  scheduleNotification: (message: string, type: "info" | "error", delay: number) => void;
  immediateNotification: (message: string, type: "info" | "error") => void;
};

const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  pushNotification: (message, type) =>
    set((state) => ({
      notifications: [...state.notifications, { id: Date.now(), message, type }],
    })),
  scheduleNotification: (message, type, delay) =>
    setTimeout(() => {
      set((state) => ({
        notifications: [...state.notifications, { id: Date.now(), message, type }],
      }));
    }, delay),
  immediateNotification: (message, type) =>
    set((state) => ({
      notifications: [...state.notifications, { id: Date.now(), message, type }],
    })),
}));

export { useNotificationStore };
