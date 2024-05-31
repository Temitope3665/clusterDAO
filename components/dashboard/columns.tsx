'use client';

import { VIEW_DAO_URL } from "@/config/path";
import { AppContext } from "@/context/app-context";
import { encodeURI } from "@/libs/utils";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";

const columns: {
  accessorKey: string;
  header: any;
  key: string;
  cell?: any;
}[] = [
  {
    accessorKey: 'organisation',
    header: 'Organisations',
    key: 'organisation',
    cell: ({ row }: any) => <OrganisationCell row={row} />,
  },
  {
    accessorKey: 'activeMember',
    header: 'Active Members',
    key: 'activeMember',
  },
  {
    accessorKey: 'activeProposal',
    header: 'Proposals (Active)',
    key: 'activeProposal',
  },
  {
    accessorKey: 'votes',
    header: 'Votes',
    key: 'votes',
  },
  {
    accessorKey: 'action',
    header: 'Action',
    key: 'action',
    cell:  ({ row }: any) => <ActionCell row={row} />,
  },
];

export { columns };

export const OrganisationCell = ({ row }: any) => {
  const { orgIcon, organisation } = row.original;
  return <div className="flex space-x-2 items-center font-medium">{orgIcon} <p>{organisation}</p></div>;
};

export const ActionCell = ({ row }: any) => {
  const { organisation } = row.original;
  const { setCurrentDAOId } = useContext(AppContext);
    return (
      <Link href={encodeURI(VIEW_DAO_URL, organisation.toLowerCase(), 'dashboard')}>
        <Eye size={18} className="dark:text-[#F5F5F5]" role="button" />
      </Link>
    )
}
