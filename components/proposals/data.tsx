import Image from 'next/image';
import { ReactNode } from 'react';
import LegacyLogo from '@/assets/logos/legacy.png';

const proposalData: {
  type: string;
  status: string;
  description: string;
  wallet: string;
  duration: string;
  totalVote: string;
  organisation: string;
  logo: ReactNode;
  id: string;
}[] = [
  {
    type: 'Brand Identity Change',
    status: 'Active',
    organisation: 'Legacy',
    description:
      'Making a change of brand identity and UI features that can enhance the usability and functionality of Legacy.',
    wallet: '9xfDAO...ntY897',
    id: '1',
    duration: '3d 10h 23m',
    logo: <Image src={LegacyLogo} alt="legacy logo" width={22} />,
    totalVote: '100',
  },
  {
    type: 'Brand Identity Change',
    status: 'Succeeded',
    organisation: 'Legacy',
    description:
      'Making a change of brand identity and UI features that can enhance the usability and functionality of Legacy.',
    wallet: '9xfDAO...ntY897',
    duration: '3d 10h 23m',
    logo: <Image src={LegacyLogo} alt="legacy logo" width={22} />,
    id: '2',
    totalVote: '100',
  },
  {
    type: 'Brand Identity Change',
    status: 'Pending',
    description:
      'Making a change of brand identity and UI features that can enhance the usability and functionality of Legacy.',
    wallet: '9xfDAO...ntY897',
    organisation: 'Legacy',
    logo: <Image src={LegacyLogo} alt="legacy logo" width={22} />,
    duration: '3d 10h 23m',
    id: '3',
    totalVote: '100',
  },
  {
    type: 'Brand Identity Change',
    status: 'Failed',
    description:
      'Making a change of brand identity and UI features that can enhance the usability and functionality of Legacy.',
    wallet: '9xfDAO...ntY897',
    organisation: 'Legacy',
    id: '4',
    duration: '3d 10h 23m',
    logo: <Image src={LegacyLogo} alt="legacy logo" width={22} />,
    totalVote: '100',
  },
];

interface IEachStatus {
  [key: string]: ReactNode;
}

export const EachStatus: IEachStatus = {
  Active: (
    <div className="bg-[#0080FF1A] text-[#0080FF] py-1.5 px-4 rounded-lg text-xs font-light">
      Active
    </div>
  ),
  Pending: (
    <div className="bg-[#DCBB0C1A] text-[#DCBB0C] py-1.5 px-4 rounded-lg text-xs font-light">
      Pending
    </div>
  ),
  Failed: (
    <div className="bg-[#DD38571A] text-[#DD3857] py-1.5 px-4 rounded-lg text-xs font-light">
      Failed
    </div>
  ),
  Succeeded: (
    <div className="bg-[#16870E1A] text-[#16870E] py-1.5 px-2 rounded-lg text-xs font-light">
      Succeeded
    </div>
  ),
};

export const EachStatus2: IEachStatus = {
  Pending: (
    <div className="bg-[#DCBB0C1A] text-[#DCBB0C] py-1.5 px-4 rounded-lg text-xs font-light">
      Pending
    </div>
  ),
  Failed: (
    <div className="bg-[#DD38571A] text-[#DD3857] py-1.5 px-4 rounded-lg text-xs font-light">
      Failed
    </div>
  ),
  Successful: (
    <div className="bg-[#16870E1A] text-[#16870E] py-1.5 px-2 rounded-lg text-xs font-light">
      Successful
    </div>
  ),
};

export default proposalData;
