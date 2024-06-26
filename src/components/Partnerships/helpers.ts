import { PartnershipsLinks } from './Data/PartnishipLinks';

// eslint-disable-next-line import/prefer-default-export
export const getPartnershipLinks = (vehicleTypes: string[] | undefined) => {
  return PartnershipsLinks.filter(({ label }) =>
    vehicleTypes?.map(type => type.toUpperCase()).includes(label),
  );
};
