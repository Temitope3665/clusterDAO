'use client';
import Image from 'next/image';
import AELogo from '@/assets/logos/ae-logo.png';

import { ArrowUpFromLine } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn, encodeURI, formatDate, formatISODate } from '@/libs/utils';
import { Button } from '@/components/ui/button';
import { EachStatus2 } from '@/components/proposals/data';
import { ImportIcon } from '@/assets/svgs';
import { rate } from '@/config/dao-config';

const columns = (getAEPrice: {
  price: number;
}): {
  accessorKey: string;
  header: any;
  key: string;
  cell?: any;
}[] => [
  {
    accessorKey: 'token',
    header: 'Token',
    key: 'token',
    cell: ({ row }: any) => <Image src={AELogo} alt="ae logo" width={24} />,
  },
  {
    accessorKey: 'amount',
    header: 'Amount (AE)',
    key: 'amount',
    cell: ({ row }: any) => (
      <p>
        {row.original.amount}
        <span className="text-xs">AE</span>
      </p>
    ),
  },
  {
    accessorKey: 'amount',
    header: 'Amount (USD)',
    key: 'amount',
    cell: ({ row }: any) => (
      <p>
        {(
          Number(row.original.amount) * Number(getAEPrice?.price || rate)
        ).toFixed(2)}
        <span className="text-xs">USD</span>
      </p>
    ),
  },
  {
    accessorKey: 'sender',
    header: 'Sender',
    key: 'sender',
    cell: ({ row }: any) => (
      <p>
        {row.original.sender.slice(0, 6) +
          '...' +
          row.original.sender.slice(-4)}
      </p>
    ),
  },
  {
    accessorKey: 'receiver',
    header: 'Receiver',
    key: 'receiver',
    cell: ({ row }: any) => (
      <p>
        {row.original.receiver.slice(0, 6) +
          '...' +
          row.original.receiver.slice(-4)}
      </p>
    ),
  },
  {
    accessorKey: 'date',
    header: 'Date',
    key: 'date',
    cell: ({ row }: { row: { original: { date: string } } }) => (
      <p>{formatISODate(row.original.date)}</p>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    key: 'status',
    cell: ({ row }: any) => <StatusCell row={row} />,
  },
];

export { columns };

export const TransactionTypeCell = ({ row }: any) => {
  const { logo, transactionType } = row.original;
  return (
    <div className="flex space-x-2 items-center">
      <div
        className={cn(
          'rounded-md p-1.5',
          transactionType === 'Deposit' ? 'bg-[#C9FDC5]' : 'bg-[#FDC5D0]'
        )}
      >
        {transactionType === 'Deposit' ? (
          <ImportIcon />
        ) : (
          <ArrowUpFromLine size={16} color="#A0132D" />
        )}
      </div>
      <p>{transactionType}</p>
    </div>
  );
};

export const ActionCell = ({ row }: any) => {
  const { id } = row.original;
  const pathname = usePathname();
  return (
    // <Eye size={18} color="#F5F5F5" role="button" />
    <Link href={encodeURI(pathname, id)}>
      <Button className="bg-[#1E1E1E] text-white" size="sm">
        Details
      </Button>
    </Link>
  );
};

export const StatusCell = ({ row }: any) => {
  const { status } = row.original;
  return <div className="w-fit">{EachStatus2['Successful']}</div>;
};
