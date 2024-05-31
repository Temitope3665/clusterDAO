'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { proposalInfoSchema } from '@/libs/validations/dao-schema';
import { Textarea } from '../ui/textarea';
import { useRouter, useSearchParams } from 'next/navigation';
import { REVIEW_PROPOSAL_URL } from '@/config/path';
import { proposalLists } from '@/config/dao-config';
import { useContext, useEffect, useState } from 'react';
import { SelectFormField } from '@/components/proposals/proposal-form-element';
import ElementBlock from '../proposals/element-block';
import { EachProposalType } from '@/config/proposal-config';
import { AppContext } from '@/context/app-context';
import { IConnectWalletContext } from '@/libs/types';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { defaultProposal, millisecondsToDays, wait } from '@/libs/utils';
import { ValidateProposalForm } from '@/libs/validations/validate-create-proposal';
import { EachDaoContext } from '@/context/each-dao-context';
import EachDaoLoading from '../loading/each-dao-loading';

const CreateNewProposalForm = () => {
  const [routing, setRouting] = useState<boolean>(false);
  const { setNewProposalInfo, newProposalInfo } = useContext(AppContext);
  const { currentDAO, isLoading } = useContext(EachDaoContext);
  const { user } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const { address } = user;
  const searchParams = useSearchParams();
  const type: string =
    searchParams.get('enums') || newProposalInfo.value.type || '0';
  const memberType = searchParams.get('type') || '';
  const daoID: string = searchParams.get('ct') || '';
  const targetAddress = searchParams.get('address') || '';
  const router = useRouter();

  const form = useForm<z.infer<typeof proposalInfoSchema>>({
    resolver: zodResolver(proposalInfoSchema),
    defaultValues: {
      ...newProposalInfo.value,
      duration: millisecondsToDays(Number(currentDAO?.votingTime)),
      newName: '',
      targetWallet: targetAddress,
      type,
    },
  });

  useEffect(() => {
    if (currentDAO) {
      form.setValue(
        'duration',
        millisecondsToDays(Number(currentDAO.votingTime))
      );
    }
  }, [currentDAO, isLoading, form.getValues('type')]);

  const daoMembers = currentDAO && currentDAO.members;

  console.log(currentDAO, '-> currentDAO');

  const handleReset = (type: string) => {
    form.setValue('description', '');
    form.setValue('duration', 0);
    form.setValue('logo', '');
    form.setValue('maximum', '0');
    form.setValue('minimum', 0);
    form.setValue('newName', '');
    form.setValue('quorum', 0);
    form.setValue('socialMedia', [{ type: '', link: '' }]);
    form.setValue('targetWallet', '');
    form.setValue('value', '');
    let updatedData;
    updatedData = { ...defaultProposal.value, type: type };
    localStorage.setItem(
      'new_proposal',
      JSON.stringify({ value: updatedData })
    );
    setNewProposalInfo({ value: updatedData });
  };

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      let updatedData;
      // Remove previous selected information
      if (name === 'type') {
        updatedData = { ...defaultProposal.value, type: value.type };
        localStorage.setItem(
          'new_proposal',
          JSON.stringify({ value: updatedData })
        );
        setNewProposalInfo({ value: updatedData });
      } else {
        const updatedData = { ...newProposalInfo, value };
        localStorage.setItem('new_proposal', JSON.stringify(updatedData));
        setNewProposalInfo(updatedData);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const onSubmit = async () => {
    const currentType = Number(form.getValues('type'));

    if (ValidateProposalForm[currentType]({ form, daoMembers })) {
      setRouting(true);
      wait().then(() => {
        router.push(`${REVIEW_PROPOSAL_URL}?ct=${daoID}&type=${currentType}`);
        setRouting(false);
      });
    }
  };

  if (isLoading) return <EachDaoLoading />;

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <SelectFormField
          form={form}
          handleReset={handleReset}
          filterData={
            memberType || type === '9'
              ? [proposalLists[Number(type)]]
              : proposalLists.slice(0, proposalLists.length - 1)
          }
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Purpose of the proposal" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ElementBlock
          element={EachProposalType[form.getValues('type')]}
          form={form}
        />

        <div className="md:flex space-y-3 md:space-y-0 justify-between">
          <div className="flex space-x-3 items-center">
            <p className="font-light text-sm text-[#888888]">Published by</p>
            <img
              src={`https://avatars.z52da5wt.xyz/${address}`}
              alt="logo"
              width={20}
            />
            <p className="text-sm dark:text-white text-dark">
              {address.slice(0, 15)}...
            </p>
          </div>
          <Button
            type="submit"
            className="px-12 w-full md:w-fit"
            loading={routing}
            loadingText="Please wait..."
          >
            Review
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateNewProposalForm;
