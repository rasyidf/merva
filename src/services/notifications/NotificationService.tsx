import { useState } from 'react';
import { DefaultMantineColor, useMantineTheme } from '@mantine/core';
import { notifications } from "@mantine/notifications";

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface Notification {
    id: string;
    type: NotificationType;
    message: string;
    date: Date;
}

interface NotificationSettings {
    enableEmailNotifications: boolean;
    enablePushNotifications: boolean;
}

class NotificationService {
    private notifications: Notification[] = [];

    private settings: NotificationSettings = {
        enableEmailNotifications: true,
        enablePushNotifications: true,
    };

    constructor() {
        // Load notification settings from local storage
        const storedSettings = localStorage.getItem('notificationSettings');
        if (storedSettings) {
            this.settings = JSON.parse(storedSettings);
        }
    }

    public showNotification(type: NotificationType, message: string): void {
        const id = Math.random().toString(36).substr(2, 9);
        const date = new Date();
        const notification = { id, type, message, date };
        this.notifications.push(notification);
        addNotificationToDatabase(notification);
        this.showMantineNotification(type, message);
    }

    public scheduleNotification(type: NotificationType, message: string, date: Date): void {
        const id = Math.random().toString(36).substr(2, 9);
        const notification = { id, type, message, date };
        this.notifications.push(notification);
        addNotificationToDatabase(notification);
    }

    public getNotifications(): Notification[] {
        return this.notifications;
    }

    public getSettings(): NotificationSettings {
        return this.settings;
    }

    public updateSettings(settings: NotificationSettings): void {
        this.settings = settings;
        localStorage.setItem('notificationSettings', JSON.stringify(settings));
    }

    private showMantineNotification(type: NotificationType, message: string): void {
        notifications.show({
            color: typeToColor(type),
            message,
        })
    }
}

export default NotificationService;


function typeToColor(type: string): DefaultMantineColor {
    switch (type) {
        case 'success':
            return 'teal';
        case 'info':
            return 'cyan';
        case 'warning':
            return 'yellow';
        case 'error':
            return 'red';
        default:
            return 'cyan';
    }
}

