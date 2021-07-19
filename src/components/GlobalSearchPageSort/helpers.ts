import { DEFAULT_SORT } from '../../containers/GlobalSearchPageContainer/helpers';
import {
  ProductDerivativeSortDirection,
  ProductDerivativeSortField,
} from '../../../generated/globalTypes';

export const sortValues = [
  {
    text: 'Price Low To High',
    value: `${ProductDerivativeSortField.rental}_${ProductDerivativeSortDirection.ASC}`,
  },
  {
    text: 'Price High To Low',
    value: `${ProductDerivativeSortField.rental}_${ProductDerivativeSortDirection.DESC}`,
  },
  {
    text: 'Fastest Delivery Time',
    value: `${ProductDerivativeSortField.availability}_${ProductDerivativeSortDirection.ASC}`,
  },
];

export const generateSortArray = (type: string) => {
  switch (type) {
    case `${ProductDerivativeSortField.rental}_${ProductDerivativeSortDirection.ASC}`:
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
    case `${ProductDerivativeSortField.rental}_${ProductDerivativeSortDirection.DESC}`:
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
    case `${ProductDerivativeSortField.availability}_${ProductDerivativeSortDirection.ASC}`:
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
