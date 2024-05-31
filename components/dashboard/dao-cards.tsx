import { LinkIcon, PeopleIcon, ProposalIcon2 } from '@/assets/svgs';
import { capitalizeFirstLetter } from '@/libs/utils';
import Link from 'next/link';
import { ReactNode } from 'react';

export interface IDaoCard {
  organisation: string;
  orgIcon: ReactNode;
  description: string;
  activeProposal: string;
  activeMember: string;
  url: string;
}

const DaoCard = ({
  organisation,
  orgIcon,
  description,
  activeProposal,
  activeMember,
  url,
}: IDaoCard) => {
  return (
    <div className="dark:bg-gradient-to-r dark:from-[#1E1E1E] dark:via-[#1E1E1E] dark:to-[#252525] bg-white p-5 rounded-lg space-y-7 max-h-[40vh]">
      <div className="flex space-x-4 items-center pb-7">
        <div className="">{orgIcon}</div>
        <div className="space-y-1">
          <Link href={url}>
            <h3 className="dark:text-white text-dark font-medium text-[22px] capitalize">
              {organisation}
            </h3>
          </Link>
          <Link href={url}>
            <div className="space-x-1 flex items-center">
              <p className="text-xs font-light text-defaultText">{url}</p>
              <LinkIcon className="text-[#DCC5FD] dark:text-[#292D32]" />
            </div>
          </Link>
        </div>
      </div>
      <Link href={url}>
        <div className="space-y-4">
          <div className="text-defaultText h-9 text-ellipsis overflow-hidden">
            <p className="font-light text-sm multiline-truncate">
              {capitalizeFirstLetter(description)}
            </p>
          </div>
          <div className="flex justify-between items-center pt-6 border-t dark:border-[#1E1E1E] border-[#CCCCCC99] text-sm">
            <div className="flex items-center space-x-2">
              <PeopleIcon />
              <p className="dark:text-white text-dark">
                {activeMember}
                <span className="text-defaultText ml-2 text-sm">
                  {Number(activeMember) > 1 ? 'Members' : 'Member'}
                </span>
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <ProposalIcon2 />
              <p className="dark:text-white text-dark">
                {activeProposal}
                <span className="text-defaultText ml-2 text-sm">Proposals</span>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DaoCard;
