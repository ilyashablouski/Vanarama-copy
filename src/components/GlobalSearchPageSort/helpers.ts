import { DEFAULT_SORT } from '../../containers/GlobalSearchPageContainer/helpers';
import {
  ProductDerivativeSortDirection,
  ProductDerivativeSortField,
  SortDirection,
} from '../../../generated/globalTypes';

export enum SortType {
  'PRICE_ASC',
  'PRICE_DESC',
  'FASTEST_DELIVERY',
  'SPECIAL_OFFER',
}

export const sortValues = [
  {
    text: 'Price Low To High',
    value: `${ProductDerivativeSortField.rental}_${SortDirection.ASC}`,
  },
  {
    text: 'Price High To Low',
    value: `${ProductDerivativeSortField.rental}_${SortDirection.DESC}`,
  },
  {
    text: 'Fastest Delivery Time',
    value: `${ProductDerivativeSortField.availability}_${SortDirection.ASC}`,
  },
];

export const generateSortArray = (type: string) => {
  switch (type) {
    case `${ProductDerivativeSortField.rental}_${SortDirection.ASC}`:
      return [
        {
          field: ProductDerivativeSortField.rental,
          direction: ProductDerivativeSortDirection.ASC,
        },
        {
          field: ProductDerivativeSortField.availability,
          direction: ProductDerivativeSortDirection.ASC,
        },
      ];
    case `${ProductDerivativeSortField.rental}_${SortDirection.DESC}`:
      return [
        {
          field: ProductDerivativeSortField.rental,
          direction: ProductDerivativeSortDirection.DESC,
        },
        {
          field: ProductDerivativeSortField.availability,
          direction: ProductDerivativeSortDirection.ASC,
        },
      ];
    case `${ProductDerivativeSortField.availability}_${SortDirection.ASC}`:
      return [
        {
          field: ProductDerivativeSortField.availability,
          direction: ProductDerivativeSortDirection.ASC,
        },
        {
          field: ProductDerivativeSortField.rental,
          direction: ProductDerivativeSortDirection.ASC,
        },
      ];
    case 'SPECIAL_OFFER':
    default:
      return DEFAULT_SORT;
  }
};
