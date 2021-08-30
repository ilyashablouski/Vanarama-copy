import {
  handleUnlistedValue,
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
    key: 'manufacturerModel',
    generalFilter: true,
    innerSelects: [
      {
        title: 'Make',
        placeholder: 'Please select',
        key: 'manufacturerName',
      },
      {
        title: 'Model',
        placeholder: 'Please select',
        key: 'rangeName',
      },
    ],
  },
  {
    type: 'drop-select',
    multiselect: false,
    label: 'Budget',
    key: 'budget',
    renderValuesFunction: (value: string | number) =>
      renderBudgetValue(value as string),
    renderSelectedFunction: (values: (string | number)[]) =>
      renderBudgetSelected(values as string[]),
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
    renderValuesFunction: (value: string | number) =>
      handleUnlistedValue(value),
    renderSelectedFunction: (values: (string | number)[]) =>
      values.map(value => handleUnlistedValue(value)),
  },
  {
    type: 'drop-down',
    multiselect: true,
    label: 'No Of Seats',
    key: 'noOfSeats',
    generalFilter: false,
    renderValuesFunction: (value: string | number) =>
      handleUnlistedValue(value),
    renderSelectedFunction: (values: (string | number)[]) =>
      values.map(value => handleUnlistedValue(value)),
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
    renderValuesFunction: (value: string | number) =>
      renderPowerEngineValue(value as string),
    renderSelectedFunction: (values: (string | number)[]) =>
      renderPowerEngineSelected(values as string[]),
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
  {
    type: 'drop-down',
    multiselect: true,
    label: 'Euro Emissions',
    key: 'standardEuroEmissions',
    generalFilter: false,
    includedVehicleType: ['Pickup', 'Van'],
  },
  {
    type: 'drop-down',
    multiselect: true,
    label: 'Load height',
    key: 'loadHeightGroup',
    generalFilter: false,
    includedVehicleType: ['Pickup', 'Van'],
  },
  {
    type: 'drop-down',
    multiselect: true,
    label: 'Load Length',
    key: 'loadLengthGroup',
    generalFilter: false,
    includedVehicleType: ['Pickup', 'Van'],
  },
  {
    type: 'drop-down',
    multiselect: true,
    label: 'Payload',
    key: 'payloadGroup',
    generalFilter: false,
    includedVehicleType: ['Pickup', 'Van'],
  },
];
