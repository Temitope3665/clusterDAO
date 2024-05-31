'use client';
import { useContext, useState } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { IConnectWalletContext } from '@/libs/types';
import { toast } from 'sonner';
import Lottie from 'react-lottie';
import { defaultSuccessOption } from '../animation-options';
import { EachDaoContext } from '@/context/each-dao-context';
import { cn, getStatus } from '@/libs/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  DAOS_KEY,
  EACH_DAO_KEY,
  EACH_DAO_PROPOSAL,
  EACH_PROPOSAL_INFO,
  MEMBER_ACTIVIES,
  PROPOSAL_KEY,
  USER_ACTIVITIES_KEY,
} from '@/libs/key';
import { voteAgainst, voteFor } from '@/libs/contract-call';

interface IVotingProcess {
  currentProposal: {
    id: string;
    votes: { account: string; support: boolean }[];
  };
}

const VotingProcess = ({ currentProposal }: IVotingProcess) => {
  const queryClient: any = useQueryClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { currentDAO } = useContext(EachDaoContext);
  const { user } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const { isConnected, address } = user;
  const userVote = address
    ? currentProposal.votes.find(
        (vote: { account: string; support: boolean }) =>
          vote.account === address
      )
    : null;
  const defaultSelection = userVote?.support
    ? 'yes'
    : userVote?.support === false
    ? 'no'
    : '';
  const [selectedOption, setSelectedOption] =
    useState<string>(defaultSelection);
  const [showModal, setShowModal] = useState<boolean>(false);
  const hasVoted: boolean = !!userVote?.account;

  const votingOptions = ['yes', 'no'];
  const isDisabled: boolean =
    !!userVote?.account || getStatus(currentProposal) === 'Failed';

  const handleOptionChange = (option: string) => {
    if (isDisabled) {
      null;
    } else {
      if (isConnected) {
        setSelectedOption(option);
      } else {
        toast.error('Connect your wallet first!');
      }
    }
  };

  const invalidateAllQueries = () => {
    queryClient.invalidateQueries(DAOS_KEY);
    queryClient.invalidateQueries(PROPOSAL_KEY);
    queryClient.invalidateQueries(USER_ACTIVITIES_KEY);
    queryClient.invalidateQueries(EACH_DAO_KEY);
    queryClient.invalidateQueries(EACH_DAO_PROPOSAL);
    queryClient.invalidateQueries(EACH_PROPOSAL_INFO);
    queryClient.invalidateQueries(MEMBER_ACTIVIES);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      selectedOption === 'yes'
        ? voteFor(Number(currentProposal.id), currentDAO.contractAddress)
        : voteAgainst(Number(currentProposal.id), currentDAO.contractAddress),
    onSuccess: () => {
      invalidateAllQueries();
      setShowModal(true);
    },
    onError: (error: any) => toast.error(error.message),
  });

  const handleDone = async () => {
    setShowModal(false);
    setIsLoading(false);
  };

  return (
    <div>
      {hasVoted && (
        <p className="dark:text-white text-dark">
          You have casted your vote. The result will be shown if the proposal
          reach its quorum
        </p>
      )}
      {!hasVoted && (
        <div className="space-y-5">
          {votingOptions.map((option) => (
            <RadioGroup
              defaultValue={selectedOption}
              value={selectedOption}
              key={option}
              disabled={isDisabled}
              onValueChange={() => handleOptionChange(option)}
              role="button"
            >
              <div
                className="border dark:border-[#292929] p-4 rounded-lg items-center flex justify-between border-[#CCCCCC99]"
                onClick={() => handleOptionChange(option)}
              >
                <Label
                  htmlFor={option}
                  id={option}
                  className={cn(
                    'capitalize dark:text-white font-medium text-dark',
                    isDisabled && 'opacity-40'
                  )}
                >
                  {option}
                </Label>
                <RadioGroupItem
                  className="rounded-full"
                  id={option}
                  value={option}
                />
              </div>
            </RadioGroup>
          ))}
          <Dialog onOpenChange={setShowModal} open={showModal}>
            <Button
              className="w-full"
              disabled={!selectedOption || isDisabled || isDisabled}
              onClick={() => {
                !selectedOption || isDisabled ? null : mutate();
              }}
              loading={isPending}
              loadingText="Voting..."
            >
              Vote
            </Button>
            <DialogContent className="dark:bg-[#191919] bg-white">
              <DialogHeader>
                <DialogTitle className="dark:text-white font-medium py-1 text-center text-dark ">
                  <Lottie
                    options={defaultSuccessOption}
                    height={150}
                    width={150}
                  />
                  <p className="-mt-2">Vote Casted</p>
                </DialogTitle>
                <DialogDescription className="py-2 text-center">
                  You have casted your vote. The result will be shown if the
                  proposal reaches its quorum
                </DialogDescription>
              </DialogHeader>
              <Button
                className="w-full"
                onClick={handleDone}
                loading={isLoading}
              >
                Done
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default VotingProcess;
