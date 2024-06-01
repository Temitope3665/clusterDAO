import { Skeleton } from '@/components/ui/skeleton';

const ProfileLoading = () => {
  return (
    <div className="space-y-10">
      <Skeleton className="w-full h-11 dark:bg-[#1E1E1E] bg-[#F5F5F5]" />
      <Skeleton className="w-full h-11 dark:bg-[#1E1E1E] bg-[#F5F5F5]" />
      <Skeleton className="w-full h-11 dark:bg-[#1E1E1E] bg-[#F5F5F5]" />
      <Skeleton className="w-full h-11 dark:bg-[#1E1E1E] bg-[#F5F5F5]" />
      <Skeleton className="w-full h-11 dark:bg-[#1E1E1E] bg-[#F5F5F5]" />
    </div>
  );
};

export default ProfileLoading;
