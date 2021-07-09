import { LeaseTypeEnum, VehicleTypeEnum } from '../../../generated/globalTypes';
import {
  arraysAreEqual,
  toCurrencyDisplay,
  toPriceFormat,
  getOrderList,
  getVehicleConfigId,
  parseVehicleConfigId,
} from '../helpers';

describe('arraysAreEqual', () => {
  it('should order by sortByKey argument and compare 2 array of objects, to check they are equal', () => {
    const array1 = [
      {
        order: 7,
        value: ['Electric'],
      },
      {
        order: 1,
        value: 'bmw',
      },
    ];
    const array2 = [
      {
        order: 1,
        value: 'bmw',
      },
      {
        order: 7,
        value: ['Electric'],
      },
    ];
    const actual1 = arraysAreEqual(array1, array1, 'order');
    const actual2 = arraysAreEqual(array1, array2, 'order');

    expect(actual1).toEqual(true);
    expect(actual2).toEqual(true);
  });

  it('should sort and compare 2 string arrays to check they are equal', () => {
    const stringArray1 = ['hello', 'goodbye'];
    const stringArray2 = ['goodbye', 'hello'];
    const actual1 = arraysAreEqual(stringArray1, stringArray1);
    const actual2 = arraysAreEqual(stringArray1, stringArray2);

    expect(actual1).toEqual(true);
    expect(actual2).toEqual(true);
  });

  it('should not sort and compare 2 string arrays if unsorted is true', () => {
    const stringArray1 = ['hello', 'goodbye'];
    const stringArray2 = ['goodbye', 'hello'];
    const array1 = [
      {
        order: 7,
        value: ['Electric'],
      },
      {
        order: 1,
        value: 'bmw',
      },
    ];
    const array2 = [
      {
        order: 1,
        value: 'bmw',
      },
      {
        order: 7,
        value: ['Electric'],
      },
    ];
    const actual1 = arraysAreEqual(stringArray1, stringArray2, null, true);
    const actual2 = arraysAreEqual(array1, array2, null, true);

    expect(actual1).toEqual(false);
    expect(actual2).toEqual(false);
  });
});

describe('toCurrencyDisplay', () => {
  it('toCurrencyDisplay should return correct string', () => {
    expect(toCurrencyDisplay(123)).toBe('£123.00');
  });
});

describe('toPriceFormat', () => {
  it('toPriceFormat should return correct price', () => {
    expect(toPriceFormat(123)).toBe('123.00');
  });
  it('toPriceFormat should return correct price', () => {
    expect(toPriceFormat(0)).toBe('0.00');
  });
  it('toPriceFormat should return correct price', () => {
    expect(toPriceFormat(undefined)).toBe('0.00');
  });
  it('toPriceFormat should return correct price', () => {
    expect(toPriceFormat(null)).toBe('0.00');
  });
});

