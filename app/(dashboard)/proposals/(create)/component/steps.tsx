'use client';
import { CREATE_PROPOSAL_URL, REVIEW_PROPOSAL_URL } from '@/config/path';
import { cn } from '@/libs/utils';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Steps = () => {
  const pathname = usePathname();
  const steps = [
    {
      title: 'New Proposal',
      url: CREATE_PROPOSAL_URL,
    },
  ];
  const currentStepIndex = steps.findIndex((step) =>
    pathname.startsWith(step.url)
  );

  return (
    <div className="dark:bg-[#191919] p-4 rounded-lg w-full md:w-[20%] bg-white">
      {steps.map((step, index) => (
        <Link href={step.url} key={step.title}>
          <div
            className={cn(
              'flex space-x-3 font-light py-1 items-center text-sm'
            )}
          >
            <div
              className={cn(
                'rounded-full flex items-center justify-center w-8 h-8 text-[#292929] border dark:border-[#292929] trans border-[]',
                pathname.startsWith(step.url) &&
                  'border border-primary text-primary',
                (currentStepIndex > index ||
                  pathname === REVIEW_PROPOSAL_URL) &&
                  'bg-primary dark:text-white text-dark'
              )}
            >
              {currentStepIndex > index || pathname === REVIEW_PROPOSAL_URL ? (
                <Check className="dark:text-light text-white" size={16} />
              ) : (
                index + 1
              )}
            </div>
            <p
              className={cn(
                'trans',
                pathname.startsWith(step.url) ||
                  pathname === REVIEW_PROPOSAL_URL
                  ? 'dark:text-white text-dark'
                  : 'text-[#292929]'
              )}
            >
              {step.title}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Steps;
