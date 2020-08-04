export enum filterFields {
  make = 'make',
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
      { label: 'Make', accessor: filterFields.make },
      { label: 'Model', accessor: filterFields.model },
    ],
  },
  {
    label: 'Budget',
    accessor: 'budget',
    contentType: 'dropdowns',
    dropdowns: [
      { label: 'Price From', accessor: filterFields.from },
      { label: 'Price To', accessor: filterFields.to },
    ],
  },
  {
    label: 'Body Type',
    accessor: filterFields.bodyStyles,
    contentType: 'multiSelect',
  },
  {
    label: 'Transmission',
    accessor: filterFields.transmissions,
    contentType: 'multiSelect',
  },
  {
    label: 'Fuel Type',
    accessor: filterFields.fuelTypes,
    contentType: 'multiSelect',
  },
];

export const budgets = ['0', '150', '250', '350', '450', '550', '550+'];
