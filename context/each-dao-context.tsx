'use client';
import { ReactNode, createContext, useContext, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { getDuration, getStatus } from '@/libs/utils';
import { IConnectWalletContext, IProposal } from '@/libs/types';
import { ConnectWalletContext } from './connect-wallet-context';
import { useQuery } from '@tanstack/react-query';
import { EACH_DAO_KEY, EACH_DAO_PROPOSAL, MEMBER_ACTIVIES } from '@/libs/key';
import {
  getAllUsersActivities,
  getEachDAO,
  getProposals,
} from '@/libs/contract-call';
import { PROPOSALS_URL } from '@/config/path';

export const EachDaoContext = createContext<any>({});

interface IAppProvider {
  children: ReactNode;
}

export interface IDAO {
  name: string;
  contractAddress: string;
  description: string;
  image: string;
  socials: string[];
  votingTime: number;
  quorum: number;
  proposals: IProposal[];
  totalProposals: number;
  members: string[];
}

export const EachDaoContextProvider = ({ children }: IAppProvider) => {
  const pathname = usePathname();
  const { user } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const [memberHistory, setMemberHistory] = useState([]);
  const [proposalHistory, setProposalHistory] = useState([]);
  const [fundsHistory, setFundsHistory] = useState([]);
  const searchParams = useSearchParams();
  const getDaoId = searchParams.get('dao') || searchParams.get('ct') || '';

  const urlParts = pathname.split('/'); // Split the URL by "/"
  const daoId = pathname.startsWith(PROPOSALS_URL) ? getDaoId : urlParts[2];

  const {
    data: currentDAO,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [EACH_DAO_KEY, daoId],
    queryFn: () => getEachDAO(daoId),
    enabled: !!daoId,
  });

  console.log(currentDAO, '-> current DAO');

  const isMember = currentDAO?.members?.includes(user.address);

  const {
    data: proposals,
    isLoading: isProposalLoading,
    isError: isProposalError,
    error: proposalError,
  } = useQuery({
    queryKey: [EACH_DAO_PROPOSAL, daoId, currentDAO?.contractAddress],
    queryFn: () => getProposals(currentDAO.contractAddress),
    enabled: !!currentDAO?.contractAddress,
  });

  const eachDAOProposal =
    proposals &&
    proposals.reverse().map((proposal: IProposal) => {
      return {
        ...proposal,
        type: proposal.proposalType,
        status: getStatus(proposal),
        wallet: proposal.target.slice(0, 6) + '...' + proposal.target.slice(-4),
        duration: getDuration(proposal.startTime, proposal.endTime),
        totalVote: `${proposal.votesFor + proposal.votesAgainst}`,
        organisation: currentDAO.name,
        proposer:
          proposal.proposer.slice(0, 6) + '...' + proposal.proposer.slice(-4),
        id: Number(proposal.id).toString(),
      };
    });

  const {
    data: membersActivities,
    isLoading: memberLoading,
    error: memberError,
  } = useQuery({
    queryKey: [MEMBER_ACTIVIES, daoId, currentDAO?.contractAddress],
    queryFn: () => getAllUsersActivities(currentDAO.contractAddress),
    enabled: !!currentDAO?.contractAddress,
  });

  const value = {
    eachDAOProposal,
    membersActivities,
    isLoading,
    currentDAO,
    isProposalError,
    proposalError,
    memberError,

    isMember,
    memberLoading,
    isProposalLoading,

    error,
    isError,

    setMemberHistory,
    memberHistory,
    proposalHistory,
    setProposalHistory,
    fundsHistory,
    setFundsHistory,
  };

  return (
    <EachDaoContext.Provider value={value}>{children}</EachDaoContext.Provider>
  );
};
