'use client';
import { useSearchParams } from 'next/navigation';
import SidebarLinksComp, {
  daoSettingsSidebarLinks,
} from './components/side-bar-links';
import Profile from './components/profile';
import { ReactNode, useContext } from 'react';
import Links from './components/links';
import { EachDaoContext } from '@/context/each-dao-context';

interface ITabView {
  [key: string]: ReactNode;
}

const Settings = () => {
  const { currentDAO, isMember } = useContext(EachDaoContext);
  const { socials } = currentDAO;

  const searchParams = useSearchParams();
  const activeSidebar =
    searchParams.get('q') || daoSettingsSidebarLinks[0].title;
  const tabs: ITabView = {
    Profile: <Profile />,
    Links: <Links socials={socials} />,
  };
  return (
    <div className="space-y-8">
      <div className="border-b dark:border-b-[#292929] border-b-[#CCCCCC99]">
        <h2 className="border-b-2 pb-3 w-fit border-primary dark:text-white text-sm text-dark">
          Configuration
        </h2>
      </div>
      <div className="md:flex md:space-x-4 items-start space-y-4 md:space-y-0">
        <div className="w-full md:w-[20%] dark:bg-gradient-to-r dark:from-[#1E1E1E] dark:via-[#1E1E1E] dark:to-[#252525] rounded-lg p-4 bg-white">
          <SidebarLinksComp activeSidebar={activeSidebar} isMember={isMember} />
        </div>
        <div className="w-full md:w-[80%] dark:bg-gradient-to-r dark:from-[#1E1E1E] dark:via-[#1E1E1E] dark:to-[#252525] rounded-lg p-4 bg-white">
          {tabs[activeSidebar]}
        </div>
      </div>
    </div>
  );
};

export default Settings;
