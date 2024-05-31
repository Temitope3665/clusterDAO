'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/libs/utils';
import SuperheroLogo from '@/assets/logos/superhero-icon.png';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import ErrorIcon from '@/assets/icons/error-icon-1.png';
import { createDeepLinkUrl } from '@/libs/ae-utils';
import { usePathname } from 'next/navigation';
import { DASHBOARD_URL, HOME_URL } from '@/config/path';

interface IConfirmWalletDialog {
  isScanningWallet: boolean;
  isConnecting: boolean;
  walletInfo: { info: any };
  open: boolean;
  setOpen: (arg: boolean) => void;
  handleConnect: (arg: any) => void;
  wallets: any[];
  connectionError: { type: string; message: string };
}

const ConfirmWalletDialog = ({ ...props }: IConfirmWalletDialog) => {
  const domainName = typeof window !== 'undefined' && window.location.origin;
  const dashboardURL = `${domainName}/${DASHBOARD_URL}/`;
  const pathname = usePathname();
  const isHome = pathname === HOME_URL;
  const handleConnectAgain = () => {
    let addressDeepLink: any;
    if (isHome) {
      addressDeepLink = createDeepLinkUrl({
        type: 'address',
        'x-success': `${
          dashboardURL.split('?')[0]
        }?address={address}&networkId={networkId}`,
        'x-cancel': dashboardURL.split('?')[0],
      });
    } else {
      addressDeepLink = createDeepLinkUrl({
        type: 'address',
        'x-success': `${
          window.location.href.split('?')[0]
        }?address={address}&networkId={networkId}`,
        'x-cancel': window.location.href.split('?')[0],
      });
    }
    if (typeof window !== 'undefined') {
      window.location.replace(addressDeepLink);
    }
  };

  return (
    <Dialog onOpenChange={props.setOpen} open={props.open}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent
        className={cn(isHome ? 'bg-[#191919]' : 'dark:bg-[#191919] bg-light')}
      >
        <DialogHeader>
          <DialogTitle
            className={cn('font-medium', isHome ? 'text-white' : '')}
          >
            {props.connectionError.type === 'denied'
              ? 'Connection Failed'
              : props.connectionError.type === 'timeout'
              ? 'Connection Timeout'
              : 'Connect Wallet'}
          </DialogTitle>
          <DialogDescription
            className={cn(
              'font-light my-4 w-full py-4 space-y-3',
              isHome ? 'text-defaultText' : 'text-dark dark:text-defaultText'
            )}
          >
            <p
              className={cn(
                isHome ? 'text-defaultText' : 'dark:text-defaultText text-dark'
              )}
            >
              Start by installing the Superhero Wallet browser extension on your
              preferred web browser.
            </p>
            {props.connectionError.type === 'denied' ||
            props.connectionError.type === 'timeout' ? (
              <div className="text-center space-y-4">
                <Image
                  src={ErrorIcon}
                  alt="error icon"
                  width={80}
                  className="mx-auto"
                />
                <p className="px-8">{props.connectionError.message}</p>
                <Button className="w-full" onClick={handleConnectAgain}>
                  Try again!
                </Button>
              </div>
            ) : (
              <div
                className={cn(
                  'p-2 border rounded-lg w-full bg-white border-white',
                  isHome
                    ? 'border-[#292929] bg-[#1E1E1E]'
                    : 'dark:border-[#292929] dark:bg-[#1E1E1E]'
                )}
              >
                {props.isScanningWallet ? (
                  <div className="flex items-center space-x-2 h-9">
                    <p>Scanning for wallet...</p>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </div>
                ) : (
                  <div>
                    {props.wallets.map((wallet) => (
                      <div
                        key={wallet.info.id}
                        className="flex items-center justify-between space-x-2"
                      >
                        <div className="flex items-center space-x-3 md:w-[60%]">
                          <div className="p-2 dark:bg-white bg-light rounded-lg">
                            <Image
                              src={SuperheroLogo}
                              alt={wallet.info.name}
                              width={30}
                            />
                          </div>
                          <h2
                            className={cn(
                              'text-[14px] md:text-[18px]',
                              isHome
                                ? 'text-white'
                                : 'dark:text-white text-dark'
                            )}
                          >
                            {wallet.info.name}
                            {wallet.info.name.includes('Wallet')
                              ? ''
                              : ' Wallet'}
                          </h2>
                        </div>
                        <Button
                          className="rounded-lg md:w-[30%] h-10 text-xs md:text-sm"
                          loading={props.isConnecting}
                          loadingText="Connecting..."
                          onClick={() => props.handleConnect(wallet)}
                        >
                          Connect
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmWalletDialog;
