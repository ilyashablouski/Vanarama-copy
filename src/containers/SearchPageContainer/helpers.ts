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
import { GET_ALL_MANUFACTURERS_PAGE } from './gql';
import { vehicleList_vehicleList_edges as IVehicles } from '../../../generated/vehicleList';
import { getObjectFromSessionStorage } from '../../utils/windowSessionStorage';
import { arraysAreEqual } from '../../utils/helpers';

export const RESULTS_PER_REQUEST = 12;

interface ISSRRequest {
  req: { url: string; resolvedUrl?: string };
  query: { [x: string]: string | string[] };
}

export const buildRewriteRoute = ({
  transmissions,
  bodyStyles,
  rangeSlug: rangeName,
  manufacturerSlug: make,
  rate,
  fuelTypes,
}: IFilters) => {
  const queries = {} as any;
  Object.entries({
    transmissions,
    bodyStyles,
    fuelTypes,
    rangeName,
    make,
  }).forEach(filter => {
    const [key, value] = filter;
    if (value?.length) {
      queries[key] = value;
    }
  });
  if (rate?.max || Number.isInteger(rate?.min)) {
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
    {
      searchQuery: 'Petrol/electric Hybrid',
      param: 'PetrolAndElectricHybrid',
    },
  ];
  return fuelTypes.map(
    (t: any) => types.find((f: any) => f.searchQuery === t)?.param || null,
  );
}

export const getCookieFromHeaderString = (
  cookie: string,
  searchTerm: string,
) => {
  const cookies = decodeURIComponent(cookie);
  const data = cookies
    .split(';')
    .find(c => c.includes(searchTerm))
    ?.replace(`${searchTerm}=`, '');
  return data;
};

export const getCustomFuelTypesFromCookies = (
  cookie: string,
  searchTerm: string,
) => {
  const fuelTypes = getCookieFromHeaderString(cookie, searchTerm);
  if (!fuelTypes) {
    return undefined;
  }
  const fuelTypesObject = JSON.parse(fuelTypes);
  const array = Object.keys(fuelTypesObject).map(f => fuelTypesObject[f]);
  return array;
};
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
  'people-carrier': 'MPV/People Carrier',
  prestige: 'prestige',
  saloon: 'saloon',
  'city-car': 'Small Car',
  'crew-vans': 'crew',
  'dropside-tipper': 'dropside tipper',
  'large-van': 'large van',
  'medium-van': 'medium van',
  'refrigerated-van': 'refrigerated van',
  'small-van': 'small van',
  'specialist-van-leasing': 'crew',
  crossover: 'crossover',
};

export const budgetMapper = {
  'deals-under-150': '0|150',
  'deals-150-250': '150|250',
  'deals-250-350': '250|350',
  'deals-350-450': '350|450',
  'deals-450-550': '450|550',
  'deals-over-550': '550',
};

export const NEW_RANGE_SLUGS = [
  'car-leasing/land-rover/range-rover-evoque',
  'car-leasing/mercedes-benz/a-class',
  'car-leasing/audi/a3',
  'car-leasing/volvo/xc40',
  'car-leasing/land-rover/range-rover-velar',
  'car-leasing/land-rover/discovery',
  'car-leasing/audi/q3',
  'car-leasing/audi/a1',
  'car-leasing/audi/q5',
  'car-leasing/volkswagen/tiguan',
  'car-leasing/mercedes-benz/glc-coupe',
  'car-leasing/mercedes-benz/glc',
  'car-leasing/land-rover/range-rover-sport',
  'car-leasing/bmw/x5',
  'car-leasing/ford/focus',
  'car-leasing/jaguar/i-pace',
  'car-leasing/nissan/qashqai',
  'car-leasing/audi/a4',
  'car-leasing/nissan/leaf',
  'car-leasing/ford/fiesta',
  'car-leasing/bmw/1-series',
  'car-leasing/fiat/500',
  'car-leasing/bmw/x4',
  'car-leasing/audi/q7',
  'car-leasing/audi/a5',
  'car-leasing/renault/zoe',
  'car-leasing/kia/sportage',
  'car-leasing/bmw/3-series',
  'car-leasing/audi/e-tron',
  'car-leasing/mercedes-benz/e-class',
  'car-leasing/volvo/xc60',
  'car-leasing/tesla/model-3',
  'car-leasing/kia/niro',
  'car-leasing/jaguar/f-pace',
  'car-leasing/mercedes-benz/gle',
  'car-leasing/porsche/macan',
  'car-leasing/bmw/x3',
  'car-leasing/bmw/2-series',
  'car-leasing/bmw/i3',
  'car-leasing/volkswagen/t-roc',
  'car-leasing/volkswagen/polo',
  'car-leasing/volvo/xc90',
  'car-leasing/audi/tt',
  'car-leasing/land-rover/defender',
  'car-leasing/porsche/taycan',
  'car-leasing/ford/kuga',
  'car-leasing/jaguar/e-pace',
  'car-leasing/skoda/kodiaq',
  'car-leasing/land-rover/range-rover',
  'car-leasing/audi/q2',
];

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
  'crossover',
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
  pageType?: string,
  sectionsAsArray?: boolean,
) =>
  client.query({
    query,
    variables: {
      slug: slug || undefined,
      pageType: pageType || undefined,
      sectionsAsArray: sectionsAsArray || false,
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
  const newRangePagesSlug = context.req?.resolvedUrl || '';
  switch (pageType) {
    case 'isNewRangePage':
      return onCallQuery(
        client,
        GENERIC_PAGE,
        newRangePagesSlug,
        'rangePage',
        true,
      );
    case 'isRangePage':
    case 'isManufacturerPage':
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
    case 'isAllManufacturersPage':
      return onCallQuery(client, GET_ALL_MANUFACTURERS_PAGE, '');
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
    isManufacturerPage: !(
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
/**
 * checking that current search page was opened by back button click
 * @param currentRoute
 */
export const isPreviousPage = (currentRoute: ParsedUrlQuery) => {
  const savedPageData = getObjectFromSessionStorage('searchPageScrollData');
  if (savedPageData) {
    const keys1 = Object.keys(currentRoute)?.sort();
    const keys2 = Object.keys(savedPageData?.queries)?.sort();

    if (keys1.length !== keys2.length) {
      return false;
    }
    return keys1.every(key => {
      const val1 = currentRoute[key];
      const val2 = savedPageData?.queries[key];
      const areArrays = Array.isArray(val1) && Array.isArray(val2);
      return !(
        (areArrays && !arraysAreEqual(val1 as string[], val2 as string[])) ||
        (!areArrays && val1 !== val2)
      );
    });
  }
  return false;
};

export const getNumberOfVehicles = (id: number) =>
  Math.ceil(id / RESULTS_PER_REQUEST) * RESULTS_PER_REQUEST;

export const trimSlug = (slug: string) =>
  slug.charAt(0) === '/' ? slug.substring(1) : slug;

export const scrollIntoPreviousView = (
  pageOffset: number,
  prevPosition: number,
  setPrevPosition: React.Dispatch<number>,
) => {
  function scrollTo() {
    window.scrollTo({
      top: pageOffset,
      // @ts-ignore
      behavior: 'instant',
    });
    if (prevPosition) {
      setPrevPosition(0);
    }
  }
  if (pageOffset < document.body.clientHeight) {
    scrollTo();
  } else {
    // render delay
    setTimeout(() => scrollTo(), 400);
  }
};
