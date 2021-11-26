import { BlogPost_blogPost_productFilter } from '../../../generated/BlogPost';
import { ProductDerivativeFilter } from '../../../generated/globalTypes';

// eslint-disable-next-line import/prefer-default-export
export const productFilterMapper = (
  blogProductFilter: BlogPost_blogPost_productFilter,
): ProductDerivativeFilter => ({
  manufacturerNames: blogProductFilter.manufacturer || undefined,
  rangeNames: blogProductFilter.range || undefined,
  bodyStyles: blogProductFilter.bodyType || undefined,
  fuelTypes: blogProductFilter.fuelType || undefined,
  transmissions: blogProductFilter.transmission || undefined,
});
