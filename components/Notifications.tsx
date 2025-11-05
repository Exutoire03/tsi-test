'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface NotificationData {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error';
}

interface NotificationContextType {
  addNotification: (message: string, type?: 'info' | 'success' | 'error') => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifier = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifier must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const addNotification = useCallback((message: string, type: 'info' | 'success' | 'error' = 'info') => {
    const id = new Date().getTime();
    setNotifications(currentNotifications => [...currentNotifications, { id, message, type }]);

    // Auto-dismiss notification after 5 seconds
    setTimeout(() => {
      setNotifications(currentNotifications =>
        currentNotifications.filter(notification => notification.id !== id)
      );
    }, 5000);
  }, []);

  const removeNotification = (id: number) => {
    setNotifications(currentNotifications =>
      currentNotifications.filter(notification => notification.id !== id)
    );
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div className="fixed top-5 right-5 z-[100] w-80 space-y-3">
        {notifications.map(notification => (
          <div
            key={notification.id}
            onClick={() => removeNotification(notification.id)}
            className={`rounded-lg shadow-lg p-4 cursor-pointer animate-fade-in-right ${notification.type === 'success' ? 'bg-green-500' : notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'} text-white`}
          >
            <p className="font-bold">Notification</p>
            <p>{notification.message}</p>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
