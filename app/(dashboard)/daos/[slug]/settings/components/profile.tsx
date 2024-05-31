'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { editDaoInfoSchema } from '@/libs/validations/dao-schema';
import FormGroup from '@/components/ui/form-group';
import { EditIcon } from '@/assets/svgs';
import DaoConfigurationWrapper from '@/components/dao-configuration-wrapper';
import { EachDaoContext } from '@/context/each-dao-context';
import { useContext } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { millisecondsToDays } from '@/libs/utils';
import {
  ProposalDurationFormField,
  QuorumFormField,
} from '@/components/proposals/proposal-form-element';

const Profile = () => {
  const { currentDAO } = useContext(EachDaoContext);
  const { name, image, description, quorum } = currentDAO;
  const form = useForm<z.infer<typeof editDaoInfoSchema>>({
    resolver: zodResolver(editDaoInfoSchema),
    defaultValues: {
      daoName: name,
      logo: image,
      description,
      duration: millisecondsToDays(Number(currentDAO.votingTime)),
      quorum: Number(quorum),
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);
  };
  return (
    <DaoConfigurationWrapper>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="daoName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dao name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter DAO name"
                    className="dark:text-[#888888] text-dark"
                    {...field}
                    readOnly
                    onChange={() => null}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo</FormLabel>
                <FormControl>
                  <FormGroup>
                    <img
                      src={image}
                      alt="logo"
                      width={60}
                      height={64}
                      className="object-cover rounded-lg"
                    />
                    {!image && (
                      <>
                        <EditIcon className="mt-8 -ml-4" />
                        <Input
                          type="file"
                          className="absolute h-full dark:text-[#888888] text-dark border-b border-0 rounded-none inset-0 cursor-pointer opacity-0"
                          accept=".jpg, .jpeg, .png"
                          {...field}
                          onChange={() => null}
                          readOnly
                        />
                      </>
                    )}
                  </FormGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  About <span className="text-[#DD3857]">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Purpose of the DAO"
                    className="min-h-[150px] dark:text-[#888888] text-dark"
                    {...field}
                    onChange={() => null}
                    readOnly
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <h3 className="dark:text-white text-dark font-medium">
              Proposal duration
            </h3>
            <p className="text-defaultText text-sm">
              The minimum duration for voting on a proposal is the shortest time
              period allowed.
            </p>
          </div>

          <ProposalDurationFormField form={form} />

          <div>
            <h3 className="dark:text-white text-dark font-medium">
              Voting threshold
            </h3>
            <p className="text-defaultText text-sm">
              Proposal approval requires a majority ‘Yes’ votes from
              participating wallets, surpassing a predefined threshold.
            </p>
          </div>

          <QuorumFormField form={form} isDisabled />
        </form>
      </Form>
    </DaoConfigurationWrapper>
  );
};

export default Profile;
