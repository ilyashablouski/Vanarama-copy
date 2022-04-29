import {
  ApolloClient,
  DocumentNode,
  FetchMoreOptions,
  FetchMoreQueryOptions,
  NormalizedCacheObject,
  QueryLazyOptions,
} from '@apollo/client';
import { ParsedUrlQuery } from 'querystring';
import { NextRouter } from 'next/router';
import { removeUrlQueryPart } from '../../utils/url';
import { GENERIC_PAGE } from '../../gql/genericPage';
import { getBudgetForQuery } from '../SearchPodContainer/helpers';
import { IFilters } from '../FiltersContainer/interfaces';
import {
  GenericPageQuery_genericPage_sectionsAsArray_glossaryGrid_glossaryEntries,
  GenericPageQueryVariables,
} from '../../../generated/GenericPageQuery';
import { GenericPageHeadQueryVariables } from '../../../generated/GenericPageHeadQuery';
import {
  LeaseTypeEnum,
  SortDirection,
  SortField,
  SortObject,
  VehicleTypeEnum,
} from '../../../generated/globalTypes';
import { GET_ALL_MANUFACTURERS_PAGE } from './gql';
import {
  vehicleList,
  vehicleList_vehicleList,
  vehicleList_vehicleList_edges as IVehicles,
  vehicleListVariables,
} from '../../../generated/vehicleList';
import { getObjectFromSessionStorage } from '../../utils/windowSessionStorage';
import { arraysAreEqual } from '../../utils/array';
import {
  getPartnerProperties,
  IPartnerProperties,
} from '../../utils/partnerProperties';
import { SearchPageTypes } from './interfaces';
import { Nullish } from '../../types/common';
import { OnOffer } from '../../../entities/global';

export const RESULTS_PER_REQUEST = 12;

interface ISSRRequest {
  req: { url: string; resolvedUrl?: string };
  query: { [x: string]: string | string[] };
}

interface IVehiclesVariables {
  isCarSearch: boolean;
  isPersonal: boolean;
  isSpecialOffersOrder?: boolean;
  isManualBodyStyle?: boolean;
  isTransmissionPage?: boolean;
  onOffer?: boolean | null;
  filters?: IFilters;
  query?: ParsedUrlQuery;
  sortOrder?: SortObject[];
  manualBodyStyle?: string[];
  fuelTypes?: string[];
  after?: string;
  first?: number | null;
  sort?: SortObject[] | null;
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
  hybrid:
    'Diesel/plugin Elec Hybrid,Petrol/plugin Elec Hybrid,Petrol/electric Hybrid',
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
    (type: any) =>
      types.find((fuel: any) => fuel.searchQuery === type)?.param || null,
  );
}

