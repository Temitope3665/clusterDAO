import ProposalAnimation from '@/assets/animations/proposal-animation.json';
import SuccessAnimation from '@/assets/animations/success-animation.json';
import NotFoundAnimation from '@/assets/animations/not-found-animation.json';

export const defaultProposalOption = {
  loop: true,
  autoplay: true,
  animationData: ProposalAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export const defaultSuccessOption = {
  loop: true,
  autoplay: true,
  animationData: SuccessAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export const defaultNotFoundOption = {
  loop: true,
  autoplay: true,
  animationData: NotFoundAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};