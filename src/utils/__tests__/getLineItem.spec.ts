import { VehicleTypeEnum, LeaseTypeEnum } from '../../../generated/globalTypes';
import getLineItem from '../getLineItem';

const params = {
  vehicleTypeValue: VehicleTypeEnum.CAR,
  maintenanceValue: null,
  mileageValue: 6000,
  upfrontValue: 9,
  trimValue: 45575,
  termValue: 60,
  capId: 96099,
  trimList: [
    {
      leadTime: '14-21 Day Delivery',
      trims: [
        {
          optionId: 104562,
          label: 'Cloth - Black - In Stock',
          hotOffer: false,
        },
      ],
    },
  ],
  colourData: [
    {
      leadTime: '14-21 Day Delivery',
      colors: [
        {
          hex: null,
          optionId: 13990,
          label: 'Special solid - Polar white - In Stock',
          hotOffer: false,
        },
      ],
    },
  ],
  quoteData: {
    quoteByCapId: {
      term: 60,
      funderId: 2,
      mileage: 6000,
      upfront: 9,
      trim: '104562',
      colour: '13990',
      leadTime: '14-21 Day Delivery',
      stock: 'Brand New - ',
      vehicleType: VehicleTypeEnum.CAR,
      leaseType: LeaseTypeEnum.PERSONAL,
      stockBatchId: 3512,
      processingFee: 0,
      freeInsurance: true,
      nextBestPrice: {
        maintained: 310.33,
        nonMaintained: 275.86,
      },
      leaseCost: {
        monthlyRental: 251.98,
        initialRental: 2267.82,
        excessMileage: 8.8,
      },
      maintenanceCost: {
        monthlyRental: 40.47,
        initialRental: 316.26,
        excessMileage: 5.11,
      },
    },
  },
};

const result = {
  quantity: 1,
  vehicleProduct: {
    vehicleType: VehicleTypeEnum.CAR,
    derivativeCapId: '96099',
    colour: 'Special solid - Polar white - In Stock',
    trim: 'Cloth - Black - In Stock',
    stockBatchId: 3512,
    leadTime: '14-21 Day Delivery',
    term: 60,
    funderId: '2',
    annualMileage: 6000,
    depositMonths: 9,
    depositPayment: 2267.82,
    monthlyPayment: 251.98,
    maintenance: null,
    partnerSlug: undefined,
    maintenancePrice: undefined,
  },
};

describe('getLineItem', () => {
  it('getLineItem should return correct data', () => {
    expect(getLineItem(params)).toEqual(result);
  });
});
