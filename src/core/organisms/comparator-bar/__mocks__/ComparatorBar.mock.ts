import { IVehicle } from '../../../../utils/comparatorHelpers';
import { OnOffer } from '../../../../../entities/global';

const vehiclesMock = [
  {
    pageUrl: {
      url:
        'vauxhall-car-leasing/corsa/hatchback/1-2-turbo-sri-premium-5dr-164069.html',
      href:
        'vauxhall-car-leasing/corsa/hatchback/1-2-turbo-sri-premium-5dr-164069.html',
      capId: '1234',
    },
    bodyStyle: 'Hatchback',
    capId: '1234',
    manufacturerName: 'Ford',
    derivativeName: '1.0 ECOBOOST 125 ST-LINE NAV 5 DOORS',
    rangeName: 'Focus',
    modelName: 'Corsa Hatchback',
    imageUrl:
      'https://images.autorama.co.uk/Photos/Cap/Vehicles/164069/cap-90660-164069.jpg',
    leadTime: '14-21 Day Delivery',
    averageRating: 4.6,
    businessRate: 132.95,
    personalRate: 159.95,
    offerPosition: 2,
    isOnOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_TRUE,
    keyInformation: [],
    vehicleType: 'CAR',
  },
  {
    pageUrl: {
      url:
        'vauxhall-car-leasing/corsa/hatchback/1-2-turbo-sri-premium-5dr-164069.html',
      href:
        'vauxhall-car-leasing/corsa/hatchback/1-2-turbo-sri-premium-5dr-164069.html',
      capId: '12345',
    },
    bodyStyle: 'Hatchback',
    isOnOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_TRUE,
    freeInsurance: true,
    capId: '12345',
    manufacturerName: 'Ford',
    derivativeName: '2.5 ECOBOOST PHEV ST-LINE 5 DOORS CVT',
    rangeName: 'Kuga',
    modelName: 'Corsa Hatchback',
    imageUrl:
      'https://images.autorama.co.uk/Photos/Cap/Vehicles/164069/cap-90660-164069.jpg',
    leadTime: '14-21 Day Delivery',
    averageRating: 4.6,
    businessRate: 132.95,
    personalRate: 159.95,
    offerPosition: 2,
    keyInformation: [],
    vehicleType: 'CAR',
  },
] as IVehicle[];

export default vehiclesMock;
