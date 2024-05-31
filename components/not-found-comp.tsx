import React from 'react';
import NotFoundImage from '@/assets/images/not-found.png';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { HOME_URL } from '@/config/path';
import { useMediaQuery } from '@/hooks/use-media-query';

const NotFoundComponent = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return (
    <React.Fragment>
      <div className="w-full px-12 lg:px-0 lg:w-1/2 mx-auto my-20 space-y-4 text-center">
        <h1 className="font-medium text-white text-[40px] text-center mt-20 lg:mt-0">
          404 - Page Not Found.
        </h1>
        <p className="text-center text-sm font-light">
          Hmm... Looks like you've wandered off the beaten path. No worries
          though, let's get you back on track! Click the button below to return
          to our homepage or explore other parts of our website.
        </p>
        <Link href={HOME_URL} className="">
          <Button className="px-8 mt-6">Go Back Home</Button>
        </Link>
      </div>

      <Image
        src={NotFoundImage}
        alt="not found image"
        width={isDesktop ? 500 : 350}
        className="mx-auto px-16 lg:px-0"
      />
    </React.Fragment>
  );
};

export default NotFoundComponent;
