import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { IProposal } from './types';
import { IDAO } from '@/context/each-dao-context';
import { rate } from '@/config/dao-config';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleChangeNumberInput = (
  value: string,
  setState: (arg: string) => void
) => {
  if (value.startsWith('0')) {
    setState('');
  } else {
    setState(value);
  }
};

export const handleMinus = (fieldName: string, form: any) => {
  form.clearErrors(fieldName);
  const initialValue = form.getValues(fieldName);
  form.setValue(fieldName, Number(initialValue) - 1);
};

export const handlePlus = (fieldName: string, form: any) => {
  form.clearErrors(fieldName);
  const initialValue = form.getValues(fieldName);
  form.setValue(fieldName, Number(initialValue) + 1);
};

export const handleChangeFormNumberInput = (
  fieldName: string,
  value: string,
  form: any
) => {
  form.clearErrors(fieldName);
  if (value.startsWith('0' || 0)) {
    form.setValue(fieldName, value[1] === '0' ? 1 : value[1]);
  } else {
    form.setValue(fieldName, Number(value));
  }
};

export const handleChangeFormDecimalInput = (
  fieldName: string,
  value: string,
  form: any
) => {
  form.clearErrors(fieldName);
  if (/^0\.\d+$/.test(value)) {
    form.setValue(fieldName, parseFloat(value));
  } else if (/^\d+(\.\d+)?$/.test(value)) {
    form.setValue(fieldName, parseFloat(value));
  } else {
    // Handle invalid input
    form.setError('value', 'Invalid value');
  }
};

export const encodeURI = (
  originalURI: string,
  keyValuePairs: string,
  otherKeyPairs?: string
) => {
  // Convert key-value pairs to a query string
  const queryString = Object.entries(keyValuePairs)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&');

  // Combine the base URL and the query string
  const fullUrl = `${originalURI}/${encodeURIComponent(keyValuePairs)}${
    otherKeyPairs ? `/${otherKeyPairs}` : ''
  }`;

  // Replace %20 and spaces with +, make the string lowercase
  const modifiedUrl = fullUrl.replace(/(%20|\s)/g, '-');

  return modifiedUrl;
};

export const validateMembership: any = (
  membershipArray: { address: string }[]
) => {
  return !membershipArray.some((item) => item.address === '');
};

export const validateDaoInfo = (obj: any) => {
  // Check if the object is empty
  if (Object.keys(obj).length === 0) {
    return true;
  }

  // Validate the 'style' key
  if (!obj.style) {
    return true;
  }

  // Validate the 'info' key
  if (!obj.info || !obj.info.daoName || !obj.info.daoUrl || !obj.info.about) {
    return true;
  }

  // Validate the 'socialMedia' key
  if (obj.info.socialMedia) {
    if (
      !Array.isArray(obj.info.socialMedia) ||
      obj.info.socialMedia.length === 0
    ) {
      // 'socialMedia' is not an array or it's an empty array
      return true;
    }
  }

  // All keys are filled, return true
  return false;
};

export const defaultDaoCreation = {
  style: '',
  info: {
    daoName: '',
    daoUrl: '',
    about: '',
    socialMedia: [{ type: '', link: '' }],
    logo: null,
    logoUrl: '',
  },
  members: [{ address: '' }],
  duration: 0,
  quorum: 50,
};

export const getStatus = (_proposal: IProposal | any) => {
  if (_proposal.isExecuted) {
    return 'Succeeded';
  }
  if (new Date(Number(_proposal.endTime)).valueOf() > Date.now().valueOf()) {
    return 'Active';
  } else {
    if (
      _proposal.votesFor > _proposal.votesAgainst &&
      new Date(Number(_proposal.endTime)).valueOf() <= Date.now().valueOf()
    ) {
      return 'Pending';
    } else {
      return 'Failed';
    }
  }
};

export const defaultProposal = {
  value: {
    type: '0',
    description: '',
    targetWallet: '',
    value: '',
    logo: '',
    duration: 0,
    quorum: 0,
    socialMedia: [{ type: '', link: '' }],
  },
};

export function daysToMilliseconds(days: number) {
  return days * 24 * 60 * 60 * 1000;
}

export function millisecondsToDays(milliseconds: number) {
  const millisecondsInADay = 1000 * 60 * 60 * 24;
  return milliseconds / millisecondsInADay;
}

