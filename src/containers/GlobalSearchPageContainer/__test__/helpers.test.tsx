import { VehicleTypeEnum } from '../../../../generated/globalTypes';
import { productCardDataMapper, buildFiltersRequestObject } from '../helpers';
import { IFiltersData } from '../interfaces';
import { productDerivatives_productDerivatives_derivatives as IVehiclesList } from '../../../../generated/productDerivatives';

describe('helpers', () => {
  it('productCardDataMapper should return correct array', () => {
    expect(
      productCardDataMapper({
        vehicleType: VehicleTypeEnum.CAR,
        capId: '231',
        manufacturerName: 'Ford',
        rangeName: 'Focus',
        modelName: 'testModel',
        derivativeName: 'derivativeTest',
        fullPrice: null,
        onOffer: true,
        offerRanking: 1,
        rental: 164.88,
        availability: 7,
        capBodyStyle: null,
        capCode: null,
        derivativeId: null,
        financeType: null,
        fuelType: null,
        fullDescription: null,
        initialPayment: null,
        lqUrl: null,
        manufacturerId: null,
        mileage: null,
        modelId: null,
        rangeId: null,
        term: null,
        transmission: null,
        url: null,
      } as IVehiclesList),
    ).toEqual({
      averageRating: null,
      businessRate: 164.88,
      capId: '231',
      derivativeName: 'derivativeTest',
      imageUrl: '',
      isOnOffer: true,
      keyInformation: null,
      leadTime: '7-10 Day Delivery',
      manufacturerName: 'Ford',
      modelName: 'testModel',
      offerPosition: 1,
      personalRate: 164.88,
      rangeName: 'Focus',
      vehicleType: 'CAR',
    });
  });
  it('buildFiltersRequestObject should return correct object', () => {
    expect(
      buildFiltersRequestObject({
        from: ['150'],
        to: ['300'],
        make: ['bmw'],
        range: ['3 series'],
      } as IFiltersData),
    ).toEqual({
      budget: {
        max: 300,
        min: 150,
      },
      make: 'bmw',
      range: '3 series',
    });
  });
});
