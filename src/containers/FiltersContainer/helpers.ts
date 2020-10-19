import { filterFields } from './config';
import { ISelectedFiltersState } from './interfaces';

/**
 * formating and check for including strings
 * @param value initial value
 * @param includedValue value which should include in initial
 */
export const isInclude = (value: string, includedValue: string): boolean =>
  value
    .toLowerCase()
    .replace(' ', '-')
    .includes(includedValue.toLowerCase().replace(' ', '-'));

export const findPreselectFilterValue = (
  value: string,
  data: string[] | null,
): string => data?.find(element => isInclude(value, element)) || '';

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
        active: true,
      },
    ];
  if (
    (isFuelPage && accessor === filterFields.fuelTypes) ||
    (isTransmissionPage && accessor === filterFields.transmissions)
  )
    return selectedFiltersState[accessor].map(value => ({
      label: value,
      active: true,
    }));
  return null;
};
