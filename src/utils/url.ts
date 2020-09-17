/* eslint-disable @typescript-eslint/camelcase */
import { VehicleTypeEnum } from '../../generated/globalTypes';
import {
  GetProductCard_productCard,
  GetProductCard_derivatives,
} from '../../generated/GetProductCard';

type UrlParams = { [key: string]: string | undefined };

export const getUrlParam = (urlParams: UrlParams, notReplace?: boolean) => {
  const url = Object.entries(urlParams).map(([key, value]) =>
    value ? `&${key}=${value}` : '',
  );

  return notReplace ? url.join('') : url.join('').replace('&', '?');
};

const productPageUrlData = (
  productCard: GetProductCard_productCard | null,
  derivatives: GetProductCard_derivatives[] | null,
): productPageUrlData => {
  const derivativeData = derivatives?.find(el => el.id === productCard?.capId);
  return {
    manufacturer: derivativeData?.manufacturer.slug || null,
    range: derivativeData?.range.slug || null,
    slug: derivativeData?.slug || null,
    capId: derivativeData?.id || null,
    vehicleType: productCard?.vehicleType || null,
    bodyStyle:
      derivativeData?.bodyStyle?.name
        ?.toLocaleLowerCase()
        .split(' ')
        .join('-') || null,
    model: derivativeData?.model.slug || null,
  };
};

export const getProductPageUrl = (
  productCard: GetProductCard_productCard | null,
  derivatives: GetProductCard_derivatives[] | null,
) => {
  const {
    manufacturer,
    range,
    bodyStyle,
    model,
    slug,
    vehicleType,
    capId,
  } = productPageUrlData(productCard, derivatives);

  const leasing =
    vehicleType === VehicleTypeEnum.CAR ? '/car-leasing' : '/van-leasing';

  return vehicleType === VehicleTypeEnum.CAR
    ? {
        url: `${leasing}/${manufacturer}/${range}/${bodyStyle}/${slug}`,
        href: `${leasing}/[...details-page]`,
        capId: capId as string,
      }
    : {
        url: `${leasing}/${manufacturer}/${model}/${slug}`,
        href: `${leasing}/[...details-page]`,
        capId: capId as string,
      };
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
