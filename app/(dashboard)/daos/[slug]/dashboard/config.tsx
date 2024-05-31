import { CoinIcon, MemebersIcon, ProposalIcon } from '@/assets/svgs';
import { ReactNode } from 'react';
import { DaoFunds } from './component/dao-fund';
import { DaoProposals } from './component/dao-proposals-summary';
import { DaoMembers } from './component/dao-members-summary';

interface ITabView {
  [key: string]: ReactNode;
}

interface IDashboardTab {
  aeAmount: number | string;
  usdAmount: number | string;
  totalProposals: number;
  totalMembers: number;
  percentageIncreaseForMembers: number;
  percentageIncreaseForFunds: number;
  percentageIncreaseForProposals: number;
}

const dashboardTab = ({
  aeAmount = 0,
  usdAmount = 0,
  totalProposals,
  totalMembers,
  percentageIncreaseForFunds,
  percentageIncreaseForProposals,
  percentageIncreaseForMembers,
}: IDashboardTab): {
  title: string;
  id: string;
  rate: number;
  amount: number | string;
  value?: string;
  increase: boolean;
  icon: ReactNode;
}[] => [
  {
    title: 'Dao Funds',
    id: '01',
    amount: usdAmount,
    value: `~ ${aeAmount} AE`,
    rate: percentageIncreaseForFunds,
    increase: false,
    icon: <CoinIcon size="32" />,
  },
  {
    title: 'Proposals',
    amount: totalProposals,
    id: '02',
    rate: percentageIncreaseForProposals,
    increase: false,
    icon: <ProposalIcon size="32" />,
  },
  {
    title: 'Members',
    amount: totalMembers,
    id: '03',
    rate: percentageIncreaseForMembers,
    increase: percentageIncreaseForMembers < 0 ? false : true,
    icon: <MemebersIcon size="32" />,
  },
];

const tabView: ITabView = {
  0: <DaoFunds />,
  1: <DaoProposals />,
  2: <DaoMembers />,
};

export { dashboardTab, tabView };
