import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { Button } from './ui/button';
import { useContext } from 'react';
import { IConnectWalletContext } from '@/libs/types';
import Image from 'next/image';
import EmptyDAO from '@/assets/icons/empty-icon.png';

interface IConnectWalletCTA {
  description: string;
}

const ConnectWalletCallToAction = ({ description }: IConnectWalletCTA) => {
  const { handleConnectWallet } =
    useContext<IConnectWalletContext>(ConnectWalletContext);
  return (
    <div className="text-center space-y-4 items-center">
      <Image src={EmptyDAO} alt="DAO empty" width={100} className="mx-auto" />
      <h1 className="dark:text-white text-dark text-[16px]">{description}</h1>

      <Button onClick={handleConnectWallet}>Connect Wallet</Button>
    </div>
  );
};

export default ConnectWalletCallToAction;
