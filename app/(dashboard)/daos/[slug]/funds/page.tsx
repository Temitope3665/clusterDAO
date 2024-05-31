'use client';
import { CopyIcon } from '@/assets/svgs';
import DataTable from '@/components/data-table';
import { ChevronUp } from 'lucide-react';
import { columns } from './columns';
import { data } from './data';
import { IConnectWalletContext } from '@/libs/types';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { useContext } from 'react';
import { usePathname } from 'next/navigation';
import { EachDaoContext } from '@/context/each-dao-context';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'sonner';
import DepositToken from '@/components/deposit-token';
import { ApiContext } from '@/context/api-context';
import { rate } from '@/config/dao-config';
import EachDaoLoading from '@/components/loading/each-dao-loading';
import ErrorFetchingComponent from '@/components/error-fetching-comp';
import { convertCurrency } from '@/libs/utils';

const EachDaoFunds = () => {
  const pathname = usePathname();
  const domainName = typeof window !== 'undefined' && window.location.origin;
  const { currentDAO } = useContext(EachDaoContext);
  const {
    getAEPrice,
    transactionHistory,
    transactionHistoryError,
    isTransactionHistoryError,
    isLoadingTransactionHistory,
  } = useContext(ApiContext);
  const { user } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const { isConnected } = user;

  const lastIndex = pathname.lastIndexOf('/');
  const updatedUrl = pathname.substring(0, lastIndex);
  const userURL: string = `${domainName}${updatedUrl}`;

  console.log(transactionHistory, '0>transactionHistory');

  const price: number = getAEPrice?.price || rate;

  if (isLoadingTransactionHistory) return <EachDaoLoading />;
  if (isTransactionHistoryError)
    return (
      <ErrorFetchingComponent
        description={transactionHistoryError?.error?.message}
      />
    );

  return (
    <div className="space-y-4">
      {data.length === 0 ? (
        <div className="text-center w-[30%] space-y-4 mx-auto mt-[10%]">
          <p className="text-sm font-light text-defaultText">
            Currently, there are no funds in the treasury. You can initiate a
            proposal to make deposit.
          </p>
          {isConnected && <DepositToken />}
        </div>
      ) : (
        <>
          <div className="dark:bg-gradient-to-r dark:from-[#1E1E1E] dark:via-[#1E1E1E] dark:to-[#252525] p-4 space-y-4 rounded-lg bg-white">
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <p className="text-xs font-light">Total Balance</p>
                <div className="space-y-1.5">
                  <div className="flex space-x-2 items-center">
                    <p className="dark:text-white text-dark font-bold text-2xl">
                      {convertCurrency(currentDAO?.balance, price).usd}{' '}
                      <span className="text-xs font-light">USD</span>
                    </p>

                    <div className="flex items-center space-x-2 text-[#1CA013] ">
                      <ChevronUp size={16} />
                      {/* <p className="font-medium text-xs">16.59%</p> */}
                    </div>
                  </div>
                  <p className="text-[#888888] text-xs font-light">
                    {`~${convertCurrency(currentDAO?.balance, price).ae}AE`}
                  </p>
                </div>
              </div>
              {isConnected && <DepositToken />}
            </div>
            <CopyToClipboard
              text={userURL}
              onCopy={() => toast.info('URL copied to clipboard!')}
            >
              <div className="flex space-x-1.5 font-light text-xs">
                <p className="dark:text-white font-normal text-dark">
                  DAO account name:{' '}
                  <span className="text-[#888888]">{userURL}</span>
                </p>
                <CopyIcon size="18" className="cursor-pointer" />
              </div>
            </CopyToClipboard>
          </div>

          <div className="dark:bg-gradient-to-r dark:from-[#1E1E1E] dark:via-[#1E1E1E] dark:to-[#252525] p-4 space-y-4 rounded-lg bg-white">
            <h1 className="dark:text-white font-medium text-xl text-dark">
              Transaction details
            </h1>

            <DataTable
              columns={columns(getAEPrice)}
              data={transactionHistory}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default EachDaoFunds;
