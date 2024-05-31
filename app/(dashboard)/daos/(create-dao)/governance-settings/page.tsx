'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { DEFINE_MEMBERSHIP_URL, REVIEW_DAO_URL } from '@/config/path';
import { AppContext } from '@/context/app-context';
import { cn, handleChangeNumberInput, wait } from '@/libs/utils';
import { Minus, MoveLeft, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

const GovernanceSettings = () => {
  const router = useRouter();
  const { updateNewDaoInfo, newDaoInfo } = useContext(AppContext);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isBack, setIsBack] = useState<boolean>(false);
  const [days, setDays] = useState<number | string>(newDaoInfo.duration);
  const [quorum, setQuorum] = useState<number | string>(newDaoInfo.quorum);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const updatedData = { ...newDaoInfo, quorum, duration: days };
    sessionStorage.setItem('new_dao', JSON.stringify(updatedData));
    updateNewDaoInfo(updatedData);
  }, [days, quorum]);

  const handleBack = () => {
    setIsBack(true);
    wait().then(() => {
      router.push(DEFINE_MEMBERSHIP_URL);
      setIsBack(false);
    });
  };

  const handleNext = () => {
    if (!Number(days) || !Number(quorum)) {
      setIsError(true);
    } else {
      setIsPending(true);
      wait().then(() => {
        router.push(REVIEW_DAO_URL);
        setIsPending(false);
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-medium text-dark dark:text-white text-xl">
          Governance Settings
        </h1>
        <p className="text-[#888888] text-sm">
          Only authorized individuals are permitted to create proposals. Choose
          what creation rights you give DAO groups. This can be changed in
          settings later.
        </p>
      </div>

      <div className="dark:bg-[#1E1E1E] bg-light rounded-lg p-4 flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="dark:text-white font-medium text-dark">Any Wallet</h3>
          <label className="text-defaultText text-sm" htmlFor="any-wallet">
            Any wallet can create proposals
          </label>
        </div>
        <Checkbox className="rounded-full" defaultChecked id="any-wallet" />
      </div>

      <div>
        <h3 className="dark:text-white text-dark font-medium">
          Proposal duration
        </h3>
        <p className="text-defaultText text-sm">
          The minimum duration for voting on a proposal is the shortest time
          period allowed.
        </p>
      </div>

      <div className="space-y-3">
        <label className="dark:text-white text-dark font-light text-sm">
          Days
        </label>
        <div className="border border-[#CCCCCC99] dark:border-[#292929] flex items-center justify-between rounded-lg py-1 px-5 dark:text-defaultText text-dark">
          <div
            className={cn(
              'bg-[#D2D2D2] hover:bg-[#dddada] dark:bg-[#1E1E1E] rounded-lg py-2 px-2 dark:hover:bg-[#2a2a2a] trans',
              days === 0 && 'cursor-default'
            )}
            role="button"
            onClick={() => {
              days === 0 ? null : setDays((prev) => Number(prev) - 1);
            }}
          >
            <Minus size={18} />
          </div>
          <Input
            value={days}
            type="number"
            className="border-none bg-white dark:bg-[#191919] w-fit text-center "
            placeholder="0"
            onChange={({ target }) => setDays(target.value)}
          />
          <div
            className="bg-[#D2D2D2] hover:bg-[#dddada] dark:bg-[#1E1E1E] rounded-lg py-2 px-2 dark:hover:bg-[#2a2a2a] trans"
            role="button"
            onClick={() => setDays((prev) => Number(prev || 0) + 1)}
          >
            <Plus size={18} />
          </div>
        </div>
        {!Number(days) && isError && (
          <p className="text-sm font-light text-destructive">
            Days cannot be zero
          </p>
        )}
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="dark:text-white text-dark font-medium">
            Voting threshold
          </h3>
          <p className="text-defaultText text-sm">
            Proposal approval requires a majority ‘Yes’ votes from participating
            wallets, surpassing a predefined threshold.
          </p>
        </div>
        <div className="space-y-3">
          <label className="dark:text-white text-dark font-light text-sm mt-4">
            Quorum (%)
          </label>
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
            <div>
              <div className="border border-[#CCCCCC99] dark:border-[#292929] flex items-center justify-between rounded-lg py-1 px-5 dark:text-defaultText text-dark">
                <div
                  className={cn(
                    'bg-[#D2D2D2] hover:bg-[#dddada] dark:bg-[#1E1E1E] rounded-lg py-2 px-2 dark:hover:bg-[#2a2a2a] trans',
                    quorum === 0 && 'cursor-default'
                  )}
                  role="button"
                  onClick={() => {
                    quorum === 0 ? null : setQuorum((prev) => Number(prev) - 1);
                  }}
                >
                  <Minus size={18} />
                </div>
                <Input
                  value={quorum}
                  type="number"
                  className="border-none bg-white dark:bg-[#191919] w-fit text-center "
                  placeholder="0"
                  pattern="[1-9][0-9]*"
                  onChange={({ target }) => {
                    Number(target.value) <= 100 &&
                      handleChangeNumberInput(target.value, setQuorum);
                  }}
                />
                <div
                  className="bg-[#D2D2D2] hover:bg-[#dddada] dark:bg-[#1E1E1E] rounded-lg py-2 px-2 dark:hover:bg-[#2a2a2a] trans"
                  role="button"
                  onClick={() => setQuorum((prev) => Number(prev || 0) + 1)}
                >
                  <Plus size={18} />
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <Checkbox
                id="proposalCheck"
                checked={Number(quorum) >= 50}
                className="rounded-full border-[#5BE950] data-[state=checked]:bg-[#5BE950]"
              />
              <label
                htmlFor="proposalCheck"
                className="text-dark dark:text-[#FFF] text-sm font-light"
              >
                Proposal will be approved by many
              </label>
            </div>
          </div>
          {!Number(quorum) && isError && (
            <p className="text-sm font-light text-destructive">
              Quorum cannot be zero
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          className="dark:bg-[#1E1E1E] bg-light dark:hover:bg-[#262525] hover:bg-light text-[#444444] dark:text-defaultText"
          onClick={handleBack}
          loading={isBack}
        >
          <MoveLeft size={20} />
        </Button>
        <Button
          type="submit"
          className="px-12"
          onClick={handleNext}
          loading={isPending}
          loadingText="Please wait..."
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default GovernanceSettings;
