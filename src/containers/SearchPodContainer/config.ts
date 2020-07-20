const VANS_TAB = {
  dropdowns: [
    { label: 'Select Type', accessor: 'typeVans' },
    { label: 'Select Make', accessor: 'makeVans' },
    { label: 'Select Model', accessor: 'modelVans' },
    { label: 'Select Budget', accessor: 'budgetVans' },
  ],
  buttonText: 'Search Vans & Trucks',
  tabName: 'Vans & Trucks',
  type: 'Vans',
};

const CARS_TAB = {
  dropdowns: [
    { label: 'Select Make', accessor: 'makeCars' },
    { label: 'Select Model', accessor: 'modelCars' },
    { label: 'Select Type', accessor: 'typeCars' },
    { label: 'Select Budget', accessor: 'budgetCars' },
  ],
  buttonText: 'Search Cars',
  tabName: 'Cars',
  type: 'Cars',
};

export const tabsFields = [VANS_TAB, CARS_TAB];

export const carPageTabFields = [CARS_TAB];

export const vanPageTabFields = [VANS_TAB];

export const budget = [
  '£0-£150',
  '£150-£250',
  '£250-£350',
  '£350-£450',
  '£450-£550',
  '£550+',
];
