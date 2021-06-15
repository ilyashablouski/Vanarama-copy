import { ILink } from 'core/interfaces/link';

import {
  GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups_links,
  GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups_promotionalImage,
} from '../../../generated/GetPrimaryHeaderData';
import { Nullish } from '../../types/common';

export function convertPromotionalImage(
  promotionalImage: Nullish<
    GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups_promotionalImage
  >,
) {
  return {
    url: promotionalImage?.legacyUrl || promotionalImage?.url || '',
    image: {
      url: promotionalImage?.image?.[0]?.file?.url || '',
      fileName: promotionalImage?.image?.[0]?.file?.fileName || '',
    },
  };
}

export function convertChildrenNavLink(
  link: Nullish<GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups_links>,
) {
  return {
    label: link?.text || '',
    href: link?.url || '',
    query: { isChangePage: 'true' },
    id: link?.url || '',
    as: link?.url,
  } as ILink;
}
