import { IBreadcrumb, IBreadcrumbLink } from 'types/breadcrumbs';
import {
  getPartnerProperties,
  isPartnerSessionActive,
} from './partnerProperties';
import { IMetaDataSection, Nullish } from '../types/common';

export function getPartnershipsBreadcrumbItems(breadcrumbs: IBreadcrumb[]) {
  const breadcrumbsItems = breadcrumbs?.map((el: IBreadcrumb) => ({
    link: { href: el.href || '', label: el.label },
  }));
  const partnerProperties = getPartnerProperties();
  const partnershipSessionActive = isPartnerSessionActive();
  // check if partnership session is active
  if (partnerProperties && partnershipSessionActive) {
    breadcrumbsItems[0] = {
      link: {
        href: `/partnerships/${partnerProperties?.slug?.toLowerCase()}`,
        label: 'Home',
      },
    };
  }
  return breadcrumbsItems;
}

export function getBlogBreadCrumbsFromSlug(slug: Nullish<string>) {
  if (slug) {
    const slugArray = slug.split('/');
    const blogSlug = slugArray[0];
    const blogCategorySlug = slugArray[1];
    const blogPostSlug = slugArray[2];

    const homePageLink = {
      link: {
        label: 'Home',
        href: '/',
      },
    };

    const blogLink = {
      link: {
        label: blogSlug,
        href: `/${blogSlug}`,
      },
    };

    const blogCategoryLink = {
      link: {
        label: blogCategorySlug
          .replace(/-/g, ' ')
          .replace(/^(.)|\s+(.)/g, c => c.toUpperCase()),
        href: `/${blogSlug}/${blogCategorySlug}`,
      },
    };

    const blogPostLink = {
      link: {
        label: blogPostSlug
          .replace(/-/g, ' ')
          .replace(/^(.)|\s+(.)/g, c => c.toUpperCase()),
        href: `/${blogSlug}/${blogCategorySlug}/${blogPostSlug}`,
      },
    };

    return [homePageLink, blogLink, blogCategoryLink, blogPostLink];
  }

  return null;
}

export const getBreadCrumbsItems = (
  metaData: IMetaDataSection,
): IBreadcrumbLink[] | null => {
  return metaData?.breadcrumbs
    ? metaData?.breadcrumbs?.map((el: IBreadcrumb) => ({
        link: { href: el.href || '', label: el.label },
      }))
    : getBlogBreadCrumbsFromSlug(metaData.slug);
};
