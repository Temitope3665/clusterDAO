'use client';

import { redirect, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const pathname = usePathname();

  useEffect(() => {
    redirect(`${pathname}/dashboard`);
  }, []);
}
