export const filtersConfig = [
  {
    label: 'Make & Model',
    accessor: '',
    contentType: 'dropdowns',
    dropdowns: [
      { label: 'Make', accessor: 'make' },
      { label: 'Model', accessor: 'model' },
    ],
  },
  {
    label: 'Budget',
    accessor: 'budget',
    contentType: 'dropdowns',
    dropdowns: [
      { label: 'Price From', accessor: 'from' },
      { label: 'Price To', accessor: 'to' },
    ],
  },
  { label: 'Body Type', accessor: 'bodyStyles', contentType: 'multiSelect' },
  {
    label: 'Transmission',
    accessor: 'transmissions',
    contentType: 'multiSelect',
  },
  { label: 'Fuel Type', accessor: 'fuelTypes', contentType: 'multiSelect' },
];

export const budgets = ['0', '150', '250', '350', '450', '550'];
