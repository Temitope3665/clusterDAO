import { isAddressValid } from '@aeternity/aepp-sdk';

export const ValidateProposalForm: any = {
  0: ({ form }: any) => validateTransfer({ form }),
  1: ({ form, daoMembers }: any) => validateMember({ form, daoMembers }),
  2: ({ form, daoMembers }: any) => validateMember({ form, daoMembers }),
  3: ({ form }: any) => validateChangeVotingTime({ form }),
  4: ({ form }: any) => validateChangeQuorum({ form }),
  5: ({ form }: any) => validateChangeDAOName({ form }),
  6: ({ form }: any) => validateChangeDAOLogo({ form }),
  7: ({ form }: any) => validateChangeSocialMedia({ form }),
  8: ({ form }: any) => validateCustom({ form }),
  9: ({ form, daoMembers }: any) => validateMember({ form, daoMembers }),
};

export const validateTransfer = ({ form }: any) => {
  const targetWallet = form.getValues('targetWallet');
  const value = form.getValues('value');

  if (
    targetWallet.length >= 51 &&
    targetWallet.length <= 53 &&
    !!Number(value)
  ) {
    return true;
  }
  if (targetWallet.length < 51 || targetWallet.length > 53) {
    form.setError('targetWallet', {
      type: 'onChange',
      message: 'Wallet address must be between 51 - 53 characters',
    });
    return false;
  }
  if (targetWallet.length < 51 || targetWallet.length > 53) {
    form.setError('targetWallet', {
      type: 'onChange',
      message: 'Wallet address must be between 51 - 53 characters',
    });
    return false;
  }
  if (!Number(value)) {
    form.setError('value', {
      type: 'onChange',
      message: 'Field is required',
    });
    return false;
  }
};

export const validateMember = ({
  form,
  daoMembers,
}: {
  form: any;
  daoMembers?: string[];
}) => {
  const targetWallet = form.getValues('targetWallet');
  const isTargetAddressValid = isAddressValid(targetWallet || '');
  const type: number = Number(form.getValues('type'));

  if (
    (type === 9 || type === 1) &&
    daoMembers &&
    daoMembers.includes(targetWallet)
  ) {
    form.setError('targetWallet', {
      type: 'onChange',
      message: 'Member already exist in this DAO',
    });
    return false;
  }

  if (type === 2 && daoMembers && !daoMembers.includes(targetWallet)) {
    form.setError('targetWallet', {
      type: 'onChange',
      message: 'Member does not exist in this DAO',
    });
    return false;
  }

  if (!isTargetAddressValid) {
    form.setError('targetWallet', {
      type: 'onChange',
      message: 'Valid address required',
    });
    return false;
  }

  if (isTargetAddressValid) {
    return true;
  }
};

export const validateChangeVotingTime = ({ form }: any) => {
  if (Number(form.getValues('maximum')) > 0) {
    return true;
  } else {
    if (Number(form.getValues('maximum')) <= 0) {
      form.setError('maximum', {
        type: 'onChange',
        message: 'Field must not be less than 0',
      });
    } else if (!form.getValues('maximum')) {
      form.setError('maximum', {
        type: 'onChange',
        message: 'Field is required',
      });
    }
    return false;
  }
};

export const validateChangeQuorum = ({ form }: any) => {
  if (!!Number(form.getValues('quorum'))) {
    return true;
  } else {
    if (form.getValues('quorum') === '0') {
      form.setError('quorum', {
        type: 'onChange',
        message: 'Field must not be 0',
      });
    } else if (!form.getValues('quorum')) {
      form.setError('quorum', {
        type: 'onChange',
        message: 'Field is required',
      });
    }
    return false;
  }
};

export const validateChangeDAOName = ({ form }: any) => {
  if (form.getValues('newName')) {
    return true;
  } else {
    form.setError('newName', {
      type: 'onChange',
      message: 'Field is required',
    });

    return false;
  }
};

export const validateChangeDAOLogo = ({ form }: any) => {
  if (form.getValues('logo')) {
    return true;
  } else {
    form.setError('logo', {
      type: 'onChange',
      message: 'Field is required',
    });

    return false;
  }
};

export const validateChangeSocialMedia = ({ form }: any) => {
  const socialMedia = form.getValues('socialMedia');

  const isEmptySocialMediaLink = socialMedia.some(
    (item: { link: string; type: string }) => item.link === ''
  );
  const isEmptySocialMediaLink2 = socialMedia.some(
    (item: { link: string; type: string }) => !item.link.startsWith('https://')
  );
  const indexLink = socialMedia.findIndex(
    (item: { link: string; type: string }) => item.link === ''
  );
  const indexLink2 = socialMedia.findIndex(
    (item: { link: string; type: string }) => !item.link.startsWith('https://')
  );
  const isEmptySocialMediaType = socialMedia.some(
    (item: { link: string; type: string }) => item.type === ''
  );
  const indexType = socialMedia.findIndex(
    (item: { link: string; type: string }) => item.type === ''
  );

  if (isEmptySocialMediaLink) {
    form.setError(`socialMedia.${indexLink}.link`, {
      type: 'onChange',
      message: 'Field should not be empty',
    });
    return false;
  } else if (isEmptySocialMediaType) {
    form.setError(`socialMedia.${indexType}.type`, {
      type: 'onChange',
      message: 'Field should not be empty',
    });
    return false;
  } else if (isEmptySocialMediaLink2) {
    form.setError(`socialMedia.${indexLink2}.link`, {
      type: 'onChange',
      message: 'Field should start with https://',
    });
    // return false;
  } else {
    return true;
  }
};

export const validateCustom = ({ form }: any) => {
  const description = form.getValues('description');

  if (description) {
    return true;
  } else {
    form.setError('description', {
      type: 'onChange',
      message: 'Field is required',
    });
    return false;
  }
};
