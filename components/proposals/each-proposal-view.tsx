'use client';
import RoundedIcon from '@/assets/icons/roundedIcon.png';
import Image from 'next/image';
import { Button } from '../ui/button';
import VotingProcess from '../votings/voting-process';
import { VoteIcon } from '@/assets/svgs';
import AllVoters from '../votings/all-voters';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProposalResult from './proposal-result';
import ProposalInfo from './proposal-info';
import { useMediaQuery } from '@/hooks/use-media-query';
import { proposalLists } from '@/config/dao-config';
import { EachDaoContext } from '@/context/each-dao-context';
import { EachStatus } from './data';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { IConnectWalletContext, IEachProposalView } from '@/libs/types';
import {
  capitalizeFirstLetter,
  getStatus,
  getTimeDifference,
} from '@/libs/utils';
import EachProposalDetails from './each-proposal-details';

interface IEachTabView {
  [key: string]: ReactNode;
}

const EachProposalView = ({ tabs, currentProposal }: IEachProposalView) => {
  const { user } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const { address, isConnected } = user;
  const { isMember } = useContext(EachDaoContext);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [showFullProposal, setShowFullProposal] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const currentTab: string = searchParams.get('q') || tabs[0];
  const userVote = address
    ? currentProposal?.votes?.find(
        (vote: { account: string }) => vote?.account === address
      )
    : null;
  const [description, _] = useState<string>(currentProposal?.description);

  const [countdownTime, setCountdownTime] = useState<string>('');

  useEffect(() => {
    getTimeDifference(currentProposal.endTime, setCountdownTime);
  }, [currentProposal.endTime]);

  const tabViews: IEachTabView = {
    Result: (
      <ProposalResult
        currentProposal={currentProposal}
        countdownTime={countdownTime}
      />
    ),
    Information: (
      <ProposalInfo
        currentProposal={currentProposal}
        countdownTime={countdownTime}
      />
    ),
  };

  return (
    <div className="space-y-6">
      <h1 className="dark:text-white text-dark font-medium text-xl md:text-3xl pt-6">
        {
          proposalLists.find(
            (proposal: { type: string }) =>
              proposal.type === currentProposal.proposalType
          )?.title
        }
      </h1>
      <div className="lg:flex space-x-3 items-center">
        <p className="font-light text-sm text-[#888888]">Published by</p>
        <div className="flex space-x-3 py-2 lg:py-0">
          <Image
            src={RoundedIcon}
            alt="logo"
            width={isDesktop ? 20 : 16}
            height={isDesktop ? 20 : 16}
          />
          <p className="font-light text-xs md:text-sm dark:text-white text-dark truncate">
            {currentProposal?.wallet || currentProposal?.proposer}
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <p className="text-xs md:text-sm text-defaultText">
          {capitalizeFirstLetter(description?.slice(0, 180))}
        </p>
        {description?.length > 180 && (
          <>
            {!showFullProposal && (
              <Button onClick={() => setShowFullProposal(true)}>
                Read full proposal
              </Button>
            )}
          </>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-8">
          {showFullProposal && (
            <div className="text-xs md:text-sm text-defaultText trans space-y-3">
              {description?.slice(180, description?.length)}
              {description?.length > 180 && (
                <Button onClick={() => setShowFullProposal(false)}>
                  Show less
                </Button>
              )}
            </div>
          )}
          <div>{tabViews[currentTab]}</div>
        </div>
        <div className="space-y-8">
          <div className="rounded-lg dark:bg-[#191919] p-8 space-y-4 bg-white">
            <div className="flex justify-between border-b dark:border-[#1E1E1E] pb-4 items-center border-[#CCCCCC99]">
              <h3 className="font-medium text-xl dark:text-white text-dark">
                Proposal Details
              </h3>
              <div
                className="font-light text-sm dark:text-white text-[#0080FF] dark:text-[#0080FF1A] dark:bg-[#1E1E1E] bg-[#0080FF1A] rounded-lg px-3 py-1.5"
                role="status"
              >
                {EachStatus[getStatus(currentProposal)]}
              </div>
            </div>
            <EachProposalDetails currentProposal={currentProposal} />
          </div>

          {isMember && isConnected && (
            <div className="rounded-lg dark:bg-[#191919] p-8 space-y-4 bg-white">
              <div className="flex justify-between border-b dark:border-[#1E1E1E] pb-4 items-center border-[#CCCCCC99]">
                <h3 className="font-medium text-xl dark:text-white text-dark">
                  Cast a vote
                </h3>
                <div
                  className="font-light text-sm dark:text-white text-[#0080FF] dark:text-[#0080FF1A] dark:bg-[#1E1E1E] bg-[#0080FF1A] rounded-lg px-3 py-1.5"
                  role="status"
                >
                  {EachStatus[getStatus(currentProposal)]}
                </div>
              </div>
              {getStatus(currentProposal) === 'Pending' && (
                <p className="dark:text-white text-dark text-sm">
                  Voting period has ended. The result will be shown if the
                  proposal reach its quorum and executed
                </p>
              )}
              {getStatus(currentProposal) === 'Succeeded' && (
                <p className="dark:text-white text-dark text-sm">
                  Voting period has ended. The result of the proposal reach its
                  quorum and it's succeeded.
                </p>
              )}
              {getStatus(currentProposal) === 'Failed' && (
                <p className="dark:text-white text-dark text-sm">
                  Voting period has ended. The result of the proposal did not
                  reach its quorum and it failed.
                </p>
              )}

              {getStatus(currentProposal) === 'Active' && (
                <VotingProcess currentProposal={currentProposal} />
              )}
            </div>
          )}

          <div className="rounded-lg dark:bg-[#191919] p-8 space-y-4 bg-white">
            <div className="flex justify-between border-b dark:border-[#1E1E1E] border-[#CCCCCC99] pb-4 items-center">
              <h3 className="font-medium text-xl dark:text-white text-dark">
                Voters
              </h3>
              <p className="text-sm flex space-x-1.5">
                <span>
                  <VoteIcon />
                </span>
                <span className="dark:text-white text-dark">
                  {currentProposal?.totalVote}
                </span>
                <span className="text-defaultText">vote(s)</span>
              </p>
            </div>
            <AllVoters voters={currentProposal?.votes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachProposalView;
