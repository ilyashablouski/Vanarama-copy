import { getBudgetForQuery } from '../SearchPodContainer/helpers';
import { IFilters } from '../FiltersContainer/interfaces';

const buildRewriteRoute = (
  {
    transmissions,
    bodyStyles,
    rangeName,
    manufacturerName,
    rate,
    fuelTypes,
  }: IFilters,
  isCarSearch: boolean,
) => {
  const searchType = isCarSearch ? 'car-leasing' : 'van-leasing';
  let routerUrl = `/${searchType}`;
  // make
  if (manufacturerName) {
    routerUrl += `/${manufacturerName.replace(' ', '-')}`;
    // adding type only for cars search if we have model
    if (rangeName) {
      routerUrl += `/${rangeName.replace(' ', '-')}`;
    }
  }
  const searchParams = new URLSearchParams(window.location.search);
  Object.entries({ transmissions, bodyStyles, fuelTypes }).forEach(filter => {
    if (filter[1].length) {
      searchParams.set(filter[0], filter[1].join());
    }
  });
  if (rate.max || rate.min) {
    searchParams.set(
      'rate',
      getBudgetForQuery(`${rate.min || '0'}-${rate.max || ''}`),
    );
  }
  return decodeURIComponent(
    routerUrl + (searchParams.toString() ? `?${searchParams.toString()}` : ''),
  );
};

export default buildRewriteRoute;
