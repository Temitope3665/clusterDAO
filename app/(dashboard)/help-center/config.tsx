import { ReactNode } from "react";
import { ComplaintIcon, IdeaIcon, QuestionIcon } from '@/assets/svgs';
import {
  HELP_CENTER_OTHERS_URL,
  HELP_CENTER_REPORT_URL,
  HELP_CENTER_URL,
} from '@/config/path';

export const helpCenterLinks: {
    title: string;
    href: string;
    icon: ReactNode;
  }[] = [
    {
      title: 'New Feature',
      icon: <IdeaIcon />,
      href: HELP_CENTER_URL,
    },
    {
      title: 'Report',
      icon: <ComplaintIcon />,
      href: HELP_CENTER_REPORT_URL,
    },
    {
      title: 'Others',
      icon: <QuestionIcon />,
      href: HELP_CENTER_OTHERS_URL,
    },
  ];