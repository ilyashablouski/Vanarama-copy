import { ILink } from 'core/interfaces/link';

import {
  GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups,
  GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups_links,
} from '../../../generated/GetPrimaryHeaderData';

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

export function convertChildrenNavLink(
  link: GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups_links | null,
) {
  return {
    label: link?.text || '',
    href: link?.url || '',
    query: { isChangePage: 'true' },
    id: link?.url || '',
    as: link?.url,
  } as ILink;
}
