import { createContext, useEffect, useState } from 'react';
import { ConnectWalletProvider } from './connect-wallet-context';
import { getNucleusDAO, getBasicDAO } from '@/libs/ae-utils';
import {
  IAppProvider,
  INewProposal,
  IProposal,
  InewDaoInfo,
} from '@/libs/types';
import {
  defaultDaoCreation,
  defaultProposal,
  getDuration,
  getStatus,
} from '@/libs/utils';
import { VIEW_DAO_URL } from '@/config/path';
import { useQuery } from '@tanstack/react-query';
import { DAOS_KEY, PROPOSAL_KEY } from '@/libs/key';
import { getAllProposals, getDAOs } from '@/libs/contract-call';

export const AppContext = createContext<any>({});

export const AppContextProvider = ({ children }: IAppProvider) => {
  const [newDaoInfo, setNewDaoInfo] = useState<InewDaoInfo>(defaultDaoCreation);
  const [newProposalInfo, setNewProposalInfo] =
    useState<INewProposal>(defaultProposal);

  const getNewDaoInfo =
    typeof window !== 'undefined' && sessionStorage.getItem('new_dao');

  const getNewProposalInfo =
    typeof window !== 'undefined' && localStorage.getItem('new_proposal');

  useEffect(() => {
    if (getNewDaoInfo) {
      setNewDaoInfo(JSON.parse(getNewDaoInfo));
    }
  }, []);

  useEffect(() => {
    if (getNewProposalInfo) {
      setNewProposalInfo(JSON.parse(getNewProposalInfo));
    }
  }, []);

  const updateNewDaoInfo = (data: any) => {
    setNewDaoInfo(data);
  };

  const {
    data,
    isPending: daoLoading,
    isError: isDaoError,
  } = useQuery({
    queryKey: [DAOS_KEY],
    queryFn: getDAOs,
    retry: false,
  });

  const DAOsData =
    data &&
    data.map((dao: any) => {
      return {
        organisation: dao.name,
        image: dao.image,
        activeMember: dao.members.length.toString(),
        activeProposal: `${dao.totalProposals}(${dao.activeProposals})`,
        description: dao.description,
        members: dao.members,
        votes: dao.totalVotes,
        url: encodeURI(
          window.location.origin + VIEW_DAO_URL + '/' + dao.id + '/dashboard'
        ),
      };
    });

  const {
    data: allProposals,
    isLoading: isLoadingProposal,
    isError: isProposalError,
  } = useQuery({
    queryFn: getAllProposals,
    queryKey: [PROPOSAL_KEY],
    retry: false,
  });

  const proposals =
    allProposals &&
    allProposals.map((proposal: IProposal) => {
      return {
        ...proposal,
        type: proposal.proposalType,
        status: getStatus(proposal),
        wallet: proposal.target.slice(0, 6) + '...' + proposal.target.slice(-4),
        duration: getDuration(proposal.startTime, proposal.endTime),
        totalVote: `${proposal.votesFor + proposal.votesAgainst}`,
        organisation: proposal.daoName,
        proposer:
          proposal.proposer.slice(0, 6) + '...' + proposal.proposer.slice(-4),
      };
    });

  const createDAO = async (
    name: string,
    id: string,
    description: string,
    image: string,
    socials: string[],
    initialMembers: string[],
    startingBalance: number,
    votingTime: number,
    quorum: number
  ) => {
    const contract = await getNucleusDAO();
    const res = await contract.createDAO(
      name,
      id,
      description,
      image,
      socials,
      initialMembers,
      startingBalance,
      votingTime,
      quorum
    );
    const dao = res.decodedResult;
    return dao;
  };

  const createProposal = async (
    daoContractAddress: string,
    proposalType: string,
    description: string,
    value: number,
    target: string,
    info: {
      name: string;
      socials: { name: string; url: string }[];
      image: string;
    }
  ) => {
    const contract = await getBasicDAO(daoContractAddress);
    const res = await contract.createProposal(
      proposalType,
      description,
      value,
      target,
      info
    );
    const proposal = res.decodedResult;
    return proposal;
  };

  const isUserMemberOfDAO = async (
    daoContractAddress: string,
    userAddress: string
  ) => {
    const contract = await getBasicDAO(daoContractAddress);
    const res = await contract.isMember(userAddress);
    return res.decodedResult;
  };

  const getAUserActivitiesAcrossDAOs = async (userAddress: string) => {
    const contract = await getNucleusDAO();
    const res = await contract.getUserActivitiesAcrossDAOs(userAddress);
    const activities = res.decodedResult;
    return activities;
  };

  const getUsersActivities = async (daoContractAddress: string) => {
    const contract = await getBasicDAO(daoContractAddress);
    const res = await contract.getAllMembersActivities();
    const activities = res.decodedResult;
    for (let i = 0; i < activities.length; i++) {
      let activity = activities[i];
      for (let key in activity) {
        if (typeof activity[key] == 'bigint') {
          activity[key] = Number(activity[key]);
        }
      }
    }
    return activities;
  };

  const getProposals = async (daoContractAddress: string) => {
    const contract = await getBasicDAO(daoContractAddress);
    const res = await contract.getProposals();
    const proposals = res.decodedResult;
    for (let i = 0; i < proposals.length; i++) {
      let proposal = proposals[i];
      for (let key in proposal) {
        if (typeof proposal[key] == 'bigint') {
          proposal[key] = Number(proposal[key]);
        }
      }
    }
    return proposals;
  };

  const value = {
    createDAO,
    createProposal,
    getProposals,
    daoLoading,
    DAOsData,
    isLoadingProposal,
    proposals,
    isProposalError,
    isDaoError,
    updateNewDaoInfo,
    newDaoInfo,

    getUsersActivities,

    newProposalInfo,
    setNewProposalInfo,

    getAUserActivitiesAcrossDAOs,
    isUserMemberOfDAO,
  };

  return (
    <ConnectWalletProvider>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </ConnectWalletProvider>
  );
};
