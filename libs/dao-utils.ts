import { ConnectWalletParams, WalletConnection } from './types';

const clusterDAOContractAddress =
  'ct_yu1VWgPe3FrQTE1QesiiEB48Gw1dmrJTj8MSciNS5aoFTz6NY';

export const TESTNET_NODE_URL = 'https://testnet.aeternity.io';
export const MAINNET_NODE_URL = 'https://mainnet.aeternity.io';
export const COMPILER_URL = 'https://compiler.aepps.com';

interface DeepLinkParams {
  type: string;
  callbackUrl?: string;
  [key: string]: string | undefined; // Allow any additional parameters as strings
}

export const IN_FRAME =
  typeof window !== 'undefined' && window.parent !== window;
export const IS_MOBILE =
  typeof window !== 'undefined' && window.navigator.userAgent.includes('Mobi');
export const isSafariBrowser = () =>
  navigator.userAgent.includes('Safari') &&
  !navigator.userAgent.includes('Chrome');

export const resolveWithTimeout = (timeout: number, callback: any) =>
  Promise.race([
    callback(),
    new Promise((resolve, reject) =>
      setTimeout(() => {
        reject(new Error(`Promise TIMEOUT after ${timeout} ms`));
      }, timeout)
    ),
  ]);

export const getclusterDAO = async () => {
  return [];
};

export const getBasicDAO = async (DAOAddress: string) => {
  return [];
};
