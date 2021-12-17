import { ProductDerivativeFilter } from '../../../generated/globalTypes';
import { BlogPostCarouselData_blogPost_productFilter } from '../../../generated/BlogPostCarouselData';

const vehicleTypeMapper = {
  CAR: ['Car'],
  LCV: ['Van', 'Pickup'],
};
// eslint-disable-next-line import/prefer-default-export
export const productFilterMapper = (
  blogProductFilter?: Nullable<BlogPostCarouselData_blogPost_productFilter>,
): ProductDerivativeFilter => ({
  manufacturerNames: blogProductFilter?.manufacturer || undefined,
  rangeNames: blogProductFilter?.range || undefined,
  bodyStyles: blogProductFilter?.bodyType || undefined,
  fuelTypes: blogProductFilter?.fuelType || undefined,
  transmissions: blogProductFilter?.transmission || undefined,
  vehicleCategory:
    vehicleTypeMapper[
      blogProductFilter?.vehicleType?.[0] as keyof typeof vehicleTypeMapper
    ] || undefined,
});
