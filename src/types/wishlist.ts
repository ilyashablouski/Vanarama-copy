import { Nullish } from './common';

import { GetProductCard_productCard as ICard } from '../../generated/GetProductCard';

export interface IProductPageUrl {
  url: string;
  href: string;
  capId: string;
}

export interface IWishlistProduct extends ICard {
  bodyStyle?: Nullish<string>;
  pageUrl?: IProductPageUrl;
}

export interface IWishlistState {
  wishlistVehicles: Array<IWishlistProduct>;
  wishlistInitialized: boolean;
}
