'use client';

import Lottie from 'react-lottie';
import { defaultProposalOption } from './animation-options';

interface ILoading {
  description?: string;
}

const Loading = ({ description }: ILoading) => (
  <div className="w-full flex h-[70vh] items-center">
    <div className="mx-auto">
      <Lottie options={defaultProposalOption} height={150} width={150} />
    </div>
  </div>
);

export default Loading;
