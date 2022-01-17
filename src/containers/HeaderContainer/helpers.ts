import { ILink } from 'core/interfaces/link';

import {
  GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups_links,
  GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups_promotionalImage,
} from '../../../generated/GetPrimaryHeaderData';
import { Nullish } from '../../types/common';

export function convertPromoImageLink(
  promoImageLink: Nullish<
    GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups_promotionalImage
  >,
) {
  return {
    url: promoImageLink?.legacyUrl || promoImageLink?.url || '',
    image: {
      width: promoImageLink?.image?.[0]?.file?.details.image.width,
      height: promoImageLink?.image?.[0]?.file?.details.image.height,
      url: promoImageLink?.image?.[0]?.file?.url || '',
      fileName: promoImageLink?.image?.[0]?.file?.fileName || '',
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
