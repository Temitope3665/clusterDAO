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
import { editDisplay } from '@/libs/validations/dao-schema';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { ApiContext } from '@/context/api-context';
import { useContext } from 'react';
import { toast } from 'sonner';

const Display = () => {
  const { eachUser, mutateUsers } = useContext(ApiContext);
  const { setTheme, theme } = useTheme();
  const form = useForm<z.infer<typeof editDisplay>>({
    resolver: zodResolver(editDisplay),
    defaultValues: {
      light: eachUser.theme === 'light',
      dark: eachUser.theme === 'dark',
      system_: eachUser.theme === 'system',
    },
  });

  const handleOnCheck = async (value: boolean, type: any) => {
    try {
      await mutateUsers({ theme: type });
      form.setValue('light', type === 'light' ? value : false);
      form.setValue('dark', type === 'dark' ? value : false);
      form.setValue('system_', type === 'system_' ? value : false);
      setTheme(type === 'system_' ? 'system' : type);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <h2
        className="dark:text-white font-medium text-xl text-dark"
        role="heading"
      >
        Display
      </h2>

      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="light"
            render={({ field }) => (
              <FormItem className="flex justify-between items-center">
                <FormLabel className="dark:text-white text-dark">
                  Light mode
                </FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(value) => handleOnCheck(value, 'light')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dark"
            render={({ field }) => (
              <FormItem className="flex justify-between items-center">
                <FormLabel className="dark:text-white text-dark">
                  Dark mode
                </FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(value) => handleOnCheck(value, 'dark')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="system_"
            render={({ field }) => (
              <FormItem className="flex justify-between items-center">
                <FormLabel className="dark:text-white text-dark">
                  Use device settings
                </FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(value) => handleOnCheck(value, 'system_')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default Display;
