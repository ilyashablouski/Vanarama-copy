import { ServerResponse } from 'http';
import { ApolloClient } from '@apollo/client';
import { GENERIC_PAGE } from '../gql/genericPage';
import { GetProductCard_vehicleList_edges as ProductEdge } from '../../generated/GetProductCard';
import { VehicleListUrl_vehicleList_edges as VehicleEdge } from '../../generated/VehicleListUrl';
import { VehicleTypeEnum } from '../../generated/globalTypes';
import { getSectionsData } from './getSectionsData';
import { GenericPageHeadQuery_genericPage_metaData as IMetadata } from '../../generated/GenericPageHeadQuery';
import { genericPagesQuery_genericPages_items as IGenericPages } from '../../generated/genericPagesQuery';
import { Nullish } from '../types/common';
import { isBrowser } from './deviceType';

type UrlParams = { [key: string]: string | boolean | number | undefined };

const MANUFACTURERS_WITH_SLUGS = ['abarth'];

export const getUrlParam = (urlParams: UrlParams, notReplace?: boolean) => {
  const url = Object.entries(urlParams).map(([key, value]) =>
    value ? `&${key}=${value}` : '',
  );

  return notReplace ? url.join('') : url.join('').replace('&', '?');
};

export const setSource = (source: string) => {
  let sanitized;
  sanitized = source.replace(/^[^#]*?:\/\/.*?(\/.*)$/, '$1');
  sanitized = sanitized.replace('https://www.vanarama.com/', '');
  sanitized = sanitized.replace('//', '/');
  return sanitized;
};

export const formatProductPageUrl = (
  url?: string | null,
  capId?: string | null,
) => ({
  url: url || '',
  href: url || '',
  capId: capId as string,
});

export const formatNewUrl = (edge?: VehicleEdge | ProductEdge | null) => {
  const urlPrefix =
    edge?.node?.vehicleType === VehicleTypeEnum.CAR
      ? '/car-leasing'
      : '/van-leasing';

  return `${urlPrefix}${edge?.node?.url || ''}`;
};

export const formatUrl = (value: string) =>
  value.toLocaleLowerCase().replace(/ /g, '-');

export const getLegacyUrl = (
  data?: (VehicleEdge | ProductEdge | null)[] | null,
  derivativeId?: string | null,
) => {
  const edge = data?.find(item => item?.node?.derivativeId === derivativeId);

  return edge?.node?.legacyUrl || edge?.node?.url || '';
};

export const getNewUrl = (
  data?: (VehicleEdge | ProductEdge | null)[] | null,
  derivativeId?: string | null,
) => {
  const edge = data?.find(item => item?.node?.derivativeId === derivativeId);
  return formatNewUrl(edge);
};

export const generateUrlForBreadcrumb = (
  manufacturer: string,
  pageData: IGenericPages | undefined,
  slugArray: string[],
) => {
  if (MANUFACTURERS_WITH_SLUGS.includes(manufacturer)) {
    return (
      pageData?.slug ||
      slugArray
        // workaround only for Abarth 595C Convertible
        .map(slug => (slug === 'c-convertible' ? 'convertible' : slug))
        .join('/')
    );
  }

  if (pageData?.legacyUrl?.charAt(0) === '/') {
    throw new Error(
      `Legacy URL shouldn't start with "/": ${pageData?.legacyUrl} - please check that the "Legacy URL" field in Contentful CMS is correct.`,
    );
  } else {
    return pageData?.legacyUrl;
  }
};

export const getProductPageBreadCrumb = (
  data: any,
  genericPagesData: IGenericPages[] | null | undefined,
  slug: string,
  cars: boolean | undefined,
) => {
  const leasing = cars ? 'car-leasing' : 'van-leasing';
  const slugArray = slug.split('/');
  const manufacturerSlug = slugArray[1];
  const rangeSlug = slugArray[2];
  const bodyType = slugArray[3] || '';

  if (data) {
    const { manufacturer, range, name } = data;
    const manufacturerPage = genericPagesData?.find(
      el => el?.slug?.split('/').length === 2,
    );
    const rangePage = genericPagesData?.find(
      el => el?.slug?.split('/').length === 3,
    );
    const modelPage = genericPagesData?.find(
      el => el?.slug?.split('/').length === 4,
    );

    const manufacturerLink = {
      link: {
        label: manufacturer?.name,
        href: `/${generateUrlForBreadcrumb(manufacturerSlug, manufacturerPage, [
          leasing,
          manufacturerSlug,
        ]) || `${manufacturerSlug}-${leasing}.html`}`,
      },
    };
    const rangeLink = {
      link: {
        label: range?.name,
        href: `/${generateUrlForBreadcrumb(manufacturerSlug, rangePage, [
          leasing,
          manufacturerSlug,
          rangeSlug,
        ]) || `${manufacturerSlug}-${leasing}/${rangeSlug}.html`}`,
      },
    };
    const modelLink = {
      link: {
        label: bodyType
          .replace(/-/g, ' ')
          .replace(/^(.)|\s+(.)/g, c => c.toUpperCase()),
        href: `/${generateUrlForBreadcrumb(manufacturerSlug, modelPage, [
          leasing,
          manufacturerSlug,
          rangeSlug,
          bodyType,
        ]) || `${manufacturerSlug}-${leasing}/${rangeSlug}/${bodyType}.html`}`,
      },
    };
    const derivativeLink = {
      link: {
        label: name,
        href: '',
      },
    };

    return cars
      ? [manufacturerLink, rangeLink, modelLink, derivativeLink]
      : [manufacturerLink, rangeLink, derivativeLink];
  }

  return null;
};

export const getVehicleConfigurationPath = (path: string) => {
  // used regexp to save functionality for local builds
  return path.split('?')[0].replace(/^(\/)/, match => match.slice(1));
};

export type ProductPageUrlData = {
  manufacturer: string | null;
  range: string | null;
  slug: string | null;
  capId?: string | null;
  vehicleType: VehicleTypeEnum | null;
  bodyStyle?: string | null;
  model?: string | null;
};

/**
 * A type representing the query parameters shape when on the OLAF journey
 */
export type OLAFQueryParams = {
  orderId: string;
  personUuid: string;
  derivativeId: string;
  redirect?: string;
};

/**
 * A type representing the query parameters shape when on the B2C OLAF journey
 */
export type OLAFB2CQueryParams = {
  orderId: string;
  uuid: string;
};

/**
 * A type representing the query parameters shape when on the MyDetails journey
 */
export type MyDetailsQueryParams = {
  partyByUuid?: string;
  uuid: string;
};

export const SEARCH_PAGES = ['/car-leasing', '/van-leasing', '/special-offers'];
export const PAGES_WITHOUT_LEASE_RESET = [
  '/account',
  '/[...details-page]',
  '/olaf',
];

export const removeUrlQueryPart = (url: string) => url.split('?')[0];

/**
 * make request for 404 page data on server side
 * @param res
 * @param client
 */
export const notFoundPageHandler = async (
  res: ServerResponse,
  client: ApolloClient<any>,
) => {
  res.statusCode = 404;
  const { data } = await client.query({
    query: GENERIC_PAGE,
    variables: {
      slug: '404',
    },
  });
  const name = getSectionsData(['metaData', 'name'], data?.genericPage);
  const cards = getSectionsData(
    ['sections', 'cards', 'cards'],
    data?.genericPage,
  );
  const featured = getSectionsData(['sections', 'featured'], data?.genericPage);
  return {
    props: {
      error: true,
      notFoundPageData: {
        name: name || null,
        cards: cards || null,
        featured: featured || null,
      },
    },
  };
};

export const formatToSlugFormat = (value: string) =>
  value
    .toLowerCase()
    .split(' ')
    .join('-')
    .replace('.', '-');

export function trimEndSlash(url: string) {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

export function getOrigin() {
  return isBrowser()
    ? window.location.origin
    : trimEndSlash(process.env.HOST_DOMAIN ?? '');
}

/**
 * Protocols: https://url.spec.whatwg.org/#url-miscellaneous
 */
export function isAbsoluteUrl(url: string) {
  const PROTOCOL_LIST = ['ftp', 'file', 'http', 'https', 'ws', 'wss'];
  return PROTOCOL_LIST.some(protocol => url.startsWith(`${protocol}:`));
}

export function getAbsoluteUrl(urlOrPath: string) {
  if (isAbsoluteUrl(urlOrPath)) {
    return urlOrPath;
  }

  return getOrigin() + urlOrPath;
}

export function parseUrl(absoluteUrl: string) {
  try {
    return new URL(absoluteUrl);
  } catch (error) {
    return null;
  }
}

export function getCanonicalUrl(
  currentUrl: string,
  canonicalUrl?: Nullish<string>,
) {
  const absoluteUrl = getAbsoluteUrl(canonicalUrl ?? currentUrl);
  const parsedAbsoluteUrl = parseUrl(absoluteUrl);

  return parsedAbsoluteUrl
    ? parsedAbsoluteUrl.origin + parsedAbsoluteUrl.pathname
    : absoluteUrl;
}

export const getMetadataForPagination = (
  metadata: IMetadata,
  pageNumber = 1,
  currentUrl: string,
) => {
  const originalCanonicalUrl = metadata.canonicalUrl;
  const resultCanonicalUrl = originalCanonicalUrl ?? currentUrl;
  const isLegacyCanonicalUrl = resultCanonicalUrl.includes('.html');

  return {
    ...metadata,
    canonicalUrl:
      pageNumber > 1 && originalCanonicalUrl
        ? `${resultCanonicalUrl.replace('.html', '')}/page/${pageNumber}${
            isLegacyCanonicalUrl ? '.html' : ''
          }`
        : resultCanonicalUrl,
  };
};
