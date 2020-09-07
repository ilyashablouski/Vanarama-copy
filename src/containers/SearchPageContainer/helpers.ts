import { QueryLazyOptions } from '@apollo/client';
import { getBudgetForQuery } from '../SearchPodContainer/helpers';
import { IFilters } from '../FiltersContainer/interfaces';
import { GenericPageQueryVariables } from '../../../generated/GenericPageQuery';
import { GenericPageHeadQueryVariables } from '../../../generated/GenericPageHeadQuery';

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
  'crew-vans',
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
  return element.indexOf(this) > -1;
}
