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
import { editNotifications } from '@/libs/validations/dao-schema';
import { Switch } from '@/components/ui/switch';
import { ApiContext } from '@/context/api-context';
import { useContext } from 'react';
import { EACH_USER } from '@/libs/key';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { updateUser } from '@/config/apis';
import { toast } from 'sonner';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { IConnectWalletContext } from '@/libs/types';

const Notifications = () => {
  const queryClient: any = useQueryClient();
  const { eachUser } = useContext(ApiContext);
  const {
    user: { address },
  } = useContext<IConnectWalletContext>(ConnectWalletContext);

  const form = useForm<z.infer<typeof editNotifications>>({
    resolver: zodResolver(editNotifications),
    defaultValues: {
      newDAO: eachUser?.emailNotificationsSettings?.newDAO || false,
      newProposal: eachUser?.emailNotificationsSettings?.newProposal || false,
      newUpdate: eachUser?.emailNotificationsSettings?.newUpdate || false,
      pushNewDAO: eachUser?.pushNotificationsSettings?.newDAO || false,
      pushNewProposal:
        eachUser?.pushNotificationsSettings?.newProposal || false,
      pushNewUpdate: eachUser?.pushNotificationsSettings?.newUpdate || false,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: any) => updateUser(payload, address),
    onSuccess: (response: any) => {
      queryClient.invalidateQueries(EACH_USER);
      toast.success(response.message || 'User profile updated successfully.');
    },
    onError: (error: any) => toast.error(error.message),
  });

  const onSubmit = async (data: any) => {
    const emailNotificationsSettings = {
      newDAO: data.newDAO,
      newProposal: data.newProposal,
      newUpdate: data.newUpdate,
    };
    const pushNotificationsSettings = {
      newDAO: data.pushNewDAO,
      newProposal: data.pushNewProposal,
      newUpdate: data.pushNewUpdate,
    };
    mutate({
      emailNotificationsSettings,
      pushNotificationsSettings,
    });
    queryClient.invalidateQueries(EACH_USER);
  };
  return (
    <div className="space-y-6">
      <h2
        className="dark:text-white text-dark font-medium text-xl"
        role="heading"
      >
        Notifications
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          <div className="space-y-4">
            <h3 className="dark:text-white text-dark font-medium">Email</h3>
            <FormField
              control={form.control}
              name="newDAO"
              render={({ field }) => (
                <FormItem className="flex justify-between items-center">
                  <FormLabel className="text-defaultText">New DAO</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newProposal"
              render={({ field }) => (
                <FormItem className="flex justify-between items-center">
                  <FormLabel className="text-defaultText">
                    New Proposal
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newUpdate"
              render={({ field }) => (
                <FormItem className="flex justify-between items-center">
                  <FormLabel className="text-defaultText">
                    New Updates
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <h3 className="dark:text-white text-dark font-medium">Push</h3>
            <FormField
              control={form.control}
              name="pushNewDAO"
              render={({ field }) => (
                <FormItem className="flex justify-between items-center">
                  <FormLabel className="text-defaultText">New DAO</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pushNewProposal"
              render={({ field }) => (
                <FormItem className="flex justify-between items-center">
                  <FormLabel className="text-defaultText">
                    New Proposal
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pushNewUpdate"
              render={({ field }) => (
                <FormItem className="flex justify-between items-center">
                  <FormLabel className="text-defaultText">
                    New Updates
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="px-12"
              loading={isPending}
              loadingText="Updating..."
              disabled={!form.formState.isDirty}
            >
              Update
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Notifications;
