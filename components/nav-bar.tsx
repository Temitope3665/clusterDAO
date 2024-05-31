'use client';
import SearchInput from './ui/search-input';
import { Button } from './ui/button';
import { ModeToggle } from './themes/mode-toggle';
import Image from 'next/image';
import { ChevronDown, Menu, UserRound, X } from 'lucide-react';
import LogoIcon from '@/assets/icons/clusterdao-purple.svg';
import Link from 'next/link';
import { DASHBOARD_URL } from '@/config/path';
import { BrandLogo } from '@/assets/svgs';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useContext } from 'react';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import ConnectWalletPopOver from './connect-popover';
import ViewNotificationPopover from './notification-popover';

interface INavbar {
  handleShowNav: (arg: any) => void;
  showNav: boolean;
}

const Navbar = ({ handleShowNav, showNav }: INavbar) => {
  const { handleConnectWallet, user, isConnecting } =
    useContext<any>(ConnectWalletContext);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const connected: boolean = user.isConnected;
  return (
    <nav className="flex dark:bg-foreground bg-light w-full md:w-[82%] py-4 px-4 md:px-8 justify-between items-center fixed z-[100] max-w-[1620px]">
      <div className="relative w-[40%] hidden md:flex">
        {/* <SearchInput
          placeholder="Search anything here"
          classNames="pl-10"
        /> */}
      </div>
      <div className="flex space-x-3 items-center w-full md:w-fit justify-between lg:justify-between">
        <Link href={DASHBOARD_URL} className="flex md:hidden">
          <div className="flex space-x-2 items-center">
            <Image id="logo" src={LogoIcon} alt="cluster Dao Logo" width={30} />
            <BrandLogo className="text-[#282828] dark:text-white w-[100px]" />
          </div>
        </Link>

        {connected ? (
          <div className="flex space-x-3 items-center">
            <ViewNotificationPopover />
            <>
              <ConnectWalletPopOver
                callToAction={
                  <div
                    className="dark:bg-primary bg-white h-11 w-12 justify-center rounded-lg flex md:hidden items-center relative dark:text-white text-[#444444]"
                    role="button"
                  >
                    <UserRound size={20} />
                  </div>
                }
              />

              <div
                className="dark:bg-gradient-to-r dark:from-[#1E1E1E] dark:via-[#1E1E1E] dark:to-[#252525] bg-white h-11 w-12 justify-center rounded-lg md:hidden flex items-center relative dark:text-white text-[#444444]"
                role="button"
                onClick={() => handleShowNav((prev: boolean) => !prev)}
              >
                {showNav ? <X /> : <Menu />}
              </div>
            </>
            <ConnectWalletPopOver
              callToAction={
                <div
                  className="dark:bg-gradient-to-r dark:from-[#1E1E1E] dark:via-[#1E1E1E] dark:to-[#252525] w-[280px] hidden bg-white h-11 justify-center rounded-lg md:flex items-center relative dark:text-[#888888] p-3 text-[12px] space-x-3 text-dark"
                  role="button"
                >
                  <img
                    src={`https://avatars.z52da5wt.xyz/${user.address}`}
                    alt="logo"
                    width={28}
                  />
                  <p className="overflow-hidden text-ellipsis">
                    {user.address}
                  </p>
                  <ChevronDown size={20} />
                </div>
              }
            />
          </div>
        ) : (
          <div className="flex space-x-2 items-center">
            <Button
              onClick={handleConnectWallet}
              loading={isConnecting}
              loadingText="Connecting..."
            >
              Connect Wallet
            </Button>
            <div
              className="dark:bg-[#1E1E1E] bg-white h-11 w-9 justify-center rounded-lg md:hidden flex items-center relative dark:text-white text-[#444444]"
              role="button"
              onClick={() => handleShowNav((prev: boolean) => !prev)}
            >
              {showNav ? <X /> : <Menu size={20} />}
            </div>
          </div>
        )}

        {isDesktop && <ModeToggle />}
      </div>
    </nav>
  );
};

export default Navbar;
