'use client';
import ErrorFetchingComponent from '@/components/error-fetching-comp';
import Graph from '@/components/ui/graph';
import { Skeleton } from '@/components/ui/skeleton';
import { getHistory } from '@/config/apis';
import { EachDaoContext } from '@/context/each-dao-context';
import { PROPOSAL_HISTORY } from '@/libs/key';
import { cn } from '@/libs/utils';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export const DaoProposals = () => {
  const period: { value: string; param: string }[] = [
    { value: '1D', param: 'daily' },
    { value: '1W', param: 'weekly' },
    { value: '1M', param: 'monthly' },
    { value: '1Y', param: 'yearly' },
  ];
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const timeframe = searchParams.get('q') || 'yearly';

  const handleSelect = useDebouncedCallback(
    (term: { value: string; param: string }) => {
      const params = new URLSearchParams(searchParams);

      if (term) {
        params.set('q', term.param);
      } else {
        params.delete('q');
      }
      replace(`${pathname}?${params.toString()}`);
    },
    300
  );

  const { currentDAO, setProposalHistory } = useContext(EachDaoContext);
  const daoId = currentDAO.id;

  const {
    data: proposalHistory,
    isError: isProposalHistoryError,
    isLoading: isLoadingProposalHistory,
  } = useQuery({
    queryKey: [PROPOSAL_HISTORY, timeframe],
    queryFn: () => getHistory('proposals-history', daoId, { timeframe }),
    enabled: !!daoId,
  });

  useEffect(() => {
    if (proposalHistory) {
      setProposalHistory(proposalHistory);
    }
  }, [proposalHistory]);

  if (isProposalHistoryError)
    return <ErrorFetchingComponent className="min-h-[50vh]" />;

  return (
    <div className="p-4 h-full">
      <div className="md:flex justify-between pb-4 space-y-3 md:space-y-0">
        <h2 className="text-white font-medium text-xl">Productivity</h2>
        <div className="flex space-x-4">
          {period.map((each: { value: string; param: string }) => (
            <div
              className={cn(
                'rounded-lg border border-[#444444] px-2 py-1 text-xs',
                timeframe === each.param && 'border-primary text-primary'
              )}
              role="button"
              key={each.value}
              onClick={() => handleSelect(each)}
            >
              {each.value}
            </div>
          ))}
        </div>
      </div>
      <div className="flex space-x-4 items-center pb-8 ">
        <div className="flex space-x-1 items-center">
          <div className="bg-primary h-2.5 w-2.5 rounded-full" />
          <p className="text-xs font-light text-defaultText">Proposals</p>
        </div>
        {/* <div className="flex space-x-1 items-center">
          <div className="bg-[#0080FF] h-2.5 w-2.5 rounded-full" />
          <p className="text-xs font-light text-defaultText">
            Active Proposals
          </p>
        </div> */}
      </div>
      {isLoadingProposalHistory ? (
        <Skeleton className="h-[80%] dark:bg-[#1E1E1E] bg-[#F5F5F5]" />
      ) : (
        <Graph
          graphData={
            proposalHistory.map((h: { value: string; title: string }) => ({
              title:
                timeframe === 'daily' || timeframe === 'monthly'
                  ? h.title
                  : h.title.slice(0, 3),
              value: Number(h.value),
            })) || []
          }
        />
      )}
    </div>
  );
};
