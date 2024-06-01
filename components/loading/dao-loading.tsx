import { Skeleton } from '@/components/ui/skeleton';

const DaoLoading = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <Skeleton className="w-[25%] h-11 dark:bg-[#1E1E1E] bg-[#F5F5F5]" />
        <Skeleton className="w-[130px] h-11 dark:bg-[#1E1E1E] bg-[#F5F5F5]" />
      </div>
      <div className="flex items-center justify-between mb-8">
        <Skeleton className="w-[40%] h-11 dark:bg-[#1E1E1E] bg-[#F5F5F5]" />
        <div className="flex items-center space-x-3">
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <Skeleton
                className="w-[60px] h-11 dark:bg-[#1E1E1E] bg-[#F5F5F5]"
                key={`box-${index}`}
              />
            ))}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <Skeleton
              className="w-full h-56 dark:bg-[#1E1E1E] bg-[#F5F5F5] p-5 rounded-lg space-y-7"
              key={`dao-${index}`}
            />
          ))}
      </div>
    </div>
  );
};

export default DaoLoading;
