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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { newFeatureSchema, reportSchema } from '@/libs/validations/help-center-schema';
import FormGroup from '@/components/ui/form-group';

const Report = () => {
  const form = useForm<z.infer<typeof reportSchema>>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      email: '',
      bug: '',
      further_details: '',
      image: ''
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-dark dark:text-white font-medium text-xl" role="heading">
          Report
        </h2>
        <p className="text-defaultText text-sm font-light">
        Submit a bug report by explaining the issue you're encountering.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email Address <span className="text-[#DD3857]">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter email address"
                    {...field}
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Share the bug you observe with us
                  <span className="text-[#DD3857]">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Share bug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="further_details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Could you provide further details about the bug?{' '}
                  <span className="text-[#DD3857]">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea placeholder="Explain bug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Feel free to include a drawing or image illustrating your idea
                </FormLabel>
                <FormControl>
                  <FormGroup>
                  <div
                      className="bg-light dark:bg-[#1E1E1E] py-8 w-full rounded-lg text-center dark:text-white text-dark text-sm border-dashed dark:border-[#292929] border-[#CCCCCC99]"
                      role="button"
                    >
                      <p>Drag and Drop file</p>
                      <p>or</p>
                      <p className='text-primary'>Browse</p>
                    </div>
                    <Input
                      type="file"
                      className="absolute h-full border-b border-0 rounded-none inset-0 cursor-pointer opacity-0"
                      accept=".jpg, .jpeg, .png"
                      {...field}
                    />
                  </FormGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" className="px-12">
              Send
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Report;
