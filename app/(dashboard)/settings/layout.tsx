'use client';
import { cn } from '@/libs/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactNode, useContext } from 'react';
import { settingsSidebarLinks } from './config';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { IConnectWalletContext } from '@/libs/types';
import ConnectWalletCallToAction from '@/components/connect-wallet-cta';
import { ApiContext } from '@/context/api-context';
import { toast } from 'sonner';
import ProfileLoading from '@/components/loading/profile-loading';

interface ILayout {
  children: ReactNode;
}

const Layout = ({ children }: ILayout) => {
  const { isEachUserError, eachUserErrorMessage, isLoadingEachUser } =
    useContext(ApiContext);
  const pathname = usePathname();
  const { user } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const connected: boolean = user.isConnected;

  return (
    <div className="space-y-6">
      <h1 className="dark:text-white text-dark text-xl font-medium">
        Settings
      </h1>
      {connected ? (
        <React.Fragment>
          <div className="md:flex justify-between items-start md:space-x-4 space-y-4 md:space-y-0">
            <div className="w-full md:w-[20%] dark:bg-gradient-to-r dark:from-[#1E1E1E] dark:via-[#1E1E1E] dark:to-[#252525] rounded-lg p-2 md:p-4 bg-white">
              <div className="md:space-y-6 text-[#888888] text-sm flex md:block items-center">
                {settingsSidebarLinks.map((link) => (
                  <Link key={link.title} href={link.href}>
                    <div
                      className={cn(
                        'py-2 md:py-3 rounded-lg px-3 flex items-center space-x-2 md:my-4 font-light',
                        pathname === link.href &&
                          'dark:bg-[#1E1E1E] dark:text-white bg-light text-dark'
                      )}
                    >
                      <div>{link.icon}</div>
                      <p>{link.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="w-full md:w-[80%] bg-white dark:bg-gradient-to-r dark:via-[#1E1E1E] from-[#1E1E1E] dark:to-[#252525] rounded-lg p-4">
              {isLoadingEachUser ? (
                <ProfileLoading />
              ) : (
                <React.Fragment>{children}</React.Fragment>
              )}
            </div>
          </div>
        </React.Fragment>
      ) : (
        <div className="min-h-[76vh] flex items-center justify-center">
          <ConnectWalletCallToAction description="Connect your wallet to be able to see your settings" />
        </div>
      )}
    </div>
  );
};

export default Layout;
