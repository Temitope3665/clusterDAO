'use client';
import DaoInfoForm from '@/components/forms/dao-info-form';

const DaoInfo = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-medium dark:text-white text-dark text-xl">
          DAO Information
        </h1>
        <p className="text-[#888888] text-sm">
          Designate and describe your DAO. This information is prominently
          featured on the DAO Explore page and can be subject to modification
          through a voting process.
        </p>
      </div>
      <DaoInfoForm />
    </div>
  );
};

export default DaoInfo;
