
import React, { useEffect } from 'react';
import { useMantineTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import NotificationService, { Notification, NotificationSettings } from './NotificationService';

interface NotificationServiceWrapperProps {
    children: React.ReactNode;
}

const NotificationServiceWrapper = ({ children }: NotificationServiceWrapperProps) => {
    const notificationService = new NotificationService();
    const theme = useMantineTheme();

    useEffect(() => {
        // Schedule a notification to be shown after login
        const loginNotification: Notification = {
            id: 'login-notification',
            type: 'info',
            message: 'Welcome back!',
            date: new Date(),
        };
        notificationService.scheduleNotification(loginNotification.type, loginNotification.message, loginNotification.date);

        // Schedule a notification to be shown on first time accessing dashboard
        const dashboardNotification: Notification = {
            id: 'dashboard-notification',
            type: 'info',
            message: 'Welcome to the dashboard!',
            date: new Date(),
        };
        const isFirstTimeAccessingDashboard = sessionStorage.getItem('isFirstTimeAccessingDashboard') === null;
        if (isFirstTimeAccessingDashboard) {
            notificationService.scheduleNotification(dashboardNotification.type, dashboardNotification.message, dashboardNotification.date);
            sessionStorage.setItem('isFirstTimeAccessingDashboard', 'false');
        }
    }, []);

    const showNotification = (type: Notification['type'], message: Notification['message']) => {
        const notification: Notification = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            message,
            date: new Date(),
        };
        notificationService.showNotification(notification.type, notification.message);
        // pushNotification({
        //     title: notification.type.charAt(0).toUpperCase() + notification.type.slice(1),
        //     message: notification.message,
        //     color: theme.colors[notification.type]?.[6],
        //     icon: notification.type,
        // });
    };

    const getNotifications = () => {
        return notificationService.getNotifications();
    };

    const getSettings = () => {
        return notificationService.getSettings();
    };

    const updateSettings = (settings: NotificationSettings) => {
        notificationService.updateSettings(settings);
    };

    return (
        <>
            {children}
            <Notifications />
        </>
    );
};

export default NotificationServiceWrapper;
