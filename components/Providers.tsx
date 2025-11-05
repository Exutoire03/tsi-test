'use client';

import { NotificationProvider } from './Notifications';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return <NotificationProvider>{children}</NotificationProvider>;
}
