import { getBudgetForQuery } from '../SearchPodContainer/helpers';
import { IFilters } from '../FiltersContainer/interfaces';

const buildRewriteRoute = ({
  transmissions,
  bodyStyles,
  rangeName,
  manufacturerName: make,
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
  if (rate.max || rate.min) {
    queries.pricePerMonth = getBudgetForQuery(
      `${rate.min || '0'}-${rate.max || ''}`,
    );
  }
  return queries;
};

export default buildRewriteRoute;
