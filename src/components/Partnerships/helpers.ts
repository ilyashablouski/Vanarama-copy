import { PartnershipsLinks } from './Data/PartnishipLinks';

// eslint-disable-next-line import/prefer-default-export
export const getPartnershipLinks = (vehicleTypes: string[]) => {
  const links: any = [];
  vehicleTypes.forEach(type => {
    const obj = PartnershipsLinks.find(
      ({ label }) => label === type.toUpperCase(),
    );
    if (obj) {
      links.push(obj);
    }
  });
  return links;
};
