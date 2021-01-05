import { filterFields } from './config';
import { ISelectedFiltersState } from './interfaces';
import {
  filterList_filterList_groupedRangesWithSlug_children as IFiltersChildren,
  filterList_filterList as IFilterList,
} from '../../../generated/filterList';

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
  if (data?.length && typeof data[0] !== 'string') {
    const slugsArray = data.map(
      childrenWithSlug => (childrenWithSlug as IFiltersChildren)?.slug,
    );
    return slugsArray?.find(element => isInclude(value, element || '')) || '';
  }
  return (data as string[])?.find(element => isInclude(element, value)) || '';
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
) => {
  if (
    (isPickups || isModelPage || isBodyPage) &&
    accessor === filterFields.bodyStyles
  )
    return [
      {
        label: `${isPickups ? 'Pickup' : selectedFiltersState.bodyStyles[0]}`,
        value: `${isPickups ? 'Pickup' : selectedFiltersState.bodyStyles[0]}`,
        active: true,
      },
    ];
  if (
    (isFuelPage && accessor === filterFields.fuelTypes) ||
    (isTransmissionPage && accessor === filterFields.transmissions)
  )
    return selectedFiltersState[accessor].map(value => ({
      label: value,
      value,
      active: true,
    }));
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
