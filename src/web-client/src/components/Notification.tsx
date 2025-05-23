import React from 'react';
import { NotificationWrapper } from './GameStyles';

interface NotificationProps {
  show: boolean;
  children: React.ReactNode;
}

const Notification: React.FC<NotificationProps> = ({ show, children }) => {
  if (!show) return null;
  return <NotificationWrapper>{children}</NotificationWrapper>;
};

export default Notification;
