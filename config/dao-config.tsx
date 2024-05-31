import {
  CoinIcon,
  DashboardIcon,
  MemebersIcon,
  OpenDaoIcon,
  PeopleIcon,
  ProposalIcon,
} from '@/assets/svgs';
import { ReactNode } from 'react';
import { DAO_INFO_URL } from './path';
import { Settings } from 'lucide-react';

const DaoTemplateList: {
  title: string;
  description: string;
  href: string;
  status: string;
  color: string;
  icon: ReactNode;
}[] = [
  {
    title: 'Basic DAO',
    description:
      'Equal voting power. Add or remove members via proposal. One wallet, one vote.',
    href: DAO_INFO_URL,
    status: '',
    icon: <PeopleIcon size="40" />,
    color: '#9050E9',
  },
  {
    title: 'Open DAO',
    description: 'Token holders can participate in decision-making processes.',
    href: '#',
    status: 'Coming Soon',
    icon: <OpenDaoIcon />,
    color: '#0080FF',
  },
];

const proposalLists: { title: string; enums: number; type: string }[] = [
  {
    title: 'Propose a transfer',
    type: 'transfer',
    enums: 0,
  },
  {
    title: 'Propose to add a new member to the group',
    type: 'addMember',
    enums: 1,
  },
  {
    title: 'Propose to remove a member from the group',
    type: 'removeMember',
    enums: 2,
  },
  {
    title: 'Propose to change voting time',
    type: 'updateVoteTime',
    enums: 3,
  },
  {
    title: 'Propose to change the quorum',
    type: 'updateQuorum',
    enums: 4,
  },
  {
    title: 'Propose to change DAO’s name',
    type: 'updateName',
    enums: 5,
  },
  {
    title: 'Propose to change DAO’s logo',
    type: 'updateImage',
    enums: 6,
  },
  {
    title: 'Propose to add social links',
    type: 'updateSocials',
    enums: 7,
  },
  {
    title: 'Custom',
    type: 'custom',
    enums: 8,
  },
  {
    title: 'New Member: Join DAO',
    type: 'join',
    enums: 9,
  },
];

interface IProposalSummary {
  description: string;
  type: string;
  targetWallet: string;
  value?: string;
  duration: string;
  logo?: string;
  address: string;
  socialMedia?: { type: string; link: string }[];
}

export const rate = 0.040166;

const proposalSummary = ({
  description,
  type,
  targetWallet,
  value,
  duration,
  address,
  logo,
  socialMedia,
}: IProposalSummary): { title: string; desc: string | any }[] => [
  {
    title: 'Title',
    desc: proposalLists[Number(type)].title || '',
  },
  {
    title: 'Description',
    desc: description || '',
  },
  {
    title: 'Target Wallet',
    desc: targetWallet || '',
  },
  {
    title: 'Value',
    desc: `$${rate * Number(value)}`,
  },
  {
    title: 'Duration',
    desc: `${duration} ${Number(duration) > 1 ? 'days' : 'day'}`,
  },
  {
    title: 'Logo',
    desc: logo || '',
  },
  {
    title: 'Social Media',
    desc: socialMedia || [],
  },
  {
    title: 'Published by',
    desc: `${address.slice(0, 15)}...`,
  },
];

const eachDaoViews = [
  {
    title: 'Dashboard',
    icon: <DashboardIcon size="18" />,
    path: 'dashboard',
  },
  {
    title: 'Proposals',
    icon: <ProposalIcon />,
    path: 'proposals',
  },
  {
    title: 'Funds',
    icon: <CoinIcon />,
    path: 'funds',
  },
  {
    title: 'Members',
    icon: <MemebersIcon />,
    path: 'members',
  },
  {
    title: 'Settings',
    icon: <Settings size={20} />,
    path: 'settings',
  },
];

export { DaoTemplateList, proposalLists, proposalSummary, eachDaoViews };
