'use client';
import DaoConfigurationWrapper from '@/components/dao-configuration-wrapper';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { editDaoInfoLinksSchema } from '@/libs/validations/dao-schema';

interface ILinks {
  socials: { name: string; url: string }[];
}

const Links = ({ socials }: ILinks) => {
  const form = useForm<z.infer<typeof editDaoInfoLinksSchema>>({
    resolver: zodResolver(editDaoInfoLinksSchema),
    defaultValues: {
      socialMedia: socials.map((s) => ({ type: s.name, link: s.url })) || [
        { type: '', link: '' },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'socialMedia',
  });
  const onSubmit = async (data: any) => {
    console.log(data);
  };
  return (
    <DaoConfigurationWrapper>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <h2 className="font-medium dark:text-white text-dark">
              Social Links
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="font-light dark:text-white text-sm text-dark">
                Type
              </div>
              <div className="font-light dark:text-white text-dark text-sm">
                Link
              </div>
            </div>
            {fields.map((social: any, index) => (
              <div
                className="flex items-center w-full space-x-4 justify-between"
                key={social.id}
              >
                <div className="grid grid-cols-2 gap-6 w-[95%]">
                  <FormField
                    control={form.control}
                    name={`socialMedia.${index}.type`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Website, Twitter, Instagram"
                            readOnly
                            {...field}
                            onChange={() => null}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`socialMedia.${index}.link`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="https://"
                            {...field}
                            readOnly
                            onChange={() => null}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </form>
      </Form>
    </DaoConfigurationWrapper>
  );
};

export default Links;
