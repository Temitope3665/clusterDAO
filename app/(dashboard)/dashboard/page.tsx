'use client';
import AllDaos from '@/components/all-daos';
import Cards from '@/components/dashboard/cards';
import { dashboardFeedsData } from '@/components/dashboard/data';
import { Button } from '@/components/ui/button';
import { SELECT_DAO_STYLE_URL } from '@/config/path';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { IConnectWalletContext } from '@/libs/types';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useContext } from 'react';
import { AppContext } from '@/context/app-context';
import DashboadLoading from '@/components/loading/dashboard-loading';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import ErrorFetchingComponent from '@/components/error-fetching-comp';
import { useQuery } from '@tanstack/react-query';
import { USER_ACTIVITIES_KEY } from '@/libs/key';
import { getAUserActivitiesAcrossDAOs } from '@/libs/contract-call';

const Dashboard = () => {
  const {
    user: { address, isConnected },
  } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const { DAOsData, daoLoading, isDaoError } = useContext(AppContext);
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get('q');
  let userDAO: any[] = [];

  const getDAOsData = (width: number) => {
    let individualDAOs;

    individualDAOs = DAOsData?.filter((dao: any) => {
      if (dao.members.includes(address)) {
        dao.orgIcon = (
          <img
            src={dao.image}
            alt="dao logo"
            width={width}
            height={width}
            className="border border-red w-8 h-8 md:w-10 md:h-10 rounded-md object-cover"
          />
        );
        return dao;
      }
    });
    userDAO = individualDAOs;
    if (currentSearch) {
      return individualDAOs.filter((item: { organisation: string }) =>
        item?.organisation
          ?.toLocaleLowerCase()
          .includes(currentSearch.toLowerCase())
      );
    } else {
      return individualDAOs;
    }
  };

  const {
    data: activities,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => getAUserActivitiesAcrossDAOs(address),
    queryKey: [USER_ACTIVITIES_KEY],
    enabled: !!address,
  });

  const totalProposals = activities && Number(activities.proposalsCreated);
  const totalVotes = activities && Number(activities.voteCasted);

  const getUserTotalDao = () => {
    return DAOsData?.filter((dao: any) => {
      if (dao.members.includes(address)) {
        return dao;
      }
    });
  };

  if (daoLoading || isLoading) return <DashboadLoading />;
  if (isDaoError) return <ErrorFetchingComponent />;
  if (isError) return toast.error(error.message);

  return (
    <div className="space-y-8 min-h-[80vh]">
      <div className="flex justify-between items-center">
        <h1
          role="heading"
          className="dark:text-white text-[#292929] font-medium text-xl"
        >
          Global Feed
        </h1>
        {isConnected ? (
          <Link href={SELECT_DAO_STYLE_URL}>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create DAO
            </Button>
          </Link>
        ) : (
          <Button onClick={() => toast.error('Please connect your wallet!')}>
            <Plus className="mr-2 h-4 w-4" /> Create DAO
          </Button>
        )}
      </div>

      <div className="gap-6 md:grid-cols-3 grid">
        {dashboardFeedsData(
          isConnected,
          getUserTotalDao(),
          totalProposals,
          totalVotes
        ).map((feed) => (
          <Cards key={feed.title} {...feed} />
        ))}
      </div>

      <AllDaos
        dashboardTableData={getDAOsData}
        connectWalletDescription="Connect your wallet to be able to see your dashboard"
        showDAO={isConnected}
      />
    </div>
  );
};

export default Dashboard;
