import * as React from 'react';

import { cn } from '@/libs/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-12 w-full text-dark dark:text-white font-normal rounded-md border-[#CCCCCC99] border dark:border-[#292929] bg-white dark:focus:border-primary dark:bg-dark px-3 py-2 focus:border-primary text-base lg:text-sm file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:font-normal dark:placeholder:text-[#666666] placeholder:text-[#AAAAAA] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