export function getDaysFromMilliseconds(days: number): number {
  const millisecondsInADay = 1000 * 60 * 60 * 24;
  return days * millisecondsInADay;
}

export function formatDate(timestamp: number) {
  const date = new Date(Number(timestamp));
  const options: any = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
}

export function formatISODate(isoDateString: string): string {
  const date = new Date(isoDateString);
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export function getDuration(startTime: number, endTime: number) {
  const diff = endTime - startTime;

  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));

  return `${days}d ${hours}h ${minutes}m`;
}

export const activities: { title: string; color: string; url: string }[] = [
  {
    title: 'Proposal',
    color: 'bg-[#444444]',
    url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
  },
  {
    title: 'DAO',
    color: 'bg-[#25B81B]',
    url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
  },
  {
    title: 'Vote',
    color: 'bg-[#DCBB0C]',
    url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
  },
];

export function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);

  const options: any = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  return new Intl.DateTimeFormat('en-GB', options).format(date);
}

export function addDaysToCurrentDateAndFormat(days: number) {
  const currentDate = new Date();
  const newDate = new Date(currentDate.getTime() + days * 24 * 60 * 60 * 1000);
  return Math.floor(newDate.getTime() / 1000); // Convert milliseconds to seconds
}

export const removeExistingStorageItem = (key: string) => {
  const existingInfo =
    typeof window !== 'undefined' && localStorage.getItem(key);
  if (existingInfo) {
    localStorage.removeItem(key);
  }
};

function formatTime(milliseconds: number): string {
  const date = new Date(milliseconds);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

export function convertDays(days: number) {
  if (days) {
    const totalSeconds = days * 24 * 60 * 60;
    const d = Math.floor(totalSeconds / (24 * 60 * 60));
    const h = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const m = Math.floor((totalSeconds % (60 * 60)) / 60);
    const s = totalSeconds % 60;

    return `${d}d:${h}h:${m}m:${s.toFixed(0)}s`;
  } else {
    return 0;
  }
}

export function getTimeDifference(
  timestamp: string | number,
  setCountdownString: (arg: string) => void
): any {
  const intervalId = setInterval(() => {
    const currentTime = Date.now();
    let timeDifference = Number(timestamp) - currentTime;

    // Check if the countdown has reached zero
    if (timeDifference <= 0) {
      clearInterval(intervalId);
      setCountdownString('voting time has ended!');
      return;
    }

    // Calculate time components
    const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutesLeft = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const secondsLeft = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Format the countdown string
    const formattedString = `${daysLeft}d ${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;
    setCountdownString(formattedString);
  }, 1000);

  return () => clearInterval(intervalId);
}

export function wait() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

export const capitalizeFirstLetter = (str: string) => {
  const capitalized = str && str.charAt(0).toUpperCase() + str.slice(1);

  return capitalized;
};

export const percentageChangeRate = (data: any) => {
  console.log(data, '-> data');

  // const lastValue = Number(data[data.length - 1]?.value) || 0;
  // const secontToLastValue = Number(data[data.length - 2]?.value) || 0;
  // let percentageChange: number;
  // if (secontToLastValue !== 0) {
  //   const difference = lastValue - secontToLastValue;
  //   percentageChange = (difference / Math.abs(secontToLastValue)) * 100;
  // } else {
  //   percentageChange = 0;
  // }
  // return percentageChange;

  if (data.length < 2) {
    // Not enough data points to calculate percentage change
    return 0;
  }

  const lastValue = Number(data[data.length - 1]?.value) || 0;
  const secondToLastValue = Number(data[data.length - 2]?.value) || 0;
  let percentageChange;

  if (secondToLastValue !== 0) {
    const difference = lastValue - secondToLastValue;
    percentageChange = (difference / Math.abs(secondToLastValue)) * 100;
  } else {
    percentageChange = lastValue === 0 ? 0 : 100; // If the second to last value is 0 and last value is not 0, it's a 100% increase
  }

  return percentageChange;
};

export const convertCurrency = (amount: number, price: number) => {
  const formatAmount = Number(amount);
  const ae = Number(formatAmount) / Number(1000000000000000000);

  // Convert the result to a floating point number
  const aeFloat: number = Number(ae);

  const usdValue: number = aeFloat * Number(price || rate);
  return { ae: aeFloat, usd: usdValue.toFixed(5) };
};
