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
  freeInsurance: null,
  offerPosition: data?.offerRanking || null,
  leadTime: AVAILABILITY_LABELS[data?.availability ?? ''],
  imageUrl: '',
  keyInformation: null,
  businessRate: data?.rental || null,
  personalRate: data?.rental || null,
});

export const buildInitialFilterState = (data: ParsedUrlQuery) => {
  const filters = {} as IFiltersData;
  // keys for filters which has range format type
  const rangeFilterKeys = ['budget', 'enginePowerBhp'];
  // keys for filters which has number format type
  const numberFilterKeys = ['noOfSeats', 'doors'];
  Object.entries(data).forEach(([key, value]) => {
    if (key !== 'searchTerm' && !rangeFilterKeys.includes(key)) {
      (filters[key as keyof IFiltersData] as (
        | string
        | number
      )[]) = Array.isArray(value)
        ? value
        : decodeURIComponent(value)
            .split(',')
            .map(filterValue =>
              numberFilterKeys.includes(key)
                ? parseInt(filterValue, 10)
                : filterValue,
            );
    }
    if (key === 'budget') {
      const [from, to] = decodeURIComponent(value as string).split('|');
      if (from) {
        filters.from = [from];
      }
      if (to) {
        filters.to = [to];
      }
    }
    if (key === 'enginePowerBhp') {
      const [from, to] = decodeURIComponent(value as string).split('|');
      if (from) {
        filters.fromEnginePower = [parseInt(from, 10)];
      }
      if (to) {
        filters.toEnginePower = [parseInt(to, 10)];
      }
    }
  });
  return filters;
};

export const buildSelectedTags = (data: IFiltersData): ISelectedTags[] =>
  Object.entries(data)
    .map(([key, value]) => {
      // if we don't have filter priority set label on the end of list
      return {
        filterKey: key as keyof IFiltersData,
        tags: value?.filter((tag: string) => tag) || [],
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
  const { from, to, fromEnginePower, toEnginePower, ...rest } = filters;
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
    manufacturerNames: filters.manufacturerNames,
    rangeNames: filters.rangeName?.filter(value => value),
    manufacturerName: undefined,
    rangeName: undefined,
    financeTypes: isPersonal ? [FinanceType.PCH] : [FinanceType.BCH],
    onOffer: onOffer || null,
    mpgGroup: filters.mpgGroup?.[0],
    co2Group: filters.co2Group?.[0],
    enginePowerBhp:
      filters.fromEnginePower?.[0] || filters.toEnginePower?.[0]
        ? {
            min: filters.fromEnginePower?.[0] || undefined,
            max: filters.toEnginePower?.[0] || undefined,
          }
        : undefined,
  };
};

export const DEFAULT_SORT = [
  {
    field: ProductDerivativeSortField.offerRanking,
    direction: ProductDerivativeSortDirection.ASC,
  },
  {
    field: ProductDerivativeSortField.availabilitySort,
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
    prevProps.preLoadProductDerivatives?.derivatives?.map(
      derivative => derivative?.capId,
    ) || [];
  const nextCapIds =
    nextProps.preLoadProductDerivatives?.derivatives?.map(
      derivative => derivative?.capId,
    ) || [];
  return (
    prevCapIds.length === nextCapIds.length &&
    prevCapIds.every((value, index) => value === nextCapIds[index])
  );
};
