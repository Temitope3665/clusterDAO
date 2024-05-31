'use client';
import Image from 'next/image';
import LogoIcon from '@/assets/icons/nucleusdao-purple.svg';
import Link from 'next/link';
import { DASHBOARD_URL } from '@/config/path';
import { bottomSidebarNav, topSidebarNav } from './nav-data';
import { cn } from '@/libs/utils';
import { usePathname } from 'next/navigation';
import { BrandLogo } from '@/assets/svgs';
import { ModeToggle } from '../themes/mode-toggle';
import { useMediaQuery } from '@/hooks/use-media-query';

interface ISidebar {
  showNav: boolean;
  handleShowNav: (arg: boolean) => void;
}

const Sidebar = ({ showNav, handleShowNav }: ISidebar) => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'w-[75%] md:w-[18%] px-4 md:px-4 lg:px-10 py-2 dark:bg-foreground bg-light space-y-12 md:space-y-20 h-full z-[200] fixed max-w-[420px] ease-in-out duration-300',
        !showNav && '-translate-x-full md:translate-x-0'
      )}
    >
      <div className="flex justify-between items-center md:-mb-8 relative">
        <Link href={DASHBOARD_URL}>
          <div
            className="flex space-x-2 items-center"
            onClick={() => handleShowNav(false)}
          >
            <Image
              id="logo"
              src={LogoIcon}
              alt="Nucleus Dao Logo"
              width={!showNav ? 35 : 30}
            />
            <BrandLogo className="text-[#282828] dark:text-white w-[100px] md:w-[120px]" />
          </div>
        </Link>
      </div>

      <div className="space-y-20 md:space-y-32 block">
        <div className="space-y-3 md:space-y-6 text-sm">
          {topSidebarNav.map((nav) => (
            <Link
              href={nav.href}
              className={cn(
                'flex space-x-3 py-4 items-center px-4',
                pathname.startsWith(nav.href) &&
                  'dark:bg-[#1E1E1E] bg-white text-dark dark:text-white rounded-lg'
              )}
              key={nav.title}
              onClick={() => handleShowNav(false)}
            >
              {nav.icon}
              <p>{nav.title}</p>
            </Link>
          ))}
        </div>

        <div className="border-t pt-4 md:pt-10 dark:border-t-[#FFFFFF33] border-t-[#CCCCCC99]">
          <div className="space-y-6 text-sm">
            {bottomSidebarNav.map((nav) => (
              <Link
                href={nav.href}
                className={cn(
                  'flex space-x-3 py-4 items-center px-4',
                  pathname.startsWith(nav.href) &&
                    'dark:bg-[#1E1E1E] bg-white text-dark dark:text-white rounded-lg'
                )}
                key={nav.title}
                onClick={() => handleShowNav(false)}
              >
                {nav.icon}
                <p>{nav.title}</p>
              </Link>
            ))}
            <div className="pl-4 md:hidden block">
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
