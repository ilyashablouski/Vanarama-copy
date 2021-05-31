import { ApolloClient, DocumentNode, QueryLazyOptions } from '@apollo/client';
import { ParsedUrlQuery } from 'querystring';
import { removeUrlQueryPart } from '../../utils/url';
import { GENERIC_PAGE } from '../../gql/genericPage';
import { getBudgetForQuery } from '../SearchPodContainer/helpers';
import { IFilters } from '../FiltersContainer/interfaces';
import { GenericPageQueryVariables } from '../../../generated/GenericPageQuery';
import { GenericPageHeadQueryVariables } from '../../../generated/GenericPageHeadQuery';
import {
  SortDirection,
  SortField,
  SortObject,
} from '../../../generated/globalTypes';
import { GET_ALL_MAKES_PAGE } from './gql';
import { vehicleList_vehicleList_edges as IVehicles } from '../../../generated/vehicleList';
import {
  getObjectFromSessionStorage,
  setObjectAsSessionStorage,
} from '../../utils/windowSessionStorage';
import { isArraySame } from '../../utils/helpers';

export const RESULTS_PER_REQUEST = 12;

interface ISSRRequest {
  req: { url: string };
  query: { [x: string]: string | string[] };
}

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

export function mapFuelSearchQueryToParam(fuelTypes: any) {
  const types = [
    {
      searchQuery: 'Electric',
      param: 'Electric',
    },
    {
      searchQuery: 'Petrol',
      param: 'Petrol',
    },
    {
      searchQuery: 'Diesel',
      param: 'Diesel',
    },
    {
      searchQuery: 'Diesel/plugin Elec Hybrid',
      param: 'DieselAndPlugInElectricHybrid',
    },
    {
      searchQuery: 'Petrol/plugin Elec Hybrid',
      param: 'PetrolAndPlugInElectricHybrid',
    },
    {
      searchQuery: 'Hydrogen Fuel Cell',
      param: 'Hybrid',
    },
  ];
  return fuelTypes.map(
    (t: any) => types.find((f: any) => f.searchQuery === t)?.param || null,
  );
}

// using for get CMS slugs from url
export const bodyUrlsSlugMapper = {
  automatic: 'automatic-vans',
  '4x4': '4x4/SUV',
  convertible: 'convertible',
  coupe: 'coupe',
  eco: 'eco',
  estate: 'estate',
  family: 'family',
  hatchback: 'hatchback',
  'people-carrier': 'people carrier',
  prestige: 'prestige',
  saloon: 'saloon',
  'city-car': 'city-car',
  'crew-vans': 'crew',
  'dropside-tipper': 'dropside tipper',
  'large-van': 'large van',
  'medium-van': 'medium van',
  'refrigerated-van': 'refrigerated van',
  'small-van': 'small van',
  'specialist-van-leasing': 'crew',
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
  context: ISSRRequest,
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
        `${searchType}/${prepareSlugPart(query.dynamicParam)}`,
      );
    case 'isTransmissionPage':
      return onCallQuery(client, GENERIC_PAGE, 'van-leasing/automatic');
    case 'isFuelType':
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
    case 'isGlobalSearch':
      return onCallQuery(client, GENERIC_PAGE, 'search');
    default:
      return onCallQuery(client, GENERIC_PAGE, `${searchType}/search`);
  }
};

// get Caps ids for product card request
export const getCapsIds = (data: (IVehicles | null)[]) =>
  data?.map(vehicle => vehicle?.node?.derivativeId || '') || [];

export const dynamicQueryTypeCheck = (value: string) => {
  // check for bodystyle page
  const isBodyStylePage = !!bodyUrls.find(
    getBodyStyleForCms,
    value.toLowerCase(),
  );
  // check for fuel page
  const isFuelType = !!fuelMapper[value as keyof typeof fuelMapper];
  // check for budget page
  const isBudgetType = !!budgetMapper[value as keyof typeof budgetMapper];
  // check for transmissons page
  const isTransmissionPage = isTransmission(value);

  return {
    isBodyStylePage,
    isFuelType,
    isBudgetType,
    isTransmissionPage,
    isMakePage: !(
      isBodyStylePage ||
      isFuelType ||
      isBudgetType ||
      isTransmissionPage
    ),
  };
};

export const onMadeLineBreaks = (value: string, maxLeght = 16) => {
  const wordsArray = value.split(' ');
  return wordsArray.reduce((acc, current) => {
    if (
      current.length > maxLeght ||
      `${acc[acc.length - 1] ? acc[acc.length - 1] : ''} ${current}`.length >
        maxLeght
    ) {
      acc.push(current);
    } else {
      acc[acc.length - 1 > -1 ? acc.length - 1 : 0] = `${
        acc[acc.length - 1] ? acc[acc.length - 1] : ''
      } ${current}`.trim();
    }
    return acc;
  }, [] as string[]);
};

export const sortObjectGenerator = (sortArray: SortObject[]) => {
  if (
    sortArray?.find(sortObject => sortObject.field === SortField.availability)
  ) {
    return [
      ...sortArray,
      { field: SortField.rate, direction: SortDirection.ASC },
    ];
  }
  return sortArray;
};

export const onSavePagePosition = (
  offerPosition: number,
  queries: ParsedUrlQuery,
) => {
  const storageObject = {
    offerPosition,
    queries,
    scrollPosition: window.pageYOffset,
  };
  setObjectAsSessionStorage('searchPageScrollData', storageObject);
};

export const isPreviousPage = (currentRoute: ParsedUrlQuery) => {
  const savedPageData = getObjectFromSessionStorage('searchPageScrollData');
  const keys1 = Object.keys(currentRoute)?.sort();
  const keys2 = Object.keys(savedPageData?.queries)?.sort();

  if (keys1.length !== keys2.length) {
    return false;
  }
  keys1.forEach(key => {
    const val1 = currentRoute[key];
    const val2 = savedPageData?.queries[key];
    const areArrays = Array.isArray(val1) && Array.isArray(val2);
    if (
      (areArrays && !isArraySame(val1 as string[], val2 as string[])) ||
      (!areArrays && val1 !== val2)
    ) {
      return false;
    }
  });

  return true;
};

export const getNumberOfVehicles = (id: number) =>
  Math.ceil(id / RESULTS_PER_REQUEST) * RESULTS_PER_REQUEST;
