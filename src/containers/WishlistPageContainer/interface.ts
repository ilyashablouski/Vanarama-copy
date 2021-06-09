import { IBaseProps } from 'core/interfaces/base';
import { IBreadcrumbLink } from 'components/Breadcrumb/helpers';
import { ICardTitleProps } from 'core/molecules/cards/CardTitle';

import { TSize } from '../../types/size';
import { GetProductCard_productCard as ICard } from '../../../generated/GetProductCard';

export interface IWishlistContainer extends IBaseProps {
  pageTitle: string;
  breadcrumbsList: Array<IBreadcrumbLink>;
}

export interface IWishlistRegistration extends IBaseProps {}

export interface IWishlistProductPlaceholder extends IBaseProps {
  onClick: () => void;
}

export interface IWishlistProductCard {
  loadImage?: boolean;
  title: ICardTitleProps;
  isPersonalPrice: boolean;
  data: ICard;
  bodyStyle?: string | null | undefined;
  isModelPage?: boolean;
  url: string;
  derivativeId?: string | null;
  idx?: number;
  customCTAColor?: string;
}

export interface IWishlistOffer extends IBaseProps {
  totalCount: number;
  label: string;
  imageUrl: string;
  iconSize?: TSize;
  textSize?: TSize;
  onClick: () => void;
}
