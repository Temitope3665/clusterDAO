import { Slider } from '@/components/ui/slider';
import { Clock5, Info } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn, formatDate, getStatus } from '@/libs/utils';
import { EachDaoContext } from '@/context/each-dao-context';
import React, { useContext } from 'react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { IConnectWalletContext } from '@/libs/types';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { executeProposal } from '@/libs/contract-call';
import {
  DAOS_KEY,
  EACH_DAO_KEY,
  EACH_DAO_PROPOSAL,
  EACH_PROPOSAL_INFO,
  MEMBER_ACTIVIES,
  PROPOSAL_KEY,
  USER_ACTIVITIES_KEY,
} from '@/libs/key';

interface IProposalResult {
  currentProposal: {
    duration: string;
    startTime: number;
    endTime: number;
    votesFor: number;
    votes: { account: string }[];
    votesAgainst: number;
    totalVote: string;
    id: string;
    currentMembers: number;
    status: string;
    quorum: number;
  };
  countdownTime: string;
}

const ProposalResult = ({
  currentProposal,
  countdownTime,
}: IProposalResult) => {
  const queryClient: any = useQueryClient();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { startTime, endTime, votesFor, votesAgainst, votes } = currentProposal;
  const { currentDAO, isMember } = useContext(EachDaoContext);
  const percentageOfVoteFor: number =
    votes.length > 0
      ? (Number(votesFor) / Number(currentProposal.currentMembers)) * 100
      : 0;
  const percentageOfVoteAgainst: number =
    votes.length > 0
      ? (Number(votesAgainst) / Number(currentProposal.currentMembers)) * 100
      : 0;

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      executeProposal(Number(currentProposal.id), currentDAO.contractAddress),
    onSuccess: () => {
      queryClient.invalidateQueries(DAOS_KEY);
      queryClient.invalidateQueries(PROPOSAL_KEY);
      queryClient.invalidateQueries(USER_ACTIVITIES_KEY);
      queryClient.invalidateQueries(EACH_DAO_KEY);
      queryClient.invalidateQueries(EACH_DAO_PROPOSAL);
      queryClient.invalidateQueries(EACH_PROPOSAL_INFO);
      queryClient.invalidateQueries(MEMBER_ACTIVIES);
      toast.success('Proposal executed successfully');
    },
    onError: (error: any) => toast.error(error.message),
  });

  return (
    <div className="space-y-6">
      <div className="rounded-lg dark:bg-[#191919] p-8 space-y-5 bg-white">
        <div
          className={cn(
            'flex justify-between border-b dark:border-[#1E1E1E] pb-4 items-center border-[#CCCCCC99]'
          )}
        >
          <h3 className="font-medium text-xl dark:text-white text-dark">
            Result
          </h3>
          <p className="text-sm font-light">
            Approved by:{' '}
            <span className="dark:text-white text-dark font-medium">{`${percentageOfVoteFor.toFixed(
              1
            )}%`}</span>
          </p>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <p className="dark:text-white text-dark font-medium text-base">
              Yes
            </p>
            <p className="text-defaultText font-light text-base">{`${percentageOfVoteFor.toFixed(
              1
            )}%`}</p>
          </div>
          <Slider
            defaultValue={[percentageOfVoteFor]}
            value={[percentageOfVoteFor]}
            max={100}
            step={1}
            thumbClassName="hidden"
          />
        </div>
        <div className="space-y-3">
          <div className="flex justify-between pt-4">
            <p className="text-white font-medium text-base">No</p>
            <p className="text-defaultText font-light text-base">{`${percentageOfVoteAgainst.toFixed(
              1
            )}%`}</p>
          </div>
          <Slider
            defaultValue={[percentageOfVoteAgainst]}
            value={[percentageOfVoteAgainst]}
            max={100}
            step={1}
            thumbClassName="hidden"
          />
        </div>
        {isMember && (
          <>
            {getStatus(currentProposal) === 'Pending' && (
              <Button
                className="w-full mt-1.5"
                onClick={() => mutate()}
                loading={isPending}
                loadingText="Executing..."
              >
                Excecute Proposal
              </Button>
            )}
          </>
        )}
      </div>

      <div className="rounded-lg dark:bg-[#191919] p-8 space-y-3 bg-white">
        <div
          className={cn(
            'flex justify-between border-b dark:border-[#1E1E1E] pb-4 items-center border-[#CCCCCC99]'
            // isDesktop && 'block'
          )}
        >
          <h3 className="font-medium text-xl text-dark dark:text-white">
            Status
          </h3>
          <p className="text-sm font-light flex space-x-2">
            <span>
              <Clock5 size={isDesktop ? 12 : 18} />
            </span>
            <span>Time left:</span>{' '}
            <span className="text-dark dark:text-white font-light">
              {countdownTime}
            </span>
          </p>
        </div>

        <div className="flex justify-between">
          <p className="text-defaultText font-light text-sm">Start Date</p>
          <p className="text-dark dark:text-white font-medium text-sm">
            {formatDate(startTime)}
          </p>
        </div>

        <div className="flex justify-between pt-4">
          <p className="text-defaultText font-light text-sm">End Date</p>
          <p className="dark:text-white text-dark font-medium text-sm">
            {formatDate(endTime)}
          </p>
        </div>

        <div className="flex justify-between py-4 border-t border-[#CCCCCC99] dark:border-[#292929] items-center">
          <div className="flex space-x-2 items-center">
            <p className="font-light text-sm text-dark dark:text-white">
              Quorum
            </p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info size={16} color="#444444" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to library</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="font-light text-sm text-dark dark:text-white">{`${Number(
            Number(currentProposal.quorum)
          )}%`}</p>
        </div>
      </div>
    </div>
  );
};

export default ProposalResult;
