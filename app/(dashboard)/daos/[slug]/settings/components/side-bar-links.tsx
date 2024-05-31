'use client';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { IConnectWalletContext } from '@/libs/types';
import { cn, removeExistingStorageItem, wait } from '@/libs/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useContext, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CREATE_PROPOSAL_URL } from '@/config/path';
import { EachDaoContext } from '@/context/each-dao-context';

export const daoSettingsSidebarLinks: { title: string }[] = [
  {
    title: 'Profile',
  },
  {
    title: 'Links',
  },
  {
    title: 'Exit DAO',
  },
];

interface ISidebarLinksComp {
  activeSidebar: string;
  isMember: boolean;
}

const SidebarLinksComp = ({ activeSidebar, isMember }: ISidebarLinksComp) => {
  const router = useRouter();
  const { currentDAO } = useContext(EachDaoContext);
  const [open, setOpen] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const { user } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const { isConnected, address } = user;
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleOnClick = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 200);

  const handlePropose = () => {
    setIsPending(true);
    wait().then(() => {
      removeExistingStorageItem('new_proposal');
      router.push(
        `${CREATE_PROPOSAL_URL}?enums=2&ct=${currentDAO.id}&address=${address}`
      );
      setIsPending(false);
    });
  };

  console.log(currentDAO, '0> currentDAO');

  return (
    <div className="md:space-y-4 text-[#888888] text-sm flex md:block">
      {daoSettingsSidebarLinks
        .slice(0, isConnected && isMember ? 3 : 2)
        .map((link) => (
          <div
            key={link.title}
            className={cn(
              'py-2 rounded-lg px-4',
              link.title === 'Exit DAO' && 'text-[#DD3857]',
              activeSidebar === link.title &&
                'dark:bg-[#1E1E1E] dark:text-white bg-light text-dark'
            )}
            onClick={() => {
              link.title === 'Exit DAO'
                ? setOpen(true)
                : handleOnClick(link.title);
            }}
            role="button"
          >
            {link.title}
          </div>
        ))}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle className="text-[#292929] dark:text-white font-medium py-3">
              Remove Member
            </DialogTitle>
            <DialogDescription className="font-light py-2">
              You have to make a proposal before you can remove yourself from
              this DAO. Do you want to make a proposal now?
            </DialogDescription>
          </DialogHeader>

          <Button
            className="w-full"
            onClick={handlePropose}
            loadingText="Please wait..."
            loading={isPending}
          >
            Propose
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SidebarLinksComp;
