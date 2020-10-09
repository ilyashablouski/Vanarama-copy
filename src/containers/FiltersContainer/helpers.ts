import { filterFields } from './config';
import { ISelectedFiltersState } from './interfaces';

export const findPreselectFilterValue = (
  value: string,
  data: string[] | null,
): string =>
  data?.find(
    element =>
      value
        .toLowerCase()
        .replace(' ', '-')
        .indexOf(element.toLowerCase().replace(' ', '-')) > -1,
  ) || '';

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
