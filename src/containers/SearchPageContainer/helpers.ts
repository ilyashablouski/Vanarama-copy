import { ApolloClient, DocumentNode, QueryLazyOptions } from '@apollo/client';
import { NextPageContext } from 'next';
import { removeUrlQueryPart } from '../../utils/url';
import { GENERIC_PAGE } from '../../gql/genericPage';
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
    rangeSlug: rangeName,
    manufacturerSlug: make,
    rate,
    fuelTypes,
  }: IFilters,
  isMakeOrCarPage?: boolean,
  isModelPage?: boolean,
  isBodyStylePage?: boolean,
  isTransmissionPage?: boolean,
  isFuelPage?: boolean,
  isBudgetPage?: boolean,
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
  if ((rate?.max || Number.isInteger(rate?.min)) && !isBudgetPage) {
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

// using for get CMS slugs from url
export const bodyUrlsSlugMapper = {
  automatic: 'automatic-vans',
  '4x4': '4x4-suv',
  convertible: 'convertible',
  coupe: 'coupe',
  eco: 'eco',
  estate: 'estate',
  family: 'family',
  hatchback: 'hatchback',
  'people-carrier': 'people-carrier',
  prestige: 'prestige',
  saloon: 'saloon',
  'city-car': 'city-car',
  'crew-van': 'crew-vans',
  'dropside-tipper': 'dropside-tipper-leasing',
  'large-van': 'large-van-leasing',
  'medium-van': 'medium-van-leasing',
  'refrigerated-van': 'refrigerated-van-leasing',
  'small-van': 'small-van-leasing',
  specialist: 'specialist-van-leasing',
};

export const budgetMapper = {
  'deals-under-150': '0|150',
  'deals-150-250': '150|250',
  'deals-250-350': '250|350',
  'deals-350-450': '350|450',
  'deals-450-550': '450|550',
  'deals-over-550': '550',
};

export const bodyUrls = [
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
    text: 'Price Low To High',
    value: `${SortField.rate}_${SortDirection.ASC}`,
  },
  {
    text: 'Price High To Low',
    value: `${SortField.rate}_${SortDirection.DESC}`,
  },
  {
    text: 'Fastest Delivery Time',
    value: `${SortField.availability}_${SortDirection.ASC}`,
  },
];

const onCallQuery = async (
  client: ApolloClient<any>,
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
  client: ApolloClient<any>,
  context: NextPageContext,
  isCarSearch: boolean,
  pageType: string,
) => {
  const searchType = isCarSearch ? 'car-leasing' : 'van-leasing';
  // remove first slash from route and build valid path
  const { req, query } = context;
  const queryUrl = removeUrlQueryPart(req?.url || '');
  const slug = queryUrl.slice(1);
  switch (pageType) {
    case 'isMakePage':
    case 'isRangePage':
    case 'isModelPage':
    case 'isBudgetType':
      return onCallQuery(client, GENERIC_PAGE, prepareSlugPart(slug));
    case 'isBodyStylePage':
      return onCallQuery(
        client,
        GENERIC_PAGE,
        `${searchType}/${prepareSlugPart(
          bodyUrlsSlugMapper[
            query.dynamicParam as keyof typeof bodyUrlsSlugMapper
          ],
        )}`,
      );
    case 'isTransmissionPage':
      return onCallQuery(client, GENERIC_PAGE, 'van-leasing/automatic');
    case 'isFuelPage':
      return onCallQuery(client, GENERIC_PAGE, slug);
    case 'isSpecialOfferPage':
      return onCallQuery(
        client,
        GENERIC_PAGE,
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
