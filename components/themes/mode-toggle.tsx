'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';

import { Moon, Sun } from 'lucide-react';
import { cn } from '@/libs/utils';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
      <div className="border-none px-1.5 py-2.5 dark:bg-[#1E1E1E] bg-white flex space-x-4 rounded-md items-center w-fit">
        <Sun className={cn('h-[1.5rem] dark:text-white text-[#444444] w-[1.5rem] rotate-0 scale-100 transition-all p-1', theme === 'light' && 'dark:bg-[#444444] bg-[#E6E6E6] rounded-md text-[#9050E9]')} onClick={() => setTheme("light")} role='button' />
        <Moon className={cn('h-[1.5rem] dark:text-white text-[#444444] w-[1.5rem] rotate-0 scale-100 transition-all p-1', theme === 'dark' && 'dark:bg-[#444444] bg-[#E6E6E6] rounded-md text-[#9050E9]')} onClick={() => setTheme("dark")} role='button' />
      </div>
  );
}
