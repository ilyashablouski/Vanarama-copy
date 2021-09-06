import {
  GetProductCard,
  GetProductCard_productCard,
} from '../../../generated/GetProductCard';

export interface IProductCarouselProps {
  leaseType: string;
  countItems?: number;
  data: GetProductCard;
  dataTestIdBtn: string;
  productType?: string;
  customCTABackground?: string;
}

export interface IProductCarouselCard extends IProductCarouselProps {
  product: GetProductCard_productCard;
  cardIndex: number;
}
