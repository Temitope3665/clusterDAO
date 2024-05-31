import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CopyIcon, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { ReactNode, useContext } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'sonner';

interface IConnectWalletPopOver {
  callToAction: ReactNode;
}

const ConnectWalletPopOver = ({ callToAction }: IConnectWalletPopOver) => {
  const { handleConnectWallet, user, isConnecting, handleDisconnect } =
    useContext<any>(ConnectWalletContext);
  const connected: boolean = user.isConnected;

  return (
    <Popover>
      <PopoverTrigger asChild>{callToAction}</PopoverTrigger>
      <PopoverContent
        className="mt-2 px-6 pt-3 pb-8 md:w-[80%]"
        style={{ boxShadow: '0px 4px 10px 0px #00000040' }}
      >
        <div className=" space-y-3">
          {connected ? (
            <>
              <div
                className="dark:bg-gradient-to-r dark:from-[#1E1E1E] dark:via-[#1E1E1E] dark:to-[#252525] bg-white h-11 rounded-lg flex items-center dark:text-[#888888] p-3 text-[12px] space-x-3 text-dark"
                role="button"
              >
                <img
                  src={`https://avatars.z52da5wt.xyz/${user.address}`}
                  alt="logo"
                  width={28}
                />
                <p className="overflow-hidden text-ellipsis">{user.address}</p>
                <CopyToClipboard
                  text={user.address}
                  onCopy={() => toast.success('User address copied!')}
                >
                  <CopyIcon size={20} />
                </CopyToClipboard>
              </div>
              <div
                className="dark:bg-[#1E1E1E] bg-white h-11 rounded-lg flex items-center dark:text-[#888888] p-3 text-[12px] space-x-3 text-dark"
                role="button"
                onClick={handleDisconnect}
              >
                <LogOut size={20} />
                <p>Disconnect</p>
              </div>
            </>
          ) : (
            <Button
              onClick={handleConnectWallet}
              loading={isConnecting}
              loadingText="Connecting..."
            >
              Connect Wallet
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ConnectWalletPopOver;
