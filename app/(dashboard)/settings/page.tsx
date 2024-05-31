'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import DefaultImage from '@/assets/icons/roundedIcon.png';
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
import { editProfile } from '@/libs/validations/dao-schema';
import { Textarea } from '@/components/ui/textarea';
import { ChangeEvent, useContext, useState } from 'react';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { IConnectWalletContext, ICreateUser } from '@/libs/types';
import { toast } from 'sonner';
import FormGroup from '@/components/ui/form-group';
import { uploadFile } from '@/config/apis';
import { ApiContext } from '@/context/api-context';

const Profile = () => {
  const [imageUploading, setImageUploading] = useState<boolean>(false);
  const {
    user: { address },
  } = useContext<IConnectWalletContext>(ConnectWalletContext);

  const { eachUser, isMutatingUsers, mutateUsers } = useContext(ApiContext);

  const [profileImage, setProfileImage] = useState(
    eachUser?.profilePicture || DefaultImage.src
  );
  const [isImageUpload, setIsImageUpload] = useState<boolean>(false);

  const form = useForm<z.infer<typeof editProfile>>({
    resolver: zodResolver(editProfile),
    defaultValues: {
      username: eachUser?.username || '',
      profilePicture: eachUser?.profilePicture || '',
      email: eachUser?.email || '',
      about: eachUser?.about || '',
    },
  });

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const maxSize: number = 3 * 1024 * 1024;
    const file: any = e.target.files?.[0];
    if (file.size >= maxSize) {
      toast.error('File is too large. Max size of 3mb');
    } else {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          form.setValue('profilePicture', result);
          setProfileImage(result);
          setIsImageUpload(true);
          form.setError('profilePicture', { message: '' });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const onSubmit = async (data: ICreateUser) => {
    setImageUploading(true);
    let profilePicture;
    try {
      if (isImageUpload) {
        let formData = new FormData();
        formData.append('file', data.profilePicture);
        formData.append('upload_preset', 'bqr7mcvh');
        const fileUpload = await uploadFile(formData);
        profilePicture = fileUpload.data.url;
      }
      const updatedData = { ...data, profilePicture, address, theme: 'dark' };
      await mutateUsers(updatedData);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setImageUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2
        className="text-dark dark:text-white font-medium text-xl"
        role="heading"
      >
        My Profile
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex space-x-2 items-center">
            <FormField
              control={form.control}
              name="profilePicture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel></FormLabel>
                  <FormControl>
                    <FormGroup>
                      <img
                        src={profileImage}
                        alt="logo"
                        className="rounded-full object-cover border w-[60px] h-[60px] relative"
                      />
                      <p className="text-[10px] absolute top-16 left-2">
                        Change
                      </p>
                      <Input
                        type="file"
                        className="absolute h-full border-b border-0 w-fit rounded-none inset-0 cursor-pointer opacity-0"
                        accept=".jpg, .jpeg, .png"
                        onChange={handleUpload}
                      />
                    </FormGroup>
                  </FormControl>
                  <FormMessage className="pt-4" />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <p className="text-sm text-dark dark:text-white font-medium">
                {eachUser?.username || `${address.slice(0, 15)}...`}
              </p>
              <CopyToClipboard
                text={address}
                onCopy={() => toast.info('Address copied to clipboard!')}
              >
                <div className="border border-[#444444] text-[#888888] p-2 rounded-lg flex space-x-2 text-sm">
                  <p>{address.slice(0, 15)}...</p>{' '}
                </div>
              </CopyToClipboard>
            </div>
          </div>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter email address"
                    readOnly={eachUser?.email}
                    disabled={eachUser?.email}
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
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell your story"
                    {...field}
                    // defaultValue={eachUser.about}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              className="px-12"
              loading={isMutatingUsers || imageUploading}
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

export default Profile;
