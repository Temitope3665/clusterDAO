import { DaoIcon, DashboardIcon, ProposalIcon } from '@/assets/svgs';
import { DAO_URL, DASHBOARD_URL, HELP_CENTER_URL, PROPOSALS_URL, SETTINGS_URL } from '@/config/path';
import { Info, Settings } from 'lucide-react';
import { ReactNode } from 'react';

const topSidebarNav: { href: string; title: string; icon: ReactNode }[] = [
  {
    href: DASHBOARD_URL,
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    href: DAO_URL,
    title: 'DAOs',
    icon: <DaoIcon />,
  },
  {
    href: PROPOSALS_URL,
    title: 'Proposals',
    icon: <ProposalIcon />,
  },
];

const bottomSidebarNav: { href: string; title: string; icon: ReactNode }[] = [
  {
    href: SETTINGS_URL,
    title: 'Settings',
    icon: <Settings size={20} />,
  },
  {
    href: HELP_CENTER_URL,
    title: 'Help Center',
    icon: <Info size={20} />,
  }
];

export { topSidebarNav, bottomSidebarNav };
