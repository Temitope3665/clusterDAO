import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import '@/styles/globals.css';
import { Suspense } from 'react';
import Loading from '@/components/loading';
import { ThemeProvider } from '@/components/themes/theme.provider';
import { Toaster as Sonner } from '@/components/ui/sonner';
import TanstackProvider from '@/context/tanstack-provider';

const rubik = Rubik({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cluster',
  description:
    'Cluster is a platform revolutionising decentralised governance on the æternity blockchain, empowering communities to make transparent decisions and shape the future together.',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/cluster-purple.svg',
        href: '/cluster-purple.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/cluster-purple.svg',
        href: '/cluster-purple.svg',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta
          name="keywords"
          content="Decentralized Autonomous Organization, Blockchain, Smart Contracts, Web 3"
        />
        <meta name="author" content="Cluster DAO" />
      </head>
      <body className={rubik.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={<Loading />}>
            <TanstackProvider>{children}</TanstackProvider>
          </Suspense>
          <Sonner richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
