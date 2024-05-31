import { ReactNode } from "react";
import { Bell2, DisplayIcon, OnePersonicon } from '@/assets/svgs';
import {
  SETTINGS_DISPLAY_URL,
  SETTINGS_NOTIFICATIONS_URL,
  SETTINGS_URL,
} from '@/config/path';

export const settingsSidebarLinks: {
    title: string;
    href: string;
    icon: ReactNode;
  }[] = [
    {
      title: 'My Profile',
      icon: <OnePersonicon />,
      href: SETTINGS_URL,
    },
    {
      title: 'Notifications',
      icon: <Bell2 width="23" height="26" />,
      href: SETTINGS_NOTIFICATIONS_URL,
    },
    {
      title: 'Display',
      icon: <DisplayIcon />,
      href: SETTINGS_DISPLAY_URL,
    },
  ];