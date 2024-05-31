'use client';
import { proposalLists, rate } from '@/config/dao-config';
import { ApiContext } from '@/context/api-context';
import { MoveUpRight } from 'lucide-react';
import Link from 'next/link';
import { useContext, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { convertCurrency, convertDays, millisecondsToDays } from '@/libs/utils';

interface IEachProposalDetails {
  currentProposal: {
    id: string;
    target: string;
    proposalType: string;
    daoName: string;
    proposer: string;
    value: number;
    info: {
      image: string;
      name: string;
      socials: { name: string; url: string }[];
    };
    votes: { account: string; support: boolean }[];
  };
}

const EachProposalDetails = ({ currentProposal }: IEachProposalDetails) => {
  const [open, setOpen] = useState<boolean>(false);
  const { target, proposalType, proposer, daoName, value, info } =
    currentProposal;
  const { getAEPrice } = useContext(ApiContext);
  const price = getAEPrice?.price || rate;

  return (
    <div className="text-[13px] font-light space-y-5">
      <div className="grid grid-cols-6">
        <h1 className="col-span-2">Proposal Type:</h1>
        <p className="col-span-4 overflow-hidden capitalize">
          <span className="whitespace-pre-wrap break-all">{proposalType}</span>
        </p>
      </div>
      <div className="grid grid-cols-6">
        <h1 className="col-span-2">Proposer:</h1>
        <p className="col-span-4 overflow-hidden">
          <span className="whitespace-pre-wrap break-all">{proposer}</span>
        </p>
      </div>
      {target && (
        <div className="grid grid-cols-6">
          <h1 className="col-span-2">Target Wallet:</h1>
          <p className="col-span-4 overflow-hidden">
            <span className="whitespace-pre-wrap break-all">{target}</span>
          </p>
        </div>
      )}
      {proposalType === proposalLists[0].type && (
        <div className="grid grid-cols-6">
          <h1 className="col-span-2">Value:</h1>
          <p className="col-span-4 overflow-hidden">
            {convertCurrency(value, price).ae}AE ~{' '}
            {convertCurrency(value, price).usd}USD
          </p>
        </div>
      )}
      {proposalType === proposalLists[4].type && (
        <div className="grid grid-cols-6">
          <h1 className="col-span-2">New Quorum:</h1>
          <p className="col-span-4 overflow-hidden">{Number(value)}%</p>
        </div>
      )}
      {proposalType === proposalLists[3].type && (
        <div className="grid grid-cols-6">
          <h1 className="col-span-2">New Duration:</h1>
          <p className="col-span-4 overflow-hidden">
            {convertDays(millisecondsToDays(Number(value)))}
          </p>
        </div>
      )}
      {info && info.name && (
        <div className="grid grid-cols-6">
          <h1 className="col-span-2">New Name:</h1>
          <p className="col-span-4 overflow-hidden">
            <span className="whitespace-pre-wrap break-all">{info.name}</span>
          </p>
        </div>
      )}
      {info && info?.socials[0]?.name && (
        <div className="grid grid-cols-6">
          <h1 className="col-span-2">Social Media:</h1>

          <div className="flex space-x-4 col-span-4 ">
            {info.socials.map((socialMedia: { name: string; url: string }) => (
              <Link
                href={socialMedia.url}
                key={socialMedia.name}
                target="_blank"
              >
                <div className="flex items-center space-x-2 text-primary text-sm">
                  <p className="">{socialMedia.name}</p>
                  <div className="border border-primary rounded-sm p-0.5">
                    <MoveUpRight size={10} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      {info && info.image && (
        <div className="grid grid-cols-6">
          <h1 className="col-span-2">New Image:</h1>
          <div className="col-span-4 overflow-hidden flex items-end space-x-2">
            <img
              src={info.image}
              alt={daoName}
              className="rounded-lg h-[50px] w-[50px] object-cover -pt-4"
            />
            <Dialog onOpenChange={setOpen} open={open}>
              <DialogTrigger asChild>
                <p className="font-light text-xs cursor-pointer text-defaultText">
                  Click here to view
                </p>
              </DialogTrigger>
              <DialogContent className="dark:bg-[#191919] bg-light">
                <DialogHeader>
                  <DialogTitle className="font-medium py-3">
                    Proposed DAO Logo
                  </DialogTitle>
                  <DialogDescription>
                    <img
                      src={info.image}
                      alt={daoName}
                      className="w-full border-[0.5px] rounded-sm border-stone-300 h-[400px] object-cover"
                    />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </div>
  );
};

export default EachProposalDetails;
