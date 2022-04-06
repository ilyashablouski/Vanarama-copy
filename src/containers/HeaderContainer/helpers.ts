import { ILink } from 'core/interfaces/link';

import {
  GetPrimaryHeaderData_primaryHeader_linkGroups,
  GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups as LinkGroups,
  GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups_links,
  GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups_promotionalImage,
} from '../../../generated/GetPrimaryHeaderData';
import { Nullish } from '../../types/common';
import { IHeaderLink } from '../../components/Header/Header';

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

export const getTopLinks = (
  linkGroups: (GetPrimaryHeaderData_primaryHeader_linkGroups | null)[] | null,
  isTabletOrMobile: boolean,
) => {
  return linkGroups?.reduce((link, linksGroup) => {
    const transformLinks = linksGroup?.links?.map(el => ({
      href: el?.url || '',
      label: el?.text || '',
      id: el?.url || '',
      highlightLabel: el?.label || '',
    }));

    let headerTopLinks: IHeaderLink;
    if (transformLinks && transformLinks?.length > 1) {
      const linksGroupUrl = transformLinks?.[0] as ILink;
      const specialOffersLinks = {
        ...(transformLinks?.[1] as ILink),
        highlight: !!linksGroup?.linkGroups?.length,
      };
      const transformGroupLink =
        linksGroup?.linkGroups &&
        (linksGroup?.linkGroups as LinkGroups[]).map(el => ({
          label: el.name || '',
          href: '',
          id: el?.name || '',
          children: el.links?.map(convertChildrenNavLink),
        }));
      const childrenGroupLinks = transformGroupLink?.length
        ? [
            specialOffersLinks,
            ...transformGroupLink,
            ...transformLinks.slice(2),
          ]
        : [specialOffersLinks, ...transformLinks.slice(2)];

      headerTopLinks = {
        href: linksGroupUrl?.href || '',
        label: linksGroup?.name || '',
        id: linksGroupUrl.id || '',
        promoImagesLinks: linksGroup?.promotionalImages?.map(
          convertPromoImageLink,
        ),
        children: isTabletOrMobile
          ? [linksGroupUrl, ...childrenGroupLinks]
          : childrenGroupLinks,
      };
    } else if (linksGroup?.linkGroups?.length) {
      const transformGroupLink =
        linksGroup?.linkGroups &&
        (linksGroup?.linkGroups as LinkGroups[]).map(el => {
          const childrenLinkArray: ILink[] = el.links!.map(
            convertChildrenNavLink,
          );
          const linksGroupUrl = childrenLinkArray?.[0] as ILink;
          const specialOffersLinks = {
            ...(childrenLinkArray?.[1] as ILink),
            highlight: true,
          };
          const childrenLink = [
            specialOffersLinks,
            ...childrenLinkArray.slice(2),
          ];

          return {
            label: el.name || '',
            href: linksGroupUrl.href,
            id: el?.name || '',
            promoImageLink: convertPromoImageLink(el.promotionalImage),
            children: isTabletOrMobile
              ? [linksGroupUrl, ...childrenLink]
              : childrenLink,
          };
        });

      const linksGroupUrl = transformLinks?.[0] as ILink;
      headerTopLinks = {
        href: linksGroupUrl?.href || '',
        label: linksGroup?.name || '',
        id: linksGroupUrl?.id || '',
        promoImagesLinks: linksGroup?.promotionalImages?.map(
          convertPromoImageLink,
        ),
        children: isTabletOrMobile
          ? [linksGroupUrl, ...transformGroupLink]
          : transformGroupLink,
      };
    } else {
      const linksGroupUrl = transformLinks?.[0] as ILink;
      headerTopLinks = {
        href: linksGroupUrl?.href || '',
        label: linksGroup?.name || '',
        id: linksGroupUrl?.id || '',
        promoImagesLinks: linksGroup?.promotionalImages?.map(
          convertPromoImageLink,
        ),
      };
    }

    return [...link, headerTopLinks];
  }, [] as any[]);
};
