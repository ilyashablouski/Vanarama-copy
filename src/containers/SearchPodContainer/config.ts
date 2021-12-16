import { FuelTypeEnum } from '../../../entities/global';

const VANS_TAB = {
  dropdowns: [
    {
      label: 'Select Type',
      accessor: 'typeVans',
      placeholder: 'type',
    },
    {
      label: 'Select Make',
      accessor: 'manufacturerVans',
      placeholder: 'make',
    },
    {
      label: 'Select Model',
      accessor: 'modelVans',
      placeholder: 'model',
    },
    {
      label: 'Select Budget',
      accessor: 'budgetVans',
      placeholder: 'budget',
    },
  ],
  headingText: 'Search Vans',
  buttonText: 'Search Vans & Trucks',
  tabName: 'Vans & Trucks',
  type: 'Vans',
  defaultFilters: null,
};

const CARS_TAB = {
  dropdowns: [
    {
      label: 'Select Make',
      accessor: 'manufacturerCars',
      placeholder: 'make',
    },
    {
      label: 'Select Model',
      accessor: 'modelCars',
      placeholder: 'model',
    },
    {
      label: 'Select Type',
      accessor: 'typeCars',
      placeholder: 'type',
    },
    {
      label: 'Select Budget',
      accessor: 'budgetCars',
      placeholder: 'budget',
    },
  ],
  headingText: 'Search Cars',
  buttonText: 'Search Cars',
  tabName: 'Cars',
  type: 'Cars',
  defaultFilters: null,
};

const ELECTRIC_TAB = {
  ...CARS_TAB,
  buttonText: 'Search Electric Vehicles',
  defaultFilters: {
    fuelType: [FuelTypeEnum.ELECTRIC],
  },
};

export const tabsFields = [VANS_TAB, CARS_TAB];

export const carPageTabFields = [CARS_TAB];

export const vanPageTabFields = [VANS_TAB];

export const electricPageTabFields = [ELECTRIC_TAB];

export const budget = [
  '£0-£150',
  '£150-£250',
  '£250-£350',
  '£350-£450',
  '£450-£550',
  '£550+',
];
