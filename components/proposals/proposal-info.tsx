import { LinkIcon } from '@/assets/svgs';
import { EachDaoContext } from '@/context/each-dao-context';
import { formatDate } from '@/libs/utils';
import { Clock5 } from 'lucide-react';
import Link from 'next/link';
import { useContext } from 'react';

interface IProposalInfo {
  currentProposal: {
    duration: string;
    startTime: number;
    endTime: number;
    votesFor: number;
    votesAgainst: number;
    totalVote: string;
    id: string;
    status: string;
  };
  countdownTime: string;
}

const ProposalInfo = ({ currentProposal, countdownTime }: IProposalInfo) => {
  const { currentDAO } = useContext(EachDaoContext);
  const { startTime, endTime } = currentProposal;
  const domainName = typeof window !== 'undefined' && window.location.origin;

  return (
    <div className="rounded-lg dark:bg-[#191919] p-8 space-y-5 bg-white">
      <div className="flex justify-between border-b dark:border-[#1E1E1E] pb-4 items-center border-[#CCCCCC99]">
        <h3 className="font-medium text-lg dark:text-white text-dark">
          Information
        </h3>
      </div>
      <div className="border-b dark:border-[#1E1E1E] pb-4 space-y-6 border-[#CCCCCC99]">
        <div className="flex items-center justify-between">
          <p className="dark:text-white text-dark font-medium text-base">
            Identity
          </p>
          <img
            src={currentDAO.image}
            alt="proposal identity logo"
            className="w-6 h-6 rounded-full object-cover"
          />
        </div>
        <h3 className="font-medium text-lg dark:text-white text-dark">
          Voting System
        </h3>
      </div>

      <div className="text-base  border-b dark:border-[#1E1E1E] pb-4 space-y-6 border-[#CCCCCC99]">
        <div className="flex items-center justify-between">
          <p className="text-defaultText">Strategy</p>
          <p className="dark:text-white text-dark">1 Wallet Voting</p>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-lg dark:text-white text-dark">
            Status
          </h3>
          <p className="text-sm font-light flex space-x-2">
            <span>
              <Clock5 size={16} />
            </span>
            <span>Time left:</span>{' '}
            <span className="text-dark dark:text-white font-light">
              {countdownTime}
            </span>
          </p>
        </div>
      </div>

      <div className="border-b dark:border-[#1E1E1E] pb-4 border-[#CCCCCC99]">
        <div className="flex justify-between">
          <p className="text-defaultText font-light text-sm">Start Date</p>
          <p className="dark:text-white font-medium text-sm text-dark">
            {formatDate(startTime)}
          </p>
        </div>

        <div className="flex justify-between pt-4">
          <p className="text-defaultText font-light text-sm">End Date</p>
          <p className="dark:text-white font-medium text-sm text-dark">
            {formatDate(endTime)}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="dark:text-white text-dark">Link</p>
        <Link
          href={`${domainName}/daos/${currentDAO.id}/dashboard`}
          target="_blank"
          className="flex space-x-2 items-center"
        >
          <p className="font-light text-xs ">DAO</p>
          <LinkIcon />
        </Link>
      </div>
    </div>
  );
};

export default ProposalInfo;
