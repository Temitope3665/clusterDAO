'use client';
import DashboadLoading from '@/components/loading/dashboard-loading';
import EachFilterTab from '@/components/proposals/each-proposal-tab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IProposal } from '@/libs/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useContext, useEffect, useState } from 'react';
import ErrorFetchingComponent from '@/components/error-fetching-comp';
import { AppContext } from '@/context/app-context';

const Proposals = () => {
  const { isLoadingProposal, proposals, isProposalError } =
    useContext(AppContext);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [allProposal, setAllProposal] = useState<IProposal[]>([]);
  const search = searchParams.get('search') || '';
  const filter = searchParams.get('filter') || '';

  const tabs: { title: string; value: string }[] = [
    { value: 'All', title: 'All' },
    { value: 'Active', title: 'Active' },
    { value: 'Pending', title: 'Pending' },
    { value: 'Succeeded', title: 'Executed' },
    { value: 'Failed', title: 'Failed' },
  ];

  const currentTab: string =
    searchParams.get('q') || searchParams.get('filter') || tabs[0].value;

  const handleFilter = useDebouncedCallback((filterBy: string) => {
    const params = new URLSearchParams(searchParams);
    if (filterBy === 'All') {
      params.delete('filter');
    } else {
      params.set('filter', filterBy);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 200);

  useEffect(() => {
    if (search) {
      setAllProposal(
        proposals?.filter((item: { wallet: string; type: string }) =>
          item?.type?.toLocaleLowerCase()?.includes(search.toLowerCase())
        )
      );
    } else if (filter) {
      setAllProposal(
        proposals?.filter((item: { status: string }) =>
          item?.status?.toLowerCase().includes(filter.toLowerCase())
        )
      );
    } else {
      setAllProposal(proposals);
    }
  }, [search, filter, isLoadingProposal]);

  if (isLoadingProposal) return <DashboadLoading />;
  if (isProposalError) return <ErrorFetchingComponent />;

  return (
    <div className="space-y-8 min-h-[80vh]">
      <div className="justify-between items-center flex">
        <h1
          role="heading"
          className="dark:text-white font-medium text-xl text-dark"
        >
          Proposals
        </h1>
      </div>

      <Tabs
        defaultValue={currentTab}
        className="w-full"
        value={currentTab}
        onValueChange={(value) => handleFilter(value)}
      >
        <TabsList className="w-full justify-start space-x-6 border-b-2 dark:border-b-[#292929] border-[#CCCCCC99]">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="w-fit">
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        <>
          {tabs.map((tab) => (
            <TabsContent
              value={tab.value}
              className="text-[#777777] text-sm font-light"
            >
              <EachFilterTab
                proposalData={allProposal}
                search={search}
                filter={filter}
              />
            </TabsContent>
          ))}
        </>
      </Tabs>
    </div>
  );
};

export default Proposals;
