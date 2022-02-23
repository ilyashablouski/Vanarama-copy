import {
  GetProductCard,
  GetProductCard_productCard,
} from '../../../generated/GetProductCard';
import { IBaseProps } from '../../core/interfaces/base';

export interface IProductCarouselProps extends IBaseProps {
  leaseType: string;
  countItems?: number;
  data: GetProductCard;
  dataTestIdBtn: string;
  productType?: string;
  customCTABackground?: string;
  dataUiTestIdMask?: string;
  lazyLoadForCarouselImages?: boolean;
}

export interface IProductCarouselCard extends IProductCarouselProps {
  product: GetProductCard_productCard;
  cardIndex: number;
}
