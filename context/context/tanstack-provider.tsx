'use client';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { toast } from 'sonner';

interface TanstackProviderProps {
  children: React.ReactNode;
}

const TanstackProvider: React.FC<TanstackProviderProps> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
          // onError: (error: any) => {
          //   if (error.response?.status === 401) {
          //     // Can handle 401 error here as well
          //     toast.error('User not authorized');
          //   }
          // },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default TanstackProvider;
