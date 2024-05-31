'use client';
import {
  DAO_INFO_URL,
  DEFINE_MEMBERSHIP_URL,
  GOVERNANCE_SETTINGS_URL,
  REVIEW_DAO_URL,
  SELECT_DAO_STYLE_URL,
} from '@/config/path';
import { AppContext } from '@/context/app-context';
import { cn, validateDaoInfo, validateMembership } from '@/libs/utils';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';

const Steps = () => {
  const pathname = usePathname();
  const { newDaoInfo } = useContext(AppContext);

  const steps: {
    title: string;
    url: string;
    completed?: boolean;
    disabled?: boolean;
  }[] = [
    {
      title: 'Select DAO Style',
      url: SELECT_DAO_STYLE_URL,
      completed: newDaoInfo.style,
      disabled: false,
    },
    {
      title: 'DAO Information',
      url: DAO_INFO_URL,
      disabled: !newDaoInfo.style,
      completed: !validateDaoInfo(newDaoInfo),
    },
    {
      title: 'Define Membership',
      url: DEFINE_MEMBERSHIP_URL,
      disabled: !newDaoInfo.style || validateDaoInfo(newDaoInfo),
      completed:
        validateMembership(newDaoInfo.members) && newDaoInfo.memberComplete,
    },
    {
      title: 'Governance Settings',
      url: GOVERNANCE_SETTINGS_URL,
      disabled:
        !newDaoInfo.style ||
        validateDaoInfo(newDaoInfo) ||
        !validateMembership(newDaoInfo.members),
      completed: newDaoInfo.duration > 0 && newDaoInfo.quorum > 0,
    },
  ];

  return (
    <div className="dark:bg-[#191919] bg-white p-2 md:p-4 rounded-lg md:w-[20%] space-x-8 md:space-x-0 flex md:block items-center md:items-start w-full overflow-auto">
      {steps.map((step, index) => {
        const isActive = step.completed;
        return (
          <Link href={step.disabled ? '#' : step.url} key={step.title}>
            <div
              className={cn('flex space-x-3 py-1 md:py-4 items-center text-sm')}
              role="button"
            >
              <div className="w-fit relative">
                <div
                  className={cn(
                    'rounded-full flex items-center justify-center w-8 h-8 dark:text-[#292929] text-[#CCCCCC] border dark:border-[#292929] border-[#CCCCCC] trans',
                    (pathname.startsWith(step.url) || step.completed) &&
                      'border dark:border-primary border-primary text-primary',
                    isActive && 'bg-primary'
                  )}
                >
                  {isActive ? <Check color="#FFF" size={16} /> : index + 1}
                </div>
                {index !== steps.length - 1 && (
                  <div
                    className={cn(
                      'h-8 w-[1px] md:block hidden bg-[#CCCCCC] dark:bg-[#444444] absolute left-4',
                      isActive && 'bg-primary'
                    )}
                  />
                )}
              </div>
              <p
                className={cn(
                  'trans text-sm',
                  pathname.startsWith(step.url) || step.completed
                    ? 'dark:text-white text-[#292929]'
                    : 'dark:text-[#444444] text-[#CCCCCC]'
                )}
              >
                {step.title}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Steps;
