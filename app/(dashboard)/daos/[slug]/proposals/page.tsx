'use client';
import ErrorFetchingComponent from '@/components/error-fetching-comp';
import EachDaoLoading from '@/components/loading/each-dao-loading';
import EachFilterTab from '@/components/proposals/each-proposal-tab';
import { EachDaoContext } from '@/context/each-dao-context';
import { useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

const EachDaoProposals = () => {
  const { eachDAOProposal, isProposalLoading, isProposalError, proposalError } =
    useContext(EachDaoContext);
  const searchParams = useSearchParams();
  const [proposals, setProposals] = useState(eachDAOProposal);
  const search = searchParams.get('search') || '';
  const filter = searchParams.get('filter') || '';

  useEffect(() => {
    if (search) {
      setProposals(
        eachDAOProposal?.filter(
          (item: { wallet: string; type: string }) =>
            item?.wallet?.toLowerCase().includes(search.toLowerCase()) ||
            item?.type?.toLocaleLowerCase()?.includes(search.toLowerCase())
        )
      );
    } else if (filter) {
      setProposals(
        eachDAOProposal?.filter((item: { status: string }) =>
          item?.status?.toLowerCase().includes(filter.toLowerCase())
        )
      );
    } else {
      setProposals(eachDAOProposal);
    }
  }, [search, filter, eachDAOProposal]);

  if (isProposalLoading) return <EachDaoLoading />;
  if (isProposalError)
    return <ErrorFetchingComponent description={proposalError.message} />;

  return (
    <div className="-mt-4">
      <EachFilterTab proposalData={proposals} search={search} filter={filter} />
    </div>
  );
};

export default EachDaoProposals;
