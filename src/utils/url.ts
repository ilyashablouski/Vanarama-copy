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

export const getProductPageBreadCrumb = (
  data: any,
  legacyUrl: string,
  cars: boolean | undefined,
) => {
  const { manufacturer, range, name } = data;
  const leasing = cars ? 'car-leasing' : 'van-leasing';
  const legacyUrlArray = legacyUrl.split('/');
  const manufacturerSlug = legacyUrlArray[0].replace(`-${leasing}`, '');
  const rangeSlug = legacyUrlArray[1];
  const bodyType = legacyUrlArray[2];

  if (manufacturer && range) {
    const makeLink = {
      link: {
        label: manufacturer?.name,
        href: `/${manufacturerSlug}-${leasing}.html`,
      },
    };
    const rangeLink = {
      link: {
        label: range?.name,
        href: `/${manufacturerSlug}-${leasing}/${rangeSlug}.html`,
      },
    };
    const modelLink = {
      link: {
        label: bodyType
          .replace(/-/g, ' ')
          .replace(/^(.)|\s+(.)/g, c => c.toUpperCase()),
        href: `/${manufacturerSlug}-${leasing}/${rangeSlug}/${bodyType}.html`,
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
  return path.replace(/^(\/)/, match => match.slice(1));
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
