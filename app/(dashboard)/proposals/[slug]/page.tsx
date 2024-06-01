'use client';
import ErrorFetchingComponent from '@/components/error-fetching-comp';
import EachDaoLoading from '@/components/loading/each-dao-loading';
import EachProposalView from '@/components/proposals/each-proposal-view';
import { Separator } from '@/components/ui/separator';
import { AppContext } from '@/context/app-context';
import { EachDaoContext } from '@/context/each-dao-context';
import { useMediaQuery } from '@/hooks/use-media-query';
import { getEachDAO, getProposalDetails } from '@/libs/contract-call';
import { EACH_DAO_KEY, EACH_PROPOSAL_INFO } from '@/libs/key';
import { IEachProposalView } from '@/libs/types';
import { cn } from '@/libs/utils';
import { useQuery } from '@tanstack/react-query';
import { MoveLeft } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { useDebouncedCallback } from 'use-debounce';

const EachProposal = () => {
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [currentProposal, setCurrentProposal] = useState<
  //   IEachProposalView | any
  // >({});
  // const { getEachDAO, getProposal } = useContext(AppContext);
  const { currentDAO, isLoading, isError, error } = useContext(EachDaoContext);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const router = useRouter();
  const tabs: string[] = ['Result', 'Information'];
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const daoId = searchParams.get('dao') || '';

  const currentTab: string = searchParams.get('q') || tabs[0];
  const urlParts = pathname.split('/'); // Split the URL by "/"
  const proposalId = urlParts[2];

  // const {
  //   data: currentDAO,
  //   isLoading,
  //   isError,
  //   error,
  // } = useQuery({
  //   queryKey: [EACH_DAO_KEY, daoId],
  //   queryFn: () => getEachDAO(daoId),
  //   enabled: !!daoId,
  // });

  const {
    data: currentProposal,
    isLoading: isProposalLoading,
    isError: isProposalError,
    error: proposalError,
  } = useQuery({
    queryKey: [EACH_PROPOSAL_INFO, currentDAO?.contractAddress, proposalId],
    queryFn: () => getProposalDetails(currentDAO?.contractAddress, proposalId),
    enabled: !!proposalId && !!currentDAO?.contractAddress,
  });

  // useEffect(() => {
  //   const getSingleProposal = async () => {
  //     try {
  //       const dao: { contractAddress: string } = await getEachDAO(daoId);
  //       setCurrentDAO(dao);
  //       const proposal = await getProposal(dao.contractAddress, proposalId);
  //       setCurrentProposal(proposal);
  //       setIsLoading(false);
  //     } catch (error: any) {
  //       toast.error(error.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   getSingleProposal();
  // }, [proposalId]);

  console.log(currentDAO);

  const handleSwitch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 200);

  if (isLoading) return <EachDaoLoading />;
  if (isError || isProposalError)
    return (
      <ErrorFetchingComponent
        description={error?.message || proposalError?.message}
      />
    );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b dark:border-[#292929] pb-4">
        <div className="flex items-center space-x-4">
          <div
            className="dark:bg-[#1E1E1E] rounded-lg px-4 py-2 bg-white text-[#444444] dark:text-[#D2D2D2]"
            role="button"
            onClick={() => router.back()}
          >
            <MoveLeft size={isDesktop ? 20 : 16} />
          </div>
          <h2 className="dark:text-white text-dark font-medium text-lg md:text-xl">
            Overview
          </h2>
        </div>
        <div className="flex space-x-2 md:space-x-3 dark:bg-[#191919] rounded-lg p-2 items-center text-sm bg-white">
          {tabs.map((tab) => (
            <div
              className={cn(
                'p-2 px-2 md:px-4',
                currentTab === tab &&
                  'text-primary rounded-lg dark:bg-[#1E1E1E] bg-light md:text-base text-sm'
              )}
              key={tab}
              onClick={() => handleSwitch(tab)}
              role="button"
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      <div className="flex space-x-3 justify-start">
        <Avatar>
          <AvatarImage src={currentDAO.image} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="">
          <h1 className="dark:text-white text-dark font-medium text-[36px] lg:text-[18px]">
            {currentDAO && currentDAO?.name}
          </h1>
          <p className="text-sm lg:text-normal font-light leading-[30px]">
            {currentDAO && currentDAO?.description}
          </p>
        </div>
      </div>
      <Separator />

      {isProposalLoading ? (
        <EachDaoLoading />
      ) : (
        <EachProposalView tabs={tabs} currentProposal={currentProposal} />
      )}
    </div>
  );
};

export default EachProposal;
