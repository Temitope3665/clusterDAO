'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
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
import { daoInfoSchema } from '@/libs/validations/dao-schema';
import { Textarea } from '../ui/textarea';
import { MoveLeft, Plus, Trash2 } from 'lucide-react';
import FormGroup from '../ui/form-group';
import { useRouter } from 'next/navigation';
import { DEFINE_MEMBERSHIP_URL, SELECT_DAO_STYLE_URL } from '@/config/path';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { AppContext } from '@/context/app-context';
import { toast } from 'sonner';
import { wait } from '@/libs/utils';

const DaoInfoForm = () => {
  const { updateNewDaoInfo, newDaoInfo } = useContext(AppContext);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isBack, setIsBack] = useState<boolean>(false);
  const [logoFormData, setLogoFormData] = useState<FormData | null>(null);
  const [onUploadUrl, setOnUploadUrl] = useState<string>(
    newDaoInfo.info.logoUrl || ''
  );
  const router = useRouter();
  const domainName = typeof window !== 'undefined' && window.location.origin;

  const form = useForm<z.infer<typeof daoInfoSchema>>({
    resolver: zodResolver(daoInfoSchema),
    defaultValues: {
      daoName: newDaoInfo.info.daoName,
      daoUrl: newDaoInfo.info.daoUrl,
      logo: newDaoInfo.info.logoUrl,
      about: newDaoInfo.info.about,
      socialMedia: newDaoInfo.info.socialMedia,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'socialMedia',
  });

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      const updatedData = {
        ...newDaoInfo,
        info: {
          ...newDaoInfo.info,
          ...value,
          logo: logoFormData,
          logoUrl: onUploadUrl,
        },
      };
      sessionStorage.setItem('new_dao', JSON.stringify(updatedData));
      updateNewDaoInfo(updatedData);
    });
    return () => subscription.unsubscribe();
  }, [form.watch, onUploadUrl]);

  const watchDaoName = form.watch('daoName');

  useEffect(() => {
    if (watchDaoName.length > 0) {
      const getDaoName = form.getValues('daoName').toLowerCase();
      const formatDaoName = getDaoName.replace(/\s+/g, '-');
      form.setValue('daoUrl', `${domainName}/dao/${formatDaoName}`);
    }
  }, [watchDaoName]);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const maxSize: number = 3 * 1024 * 1024;
    const file: any = e.target.files?.[0];
    if (file.size >= maxSize) {
      toast.error('File is too large. Max size of 3mb');
    } else {
      setLogoFormData(file);

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          setOnUploadUrl(result);
          form.setValue('logo', file);
          form.setError('logo', { message: '' });
          const updatedData = {
            ...newDaoInfo,
            info: { ...newDaoInfo.info, logo: file, logoUrl: result },
          };
          updateNewDaoInfo(updatedData);
          sessionStorage.setItem('new_dao', JSON.stringify(updatedData));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleBack = () => {
    setIsBack(true);
    wait().then(() => {
      router.push(SELECT_DAO_STYLE_URL);
      setIsBack(false);
    });
  };

  const onSubmit = async (data: any) => {
    setIsPending(true);
    wait().then(() => {
      router.push(DEFINE_MEMBERSHIP_URL);
      setIsPending(false);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="daoName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Dao name <span className="text-[#DD3857]">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter DAO name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="daoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dao URL (auto filled)</FormLabel>
              <FormControl>
                <Input placeholder="dao.ae" {...field} readOnly />
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
              <FormLabel>
                Logo <span className="text-[#DD3857]">*</span>
                <span className="text-[#888888] text-sm">
                  {' '}
                  JPG, PNG, or SVG of not more than 3MB.
                </span>
              </FormLabel>
              <FormControl>
                <FormGroup>
                  {onUploadUrl && (
                    <div className="flex space-x-2 items-end">
                      <img
                        src={onUploadUrl}
                        alt="logo"
                        className="rounded-lg h-[50px] w-[50px] object-cover"
                      />
                      <p className="text-[10px]">Change</p>
                    </div>
                  )}
                  {!onUploadUrl && (
                    <div
                      className="dark:bg-[#1E1E1E] bg-light text-dark dark:text-defaultText h-[50px] w-[50px] rounded-lg flex items-center justify-center"
                      role="button"
                    >
                      <Plus />
                    </div>
                  )}
                  <Input
                    type="file"
                    className="absolute h-full border-b border-0 w-fit rounded-none inset-0 cursor-pointer opacity-0"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleUpload}
                  />
                </FormGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                About <span className="text-[#DD3857]">*</span>
              </FormLabel>
              <FormControl>
                <Textarea placeholder="Purpose of the DAO" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <h2 className="font-medium text-dark dark:text-white">
            Social Links{' '}
            <span className="text-[#888888] font-light">(Optional)</span>
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="font text-dark dark:text-white text-sm">Type</div>
            <div className="font text-dark dark:text-white text-sm">Link</div>
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
                          onInput={() =>
                            form.setError('socialMedia', { message: '' })
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.socialMedia?.[index]?.root
                          ?.message || ''}
                      </FormMessage>
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
                          onBlur={() =>
                            !field.value.startsWith('https://')
                              ? form.setError(`socialMedia.${index}.link`, {
                                  type: 'onChange',
                                  message: 'Ensure to start with https',
                                })
                              : form.clearErrors(`socialMedia.${index}.link`)
                          }
                        />
                      </FormControl>
                      <p className="text-defaultText text-xs font-light">
                        Ensure to start with{' '}
                        <span className="text-primary">https://</span>
                      </p>
                      <FormMessage>
                        {form.formState.errors.socialMedia?.[index]?.root
                          ?.message || ''}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              {fields.length > 1 && (
                <div
                  className="w-[3%]"
                  role="button"
                  onClick={() => remove(index)}
                >
                  <Trash2 color="#F998A9" size={20} />
                </div>
              )}
            </div>
          ))}
          <div
            className="flex space-x-2 bg-[#1E1E1E] border border-dark text-white w-fit rounded-lg py-2 px-3 items-center justify-center text-xs"
            role="button"
            onClick={() => append({ type: '', link: '' })}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Link
          </div>
        </div>
        <div className="flex justify-between">
          <Button
            type="button"
            className="dark:bg-[#1E1E1E] bg-light dark:hover:bg-[#262525] hover:bg-light text-[#444444] dark:text-defaultText"
            onClick={handleBack}
            loading={isBack}
          >
            <MoveLeft size={20} />
          </Button>
          <Button
            type="submit"
            className="px-12"
            loading={isPending}
            loadingText="Please wait ..."
          >
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DaoInfoForm;
