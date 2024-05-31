'use client';
import { Button } from '@/components/ui/button';
import { DaoTemplateList } from '@/config/dao-config';
import { DAO_INFO_URL } from '@/config/path';
import { AppContext } from '@/context/app-context';
import { cn, wait } from '@/libs/utils';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

const CreateNewDao = () => {
  const router = useRouter();
  const { updateNewDaoInfo, newDaoInfo } = useContext(AppContext);
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleProceed = (template: string) => {
    setIsPending(true);
    const updatedDaoInfo = { ...newDaoInfo, style: template };
    updateNewDaoInfo(updatedDaoInfo);
    wait().then(() => {
      sessionStorage.setItem('new_dao', JSON.stringify(updatedDaoInfo));
      router.push(DAO_INFO_URL);
      setIsPending(false);
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-medium dark:text-white text-dark text-xl">
          Select Template
        </h1>
        <p className="text-[#888888] text-sm">
          With our pre-defined templates, this platform enables you to create
          your organization using a customizable template.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 pb-4">
        {DaoTemplateList.map((template) => (
          <div
            key={template.title}
            className="rounded-lg p-4 dark:bg-[#1E1E1E] bg-light space-y-5"
          >
            <div
              className="h-[130px] text-white flex items-center rounded-lg justify-center"
              style={{ backgroundColor: template.color }}
            >
              {template.icon}
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <h2 className="dark:text-white text-dark font-medium text-lg">
                  {template.title}
                </h2>
                {template.status && (
                  <div
                    className="bg-[#DCBB0C] rounded-md p-2 text-xs font-light text-white cursor-default"
                    role="button"
                  >
                    {template.status}
                  </div>
                )}
              </div>
              <p className="text-defaultText text-sm">{template.description}</p>
            </div>
            <Button
              type="button"
              className={cn(
                'w-full',
                template.status === 'Coming Soon !' &&
                  'dark:bg-[#191919] dark:text-[#444444] bg-white text-dark font-normal'
              )}
              disabled={!!template.status}
              onClick={() => handleProceed(template.title)}
              loading={!!template.status ? false : isPending}
              loadingText="Please wait..."
            >
              Proceed
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateNewDao;
