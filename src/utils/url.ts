import { VehicleTypeEnum } from '../../generated/globalTypes';
import { VehicleListUrl_vehicleList_edges as VehicleEdge } from '../../generated/VehicleListUrl';
import { GetProductCard_vehicleList_edges as ProductEdge } from '../../generated/GetProductCard';

type UrlParams = { [key: string]: string | boolean | undefined };

export const getUrlParam = (urlParams: UrlParams, notReplace?: boolean) => {
  const url = Object.entries(urlParams).map(([key, value]) =>
    value ? `&${key}=${value}` : '',
  );

  return notReplace ? url.join('') : url.join('').replace('&', '?');
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

  return edge?.node?.legacyUrl || formatNewUrl(edge);
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

  const leasing = cars ? '/car-leasing' : '/van-leasing';

  if (manufacturer && range) {
    const makeLink = {
      link: {
        label: manufacturer?.name,
        href: `${leasing}/[dynamicParam]`,
      },
      as: `${leasing}/${manufacturer?.slug}`,
    };
    const rangeLink = {
      link: {
        label: range?.name,
        href: `${leasing}/[dynamicParam]/[rangeName]`,
      },
      as: `${leasing}/${manufacturer?.slug}/${range?.slug}`,
    };
    const modelLink = {
      link: {
        label: bodyStyle?.name,
        href: `${leasing}/[dynamicParam]/[rangeName]/[bodyStyles]`,
      },
      as: `${leasing}/${manufacturer?.slug}/${range?.slug}/${bodyStyle?.name
        ?.toLocaleLowerCase()
        .split(' ')
        .join('-') || null}`,
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

export const getVehicleConfigurationPath = (path: string, prefix: string) => {
  const newPath = path.replace(prefix, '');
  if (newPath.slice(-1) === '/') {
    return newPath.slice(0, -1);
  }
  return newPath;
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
    routerPathName.length === 1
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