export const getCookieFromHeaderString = (
  cookie: string,
  searchTerm: string,
) => {
  const cookies = decodeURIComponent(cookie);
  const data = cookies
    .split(';')
    .find(cookieItem => cookieItem.includes(searchTerm))
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
  const array = Object.keys(fuelTypesObject).map(fuel => fuelTypesObject[fuel]);
  return array;
};
// using for get CMS slugs from url
export const bodyUrlsSlugMapper = {
  automatic: 'automatic-vans',
  '4x4': '4x4/SUV',
  '4x4-suv': '4x4/SUV',
  convertible: 'convertible',
  coupe: 'coupe',
  eco: 'eco',
  estate: 'estate',
  family: 'family',
  hatchback: 'hatchback',
  'electric-hatchback': 'hatchback',
  'people-carrier': 'MPV/People Carrier',
  'mpv-people-carrier': 'MPV/People Carrier',
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
  'car-leasing/ford/mustang',
  'car-leasing/audi/a6',
  'car-leasing/bmw/5-series',
  'car-leasing/bmw/4-series',
  'car-leasing/seat/ateca',
  'car-leasing/ford/puma',
  'car-leasing/mercedes-benz/gla',
  'car-leasing/toyota/rav4',
  'car-leasing/audi/rs3',
  'car-leasing/lexus/is',
  'car-leasing/porsche/cayenne',
  'car-leasing/vauxhall/corsa',
  'car-leasing/skoda/karoq',
  'car-leasing/kia/xceed',
  'car-leasing/peugeot/208',
  'car-leasing/volkswagen/touareg',
  'car-leasing/hyundai/kona',
  'car-leasing/nissan/juke',
  'car-leasing/polestar/2',
  'car-leasing/tesla/model-x',
  'car-leasing/hyundai/tucson',
  'car-leasing/bmw/x1',
  'car-leasing/mini/countryman',
  'car-leasing/audi/q8',
  'car-leasing/volkswagen/id-3',
  'car-leasing/tesla/model-s',
  'car-leasing/skoda/octavia',
  'car-leasing/audi/a7',
  'car-leasing/mercedes-benz/eqc',
  'car-leasing/bmw/x2',
  'car-leasing/jaguar/xe',
  'car-leasing/bmw/8-series',
  'car-leasing/audi/r8',
  'car-leasing/renault/captur',
  'car-leasing/kia/ceed',
  'car-leasing/mercedes-benz/glb',
  'car-leasing/vauxhall/astra',
  'car-leasing/renault/clio',
  'car-leasing/honda/civic',
  'car-leasing/seat/tarraco',
  'car-leasing/jaguar/f-type',
  'car-leasing/hyundai/ioniq',
  'car-leasing/mercedes-benz/s-class',
  'car-leasing/seat/arona',
  'car-leasing/porsche/911',
  'car-leasing/citroen/c3',
  'car-leasing/dacia/duster',
  'car-leasing/seat/ibiza',
  'car-leasing/skoda/superb',
  'car-leasing/toyota/aygo',
  'toyota-car-leasing.html',
  'car-leasing/porsche/panamera',
  'car-leasing/mitsubishi/outlander',
  'car-leasing/volvo/s90',
  'car-leasing/citroen/c1',
  'car-leasing/volvo/v90',
  'car-leasing/kia/rio',
  'car-leasing/honda/honda-e',
  'car-leasing/ford/mondeo',
  'car-leasing/kia/sorento',
  'car-leasing/suzuki/vitara',
  'car-leasing/alfa-romeo/stelvio',
  'car-leasing/bmw/z4',
  'car-leasing/honda/jazz',
  'car-leasing/renault/kadjar',
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
  client: ApolloClient<NormalizedCacheObject | object>,
  query: DocumentNode,
  slug: string,
  sectionsAsArray?: boolean,
  pageType?: string,
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
  client: ApolloClient<NormalizedCacheObject | object>,
  context: ISSRRequest,
  isCarSearch: boolean,
  pageType: string,
  isManufacturerFeatureFlagEnabled?: boolean,
) => {
  const searchType = isCarSearch ? 'car-leasing' : 'van-leasing';
  // remove first slash from route and build valid path
  const { req, query } = context;
  const queryUrl = removeUrlQueryPart(req?.url || '');
  const slug = queryUrl.slice(1);
  if (pageType === 'isManufacturerPage' && isManufacturerFeatureFlagEnabled) {
    return onCallQuery(client, GENERIC_PAGE, prepareSlugPart(slug), true);
  }
  switch (pageType) {
    case 'isNewRangePage':
      return onCallQuery(client, GENERIC_PAGE, slug, true, 'rangePage');
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

export const isBodyStyleForCMS = (bodyStyleUrls: string[], bodyStyle: string) =>
  bodyStyleUrls.some(
    element =>
      element.indexOf(bodyStyle) === 0 || bodyStyle.indexOf(element) === 0,
  );

export const dynamicQueryTypeCheck = (value: string) => {
  // check for body style page
  const isBodyStylePage = isBodyStyleForCMS(bodyUrls, value);
  // check for fuel page
  const isFuelType = !!fuelMapper[value as keyof typeof fuelMapper];
  // check for budget page
  const isBudgetType = !!budgetMapper[value as keyof typeof budgetMapper];
  // check for transmission page
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

export const countOfUniqueQueries = (queries: ParsedUrlQuery) =>
  [...new Set(Object.values(queries))].length;

export const getNumberOfVehiclesFromSessionStorage = () =>
  getNumberOfVehicles(
    getObjectFromSessionStorage('searchPageScrollData').offerPosition + 1,
  );

export const createInitialFiltersState = (fuelTypes?: string[]) => ({
  fuelTypes: fuelTypes || [],
  bodyStyles: [],
  transmissions: [],
  manufacturer: [],
  model: [],
  from: [],
  to: [],
});

export const createProductCacheVariables = (
  capIds: string[],
  isCarSearch: boolean,
) => ({
  variables: {
    capIds,
    vehicleType: isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
  },
});

export const createProductCardVariables = (
  edges: vehicleList_vehicleList['edges'],
  isCarSearch: boolean,
) => createProductCacheVariables(getCapsIds(edges || []), isCarSearch);

export const createRangesVariables = (
  filters: IFilters,
  isCarSearch: boolean,
  isPersonal: boolean,
) => ({
  variables: {
    vehicleTypes: isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
    leaseType: isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS,
    ...filters,
  },
});

export const createManufacturerListVariables = (
  isCarSearch: boolean,
  isPersonal: boolean,
  filters: IFilters,
) => ({
  variables: {
    vehicleType: isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
    leaseType: isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS,
    rate: filters.rate,
    bodyStyles: filters.bodyStyles,
    transmissions: filters.transmissions,
    fuelTypes: filters.fuelTypes,
  },
});

export const createVehiclesVariables = ({
  isCarSearch,
  isPersonal,
  isSpecialOffersOrder,
  isManualBodyStyle = false,
  isTransmissionPage = false,
  onOffer = null,
  filters,
  query,
  sortOrder,
  manualBodyStyle,
  fuelTypes,
}: IVehiclesVariables) => ({
  variables: {
    vehicleTypes: isCarSearch ? [VehicleTypeEnum.CAR] : [VehicleTypeEnum.LCV],
    leaseType: isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS,
    onOffer,
    ...filters,
    first: isPreviousPage(query!)
      ? getNumberOfVehiclesFromSessionStorage()
      : RESULTS_PER_REQUEST,
    sort: isSpecialOffersOrder
      ? [{ field: SortField.offerRanking, direction: SortDirection.ASC }]
      : sortOrder,
    bodyStyles: isManualBodyStyle
      ? (filters?.bodyStyles?.[0] && filters?.bodyStyles) || manualBodyStyle
      : filters?.bodyStyles,
    transmissions: isTransmissionPage
      ? [(query?.dynamicParam as string).replace('-', ' ')]
      : filters?.transmissions,
    fuelTypes,
  },
});

export const createInitialVehiclesVariables = ({
  isCarSearch,
  isPersonal,
  isSpecialOffersOrder,
  onOffer,
  filters,
  sortOrder,
  first,
  after,
  fuelTypes,
}: IVehiclesVariables) => ({
  variables: {
    vehicleTypes: isCarSearch ? [VehicleTypeEnum.CAR] : [VehicleTypeEnum.LCV],
    leaseType: isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS,
    onOffer,
    first,
    ...filters,
    sort: isSpecialOffersOrder
      ? [{ field: SortField.offerRanking, direction: SortDirection.ASC }]
      : sortOrder,
    after,
    fuelTypes,
  },
});

/** we storing the last value of special offers checkbox in Session storage */
export const getValueFromStorage = (
  isServerCheck = false,
  isCarSearch: boolean,
): boolean | undefined => {
  // should check for server rendering, because it haven't Session storage
  const value = isServerCheck
    ? undefined
    : sessionStorage?.getItem(isCarSearch ? 'Car' : 'Vans');
  return value ? JSON.parse(value) : undefined;
};

export const getPartnershipTitle = (
  partnerData: IPartnerProperties,
  isCar: boolean,
  isPickup?: boolean,
) => {
  switch (true) {
    case isCar:
      return (
        partnerData.searchPageText?.carsTitle || partnerData.searchPageTitle
      );
    case isPickup:
      return (
        partnerData.searchPageText?.pickupsTitle || partnerData.searchPageTitle
      );
    case !isCar:
      return (
        partnerData.searchPageText?.vansTitle || partnerData.searchPageTitle
      );
    default:
      return partnerData.searchPageTitle;
  }
};
export const getPartnershipDescription = (
  partnerData: IPartnerProperties,
  isCar: boolean,
  isPickup?: boolean,
) => {
  switch (true) {
    case isCar:
      return (
        partnerData.searchPageText?.carsDescription ||
        partnerData.searchPageDescription
      );
    case isPickup:
      return (
        partnerData.searchPageText?.pickupsDescription ||
        partnerData.searchPageDescription
      );
    case !isCar:
      return (
        partnerData.searchPageText?.vansDescription ||
        partnerData.searchPageDescription
      );
    default:
      return partnerData.searchPageDescription;
  }
};
export const searchPageTypeMapper = (
  pageType: SearchPageTypes = SearchPageTypes.SIMPLE_SEARCH_PAGE,
) => {
  const constants = {
    isSimpleSearchPage: pageType === SearchPageTypes.SIMPLE_SEARCH_PAGE,
    isManufacturerPage: pageType === SearchPageTypes.MANUFACTURER_PAGE,
    isSpecialOfferPage: pageType === SearchPageTypes.SPECIAL_OFFER_PAGE,
    isRangePage: pageType === SearchPageTypes.RANGE_PAGE,
    isModelPage: pageType === SearchPageTypes.MODEL_PAGE,
    isAllManufacturersPage: pageType === SearchPageTypes.ALL_MANUFACTURERS_PAGE,
    isBodyStylePage: pageType === SearchPageTypes.BODY_STYLE_PAGE,
    isTransmissionPage: pageType === SearchPageTypes.TRANSMISSION_PAGE,
    isFuelPage: pageType === SearchPageTypes.FUEL_TYPE_PAGE,
    isBudgetPage: pageType === SearchPageTypes.BUDGET_PAGE,
  };
  const isDynamicFilterPage =
    constants.isBodyStylePage ||
    constants.isFuelPage ||
    constants.isTransmissionPage ||
    constants.isBudgetPage;
  return {
    ...constants,
    isDynamicFilterPage,
  };
};

export const getFuelType = (
  filterFuel: string[],
  queryFuel?: string | string[],
  isFuelPage: boolean = false,
) => {
  if (isFuelPage) {
    return (fuelMapper[queryFuel as keyof typeof fuelMapper] as string).split(
      ',',
    );
  }
  if (filterFuel?.length > 0) {
    return filterFuel;
  }
  return getPartnerProperties()?.fuelTypes;
};

export const normalizePathname = (route: string, query: ParsedUrlQuery) =>
  route
    .replace('[dynamicParam]', query?.dynamicParam as string)
    .replace('[rangeName]', query?.rangeName as string)
    .replace('[bodyStyles]', query?.bodyStyles as string);

export const buildUrlWithFilter = (
  route: string,
  query: ParsedUrlQuery,
  filters: IFilters,
  isPartnershipActive: boolean,
  pageType?: SearchPageTypes,
) => {
  const {
    isBodyStylePage,
    isRangePage,
    isBudgetPage,
    isFuelPage,
    isManufacturerPage,
    isModelPage,
    isTransmissionPage,
  } = searchPageTypeMapper(pageType);
  let pathname = normalizePathname(route, query);
  const queryString = new URLSearchParams();
  const queries = buildRewriteRoute(filters);
  Object.entries(queries).forEach(filter => {
    const [key, value] = filter as [string, string | string[]];
    if (
      value?.length &&
      // don't add queries in page where we have same data in route
      !(
        (isManufacturerPage || isRangePage) &&
        (key === 'make' || key === 'rangeName')
      ) &&
      !(isBodyStylePage && key === 'bodyStyles') &&
      !((isFuelPage || isPartnershipActive) && key === 'fuelTypes') &&
      !(isTransmissionPage && key === 'transmissions') &&
      !(isBudgetPage && key === 'pricePerMonth') &&
      !(
        isModelPage &&
        (key === 'make' || key === 'rangeName' || key === 'bodyStyles')
      )
    ) {
      queryString.set(key, value as string);
    }
  });
  if (Object.keys(queries).length && queryString.toString()) {
    pathname += `?${decodeURIComponent(queryString.toString())}`;
  }
  return {
    queries,
    pathname,
  };
};

export const isOnOffer = (
  isSpecialOffers: boolean,
  pageType?: SearchPageTypes,
): true | null => {
  const {
    isRangePage,
    isModelPage,
    isDynamicFilterPage,
  } = searchPageTypeMapper(pageType);
  if (isRangePage || isModelPage || isDynamicFilterPage) {
    return null;
  }
  return isSpecialOffers || OnOffer.FILTER_DISABLED;
};

export const createFetchMoreOptions = (
  lastCursor: string | undefined,
  savedPageData: any,
  edges: (IVehicles | null)[],
): FetchMoreQueryOptions<vehicleListVariables, vehicleList> &
  FetchMoreOptions<vehicleList, vehicleListVariables> => {
  return {
    variables: {
      after: lastCursor,
      first: getNumberOfVehicles(
        savedPageData?.offerPosition + 1 - edges.length,
      ),
    },
    updateQuery: (prev, { fetchMoreResult }) => {
      if (!fetchMoreResult) {
        return prev;
      }
      return {
        vehicleList: {
          pageInfo: fetchMoreResult.vehicleList.pageInfo,
          totalCount: fetchMoreResult.vehicleList.totalCount,
          edges: [
            ...(edges || []),
            ...(fetchMoreResult?.vehicleList?.edges || []),
          ],
        },
      };
    },
  };
};

export const getPageTypeAndContext = (
  router: NextRouter,
): [Nullish<string>, ISSRRequest] => {
  const type = Object.entries(
    dynamicQueryTypeCheck(router.query.dynamicParam as string),
  ).find(element => element[1])?.[0];

  const context = {
    req: {
      url: router.route.replace(
        '[dynamicParam]',
        router.query.dynamicParam as string,
      ),
    },
    query: { ...router.query },
  };

  return [type, context];
};

export const sortGlossaryByAlphabetic = (
  glossaryEntries:
    | GenericPageQuery_genericPage_sectionsAsArray_glossaryGrid_glossaryEntries[]
    | null,
) => {
  if (!glossaryEntries) {
    return null;
  }
  return [...glossaryEntries].sort((firstItem, secondItem) =>
    (firstItem?.title || '').localeCompare(secondItem?.title || ''),
  );
};

export const hasFiltersForSearch = (filtersData: IFilters | {}) =>
  Object.values(filtersData).flat().length > 0;
