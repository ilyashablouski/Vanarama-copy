import { filter } from 'ramda';
import { fullTextSearchVehicleList_fullTextSearchVehicleList_vehicles as IVehiclesList } from '../../../generated/fullTextSearchVehicleList';
import { AVAILABILITY_LABELS } from '../HelpMeChooseContainer/HelpMeChooseBlocks/HelpMeChooseResult';
import { GetProductCard_productCard as ICard } from '../../../generated/GetProductCard';
import { productFilter as IProductFilter } from '../../../generated/productFilter';
import { IFiltersData, IFiltersResponse, ISelectedTags } from './interfaces';
import { filterOrderByNumMap } from '../FiltersContainer/helpers';
import { ProductDerivativeFilter } from '../../../generated/globalTypes';

export const productCardDataMapper = (data: IVehiclesList): ICard => ({
  vehicleType: data.vehicleType,
  capId: data.capId,
  manufacturerName: data.manufacturerName,
  rangeName: data.rangeName,
  modelName: data.modelName,
  derivativeName: data.derivativeName,
  averageRating: data.financeProfiles?.[0].rate || null,
  isOnOffer: data.onOffer,
  offerPosition: data.offerRanking,
  leadTime: AVAILABILITY_LABELS[data.availability ?? ''],
  imageUrl: '',
  keyInformation: null,
  businessRate: data.rental,
  personalRate: data.rental,
});

const toCamel = string => {
  return string.replace(/([-_][a-z])/gi, $1 => {
    return $1
      .toUpperCase()
      .replace('-', '')
      .replace('_', '');
  });
};

export const responseMapper = (data: IProductFilter): IFiltersResponse => {
  const result = {} as IFiltersResponse;
  Object.keys(data?.productFilter || {}).forEach(value => {
    if (value !== '__typename') {
      const newKeyValue = toCamel(value);
      result[newKeyValue] =
        data?.productFilter?.[value]?.buckets?.map(bucket => bucket.key) ||
        null;
    }
  });
  return result;
};

export const buildInitialFilterState = data => {
  const filters = {};
  Object.entries(data).forEach(([key, value]) => {
    if (key !== 'searchTerm') {
      filters[key as keyof IFiltersData] = value;
    }
  });
  return filters;
};

export const buildSelectedTags = (data: IFiltersData): ISelectedTags[] =>
  Object.entries(data)
    .map(([key, value]) => {
      // if we don't have filter priority set label on the end of list
      return {
        filterKey: key,
        tags: value || [],
        order: filterOrderByNumMap[key] || 999999,
      };
    })
    .sort((a, b) => a.order - b.order);

export const buildFiltersRequestObject = (
  filters: IFiltersData,
): ProductDerivativeFilter => {
  const { from, to, ...rest } = filters;
  return {
    ...rest,
    budget:
      from?.[0] || to?.[0]
        ? {
            min: parseInt(from[0], 10),
            max: to[0] === '550+' ? null : parseInt(to[0], 10),
          }
        : undefined,
    make: filters.make?.[0],
    range: filters.range?.[0],
  };
};
