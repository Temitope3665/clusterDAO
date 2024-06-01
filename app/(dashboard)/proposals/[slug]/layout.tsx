'use client';
import { PROPOSALS_URL } from '@/config/path';
import { redirect, useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';

interface ILayout {
  children: ReactNode;
}

const Layout = ({ children }: ILayout) => {
  const searchParams = useSearchParams();
  const daoId = searchParams.get('dao');
  if (!daoId) {
    redirect(PROPOSALS_URL);
  } else {
    return <div>{children}</div>;
  }
};

export default Layout;
