import { ServerResponse } from 'http';
import { ApolloClient } from '@apollo/client';
import { GENERIC_PAGE } from '../gql/genericPage';
import { GetProductCard_vehicleList_edges as ProductEdge } from '../../generated/GetProductCard';
import { VehicleListUrl_vehicleList_edges as VehicleEdge } from '../../generated/VehicleListUrl';
import { VehicleTypeEnum } from '../../generated/globalTypes';
import { getSectionsData } from './getSectionsData';
import { GenericPageHeadQuery_genericPage_metaData as IMetadata } from '../../generated/GenericPageHeadQuery';

type UrlParams = { [key: string]: string | boolean | undefined };

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

export const getProductPageBreadCrumb = (
  data: any,
  cars: boolean | undefined,
) => {
  const { manufacturer, range, bodyStyle, name } = data;

  const leasing = cars ? 'car-leasing' : 'van-leasing';

  if (manufacturer && range) {
    const makeLink = {
      link: {
        label: manufacturer?.name,
        href: `/${manufacturer?.slug}-${leasing}.html`,
      },
    };
    const rangeLink = {
      link: {
        label: range?.name,
        href: `/${manufacturer?.slug}-${leasing}/${range?.slug}.html`,
      },
    };
    const modelLink = {
      link: {
        label: bodyStyle?.name,
        href: `/${manufacturer?.slug}-${leasing}/${
          range?.slug
        }/${bodyStyle?.name?.toLocaleLowerCase().replace(/ /g, '-') ||
          null}.html`,
      },
    };
    const derivativeLink = {
      link: {
        label: name,
        href: '',
      },
    };

    return cars
      ? [makeLink, rangeLink, modelLink, derivativeLink]
      : [makeLink, rangeLink, derivativeLink];
  }

  return null;
};

export const getVehicleConfigurationPath = (path: string) => {
  // used regexp to save functionality for local builds
  return path.replace(/^(\/van|\/car)/, match => match.slice(1));
};

/**
 * define on which page not to show Breadcrumbs
 * @param routerPathName - string router pathName
 */
export const isNotShowBreadcrumbs = (routerPathName: string) => {
  const pathNamePart = routerPathName.split('/');
  const pathNameLength = pathNamePart.length;
  return (
    // not to show on location pages
    routerPathName.includes('[location]') ||
    // not to show on PDP pages
    routerPathName.includes('[...details-page]') ||
    // not to show on b2b and b2c pages
    routerPathName.includes('/olaf') ||
    // not to show on b2b and b2c pages
    routerPathName.includes('/fleet') ||
    // not to show on account pages
    routerPathName.includes('/account') ||
    routerPathName.includes('/blog') ||
    routerPathName.includes('/non-blog') ||
    // not to show on insurance pages, but show on faq insurance
    (pathNameLength === 2 && routerPathName.includes('/insurance')) ||
    (pathNameLength === 3 &&
      routerPathName.includes('/insurance') &&
      !pathNamePart[2].includes('/faq')) ||
    // not to show on main van leasing page
    (pathNameLength === 2 && routerPathName.includes('/van-leasing')) ||
    // not to show on main car leasing page
    (pathNameLength === 2 && routerPathName.includes('/car-leasing')) ||
    // not to show on main pickup leasing page
    (pathNameLength === 2 &&
      routerPathName.includes('/pickup-truck-leasing')) ||
    // not to show on home page
    routerPathName.length === 1 ||
    // not to show on help-me-choose pages
    routerPathName.includes('/help-me-choose')
  );
};

export type productPageUrlData = {
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

export const removeUrlQueryPart = (url: string) =>
  url.slice(0, url.indexOf('?') > -1 ? url.indexOf('?') : url.length);

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

export const getMetadataForPagination = (metadata: IMetadata, page = 1) => {
  const canonicalUrl =
    page > 1
      ? `${metadata.canonicalUrl?.slice(
          0,
          metadata.canonicalUrl?.indexOf('.html'),
        )}/page/${page}.html`
      : metadata.canonicalUrl;
  return {
    ...metadata,
    canonicalUrl: canonicalUrl || metadata.canonicalUrl,
  };
};
