import { renderBudgetSelected, renderBudgetValue } from './helpers';

// eslint-disable-next-line import/prefer-default-export
export const filtersConfig = [
  {
    type: 'drop-down',
    multiselect: false,
    label: 'Type of Vehicle',
    key: 'vehicleCategory',
    generalFilter: true,
  },
  {
    type: 'drop-select',
    multiselect: false,
    label: 'Make & Model',
    key: 'makeModel',
    generalFilter: true,
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
    renderValuesFunction: (value: string) => renderBudgetValue(value),
    renderSelectedFunction: (values: (string | null)[]) =>
      renderBudgetSelected(values),
    generalFilter: true,
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
    generalFilter: true,
  },
  {
    type: 'drop-down',
    multiselect: true,
    label: 'Fuel Type',
    key: 'fuelTypes',
    generalFilter: true,
  },
  {
    type: 'drop-down',
    multiselect: true,
    label: 'Transmission',
    key: 'transmissions',
    generalFilter: true,
  },
];
