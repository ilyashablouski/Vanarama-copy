import { ProductCardData } from '../../generated/ProductCardData';

const getCapIds = (data?: ProductCardData) =>
  data?.productCarousel?.map(el => el?.capId || '').filter(Boolean) || [''];

export default getCapIds;
