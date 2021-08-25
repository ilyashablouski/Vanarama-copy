import { IPanelsData } from './interfaces';

export default {
  manufacturerAndModel: {
    label: 'Make & Model',
    panelId: 'manufacturerAndModel',
    filterIds: ['manufacturers', 'ranges'],
  },
  budget: {
    label: 'Budget',
    panelId: 'budget',
    filterIds: ['budget'],
  },
  bodyType: {
    label: 'Body Type',
    panelId: 'bodyType',
    filterIds: ['bodyType'],
  },
  transmission: {
    label: 'Transmission',
    panelId: 'transmission',
    filterIds: ['transmission'],
  },
  fuelType: {
    label: 'Fuel Type',
    panelId: 'fuelType',
    filterIds: ['fuelType'],
  },
} as IPanelsData;
