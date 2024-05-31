'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/side-bar/sidebar-links';
import Navbar from '@/components/nav-bar';
import { cn } from '@/libs/utils';
import { AppContextProvider } from '@/context/app-context';
import { EachDaoContextProvider } from '@/context/each-dao-context';
import { ApiContextProvider } from '@/context/api-context';
import { useMediaQuery } from '@/hooks/use-media-query';

interface IRootLayouts {
  children: React.ReactNode;
}

export const RootLayoutsComponent = ({ children }: IRootLayouts) => {
  const [showNav, setShowNav] = useState<boolean>(false);
  const isDesktop = useMediaQuery('(min-width: 1600px)');
  return (
    <AppContextProvider>
      <EachDaoContextProvider>
        <ApiContextProvider>
          <div className="max-w-[2300px] mx-auto relative">
            {showNav && (
              <div
                className="inset-0 w-full bg-[#00000090] opacity-100 h-[100%] ease-in-out duration-300 fixed z-[199]"
                onClick={() => setShowNav(false)}
              ></div>
            )}

            <div className="flex w-full items-start">
              <Sidebar showNav={showNav} handleShowNav={setShowNav} />
              <div
                className={cn(
                  'w-full md:w-[82%] md:ml-[18%] md:h-screen overflow-y-auto'
                )}
              >
                <Navbar handleShowNav={setShowNav} showNav={showNav} />)
                <div
                  className={cn(
                    'md:mx-6 p-6 rounded-lg dark:bg-foreground bg-light mt-20 overflow-auto max-w-[1600px]',
                    showNav && 'fixed',
                    isDesktop && 'min-h-screen overflow-y-hidden'
                  )}
                >
                  {children}
                </div>
              </div>
            </div>
          </div>
        </ApiContextProvider>
      </EachDaoContextProvider>
    </AppContextProvider>
  );
};

export default RootLayoutsComponent;
