import { createContext } from 'react';
import { VehicleTypeEnum } from '../../generated/globalTypes';
import { GetProductCard_vehicleList_edges as ProductEdge } from '../../generated/GetProductCard';
import { VehicleListUrl_vehicleList_edges as VehicleEdge } from '../../generated/VehicleListUrl';
import { GenericPageHeadQuery_genericPage_metaData as IMetadata } from '../../generated/GenericPageHeadQuery';
import {
  genericPagesQuery_genericPages as IGenericPages,
  genericPagesQuery_genericPages_items as IGenericPagesItems,
} from '../../generated/genericPagesQuery';
import {
  rangeList as IRangeList,
  rangeList_rangeList as IRange,
} from '../../generated/rangeList';
import { Nullish } from '../types/common';
import { isBrowser } from './deviceType';
import { GetVehicleDetails_derivativeInfo as IDerivativeInfo } from '../../generated/GetVehicleDetails';
import { IManufacturersSlug } from '../types/manufacturerSlug';
import { arraysAreEqual } from './array';

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

export const isManufacturerMigrated = (
  migratedManufacturers: string[],
  vehicleManufacturerName: string,
) =>
  !!vehicleManufacturerName &&
  migratedManufacturers.some(
    manufacturerName =>
      manufacturerName.toLowerCase().replaceAll('-', ' ') ===
      vehicleManufacturerName.toLowerCase().replaceAll('-', ' '),
  );

export const getLegacyUrl = (
  data?: (VehicleEdge | ProductEdge | null)[] | null,
  derivativeId?: string | null,
  isMigrated = false,
) => {
  const edge = data?.find(item => item?.node?.derivativeId === derivativeId);

  return (
    (isMigrated ? edge?.node?.url : edge?.node?.legacyUrl || edge?.node?.url) ||
    ''
  );
};

export const getNewUrl = (
  data?: (VehicleEdge | ProductEdge | null)[] | null,
  derivativeId?: string | null,
) => {
  const edge = data?.find(item => item?.node?.derivativeId === derivativeId);
  return formatNewUrl(edge);
};

export const removeUrlQueryPart = (url: string) => url.split('?')[0];

export const generateUrlForBreadcrumb = (
  manufacturer: string,
  pageData: Nullish<IGenericPagesItems>,
  slugArray: string[],
  manufacturersWithSlug: string[],
) => {
  // use slugs instead of legacy url
  if (
    isManufacturerMigrated(
      [...manufacturersWithSlug, ...MANUFACTURERS_WITH_SLUGS],
      manufacturer,
    )
  ) {
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
  data: Nullish<IDerivativeInfo>,
  genericPagesData: IGenericPages['items'],
  slug: string,
  cars: boolean | undefined,
  manufacturersWithSlugs?: string[],
) => {
  const leasing = cars ? 'car-leasing' : 'van-leasing';
  const slugArray = slug.split('/');
  const manufacturerSlug = slugArray[1];
  const rangeSlug = slugArray[2];

  if (data) {
    const { manufacturer, range, name } = data;
    const manufacturerPage = genericPagesData?.find(
      el => el?.slug?.split('/').length === 2,
    );
    const rangePage = genericPagesData?.find(
      el => el?.slug?.split('/').length === 3,
    );

    const manufacturerLink = {
      link: {
        label: manufacturer?.name,
        href: `/${generateUrlForBreadcrumb(
          manufacturerSlug,
          manufacturerPage,
          [leasing, manufacturerSlug],
          manufacturersWithSlugs || [],
        ) || `${manufacturerSlug}-${leasing}.html`}`,
      },
    };
    const rangeLink = {
      link: {
        label: range?.name,
        href: `/${generateUrlForBreadcrumb(
          manufacturerSlug,
          rangePage,
          [leasing, manufacturerSlug, rangeSlug],
          manufacturersWithSlugs || [],
        ) || `${manufacturerSlug}-${leasing}/${rangeSlug}.html`}`,
      },
    };

    const derivativeLink = {
      link: {
        label: name,
        href: '',
      },
    };

    return [manufacturerLink, rangeLink, derivativeLink];
  }

  return null;
};

export const getVehicleConfigurationPath = (path: string) => {
  // used regexp to save functionality for local builds
  return removeUrlQueryPart(path).replace(/^(\/)/, match => match.slice(1));
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

export const formatToSlugFormat = (value: string) => {
  let formattedSlug = value
    .toLowerCase()
    .split(' ')
    .join('-')
    .replace('.', '-');

  if (formattedSlug.split('').reverse()[0] === '.') {
    formattedSlug = formattedSlug.slice(0, formattedSlug.length - 1);
  }

  return formattedSlug;
};

export const generateRangeSlugs = (
  ranges: IRangeList,
  make: string,
): Nullable<string[]> => {
  return (
    ranges.rangeList &&
    ranges.rangeList.map(
      (range: IRange) =>
        `car-leasing/${formatToSlugFormat(make as string)}/${formatToSlugFormat(
          range.rangeName || '',
        )}`,
    )
  );
};

export function trimStartSlash(url: string) {
  return url.startsWith('/') ? url.slice(1) : url;
}

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

export function getCanonicalUrl(canonicalUrl?: Nullish<string>) {
  return canonicalUrl ?? '';
}

export const getMetadataForPagination = (
  metadata: IMetadata,
  pageNumber = 1,
): IMetadata => {
  const canonicalUrl = metadata?.canonicalUrl;
  const isLegacyCanonicalUrl = canonicalUrl?.includes('.html');

  return {
    ...metadata,
    canonicalUrl:
      pageNumber > 1 && canonicalUrl
        ? `${canonicalUrl.replace('.html', '')}/page/${pageNumber}${
            isLegacyCanonicalUrl ? '.html' : ''
          }`
        : canonicalUrl,
  };
};

export const manufacturersSlugInitialState = {
  vehicles: {
    car: {
      manufacturers: [],
    },
    lcv: {
      manufacturers: [],
    },
  },
};

export const getManufacturerJson = async () => {
  try {
    const jsonData = await fetch(
      `https://${process.env.SEO_BUCKET_NAME}/migration/data.json`,
    );
    return (await jsonData.json()) as IManufacturersSlug;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to get manufacturers with slug', error);
    return manufacturersSlugInitialState;
  }
};

export const ManufacturersSlugContext = createContext<IManufacturersSlug>(
  manufacturersSlugInitialState,
);

ManufacturersSlugContext.displayName = 'SlugMigrationContext';

export const shouldManufacturersStateUpdate = (
  newState: IManufacturersSlug,
  oldState: IManufacturersSlug,
) => {
  const isNewStateExist =
    newState?.vehicles?.car?.manufacturers?.length > 0 ||
    newState?.vehicles?.lcv?.manufacturers?.length > 0;
  const isCarsSlugsEqual = arraysAreEqual(
    newState?.vehicles?.car?.manufacturers,
    oldState?.vehicles?.car?.manufacturers,
  );
  const isLcvSlugsEqual = arraysAreEqual(
    newState?.vehicles?.lcv?.manufacturers,
    oldState?.vehicles?.lcv?.manufacturers,
  );
  return isNewStateExist && !(isCarsSlugsEqual && isLcvSlugsEqual);
};
