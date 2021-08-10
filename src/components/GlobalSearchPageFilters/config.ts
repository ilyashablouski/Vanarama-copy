import {
  renderBudgetSelected,
  renderBudgetValue,
  renderPowerEngineSelected,
  renderPowerEngineValue,
} from './helpers';

// eslint-disable-next-line import/prefer-default-export
export const filtersConfig = [
  {
    type: 'drop-down',
    multiselect: false,
    selectedLabel: true,
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
  {
    type: 'drop-down',
    multiselect: true,
    label: 'No Of Doors',
    key: 'doors',
    generalFilter: false,
  },
  {
    type: 'drop-down',
    multiselect: true,
    label: 'No Of Seats',
    key: 'noOfSeats',
    generalFilter: false,
  },
  {
    type: 'drop-down',
    multiselect: true,
    label: 'Engine Size',
    key: 'engineSizeGroup',
    generalFilter: false,
  },
  {
    type: 'drop-down',
    multiselect: false,
    label: 'Fuel Consumption',
    key: 'mpgGroup',
    generalFilter: false,
  },
  {
    type: 'drop-down',
    multiselect: false,
    label: 'CO2 Emissions',
    key: 'co2Group',
    generalFilter: false,
  },
  {
    type: 'drop-select',
    multiselect: false,
    label: 'Engine Power',
    key: 'enginePower',
    renderValuesFunction: (value: string) => renderPowerEngineValue(value),
    renderSelectedFunction: (values: (string | null)[]) =>
      renderPowerEngineSelected(values),
    generalFilter: false,
    innerSelects: [
      {
        title: 'Engine Power From',
        placeholder: 'Select From',
        key: 'fromEnginePower',
      },
      {
        title: 'Engine Power To',
        placeholder: 'Select To',
        key: 'toEnginePower',
      },
    ],
  },
];
