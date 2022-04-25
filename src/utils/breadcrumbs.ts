import { IBreadcrumb, IBreadcrumbLink } from 'types/breadcrumbs';
import {
  getPartnerProperties,
  isPartnerSessionActive,
} from './partnerProperties';
import { IMetaDataSection, Nullable, Nullish } from '../types/common';

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
          .replace(/^(.)|\s+(.)/g, item => item.toUpperCase()),
        href: `/${blogSlug}/${blogCategorySlug}`,
      },
    };

    const blogPostLink = {
      link: {
        label: blogPostSlug
          .replace(/-/g, ' ')
          .replace(/^(.)|\s+(.)/g, item => item.toUpperCase()),
        href: `/${blogSlug}/${blogCategorySlug}/${blogPostSlug}`,
      },
    };

    return [homePageLink, blogLink, blogCategoryLink, blogPostLink];
  }

  return null;
}

export function getBlogBreadCrumbsItems(
  metaData: IMetaDataSection,
): Nullish<IBreadcrumbLink[]> {
  return metaData?.breadcrumbs
    ? getBreadCrumbsItems(metaData)
    : getBlogBreadCrumbsFromSlug(metaData.slug);
}

export function getBreadCrumbsItems(
  metaData: IMetaDataSection,
): Nullish<IBreadcrumbLink[]> {
  return metaData?.breadcrumbs?.map((el: IBreadcrumb) => ({
    link: { href: el.href || '', label: el.label },
  }));
}

export function convertSlugToBreadcrumbsSchema(
  slug: Nullable<string>,
): Object | null {
  if (slug) {
    const slugArray = ['home', ...slug.split('/')];

    const getUrlFromSlug = (
      slugIndex: number,
      arrayFromSlug: Array<string>,
    ) => {
      if (slugIndex === 0) {
        return 'https://www.vanarama.com';
      }
      if (slugIndex === arrayFromSlug.length - 1) {
        return '';
      }
      return `https://www.vanarama.com/${arrayFromSlug
        .slice(1, slugIndex + 1)
        .join('/')}`;
    };

    const itemListArray = slugArray.map((slugItem, slugItemIndex, array) => ({
      '@type': 'ListItem',
      position: slugItemIndex + 1,
      name: slugItem
        .replace(/-/g, ' ')
        .replace(/^(.)|\s+(.)/g, item => item.toUpperCase()),
      item: getUrlFromSlug(slugItemIndex, array),
    }));

    return {
      '@context': 'https://schema.org/',
      '@type': 'BreadcrumbList',
      itemListElement: itemListArray,
    };
  }
  return null;
}
