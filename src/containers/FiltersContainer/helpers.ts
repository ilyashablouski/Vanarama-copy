import { IChoice } from 'core/atoms/choiceboxes/interfaces';
import { FilterFields } from './config';
import { IDynamicPageType, ISelectedFiltersState } from './interfaces';
import {
  filterList_filterList_groupedRangesWithSlug_children as IFiltersChildren,
  filterList_filterList as IFilterList,
} from '../../../generated/filterList';
import {
  bodyUrlsSlugMapper,
  budgetMapper,
  fuelMapper,
} from '../SearchPageContainer/helpers';

/**
 * formating and check for including strings
 * @param value initial value
 * @param includedValue value which should include in initial
 */
export const isInclude = (value: string, includedValue: string): boolean =>
  value
    .toLowerCase()
    .replace(' ', '-')
    .includes(includedValue?.toLowerCase().replace(' ', '-'));

export const findPreselectFilterValue = (
  value: string,
  data: (string | IFiltersChildren)[] | null | undefined,
): string => {
  if (!data?.length) return '';
  // sorting using for prevent cases with incorrect select
  if (data?.length && typeof data[0] !== 'string') {
    const slugsArray = data
      .map(childrenWithSlug => (childrenWithSlug as IFiltersChildren)?.slug)
      .sort((a, b) => (a?.length || 0) - (b?.length || 0));
    return slugsArray?.find(element => isInclude(element || '', value)) || '';
  }
  return (
    (data as string[])
      ?.slice()
      .sort((a, b) => a.length - b.length)
      .find(element => isInclude(element, value)) || ''
  );
};

// build choiseboxes for preselected filters in custom page like a bodystyle page
export const buildPreselectChoiseboxes = (
  {
    isPickups = false,
    isModelPage = false,
    isBodyPage = false,
    isTransmissionPage = false,
    isFuelPage = false,
  },
  accessor: string,
  selectedFiltersState: ISelectedFiltersState,
  choiceBoxesData: IChoice[],
) => {
  if (
    (isPickups || isModelPage || isBodyPage) &&
    accessor === FilterFields.bodyStyles
  )
    return [
      {
        label: `${isPickups ? 'Pickup' : selectedFiltersState.bodyStyles[0]}`,
        value: `${isPickups ? 'Pickup' : selectedFiltersState.bodyStyles[0]}`,
        active: true,
      },
    ];
  if (
    (isFuelPage && accessor === FilterFields.fuelTypes) ||
    (isTransmissionPage && accessor === FilterFields.transmissions)
  )
    return selectedFiltersState[accessor].map(value => ({
      label: value,
      value,
      active: true,
    }));
  // If only one choice, return as a single option array with active set to true
  if (choiceBoxesData.length === 1) {
    return [
      {
        label: choiceBoxesData[0].label,
        value: choiceBoxesData[0].value,
        active: true,
      },
    ];
  }
  return null;
};

export const filtersSearchMapper = (
  selectedFiltersState: ISelectedFiltersState,
) => ({
  rate: {
    min: parseInt(selectedFiltersState.from[0], 10),
    max:
      selectedFiltersState.to[0] === '550+'
        ? null
        : parseInt(selectedFiltersState.to[0], 10),
  },
  manufacturerSlug: selectedFiltersState.make[0],
  rangeSlug: selectedFiltersState.model[0],
  fuelTypes: selectedFiltersState.fuelTypes,
  bodyStyles: selectedFiltersState.bodyStyles,
  transmissions: selectedFiltersState.transmissions,
});

export const getLabelForSlug = (
  slug: string,
  filtersData: IFilterList,
  isMakeValue = false,
) => {
  if (isMakeValue) {
    const label = filtersData.groupedRangesWithSlug?.find(
      ranges => ranges.parent.slug === slug,
    );
    return label?.parent.label;
  }
  let label: any;
  filtersData.groupedRangesWithSlug?.some(ranges => {
    label = ranges.children.find(children => children.slug === slug);
    return !!label;
  });
  return label?.label;
};

export const setFiltersAfterPageChange = (
  {
    isBodyStylePage,
    isFuelType,
    isBudgetType,
    isTransmissionType,
  }: IDynamicPageType,
  value: string,
) => {
  const presetFilters = {} as ISelectedFiltersState;
  switch (true) {
    case isBodyStylePage:
      presetFilters.bodyStyles = [
        bodyUrlsSlugMapper[value as keyof typeof bodyUrlsSlugMapper],
      ];
      return presetFilters;
    case isFuelType:
      presetFilters.fuelTypes = fuelMapper[
        value as keyof typeof fuelMapper
      ].split(',');
      return presetFilters;
    case isBudgetType:
      presetFilters.from =
        [budgetMapper[value as keyof typeof budgetMapper].split('|')[0]] ||
        null;
      presetFilters.to =
        [budgetMapper[value as keyof typeof budgetMapper].split('|')[1]] ||
        null;
      return presetFilters;
    case isTransmissionType:
      presetFilters.transmissions = [value.replace('-', ' ')];
      return presetFilters;
    default:
      presetFilters.make = [value.toLowerCase()];
      return presetFilters;
  }
};

export const filterOrderByNumMap: { [key: string]: number } = {
  make: 1,
  model: 2,
  from: 3,
  to: 4,
  bodyStyles: 5,
  transmissions: 6,
  fuelTypes: 7,
};
