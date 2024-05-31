'use client';
import { DashboardIcon } from '@/assets/svgs';
import SearchInput from '@/components/ui/search-input';
import { cn } from '@/libs/utils';
import { List, ListFilter } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import ProposalCard from './card';
import DataTable from '../data-table';
import { columns } from './columns';
import Lottie from 'react-lottie';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import { defaultProposalOption } from '../animation-options';

const EachFilterTab = ({
  proposalData,
  search,
  filter,
}: {
  proposalData: any[];
  search?: string;
  filter?: string;
}) => {
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const currentView = searchParams.get('v') || '';

  const filterItems: string[] = [
    'All',
    'Active',
    'Pending',
    'Failed',
    'Succeeded',
  ];

  const handleFilter = useDebouncedCallback((filterBy: string) => {
    const params = new URLSearchParams(searchParams);
    if (filterBy === 'All') {
      params.delete('filter');
    } else {
      params.set('filter', filterBy);
    }
    replace(`${pathname}?${params.toString()}`);
    setOpenPopover(false);
  }, 200);

  const handleView = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('v', term);
    } else {
      params.delete('v');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  console.log(proposalData, '-> proposalData');

  return (
    <div className="space-y-6">
      <div className="border-b dark:border-b-[#292929] pb-6 pt-4 mt-4 md:flex space-y-4 md:space-y-0 justify-between items-center border-b-[#CCCCCC99]">
        <div className="relative md:w-[40%] w-full">
          <SearchInput
            placeholder="Search by proposal type or publication"
            classNames="pl-10"
            queryKey="search"
          />
        </div>
        <div className="flex space-x-3 justify-between">
          <Popover onOpenChange={setOpenPopover} open={openPopover}>
            <PopoverTrigger>
              <div
                className="flex space-x-2 dark:text-white text-dark border dark:border-[#292929] border-[#CCCCCC] px-2 py-1.5 rounded-lg items-center text-sm font-light"
                role="button"
              >
                <ListFilter
                  size={20}
                  className="dark:text-[#B4B4B4] text-[#444444]"
                />
                <p className="dark:text-white text-dark">Filter</p>
              </div>
            </PopoverTrigger>
            <PopoverContent className="dark:text-[#888888] text-dark border dark:border-[#292929] border-[#CCCCCC] w-[150px] py-2 text-sm font-light">
              {filterItems.map((item) => (
                <div
                  key={item}
                  role="button"
                  className="hover:bg-[#1E1E1E] py-2 px-2 rounded-md"
                  onClick={() => handleFilter(item)}
                >
                  {item}
                </div>
              ))}
            </PopoverContent>
          </Popover>

          <div className="flex space-x-4 items-center">
            <div
              className={cn(
                'dark:text-[#B4B4B4] text-[#444444] border dark:border-[#292929] border-[#CCCCCC] px-1.5 py-1.5 rounded-lg trans',
                currentView === 'list' && 'dark:bg-[#1E1E1E] bg-white'
              )}
              role="button"
              onClick={() => handleView('list')}
            >
              <List size={20} />
            </div>
            <div
              className={cn(
                'dark:text-[#B4B4B4] text-[#444444] border dark:border-[#292929] border-[#CCCCCC] px-1.5 py-1.5 rounded-lg trans',
                (currentView === 'grid' || currentView === '') &&
                  'dark:bg-[#1E1E1E] bg-white'
              )}
              role="button"
              onClick={() => handleView('grid')}
            >
              <DashboardIcon size="20" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        {currentView === 'list' && (
          <DataTable columns={columns} data={proposalData} />
        )}

        {(currentView === 'grid' || currentView !== 'list') && (
          <>
            {proposalData?.length === 0 && (
              <div className="h-[40vh] w-full space-y-2">
                <div className="text-center mx-auto pt-10">
                  <Lottie
                    options={defaultProposalOption}
                    height={150}
                    width={150}
                  />
                </div>
                <div className="flex items-center justify-center">
                  {search || filter ? (
                    <p className="text-center w-2/5">
                      Proposal could not be found
                    </p>
                  ) : (
                    <div className="text-center w-2/5">
                      <p className="pb-3 font-light">
                        Engage with the community, address any questions or
                        concerns, and monitor the progress of the proposal as it
                        moves through the decision-making process.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="grid lg:grid-cols-2 gap-7">
              {proposalData?.map((proposal) => (
                <ProposalCard key={proposal.status} {...proposal} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EachFilterTab;
