import { getBudgetForQuery } from '../SearchPodContainer/helpers';
import { IFilters } from '../FiltersContainer/interfaces';

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
      !(isMakeOrCarPage && (key === 'make' || key === 'rangeName')) &&
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

const transmissions = ['automatic-vans'];

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
  'small',
  'crew-vans',
  'dropside-tipper-leasing',
  'large-van-leasing',
  'medium-van-leasing',
  'refrigerated-van-leasing',
  'small-van-leasing',
  'specialist-van-leasing',
];

export function isBodyTransmission(key: string) {
  return transmissions.indexOf(key) > -1;
}
