'use client';
import { cn } from '@/libs/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { helpCenterLinks } from './config';

interface ILayout {
  children: ReactNode;
}

const Layout = ({ children }: ILayout) => {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <h1 className="dark:text-white text-dark text-xl font-medium">Help Center</h1>
      <div className="md:flex justify-between items-start md:space-x-4 space-y-4 md:space-y-0">
        <div className="w-full md:w-[20%] dark:bg-[#191919] rounded-lg p-2 md:p-4 bg-white">
          <div className="md:space-y-6 text-[#888888] text-sm flex md:block items-center">
            {helpCenterLinks.map((link) => (
              <Link key={link.title} href={link.href}>
                <div
                  className={cn(
                    'py-2 md:py-3 rounded-lg px-3 flex font-light items-center space-x-2 md:my-4',
                    pathname === link.href && 'dark:bg-[#1E1E1E] bg-light dark:text-white text-dark'
                  )}
                >
                  <div>{link.icon}</div>
                  <p>{link.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="w-full md:w-[80%] bg-white dark:bg-[#191919] rounded-lg p-4 md:h-[74vh] md:overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