describe('getOrderList', () => {
  it('getOrderList should return correct array', () => {
    expect(
      getOrderList({
        quoteByCapId: {
          colour: '13990',
          stockBatchId: null,
          funderId: 3,
          leadTime: '14-21 Day Delivery',
          leaseType: LeaseTypeEnum.PERSONAL,
          maintenanceCost: {
            monthlyRental: 61.75,
            initialRental: 61.75,
            excessMileage: 0,
          },
          nextBestPrice: {
            maintained: 70,
            nonMaintained: 60,
          },
          mileage: 8000,
          leaseCost: {
            monthlyRental: 605.95,
            initialRental: 605.95,
            excessMileage: 14.76,
          },
          processingFee: 0,
          stock: 'Brand New - ',
          term: 24,
          trim: '104562',
          upfront: 1,
          vehicleType: VehicleTypeEnum.CAR,
        },
        colours: [{ optionId: 13990, label: 'Solid - Polar white' }],
        trims: [{ optionId: 104562, label: 'Leather - Cranberry red' }],
        trim: 112981,
        stateVAT: 'inc',
        maintenance: false,
        roadsideAssistance: {
          years: 3,
        },
        warrantyDetails: {
          years: 5,
          mileage: 50000,
        },
      }),
    ).toEqual([
      {
        dataTestId: 'processingFee',
        id: 'processingFee',
        isOrange: true,
        key: 'FREE',
        label: 'Processing Fee:',
        value: 'FREE',
      },
      {
        dataTestId: 'initialPayment',
        id: 'initialPayment',
        isOrange: false,
        key: '605.95 inc',
        label: 'Initial Payment:',
        value: '£605.95 (inc. VAT)',
      },
      {
        dataTestId: 'contractLengthile',
        id: 'contractLengthile',
        isOrange: false,
        key: '24',
        label: 'Contract Length:',
        value: '24 months',
      },
      {
        dataTestId: 'annualMileage',
        id: 'annualMileage',
        isOrange: false,
        key: '8000',
        label: 'Annual Mileage:',
        value: '8000 miles',
      },
      {
        dataTestId: 'maintenance',
        id: 'maintenance',
        isOrange: false,
        key: 'No',
        label: 'Maintenance:',
        value: 'No',
      },
      {
        dataTestId: 'colour',
        id: 'colour',
        isOrange: false,
        key: 'Solid - Polar white',
        label: 'Colour:',
        value: 'Solid - Polar white',
      },
      {
        dataTestId: 'trim',
        id: 'trim',
        isOrange: false,
        key: 'Leather - Cranberry red',
        label: 'Trim / Interior:',
        value: 'Leather - Cranberry red',
      },
      {
        dataTestId: 'stock',
        id: 'stock',
        isOrange: false,
        key: '14-21 Day Delivery',
        label: 'Stock:',
        value: '14-21 Day Delivery',
      },
      {
        dataTestId: 'warranty',
        id: 'warranty',
        isOrange: false,
        key: '5 Years Manufacturer Or 50000 Milles',
        label: 'Warranty:',
        value: '5 Years Manufacturer Or 50000 Milles',
      },
      {
        dataTestId: 'roadTax',
        id: 'roadTax',
        isOrange: true,
        key: 'roadTax',
        label: 'Road Tax:',
        value: 'INCLUDED',
      },
      {
        dataTestId: 'lifeEventCover',
        id: 'lifeEventCover',
        isOrange: true,
        key: 'lifeEventCover',
        label: 'Redundancy & Life Event Cover:',
        value: 'FREE',
      },
      {
        dataTestId: 'delivery',
        id: 'delivery',
        isOrange: true,
        key: 'delivery',
        label: 'Delivery:',
        value: 'FREE',
      },
      {
        dataTestId: 'roadsideAssistance',
        id: 'roadsideAssistance',
        isOrange: true,
        key: '3',
        label: 'Roadside Assistance:',
        value: '3 YEARS INCLUDED',
      },
    ]);
  });
});

describe('getVehicleConfigId', () => {
  const vehicleType = VehicleTypeEnum.CAR;
  const capId = '12345';

  it('getVehicleConfigId should return correct vehicle configId', () => {
    expect(
      getVehicleConfigId({
        averageRating: 4.7,
        businessRate: 183.88,
        derivativeName: '1.0 TSI 110 Design 5dr',
        imageUrl: 'image.jpg',
        isOnOffer: true,
        keyInformation: [],
        leadTime: '14-21 Day Delivery',
        manufacturerName: 'Volkswagen',
        modelName: 'T-Roc Hatchback',
        offerPosition: 1,
        personalRate: 219.95,
        rangeName: 'T-Roc',
        vehicleType,
        capId,
      }),
    ).toEqual(`${vehicleType}-${capId}`);
  });
});

describe('parseVehicleConfigId', () => {
  const vehicleType = VehicleTypeEnum.CAR;
  const capId = '12345';

  it('parseVehicleConfigId should return correct capId & vehicleType', () => {
    expect(parseVehicleConfigId(`${vehicleType}-${capId}`)).toEqual({
      vehicleType,
      capId,
    });
  });
});
