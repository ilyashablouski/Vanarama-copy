import { GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups } from '../../../generated/GetPrimaryHeaderData';

// eslint-disable-next-line import/prefer-default-export
export function getPromotionalImage(
  linksGroup: GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups | null,
) {
  return {
    url:
      linksGroup?.promotionalImage?.legacyUrl ||
      linksGroup?.promotionalImage?.url ||
      '',
    image: {
      url: linksGroup?.promotionalImage?.image?.[0]?.file?.url || '',
      fileName: linksGroup?.promotionalImage?.image?.[0]?.file?.fileName || '',
    },
  };
}
