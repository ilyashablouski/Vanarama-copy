import { IBaseProps } from 'core/interfaces/base';
import { IBreadcrumbLink } from 'components/Breadcrumb/helpers';

import { TSize } from '../../types/size';

export interface IWishlistContainer extends IBaseProps {
  pageTitle: string;
  breadcrumbsList: Array<IBreadcrumbLink>;
}

export interface IWishlistRegistration extends IBaseProps {}

export interface IWishlistProductPlaceholder extends IBaseProps {
  onClick: () => void;
}

export interface IWishlistOffer extends IBaseProps {
  totalCount: number;
  label: string;
  imageUrl: string;
  iconSize?: TSize;
  textSize?: TSize;
  onClick: () => void;
}
