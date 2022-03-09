import { productDerivatives_productDerivatives_derivatives as ISuggestion } from '../../../generated/productDerivatives';
import { isManufacturerMigrated } from '../../utils/url';

// eslint-disable-next-line import/prefer-default-export
export const getCardUrl = (
  data: ISuggestion,
  migratedManufacturers: string[],
) =>
  isManufacturerMigrated(migratedManufacturers, data.manufacturerName || '')
    ? data.url
    : data.lqUrl || data.url;
