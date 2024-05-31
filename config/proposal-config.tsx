import {
  EquivalentValueFormField,
  ProposalDurationFormField,
  QuorumFormField,
  TextFormField,
  UpdateSocialsFormField,
  UploadFileFormField,
} from '@/components/proposals/proposal-form-element';
import { Input } from '@/components/ui/input';
import { cn } from '@/libs/utils';
import { Minus, Plus } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';

export const ProposalTransfer = ({ form }: { form: any }) => {
  return (
    <React.Fragment>
      <div className="grid grid-cols-2 gap-6">
        <TextFormField
          form={form}
          name="targetWallet"
          label="Target Wallet"
          placeholder="Wallet address"
        />

        <EquivalentValueFormField form={form} />
      </div>
      <ProposalDurationFormField form={form} />
    </React.Fragment>
  );
};

export const ProposeToChangeVotingTime = ({ form }: { form: any }) => {
  const [days, setDays] = useState<number | string>(0);
  const error = form.formState?.errors?.maximum?.message;
  useEffect(() => {
    form.setError('maximum', '');
    form.setValue('maximum', days);
  }, [days]);
  return (
    <>
      <div className="grid grid-cols-2 gap-1">
        <div className="space-y-3">
          <label className="dark:text-white text-dark font-light text-sm">
            New Proposal Duration
          </label>
          <div className="border border-[#CCCCCC99] dark:border-[#292929] flex items-center justify-between rounded-lg pt-1 px-5 dark:text-defaultText text-dark">
            <div
              className={cn(
                'bg-[#D2D2D2] hover:bg-[#dddada] dark:bg-[#1E1E1E] rounded-lg py-2 px-2 dark:hover:bg-[#2a2a2a] trans',
                days === 0 && 'cursor-default'
              )}
              role="button"
              onClick={() => {
                days === 0 ? null : setDays((prev) => Number(prev) - 1);
              }}
            >
              <Minus size={18} />
            </div>
            <Input
              value={days}
              type="number"
              className="border-none bg-white dark:bg-[#191919] w-fit text-center "
              placeholder="0"
              onChange={({ target }) => setDays(target.value)}
            />
            <div
              className="bg-[#D2D2D2] hover:bg-[#dddada] dark:bg-[#1E1E1E] rounded-lg py-2 px-2 dark:hover:bg-[#2a2a2a] trans"
              role="button"
              onClick={() => setDays((prev) => Number(prev || 0) + 1)}
            >
              <Plus size={18} />
            </div>
          </div>
        </div>
      </div>
      {error && <p className="text-sm font-light text-destructive">{error}</p>}
    </>
  );
};

export const ProposeToUpdateMember = ({ form }: { form: any }) => {
  const searchPararms = useSearchParams();
  const address = searchPararms.get('address');
  return (
    <>
      <TextFormField
        form={form}
        name="targetWallet"
        label="Target Wallet"
        placeholder="Wallet address"
        disabled={!!address}
      />
      <ProposalDurationFormField form={form} />
    </>
  );
};

export const ProposeToChangeQuorum = ({ form }: { form: any }) => {
  return (
    <>
      <QuorumFormField form={form} />
      <ProposalDurationFormField form={form} />
    </>
  );
};

export const ProposeToChangeDaosName = ({ form }: { form: any }) => {
  return (
    <>
      <TextFormField
        form={form}
        name="newName"
        label="New DAO Name"
        placeholder="Enter DAO New Name"
      />
      <ProposalDurationFormField form={form} />
    </>
  );
};

export const ProposeToChangeDaosLogo = ({ form }: { form: any }) => {
  return (
    <>
      <UploadFileFormField form={form} />
      <ProposalDurationFormField form={form} />
    </>
  );
};

export const ProposeToUpdateDaosSocials = ({ form }: { form: any }) => {
  return (
    <>
      <UpdateSocialsFormField form={form} />
      <ProposalDurationFormField form={form} />
    </>
  );
};

export const ProposeToUpdateOthers = ({ form }: { form: any }) => {
  return (
    <>
      <ProposalDurationFormField form={form} />
    </>
  );
};

export const CustomProposal = ({ form }: { form: any }) => {
  return <>{/* <ProposalDurationFormField form={form} /> */}</>;
};

export const ProposeToJoinDAO = ({ form }: { form: any }) => {
  return (
    <>
      <TextFormField
        form={form}
        name="targetWallet"
        label="Target Wallet"
        placeholder="Wallet address"
      />
    </>
  );
};

// Define the type for the component function
type ComponentType = FC<{ form: any }>;

// Define the type for the EachProposalType object
interface EachProposalType {
  [key: string]: ComponentType;
}

export const EachProposalType: EachProposalType = {
  0: ProposalTransfer,
  1: ProposeToUpdateMember,
  2: ProposeToUpdateMember,
  3: ProposeToChangeVotingTime,
  4: ProposeToChangeQuorum,
  5: ProposeToChangeDaosName,
  6: ProposeToChangeDaosLogo,
  7: ProposeToUpdateDaosSocials,
  8: CustomProposal,
  9: ProposeToJoinDAO,
};
