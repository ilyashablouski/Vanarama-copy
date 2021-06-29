import { IFiltersData } from '../../containers/GlobalSearchPageContainer/interfaces';

export const filtersConfig = [
  {
    type: 'drop-down',
    multiselect: false,
    label: 'Type of Vehicle',
    key: 'vehicleCategory',
  },
  {
    type: 'drop-select',
    multiselect: false,
    label: 'Make & Model',
    key: 'makeModel',
    innerSelects: [
      {
        title: 'Make',
        placeholder: 'Please select',
        key: 'make',
      },
      {
        title: 'Model',
        placeholder: 'Please select',
        key: 'range',
      },
    ],
  },
  {
    type: 'drop-select',
    multiselect: false,
    label: 'Budget',
    key: 'budget',
    renderValuesFunction: (value: string) => `£${value}`,
    renderSelectedFunction: (values: (string | null)[]) => {
      const text = `${values[0] ? `From £${values[0]}` : ''}${
        values[1] ? ` to £${values[1]}` : ''
      }`.trim();
      return text.charAt(0).toUpperCase() + text.slice(1);
    },
    innerSelects: [
      {
        title: 'Price From',
        placeholder: 'Select From',
        key: 'from',
      },
      {
        title: 'Price To',
        placeholder: 'Select To',
        key: 'to',
      },
    ],
  },
  {
    type: 'drop-down',
    multiselect: true,
    label: 'Body Type',
    key: 'bodyStyles',
  },
  {
    type: 'drop-down',
    multiselect: true,
    label: 'Fuel Type',
    key: 'fuelTypes',
  },
];

export interface IInnerSelect {
  title: string;
  placeholder: string;
  key: keyof IFiltersData;
}
