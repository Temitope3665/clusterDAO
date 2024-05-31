'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { cn } from '@/libs/utils';
import { Input } from './input';
import { Search } from 'lucide-react';

export default function SearchInput({
  placeholder,
  classNames,
  queryKey,
}: {
  placeholder: string;
  classNames?: string;
  queryKey?: string;
}) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set(queryKey || 'q', term);
    } else {
      params.delete(queryKey || 'q');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <Search
          className="absolute z-[50] top-3.5 left-3"
          strokeWidth={1}
          size={20}
        />
        <Input
          className={cn(
            'peer block w-full font-light placeholder:font-light text-defaultText rounded-md border-white dark:border-foreground focus:border-primary focus:border text-sm outline-2 placeholder:text-defaultText',
            classNames
          )}
          placeholder={placeholder}
          type="search"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get(queryKey || 'q')?.toString()}
        />
      </div>
    </div>
  );
}
