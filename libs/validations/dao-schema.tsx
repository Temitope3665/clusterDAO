import { z } from 'zod';

// Define schema for individual social media object
const socialMediaSchema = z.object({
  type: z.string(),
  link: z.string(),
});

const member = z.object({
  address: z
    .string()
    .min(51, { message: 'Address must be at least 51 characters long' })
    .max(52, { message: 'Input must be at most 52 characters long' }),
});

const joinCommunitySchema = z.object({
  email: z.string().email({ message: 'Enter a valid email' }),
});

const daoInfoSchema = z
  .object({
    daoName: z
      .string()
      .min(2, { message: 'Must be 2 or more characters long' })
      .max(50, { message: 'Must be 50 or fewer characters long' }),
    daoUrl: z.string(),
    // .max(51, { message: 'Must be 51 or fewer characters long' }),
    logo: z.any(),
    about: z.string().min(2, { message: 'Must be 2 or more characters long' }),
    socialMedia: z.array(socialMediaSchema).optional(),
  })
  .refine((data: any) => {
    const messages: Record<string, string> = {
      daoName: 'Dao Name is compulsory',
      daoUrl: 'Dao URL is compulsory',
      logo: 'Logo field is compulsory',
      about: 'About Dao is compulsory',
    };
    for (const key of Object.keys(messages)) {
      if (!data[key as keyof typeof messages]) {
        throw new z.ZodError([
          { code: 'custom', path: [key], message: messages[key] },
        ]);
      }
    }
    // Validate each social media entry
    if (data.socialMedia) {
      for (const [index, item] of data.socialMedia.entries()) {
        if (item.type || item.link) {
          if (!item.type || !item.link) {
            throw new z.ZodError([
              {
                code: 'custom',
                path: ['socialMedia', index],
                message: 'Type and link are both required for social media',
              },
            ]);
          }
        }
      }
    }
    return true;
  });

const editDaoInfoLinksSchema = z.object({
  socialMedia: z.array(socialMediaSchema),
});

const editDaoInfoSchema = z.object({
  daoName: z
    .string()
    .min(2, { message: 'Must be 2 or more characters long' })
    .max(50, { message: 'Must be 50 or fewer characters long' }),
  logo: z.string(),
  description: z.string(),
  duration: z.number(),
  quorum: z.number(),
});

// .min(1, { message: 'Value is required' })

const proposalInfoSchema = z.object({
  type: z
    .string()
    .min(1, { message: 'Proposal type is required' })
    .default('0'),
  description: z.string().min(2, { message: 'Description must not be empty' }),
  newName: z.string().optional(),
  logo: z.any().optional(),
  targetWallet: z.any().optional(),
  value: z.string().optional(),
  duration: z.number().optional(),
  minimum: z.number().optional(),
  maximum: z.string().optional(),
  quorum: z.number().optional(),
  socialMedia: z.array(socialMediaSchema).optional(),
});

const defineMembershipSchema = z.object({
  members: z.array(member).refine((data: any) => {
    for (const [index, item] of data.entries()) {
      if (item.address === '' || /^\s+$/.test(item.address)) {
        throw new z.ZodError([
          {
            code: 'custom',
            path: ['members', index], // Pass the index here
            message: 'Member address is required',
          },
        ]);
      }
    }

    return true;
  }),
});

const editProfile = z.object({
  username: z.string(),
  email: z.string(),
  about: z.string(),
  profilePicture: z.string(),
});

const editNotifications = z.object({
  newDAO: z.boolean().optional(),
  newProposal: z.boolean().optional(),
  newUpdate: z.boolean().optional(),
  pushNewDAO: z.boolean().optional(),
  pushNewProposal: z.boolean().optional(),
  pushNewUpdate: z.boolean().optional(),
});

const editDisplay = z.object({
  light: z.boolean().optional(),
  dark: z.boolean().optional(),
  system_: z.boolean().optional(),
});

export {
  daoInfoSchema,
  defineMembershipSchema,
  proposalInfoSchema,
  editDaoInfoSchema,
  editDaoInfoLinksSchema,
  editProfile,
  editNotifications,
  editDisplay,
  joinCommunitySchema,
};
