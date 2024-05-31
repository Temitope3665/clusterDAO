'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { joinCommunitySchema } from '@/libs/validations/dao-schema';
import { useMutation } from '@tanstack/react-query';
import { joinWaitList } from '@/config/apis';
import { toast } from 'sonner';
import Lottie from 'react-lottie';
import { defaultSuccessOption } from '../animation-options';
import { useState } from 'react';

const JoinCommunityForm = () => {
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof joinCommunitySchema>>({
    resolver: zodResolver(joinCommunitySchema),
    defaultValues: {
      email: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: joinWaitList,
    onSuccess: (response) => {
      setOpen(true);
      form.resetField('email');
      setSuccessMessage(response.message);
      toast.success(response.message);
    },
    onError: (error) => toast.error(error.message),
  });

  const onSubmit = async (data: any) => {
    mutate(data);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="bg-[#1E1E1E66] h-[56px] pl-4 text-[#D2D2D2] pr-28 placeholder:text-[#292929] border-[#65656580]"
                    placeholder="Enter your email address"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-left" />
              </FormItem>
            )}
          />
          <Button
            className="absolute -top-6 right-2 px-6"
            style={{ height: '41px' }}
            loading={isPending}
            loadingText="Subscribing..."
          >
            Susbcribe
          </Button>
        </form>
      </Form>

      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent className="">
          <DialogHeader>
            <DialogDescription className="font-light space-y-3">
              <div className="text-center">
                <Lottie
                  options={defaultSuccessOption}
                  height={150}
                  width={150}
                />
                <p className="font-medium dark:text-white pb-2 -mt-2 text-xl text-dark">
                  {successMessage}
                </p>
                <p>
                  You're all set to stay updated on upcoming releases, exclusive
                  offers, and exciting news! Keep an eye on your inbox for
                  updates and exclusive perks just for our waitlist members.
                </p>
                <Button
                  className="px-16 mt-4"
                  onClick={() => {
                    setOpen(false);
                    setSuccessMessage('');
                  }}
                >
                  Done
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JoinCommunityForm;
