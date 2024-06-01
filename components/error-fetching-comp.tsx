'use client';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { cn } from '@/libs/utils';
import { DAO_URL } from '@/config/path';
import { useContext } from 'react';
import { EachDaoContext } from '@/context/each-dao-context';

const ErrorFetchingComponent = ({
  className,
  description,
}: {
  className?: string;
  description?: string;
}) => {
  const { setError } = useContext(EachDaoContext);
  const router = useRouter();
  return (
    <div className={cn('min-h-[80vh] w-full p-8', className)}>
      <div className="w-[90%] space-y-4 font-light text-sm">
        <h1 className="dark:text-white text-dark text-[28px]">
          This view can’t be reached
        </h1>
        {description === 'Invocation failed: "Maps: Key does not exist"' ? (
          <p>The DAO could not be found.</p>
        ) : (
          <p>We cannot connect to the server at www.nucluesDAO.com</p>
        )}
        <p>{description}</p>
        <p>Try the following help:</p>
        <p>1. Try again later.</p>
        <p>2. Check your network connection.</p>
        <p
          onClick={() => {
            setError('');
            router.push(DAO_URL);
          }}
        >
          3. Click{' '}
          <span className="text-primary" role="button">
            here
          </span>{' '}
          to go home
        </p>
        <p>
          3. If you're connected but facing firewall restrictions, ensure
          Firefox has the necessary permissions to access the internet.
        </p>
        {description === 'Invocation failed: "Maps: Key does not exist"' ? (
          <Button
            className=""
            onClick={() => {
              setError('');
              router.push(DAO_URL);
            }}
          >
            Go home!
          </Button>
        ) : (
          <Button
            className=""
            onClick={() => {
              setError('');
              router.refresh();
            }}
          >
            Try again!
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorFetchingComponent;
