import { TotalProposalType } from '@/libs/types';
import { ReactNode } from 'react';

interface ICards {
  title: string;
  value: number | Promise<TotalProposalType>;
  icon: ReactNode;
}

const Cards = ({ title, value, icon }: ICards) => {
  return (
    <div
      className="flex space-x-4 w-full items-center dark:bg-gradient-to-r dark:from-[#1E1E1E] dark:via-[#1E1E1E] dark:to-[#252525] bg-white p-4 rounded-lg"
      role="feed"
    >
      {icon}
      <div className="space-y-1">
        <h2 className="text-[#888888] font-light text-sm">{title}</h2>
        <h3 className="dark:text-[#F5F5F5] text-dark font-bold text-[24px]">
          {value}
        </h3>
      </div>
    </div>
  );
};

export default Cards;
