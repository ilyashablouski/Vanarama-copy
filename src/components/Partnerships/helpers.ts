import { PartnershipsLinks } from './Data/PartnishipLinks';

export const getPartnershipLinks = (vehicleTypes: string[]) => {
  let links: any = [];
  vehicleTypes.forEach(type => {
    const obj = PartnershipsLinks.find(
      ({ label }) => label === type.toUpperCase(),
    );
    if (obj) links.push(obj);
  });
  return links;
};
