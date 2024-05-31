'use client';

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  IN_FRAME,
  IS_MOBILE,
  MAINNET_NODE_URL,
  TESTNET_NODE_URL,
  connectWallet,
  resolveWithTimeout,
} from '@/libs/ae-utils';
import {
  BrowserWindowMessageConnection,
  walletDetector,
} from '@aeternity/aepp-sdk';
import ConfirmWalletDialog from './component/confirm-wallet';
import ConfirmDisconnectWallet from './component/confirm-disconnect';
import { usePathname, useSearchParams } from 'next/navigation';
import { HandleWalletFunction, IConnectWalletContext } from '@/libs/types';
import { HOME_URL } from '@/config/path';
import { AppContext } from './app-context';
import { AeSdkAepp, Node } from '@aeternity/aepp-sdk';

export const ConnectWalletContext = createContext<IConnectWalletContext>({
  user: { address: '', isConnected: false },
  isConnecting: false,
  aeSdk: null,
});

interface IAppProvider {
  children: ReactNode;
}

interface IUser {
  address: string;
  isConnected: boolean;
}

export interface IContext {
  user: IUser;
  handleConnectWallet: () => any;
}

export const ConnectWalletProvider = ({ children }: IAppProvider) => {
  // const getUser = typeof window !== 'undefined' && localStorage.getItem('user');
  const pathname = usePathname();
  const defaultUser = { address: '', isConnected: false };
  const { getActivities } = useContext(AppContext);

  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>(defaultUser);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showDisconnectModal, setShowDisconnectModal] =
    useState<boolean>(false);
  const searchParams = useSearchParams();
  const address = searchParams.get('address') || '';

  const [wallets, setWallets] = useState<any>([]);
  const [scanningForWallets, setScanningForWallets] = useState<boolean>(false);
  const [_, setConnectingTo] = useState<any>(null);
  const [__, setConnectingToWallet] = useState<boolean>(false);
  const [___, setEnableIFrameWallet] = useState<boolean>(false);

  const aeSdk: any = new AeSdkAepp({
    name: 'NucleusDAO',
    nodes: [
      { name: 'testnet', instance: new Node(TESTNET_NODE_URL) },
      { name: 'mainnet', instance: new Node(MAINNET_NODE_URL) },
    ],
    onNetworkChange: async ({ networkId }) => {
      const [{ name }] = (await aeSdk.getNodesInPool()).filter(
        (node: any) => node.nodeNetworkId === networkId
      );
      aeSdk.selectNode(name);
    },
    onAddressChange: ({ current }: any) => {
      const currentAccountAddress = Object.keys(current)[0];
      if (!currentAccountAddress) return;
      const user = { address: currentAccountAddress, isConnected: true };
      setUser(user);
    },
    onDisconnect: () => console.log('Aepp is disconnected'),
  });

  const [connectionError, setConnectionError] = useState<{
    message: string;
    type: string;
  }>({ message: '', type: '' });

  const addDefaultWallet = () => {
    setWallets([
      {
        getConnection: null,
        info: {
          id: 'wallet.superhero.com',
          name: 'Superhero',
          networkId: process.env.NEXT_APP_DEFAULT_NETWORK || '', // Change this to your desired value
          type: 'website',
          description: 'Easy-to-use wallet', // Change this to your desired value
        },
      },
    ]);
  };

  const isHome = pathname === HOME_URL;

  const handleConnectWallet = async () => {
    setOpenModal(true);
    if (IS_MOBILE && !IN_FRAME) {
      addDefaultWallet();
    } else {
      setScanningForWallets(true);
      const scannerConnection = new BrowserWindowMessageConnection();

      let stopScan: any = null;

      const walletScanningTimeout = setTimeout(() => {
        stopScan?.();
        addDefaultWallet();
        setScanningForWallets(false);
      }, 5000);

      const handleWallet: HandleWalletFunction = async ({ wallets }: any) => {
        const updatedWallets = Object.values(wallets).map((wallet: any) => ({
          ...wallet,
          description: 'Superhero Wallet', // Change this to your desired value
        }));
        setWallets(updatedWallets);
        setScanningForWallets(false);

        clearTimeout(walletScanningTimeout);
        stopScan?.();
        setScanningForWallets(false);
      };

      stopScan = walletDetector(scannerConnection, handleWallet);
    }
  };

  const handleConnect = async (walletObj: any) => {
    if (isConnecting) return;
    setIsConnecting(true);
    setConnectingTo(walletObj.info.id);
    let watchUntilTruly: any = null;

    try {
      await resolveWithTimeout(5000, async () => {});
    } catch (error) {
      alert('connect wallet timeout');
      setIsConnecting(false);
      setConnectingTo(null);
      return;
    }

    await connectWallet({
      setConnectingToWallet,
      setEnableIFrameWallet,
      setUser,
      address,
      setConnectionError,
      setOpenModal,
      walletObj,
      // isHome,
      aeSdk,
    });
    setIsConnecting(false);
    setConnectingTo(null);
  };

  useEffect(() => {
    if (address) {
      setUser({ address, isConnected: true });
      localStorage.setItem(
        'user',
        JSON.stringify({ address, isConnected: true })
      );
    }
  }, [address]);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDisconnect = () => {
    setShowDisconnectModal(true);
  };

  const value = {
    handleConnectWallet,
    user,
    isConnecting,
    handleDisconnect,
    setUser,
    aeSdk,
  };

  return (
    <ConnectWalletContext.Provider value={value}>
      {isClient && (
        <React.Fragment>
          <ConfirmWalletDialog
            isScanningWallet={scanningForWallets}
            isConnecting={isConnecting}
            walletInfo={wallets}
            open={openModal}
            setOpen={setOpenModal}
            handleConnect={handleConnect}
            wallets={wallets}
            connectionError={connectionError}
          />
          <ConfirmDisconnectWallet
            setOpen={setShowDisconnectModal}
            open={showDisconnectModal}
            setUser={setUser}
            defaultUser={defaultUser}
            aeSdk={aeSdk}
          />
          {children}
        </React.Fragment>
      )}
    </ConnectWalletContext.Provider>
  );
};
