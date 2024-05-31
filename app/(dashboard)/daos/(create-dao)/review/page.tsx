'use client';

import { Button } from '@/components/ui/button';
import { MoveLeft, MoveUpRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import { DAO_URL } from '@/config/path';
import { useContext, useState } from 'react';
import { AppContext } from '@/context/app-context';
import { uploadFile } from '@/config/apis';
import { toast } from 'sonner';
import {
  convertDays,
  daysToMilliseconds,
  defaultDaoCreation,
  wait,
} from '@/libs/utils';
import Lottie from 'react-lottie';
import { defaultSuccessOption } from '@/components/animation-options';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  DAOS_KEY,
  NOTIFICATIONS,
  PROPOSAL_KEY,
  USER_ACTIVITIES_KEY,
} from '@/libs/key';
import { createDAO } from '@/libs/contract-call';

const ReviewDao = () => {
  const queryClient: any = useQueryClient();
  const router = useRouter();
  const [isRouting, setIsRouting] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { updateNewDaoInfo, newDaoInfo, fetchDAOs } = useContext(AppContext);

  const { mutate, isPending } = useMutation({
    mutationFn: createDAO,
    onSuccess: () => {
      queryClient.invalidateQueries(DAOS_KEY);
      queryClient.invalidateQueries(PROPOSAL_KEY);
      queryClient.invalidateQueries(USER_ACTIVITIES_KEY);
      queryClient.invalidateQueries(NOTIFICATIONS);

      sessionStorage.removeItem('new_dao');
      updateNewDaoInfo(defaultDaoCreation);
      setOpen(true);
    },
    onError: (error: any) => toast.error(error.message),
  });

  const { mutate: mutateUploadImage, isPending: isUploading } = useMutation({
    mutationFn: uploadFile,
    onSuccess: (response) => {
      const logoURL = response.data.url;
      const name = newDaoInfo.info.daoName;
      const id = newDaoInfo.info.daoName.replace(/\s+/g, '-').toLowerCase();
      const members = newDaoInfo.members.map((m: any) => {
        return m.address;
      });
      mutate({
        name,
        id,
        description: newDaoInfo.info.about,
        image: logoURL,
        socials: newDaoInfo.info.socialMedia.map((s: any) => {
          return { name: s.type, url: s.link };
        }),
        startingBalance: 0,
        initialMembers: members,
        votingTime: Math.round(daysToMilliseconds(newDaoInfo.duration)),
        quorum: newDaoInfo.quorum,
      });
    },
    onError: (error: any) => toast.error(error.message),
  });

  const handleCreateDAO = async () => {
    let formData = new FormData();
    formData.append('file', newDaoInfo.info.logoUrl);
    formData.append('upload_preset', 'bqr7mcvh');
    mutateUploadImage(formData);
  };

  const handleGoHome = async () => {
    setIsRouting(true);
    wait().then(() => {
      router.push(DAO_URL);
      setIsRouting(false);
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-medium text-dark dark:text-white text-lg md:text-xl">
          Review your DAO
        </h1>
        <p className="text-[#888888] text-xs md:text-sm">
          By thoroughly reviewing these aspects, you contribute to the
          robustness and transparency of our DAO. Your attention to detail
          ensures a secure and effective decentralized decision-making process.
        </p>
      </div>

      <div className="dark:bg-[#1E1E1E] bg-light rounded-lg p-4 space-y-6">
        <h1 className="font-medium text-dark dark:text-white text-xl">
          DAO Style
        </h1>
        <div className="grid grid-cols-2 text-xs md:text-sm w-4/6">
          <p className="text-dark dark:text-white">Type</p>
          <p className="text-defaultText">{newDaoInfo.style}</p>
        </div>
      </div>

      <div className="dark:bg-[#1E1E1E] bg-light rounded-lg p-4 space-y-6">
        <h1 className="font-medium dark:text-white text-dark text-xl">
          DAO Information
        </h1>
        <div className="grid grid-cols-2 text-xs md:text-sm md:w-4/6">
          <p className="dark:text-white text-dark">DAO Name</p>
          <p className="text-defaultText">{newDaoInfo.info.daoName}</p>
        </div>
        <div className="grid grid-cols-2 text-xs md:text-sm md:w-4/6">
          <p className="dark:text-white text-dark">DAO Url</p>
          <p className="text-defaultText">{newDaoInfo.info.daoUrl}</p>
        </div>
        <div className="grid grid-cols-2 text-xs md:text-sm md:w-4/6">
          <p className="dark:text-white text-dark">About</p>
          <p className="text-defaultText w-[200%]">{newDaoInfo.info.about}</p>
        </div>
        <div className="grid grid-cols-2 text-xs md:text-sm md:w-4/6">
          <p className="dark:text-white text-dark">Links</p>
          {!newDaoInfo.info.socialMedia[0].type && 'None'}
          {newDaoInfo.info.socialMedia[0].type && (
            <div className="flex space-x-4">
              {newDaoInfo.info.socialMedia.map(
                (socialMedia: { link: string; type: string }) => (
                  <Link
                    href={socialMedia.link}
                    key={socialMedia.type}
                    target="_blank"
                  >
                    <div className="flex items-center space-x-2 text-primary">
                      <p className="">{socialMedia.type}</p>
                      <div className="border border-primary rounded-sm p-0.5">
                        <MoveUpRight size={10} />
                      </div>
                    </div>
                  </Link>
                )
              )}
            </div>
          )}
        </div>
      </div>

      <div className="dark:bg-[#1E1E1E] bg-light rounded-lg p-4 space-y-6">
        <h1 className="font-medium dark:text-white text-dark text-lg md:text-xl">
          Define Membership
        </h1>
        <div className="grid grid-cols-2 text-xs md:text-sm md:w-4/6">
          <p className="dark:text-white text-dark">Members</p>

          <p className="text-defaultText">{`${
            newDaoInfo.members[0].address ? newDaoInfo.members.length + 1 : '1'
          } wallet address(es)`}</p>
        </div>
      </div>

      <div className="dark:bg-[#1E1E1E] bg-light rounded-lg p-4 space-y-6">
        <h1 className="font-medium dark:text-white text-dark text-lg md:text-xl">
          Governance Settings
        </h1>
        <div className="grid grid-cols-2 text-xs md:text-sm md:w-4/6">
          <p className="dark:text-white text-dark">Duration</p>
          <p className="text-defaultText">
            {convertDays(Number(newDaoInfo.duration))}
          </p>
        </div>
        <div className="grid grid-cols-2 text-xs md:text-sm md:w-4/6">
          <p className="dark:text-white text-dark">Voting threshold</p>
          <p className="text-defaultText">{`${newDaoInfo.quorum}% quorum`}</p>
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          className="dark:bg-[#1E1E1E] bg-light dark:hover:bg-[#262525] hover:bg-light text-[#444444] dark:text-defaultText"
          onClick={() => router.back()}
        >
          <MoveLeft size={20} />
        </Button>
        <AlertDialog onOpenChange={setOpen} open={open}>
          <Button
            type="submit"
            className="px-12"
            onClick={handleCreateDAO}
            loading={isPending || isUploading}
            loadingText="Creating..."
          >
            Create DAO
          </Button>
          <AlertDialogContent className="dark:bg-[#191919] bg-light">
            <AlertDialogHeader>
              <AlertDialogDescription className="text-center text-[#888888]">
                <Lottie
                  options={defaultSuccessOption}
                  height={150}
                  width={150}
                />
                <p className="font-medium dark:text-white text-dark pb-2 -mt-2 text-lg md:text-xl">
                  Dao Created Successfully
                </p>
                {/* Congratulations! You have successfully created your DAO
                (Decentralized Autonomous Organization). Your DAO is now ready
                to embark on its mission, engage community members, and foster
                decentralized decision-making. */}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="w-full">
              <Button
                className="w-full"
                onClick={handleGoHome}
                loading={isRouting}
              >
                Back home
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ReviewDao;
