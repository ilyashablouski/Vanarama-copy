// eslint-disable-next-line import/prefer-default-export
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
      { label: 'Price From', accessor: 'budgetFrom' },
      { label: 'Price To', accessor: 'budgetTo' },
    ],
  },
  { label: 'Body Type', accessor: 'type', contentType: 'multiSelect' },
  {
    label: 'Transmission',
    accessor: 'transmission',
    contentType: 'multiSelect',
  },
  { label: 'Fuel Type', accessor: 'fuelType', contentType: 'multiSelect' },
];
