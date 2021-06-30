import { renderBudgetSelected, renderBudgetValue } from './helpers';

// eslint-disable-next-line import/prefer-default-export
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
    renderValuesFunction: value => renderBudgetValue(value),
    renderSelectedFunction: values => renderBudgetSelected(values),
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
