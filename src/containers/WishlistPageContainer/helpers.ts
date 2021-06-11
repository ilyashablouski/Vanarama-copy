import {
  SortField,
  SortObject,
  SortDirection,
} from '../../../generated/globalTypes';
import { IWishlistProduct } from '../../utils/wishlistHelpers';

const VAN_SEARCH_URL = '/van-leasing/search';
const CAR_SEARCH_URL = '/car-leasing/search';
const PICKUP_SEARCH_URL = '/van-leasing/search?bodyStyles=Pickup';
const MAX_PLACEHOLDER_LIST_LENGTH = 3;

export const createOfferCards = (
  vansOffersCount: number = 0,
  pickupsOffersCount: number = 0,
  carsOffersCount: number = 0,
) => [
  {
    header: 'Vans',
    imageSrc: `${process.env.HOST_DOMAIN}/Assets/images/comparator/modal/cap-51392-171678.png`,
    redirect: VAN_SEARCH_URL,
    totalCount: vansOffersCount,
  },
  {
    header: 'Pickups',
    imageSrc: `${process.env.HOST_DOMAIN}/Assets/images/comparator/modal/cap-44067-160978.png`,
    redirect: PICKUP_SEARCH_URL,
    totalCount: pickupsOffersCount,
  },
  {
    header: 'Cars',
    imageSrc: `${process.env.HOST_DOMAIN}/Assets/images/comparator/modal/cap-88928-161019.png`,
    redirect: CAR_SEARCH_URL,
    totalCount: carsOffersCount,
  },
];

export function getProductPlaceholderList(productListLength: number) {
  const resultProductPlaceholderListLength =
    MAX_PLACEHOLDER_LIST_LENGTH - productListLength;

  return Array.from(
    { length: resultProductPlaceholderListLength },
    (_, index) => ({ capId: index }),
  );
}

export const getNewSortOrder = (field: string, direction: string) => [
  { field, direction } as SortObject,
];

export const getDefaultSortOrder = (): Array<SortObject> => [
  { field: SortField.rental, direction: SortDirection.DESC },
];

export const getSortValues = () => [
  {
    text: 'Price Low To High',
    value: `${SortField.rate}_${SortDirection.ASC}`,
  },
  {
    text: 'Price High To Low',
    value: `${SortField.rate}_${SortDirection.DESC}`,
  },
];

export const sortProductList = (
  productList: Array<IWishlistProduct>,
  sortOptions: SortObject,
) => {
  if (sortOptions.field === SortField.rate) {
    return productList.sort((firstProduct, secondProduct) => {
      const firstProductRate = firstProduct.personalRate ?? 0;
      const secondProductRate = secondProduct.personalRate ?? 0;

      return sortOptions.direction === SortDirection.DESC
        ? secondProductRate - firstProductRate
        : firstProductRate - secondProductRate;
    });
  }

  return productList;
};
