import { cn } from '@/libs/utils';
import AELogo from '@/assets/icons/ae-icon.png';
import Image from 'next/image';

const AEAnimation = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'bg-gradient-to-t from-[#1E1E1E] to-[#1E1E1E80] absolute h-[56px] w-[56px] top-36 right-[400px]',
        className
      )}
    >
      <div className="bg-gradient-to-r h-full w-full from-primary via-primary flex items-center justify-center to-primary shadow-[inset_0px_0px_6px_6px_rgba(0,0,0,0.3)] animate-fade-in-out">
        <Image width={32} height={32} src={AELogo} alt="aelogo" />
      </div>
    </div>
  );
};

export default AEAnimation;
