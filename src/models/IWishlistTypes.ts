import { GetProductCard_productCard as ICard } from '../../generated/GetProductCard';

export interface IProductPageUrl {
  url: string;
  href: string;
  capId: string;
}

export interface IWishlistProductType extends ICard {
  bodyStyle?: string | null | undefined;
  pageUrl?: IProductPageUrl;
}

export interface IWishlistTypes {
  wishlistVehicles: Array<IWishlistProductType>;
}
