import { Skeleton } from '@/components/ui/skeleton';

const EachDaoLoading = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <Skeleton className="w-[25%] h-11 dark:bg-[#1E1E1E] bg-[#F5F5F5]" />
        <Skeleton className="w-[130px] h-11 dark:bg-[#1E1E1E] bg-[#F5F5F5]" />
      </div>
      <div className="flex items-center justify-between mb-8">
        <Skeleton className="w-[40%] h-11 dark:bg-[#1E1E1E] bg-[#F5F5F5]" />
        <div className="flex items-center space-x-3">
          <Skeleton className="w-[60px] h-11 dark:bg-[#1E1E1E] bg-[#F5F5F5]" />
        </div>
      </div>
      <div>
        <Skeleton className="w-full h-16 dark:bg-[#1E1E1E] bg-[#F5F5F5]" />
      </div>
      <div className="">
        <Skeleton className="w-full h-[50vh] dark:bg-[#1E1E1E] bg-[#F5F5F5] p-5 rounded-lg space-y-7" />
      </div>
    </div>
  );
};

export default EachDaoLoading;
