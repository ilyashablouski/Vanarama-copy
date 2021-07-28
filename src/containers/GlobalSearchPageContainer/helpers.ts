import { ParsedUrlQuery } from 'querystring';
import { productDerivatives_productDerivatives_derivatives as IVehiclesList } from '../../../generated/productDerivatives';
import { AVAILABILITY_LABELS } from '../HelpMeChooseContainer/HelpMeChooseBlocks/HelpMeChooseResult';
import { GetProductCard_productCard as ICard } from '../../../generated/GetProductCard';
import { IFiltersData, ISelectedTags, IProps } from './interfaces';
import { filterOrderByNumMap } from '../FiltersContainer/helpers';
import {
  FinanceType,
  ProductDerivativeFilter,
  ProductDerivativeSortDirection,
  ProductDerivativeSortField,
  VehicleTypeEnum,
} from '../../../generated/globalTypes';

export const productCardDataMapper = (data: IVehiclesList | null): ICard => ({
  vehicleType: data?.vehicleType as VehicleTypeEnum,
  capId: data?.capId || null,
  manufacturerName: data?.manufacturerName || null,
  rangeName: data?.rangeName || null,
  modelName: data?.modelName || null,
  derivativeName: data?.derivativeName || null,
  averageRating: null,
  isOnOffer: data?.onOffer || null,
  offerPosition: data?.offerRanking || null,
  leadTime: AVAILABILITY_LABELS[data?.availability ?? ''],
  imageUrl: '',
  keyInformation: null,
  businessRate: data?.rental || null,
  personalRate: data?.rental || null,
});

export const buildInitialFilterState = (data: ParsedUrlQuery) => {
  const filters = {} as IFiltersData;
  Object.entries(data).forEach(([key, value]) => {
    if (key !== 'searchTerm') {
      filters[key as keyof IFiltersData] = Array.isArray(value)
        ? value
        : [value];
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
  onOffer?: boolean,
  isPersonal?: boolean,
): ProductDerivativeFilter => {
  const pureObject = {} as IFiltersData;
  const { from, to, ...rest } = filters;
  // removing empty arrays from filters
  Object.entries(rest).forEach(([key, value]) => {
    if (value?.[0]) {
      pureObject[key as keyof IFiltersData] = value;
    }
  });
  return {
    ...pureObject,
    budget:
      from?.[0] || to?.[0]
        ? {
            min: parseInt(from?.[0], 10) || undefined,
            max: to?.[0] === '550+' ? null : parseInt(to?.[0], 10),
          }
        : undefined,
    make: filters.make?.[0],
    range: filters.range?.[0],
    financeTypes: isPersonal ? [FinanceType.PCH] : [FinanceType.BCH],
    onOffer: onOffer || null,
  };
};

export const DEFAULT_SORT = [
  {
    field: ProductDerivativeSortField.offerRanking,
    direction: ProductDerivativeSortDirection.ASC,
  },
  {
    field: ProductDerivativeSortField.availability,
    direction: ProductDerivativeSortDirection.ASC,
  },
  {
    field: ProductDerivativeSortField.rental,
    direction: ProductDerivativeSortDirection.ASC,
  },
];

/**
 * using for prevent page rerender when Compare Context Provider changed
 * */
export const isSimilarPage = (prevProps: IProps, nextProps: IProps) => {
  const prevCapIds =
    prevProps.preLoadProductDerivatives.productDerivatives?.derivatives?.map(
      derivative => derivative?.capId,
    ) || [];
  const nextCapIds =
    nextProps.preLoadProductDerivatives.productDerivatives?.derivatives?.map(
      derivative => derivative?.capId,
    ) || [];
  return (
    prevCapIds.length === nextCapIds.length &&
    prevCapIds.every((value, index) => value === nextCapIds[index])
  );
};
