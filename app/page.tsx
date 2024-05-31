'use client';

import { DAO_URL } from '@/config/path';
import { redirect } from 'next/navigation';

export default function Home() {
  redirect(DAO_URL);
}
