import {
  ApolloClient,
  DocumentNode,
  NormalizedCacheObject,
  QueryLazyOptions,
} from '@apollo/client';
import { NextPageContext } from 'next';
import { removeUrlQueryPart } from '../../utils/url';
import { GENERIC_PAGE, GENERIC_PAGE_HEAD } from '../../gql/genericPage';
import { getBudgetForQuery } from '../SearchPodContainer/helpers';
import { IFilters } from '../FiltersContainer/interfaces';
import { GenericPageQueryVariables } from '../../../generated/GenericPageQuery';
import { GenericPageHeadQueryVariables } from '../../../generated/GenericPageHeadQuery';
import { SortDirection, SortField } from '../../../generated/globalTypes';
import { GET_ALL_MAKES_PAGE } from './gql';
import { vehicleList_vehicleList_edges as IVehicles } from '../../../generated/vehicleList';

export const buildRewriteRoute = (
  {
    transmissions,
    bodyStyles,
    rangeName,
    manufacturerName: make,
    rate,
    fuelTypes,
  }: IFilters,
  isMakeOrCarPage?: boolean,
  isModelPage?: boolean,
  isBodyStylePage?: boolean,
  isTransmissionPage?: boolean,
  isFuelPage?: boolean,
) => {
  const queries = {} as any;
  Object.entries({
    transmissions,
    bodyStyles,
    fuelTypes,
    rangeName,
    make,
  }).forEach(filter => {
    const [key, value] = filter;
    if (
      value?.length &&
      // don't add queries in page where we have same data in route
      !(isMakeOrCarPage && (key === 'make' || key === 'rangeName')) &&
      !(isBodyStylePage && key === 'bodyStyles') &&
      !(isFuelPage && key === 'fuelTypes') &&
      !(isTransmissionPage && key === 'transmissions') &&
      !(
        isModelPage &&
        (key === 'make' || key === 'rangeName' || key === 'bodyStyles')
      )
    ) {
      queries[key] = value;
    }
  });
  if (rate.max || Number.isInteger(rate.min)) {
    queries.pricePerMonth = getBudgetForQuery(
      `${rate.min || '0'}-${rate.max || ''}`,
    );
  }
  return queries;
};

export function prepareSlugPart(part: string | string[]) {
  return decodeURI(Array.isArray(part) ? part[0] : part)
    .replace(/ /g, '-')
    .toLocaleLowerCase();
}

const transmissions = ['automatic'];
export const fuelMapper = {
  hybrid: 'Diesel/plugin Elec Hybrid,Petrol/plugin Elec Hybrid',
  electric: 'Electric',
};

export const bodyUrls = [
  'automatic-vans',
  '4x4-suv',
  'convertible',
  'coupe',
  'eco',
  'estate',
  'family',
  'hatchback',
  'people-carrier',
  'prestige',
  'saloon',
  'city-car',
  'small',
  'crew-van',
  'dropside-tipper',
  'large-van',
  'medium-van',
  'refrigerated-van',
  'small-van',
  'specialist-van',
];

export function isTransmission(key: string) {
  return transmissions.indexOf(key) > -1;
}

export const pageContentQueryExecutor = (
  query: (
    options?:
      | QueryLazyOptions<
          GenericPageQueryVariables | GenericPageHeadQueryVariables
        >
      | undefined,
  ) => void,
  slug: string,
) => {
  query({
    variables: {
      slug,
    },
  });
};

export function getBodyStyleForCms(this: string, element: string) {
  return this.indexOf(element) > -1 || element.indexOf(this) > -1;
}

export const sortValues = [
  {
    text: 'Price lowest to highest',
    value: `${SortField.rate}_${SortDirection.ASC}`,
  },
  {
    text: 'Price highest to lowest',
    value: `${SortField.rate}_${SortDirection.DESC}`,
  },
  {
    text: 'Quickest to longest delivery time',
    value: `${SortField.availability}_${SortDirection.ASC}`,
  },
  {
    text: 'Longest to quickest delivery time',
    value: `${SortField.availability}_${SortDirection.DESC}`,
  },
];

const onCallQuery = async (
  client: ApolloClient<NormalizedCacheObject>,
  query: DocumentNode,
  slug: string,
) =>
  client.query({
    query,
    variables: {
      slug: slug || undefined,
    },
  });

// get content data for different search pages
export const ssrCMSQueryExecutor = async (
  client: ApolloClient<NormalizedCacheObject>,
  context: NextPageContext,
  isCarSearch: boolean,
  pageType: string,
) => {
  const searchType = isCarSearch ? 'car-leasing' : 'van-leasing';
  // remove first slash from route and build valid path
  const { req, query } = context;
  const slug = removeUrlQueryPart(req?.url || '').slice(1);
  switch (pageType) {
    case 'isMakePage':
    case 'isRangePage':
    case 'isModelPage':
      return onCallQuery(client, GENERIC_PAGE, prepareSlugPart(slug));
    case 'isBodyStylePage':
      return onCallQuery(
        client,
        GENERIC_PAGE,
        `${searchType}/${prepareSlugPart(
          bodyUrls.find(
            getBodyStyleForCms,
            (query.dynamicParam as string).toLowerCase(),
          ) || '',
        )}${!isCarSearch ? '-leasing' : ''}`,
      );
    case 'isTransmissionPage':
      return onCallQuery(
        client,
        GENERIC_PAGE,
        'van-leasing/automatic-van-leasing',
      );
    case 'isFuelPage':
      return onCallQuery(client, GENERIC_PAGE, slug);
    case 'isSpecialOfferPage':
      return onCallQuery(
        client,
        GENERIC_PAGE_HEAD,
        `${
          isCarSearch ? 'car-leasing' : 'pickup-truck-leasing'
        }/special-offers`,
      );
    case 'isAllMakesPage':
      return onCallQuery(client, GET_ALL_MAKES_PAGE, '');
    default:
      return onCallQuery(client, GENERIC_PAGE, `${searchType}/search`);
  }
};

// get Caps ids for product card request
export const getCapsIds = (data: (IVehicles | null)[]) =>
  data.map(vehicle => vehicle?.node?.derivativeId || '') || [];
