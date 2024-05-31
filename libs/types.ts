import { AeSdkMethods } from '@aeternity/aepp-sdk';
import { ReactNode } from 'react';

export type WalletInfo = {
  name: string;
  type: string;
  //   getConnection: () => Promise<any>
};

export type WalletConnection = {
  getConnection: () => Promise<any> | any; // Adjust any to the actual return type of getConnection
};

export type DeepLinkParams = {
  type: string;
  [key: string]: string | undefined; // Allow additional parameters with string values
};

export type User = {
  address: string;
  isConnected: boolean;
};

export type ConnectionError = {
  type: string;
  message: string;
};

export type ConnectWalletParams = {
  setConnectingToWallet: (value: boolean) => void;
  setEnableIFrameWallet: (value: boolean) => void;
  setUser: (user: User) => void;
  setConnectionError: (error: ConnectionError) => void;
  address?: string;
  setOpenModal: (arg: boolean) => void;
  // isHome: boolean;
  walletObj?: {
    info: WalletInfo;
    getConnection?: () => Promise<any> | any; // Adjust any to the actual return type of getConnection
  };
  aeSdk: any;
};

export type HandleWalletFunction = (wallets: { [key: string]: any }) => void;

export type WalletScanningParams = {
  setScanningForWallets: React.Dispatch<React.SetStateAction<boolean>>;
  setWallets: React.Dispatch<React.SetStateAction<any[]>>;
  addDefaultWallet: () => void;
};

export interface IConnectWalletContext {
  handleConnectWallet?: () => void;
  user: { address: string; isConnected: boolean };
  isConnecting: boolean;
  handleDisconnect?: () => void;
  aeSdk: AeSdkMethods | null;
}

export interface IApiContext {
  getAEPrice: { price: number };
}

export interface IUser {
  address: string;
  isConnected: boolean;
}

export interface InewDaoInfo {
  style: string;
  info: {
    daoName: string;
    daoUrl: string;
    about: string;
    socialMedia?: { link: string; type: string }[];
    logo: File | null;
    logoUrl: string;
  };
  members: { address: string }[];
  quorum: number;
  duration: number;
}

export interface IAllDaos {
  showDAO: boolean;
  isConnected: boolean;
  connectWalletDescription?: string;
  dashboardTableData: (arg: number) => {
    organisation: string;
    orgIcon: ReactNode;
    description: string;
    votes: string;
    url: string;
    activeMember: string;
    activeProposal: string;
  }[];
}

export type TotalProposalType = number;

export interface IAppProvider {
  children: ReactNode;
}

export interface IProposal {
  id: number;
  proposal: string;
  proposalType: string;
  description: string;
  daoId: string;
  proposer: string;
  value: number;
  target: string;
  startTime: number;
  endTime: number;
  votesFor: number;
  daoName: string;
  votesAgainst: number;
  isExecuted: boolean;
  votes: any[];
  hasVoted: any;
}

export interface IDAO {
  name: string;
  description: string;
  image: string;
  socials: string[];
  votingTime: number;
  quorum: number;
  proposals: IProposal[];
  totalProposals: number;
  members: string[];
}

export interface INewProposal {
  value: {
    type: string;
    logo: string;
    description: string;
    targetWallet: string;
    value: string;
    duration: number;
    quorum: number;
    socialMedia: { type: string; link: string }[];
  };
}

export type ICreateDAO = {
  members: string[];
  name: string;
  id: string;
  currentMembers: number;
};

export type ICreateUser = {
  address?: string;
  email: string;
  profilePicture: string;
  about: string;
  username: string;
};

export interface IEachProposalView {
  tabs: string[];
  // setCurrentProposal: (arg: IProposal[]) => void;
  currentProposal: {
    wallet: string;
    target: string;
    value: number;
    proposalType: string;
    daoName: string;
    quorum: number;
    description: string;
    votes: { account: string; support: boolean }[];
    type: string;
    info: {
      image: string;
      name: string;
      socials: { name: string; url: string }[];
    };
    status: string;
    totalVote: string;
    id: string;
    currentMembers: number;
    duration: string;
    startTime: number;
    endTime: number;
    proposer: string;
    votesFor: number;
    votesAgainst: number;
  };
}

export interface ICreateDAOS {
  name: string;
  id: string;
  description: string;
  image: string;
  socials: string[];
  initialMembers: string[];
  startingBalance: number;
  votingTime: number;
  quorum: number;
}

export interface ICreateProposal {
  daoContractAddress: string;
  proposalType: string;
  description: string;
  value: number;
  target: string;
  info: {
    name: string;
    socials: { name: string; url: string }[];
    image: string;
  };
}
