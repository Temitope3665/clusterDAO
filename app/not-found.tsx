'use client';
import Background from '@/assets/images/main-bg.png';
import { Separator } from '@/components/ui/separator';
import NotFoundComponent from '@/components/not-found-comp';

export default function NotFound() {
  return (
    <main
      className="bg-contain bg-no-repeat w-full h-screen flex flex-col"
      style={{
        background: 'round',
        backgroundImage: `url(${Background.src})`,
      }}
    >
      <NotFoundComponent />

      <div className="mt-auto px-6 lg:px-24 pb-4">
        <Separator className="bg-[#444444] mb-4  mt-4 lg:mt-1" />
        <div className="flex items-center justify-between text-[12px]">
          <p>{`All Right Reserved. ${new Date().getFullYear()}`}</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </main>
  );
}
