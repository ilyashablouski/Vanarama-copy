export enum FilterFields {
  manufacturer = 'manufacturer',
  model = 'model',
  from = 'from',
  to = 'to',
  transmissions = 'transmissions',
  bodyStyles = 'bodyStyles',
  fuelTypes = 'fuelTypes',
}

export const filtersConfig = [
  {
    label: 'Make & Model',
    accessor: '',
    contentType: 'dropdowns',
    dropdowns: [
      {
        label: 'Make',
        accessor: FilterFields.manufacturer,
        placeholder: 'make',
      },
      {
        label: 'Model',
        accessor: FilterFields.model,
        placeholder: 'model',
      },
    ],
  },
  {
    label: 'Budget',
    accessor: 'budget',
    contentType: 'dropdowns',
    dropdowns: [
      {
        label: 'Price From',
        accessor: FilterFields.from,
        placeholder: 'from',
      },
      {
        label: 'Price To',
        accessor: FilterFields.to,
        placeholder: 'to',
      },
    ],
  },
  {
    label: 'Body Type',
    accessor: FilterFields.bodyStyles,
    contentType: 'multiSelect',
  },
  {
    label: 'Transmission',
    accessor: FilterFields.transmissions,
    contentType: 'multiSelect',
  },
  {
    label: 'Fuel Type',
    accessor: FilterFields.fuelTypes,
    contentType: 'multiSelect',
  },
];

export const budgets = ['0', '150', '250', '350', '450', '550', '550+'];
