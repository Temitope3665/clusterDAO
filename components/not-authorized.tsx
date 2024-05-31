'use client';
import Image from 'next/image';
import EmptyDAO from '@/assets/icons/empty-icon.png';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { IConnectWalletContext } from '@/libs/types';
import { cn } from '@/libs/utils';

interface INotAuthorized {
  description: string;
}

const NotAuthorized = ({ description }: INotAuthorized) => {
  const router = useRouter();
  const { handleConnectWallet } =
    useContext<IConnectWalletContext>(ConnectWalletContext);
  return (
    <div
      className={cn(
        'min-h-[80vh] w-full p-8 text-center flex items-center justify-center'
      )}
    >
      <div className="w-[90%] space-y-6 font-light text-sm">
        <Image src={EmptyDAO} alt="DAO empty" width={100} className="mx-auto" />
        <h1 className="dark:text-white text-dark text-[18px] lg:text-[28px]">
          User Not Authorized...
        </h1>
        <p>{description}</p>
        <p>Connect you wallet and try again. </p>
        <div className="flex space-x-3 justify-center">
          <Button
            variant="outline"
            className="px-10"
            onClick={() => router.back()}
          >
            Go Back
          </Button>
          <Button onClick={handleConnectWallet}>Connect Wallet</Button>
        </div>
      </div>
    </div>
  );
};

export default NotAuthorized;
