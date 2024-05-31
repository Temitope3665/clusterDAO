'use client';
import EachDaoLoading from '@/components/loading/each-dao-loading';
import EachProposalView from '@/components/proposals/each-proposal-view';
import { AppContext } from '@/context/app-context';
import { EachDaoContext } from '@/context/each-dao-context';
import { getProposalDetails } from '@/libs/contract-call';
import { EACH_PROPOSAL_INFO } from '@/libs/key';
import { IEachProposalView } from '@/libs/types';
import { cn } from '@/libs/utils';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useContext } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const EachProposal = () => {
  const tabs: string[] = ['Result', 'Information'];
  const { currentDAO } = useContext(EachDaoContext);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const urlParts = pathname.split('/');

  const currentTab: string = searchParams.get('q') || tabs[0];
  const proposalId = urlParts[4];

  const { data: currentProposal, isLoading } = useQuery({
    queryKey: [EACH_PROPOSAL_INFO, currentDAO.contractAddress, proposalId],
    queryFn: () => getProposalDetails(currentDAO.contractAddress, proposalId),
    enabled: !!proposalId,
  });

  const handleSwitch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 200);

  console.log(currentProposal, '->');

  return (
    <div>
      <div className="flex items-center justify-between border-b border-[#292929] pb-4">
        <h2 className="text-white font-medium text-xl">Proposal</h2>
        <div className="flex space-x-3 bg-[#191919] rounded-lg p-2 items-center text-sm">
          {tabs.map((tab) => (
            <div
              className={cn(
                'p-2 px-4',
                currentTab === tab && 'text-primary rounded-lg bg-[#1E1E1E]'
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
      {isLoading ? (
        <EachDaoLoading />
      ) : (
        <EachProposalView tabs={tabs} currentProposal={currentProposal} />
      )}
    </div>
  );
};

export default EachProposal;
