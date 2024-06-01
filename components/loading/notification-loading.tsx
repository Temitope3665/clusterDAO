import { Skeleton } from '../ui/skeleton';

const NotificationLoading = () => {
  return (
    <div className="space-y-4 mt-4">
      <Skeleton className="w-full h-11 dark:bg-[#1E1E1E] bg-[#F5F5F5]" />
      <Skeleton className="w-full h-11 dark:bg-[#1E1E1E] bg-[#F5F5F5]" />
      <Skeleton className="w-full h-11 dark:bg-[#1E1E1E] bg-[#F5F5F5]" />
      <Skeleton className="w-full h-11 dark:bg-[#1E1E1E] bg-[#F5F5F5]" />
      <Skeleton className="w-full h-11 dark:bg-[#1E1E1E] bg-[#F5F5F5]" />
    </div>
  );
};

export default NotificationLoading;
