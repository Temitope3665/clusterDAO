'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
// import { aeSdk } from '@/libs/ae-utils';

import { cn } from '@/libs/utils';
import { useState } from 'react';

interface IConfirmDisconnectWallet {
  setOpen: (arg: boolean) => void;
  open: boolean;
  defaultUser: { address: string; isConnected: boolean };
  setUser: (arg: { address: string; isConnected: boolean }) => void;
  aeSdk: any;
}

const ConfirmDisconnectWallet = ({
  setOpen,
  open,
  setUser,
  aeSdk,
}: IConfirmDisconnectWallet) => {
  const [disconnecting, _] = useState<boolean>(false);
  const handleDisconnect = async () => {
    try {
      localStorage.removeItem('user');
      setUser({ address: '', isConnected: false });
      await aeSdk.disconnectWallet(false);
    } catch (error) {
      console.error(error);
    }
    window.location.search = '';
  };

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild></AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-[#191919] bg-light">
        <AlertDialogHeader>
          <AlertDialogTitle
            className={cn('font-medium py-3 text-white text-center')}
          >
            Disconnect Wallet
          </AlertDialogTitle>
          <AlertDialogDescription className="font-light my-4 w-full text-center">
            Are you sure you want to disconnect your wallet?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid grid-cols-1 gap-4">
          <AlertDialogAction onClick={handleDisconnect}>
            {disconnecting ? 'Disconnecting...' : 'Continue'}
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDisconnectWallet;
