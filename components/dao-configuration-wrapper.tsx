import { Info } from 'lucide-react';
import { Button } from './ui/button';
import { ReactNode, useContext, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CREATE_PROPOSAL_URL } from '@/config/path';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { IConnectWalletContext } from '@/libs/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { removeExistingStorageItem, wait } from '@/libs/utils';
import { EachDaoContext } from '@/context/each-dao-context';

interface IDaoConfigurationWrapper {
  children: ReactNode;
}

const DaoConfigurationWrapper = ({ children }: IDaoConfigurationWrapper) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);
  const { isMember, currentDAO } = useContext(EachDaoContext);
  const searchParams = useSearchParams();
  const { user } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const { isConnected } = user;
  const currentPage = searchParams.get('q');
  const [open, setOpen] = useState(false);

  const handlePropose = () => {
    setIsPending(true);
    wait().then(() => {
      removeExistingStorageItem('new_proposal');
      router.push(
        `${CREATE_PROPOSAL_URL}?enums=${
          currentPage === 'Profile' ? '5' : '7'
        }&ct=${currentDAO.id}`
      );
      setIsPending(false);
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-dark dark:text-white text-xl font-medium">
          Profile
        </h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            {isConnected && (
              <>
                {' '}
                {isMember && (
                  <Button onClick={() => setOpen(true)}>Edit Settings</Button>
                )}
              </>
            )}
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle className="text-[#292929] dark:text-white font-medium py-3">
                Add Member
              </DialogTitle>
              <DialogDescription className="font-light py-2">
                You have to make a proposal before you can add members to the
                DAO. Do you want to make a proposal now?
              </DialogDescription>
            </DialogHeader>

            <Button
              className="w-full"
              onClick={handlePropose}
              loading={isPending}
              loadingText="Please wait..."
            >
              Propose
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex space-x-1 items-center text-xs text-[#888888]">
        <Info size={14} />
        <p>
          To make changes to the settings, create a proposal and put it to vote
          in your DAO.
        </p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default DaoConfigurationWrapper;
