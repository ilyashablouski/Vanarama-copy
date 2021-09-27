import { VehicleTypeEnum } from '../../../../generated/globalTypes';
import {
  productCardDataMapper,
  buildFiltersRequestObject,
  isSimilarPage,
  buildInitialFilterState,
} from '../helpers';
import { IFiltersData, IProps } from '../interfaces';
import { productDerivatives_productDerivatives_derivatives as IVehiclesList } from '../../../../generated/productDerivatives';

const props = {
  metaData: {
    title: 'Search Vehicles & Lease Deals | Vanarama',
    name: 'Search Vehicles',
    metaRobots: 'noindex,follow',
    metaDescription: null,
    legacyUrl: null,
    pageType: 'Vehicle Search',
    canonicalUrl: 'https://www.vanarama.com/search',
    slug: 'search',
    schema: {
      '@type': 'BreadcrumbList',
      '@context': 'https://schema.org',
      itemListElement: [
        {
          item: 'https://www.vanarama.com/',
          name: 'Home',
          '@type': 'ListItem',
          position: 1,
        },
        { name: 'Search', '@type': 'ListItem', position: 2 },
      ],
    },
    publishedOn: null,
    breadcrumbs: [{ href: '/', label: 'Home' }, { label: 'Search' }],
  },
  preLoadProductDerivatives: {
    total: 385,
    derivatives: [
      {
        alloys: null,
        availability: 7,
        capBodyStyle: 'Van',
        capCode: 'FOTU208SL3VDTM2 1  L',
        capId: '42060',
        derivativeId: 42060,
        derivativeName: '2.0 EcoBlue 130ps Low Roof Limited Van',
        doors: 0,
        enginePowerBhp: null,
        enginePowerKw: null,
        engineSize: null,
        engineTorque: null,
        financeType: 'PCH',
        fuelType: 'Diesel',
        fullDescription:
          'Ford Transit Custom Van Diesel Manual 2.0 EcoBlue 130ps Low Roof Limited Van',
        fullPrice: null,
        funder: 'ARV',
        height: null,
        inStock: true,
        indexedAt: '2021-04-09T01:02:01.806Z',
        initialPayment: 2782.56,
        initialPaymentMaintained: 3149.88,
        initialPeriod: 12,
        insuranceGroup: null,
        introducedAt: '2017-11-20T00:00:00.000Z',
        inventoryCount: 1,
        length: null,
        loadLength: null,
        loadWidth: null,
        lqBodyStyle: 'Medium Van',
        lqFunderId: 2,
        lqFunderRateId: 6282899,
        lqUrl:
          'ford-van-leasing/transit-custom/2-0-tdci-130ps-low-roof-limited-van-9862.html',
        lqVehicleId: 153745,
        maintenancePrice: 30.61,
        manufacturerId: 296,
        manufacturerName: 'Ford',
        mileage: 6000,
        modelId: 43087,
        modelName: 'Transit Custom 280 L1 Fwd',
        modelYear: 2017,
        noOfGears: null,
        noOfSeats: null,
        offerRanking: 1,
        onOffer: true,
        rangeId: 260,
        rangeName: 'Transit Custom',
        receivedAt: '2021-04-09T00:59:43.184957Z',
        rental: 231.88,
        rentalMaintained: 262.49,
        sku: 'LCV-42060-ARV-PCH-1377-12-60-6',
        stockBatchId: 1377,
        term: 60,
        topSpeed: null,
        totalLeaseCost: 16463.48,
        totalLeaseCostMaintained: 18636.79,
        towingCapacity: null,
        transmission: 'Manual',
        updatedAt: '2021-04-08T21:00:44.293Z',
        url:
          'dmFuLWxlYXNpbmcvZm9yZC90cmFuc2l0LWN1c3RvbS8yODAtbDEtZndkLTIwLWVjb2JsdWUtMTMwcHMtbG93LXJvb2YtbGltaXRlZC12YW4tMjAxNw==',
        vehicleCategory: null,
        vehicleType: 'LCV',
        weight: null,
        wheelbase: null,
        width: null,
      },
      {
        alloys: true,
        availability: 7,
        capBodyStyle: 'Double Cab Tipper',
        capCode: 'FOTR201T1RMDTM2 5  L',
        capId: '45234',
        derivativeId: 45234,
        derivativeName: '2.0 EcoBlue 130ps Double Cab Tipper [1 Way]',
        doors: 0,
        enginePowerBhp: 130,
        enginePowerKw: 96,
        engineSize: 2000,
        engineTorque: null,
        financeType: 'PCH',
        fuelType: 'Diesel',
        fullDescription:
          'Ford Transit 350 L3 Rwd Double Cab Tipper Diesel Manual 2.0 EcoBlue 130ps [1 Way]',
        fullPrice: 46531,
        funder: 'ARV',
        height: null,
        inStock: true,
        indexedAt: '2021-05-20T23:33:15.146Z',
        initialPayment: 375.87,
        initialPaymentMaintained: 427.3,
        initialPeriod: 1,
        insuranceGroup: null,
        introducedAt: '2019-04-26T00:00:00.000Z',
        inventoryCount: 1,
        length: 6022,
        loadLength: 0,
        loadWidth: 0,
        lqBodyStyle: 'Dropside Tipper',
        lqFunderId: 2,
        lqFunderRateId: 8125555,
        lqUrl: null,
        lqVehicleId: 161964,
        maintenancePrice: 51.43,
        manufacturerId: 296,
        manufacturerName: 'Ford',
        mileage: 6000,
        modelId: 45802,
        modelName: 'Transit 350 L3 Rwd',
        modelYear: 2019,
        noOfGears: 6,
        noOfSeats: 6,
        offerRanking: 1,
        onOffer: true,
        rangeId: 40,
        rangeName: 'Transit',
        receivedAt: '2021-05-20T23:31:07.327232Z',
        rental: 375.87,
        rentalMaintained: 427.3,
        sku: 'LCV-45234-ARV-PCH-3091-1-60-6',
        stockBatchId: 3091,
        term: 60,
        topSpeed: 0,
        totalLeaseCost: 22552.2,
        totalLeaseCostMaintained: 25638,
        towingCapacity: 750,
        transmission: 'Manual',
        updatedAt: '2021-05-14T10:15:22.703Z',
        url:
          'dmFuLWxlYXNpbmcvZm9yZC90cmFuc2l0LzM1MC1sMy1yd2QtMjAtZWNvYmx1ZS0xMzBwcy1kb3VibGUtY2FiLXRpcHBlci0xLXdheS0yMDE5',
        vehicleCategory: 'Van',
        vehicleType: 'LCV',
        weight: 3500,
        wheelbase: 3954,
        width: null,
      },
    ],
  },
  carsData: [],
  vansData: [],
  responseVansCapIds: [],
  responseCarsCapIds: [],
  defaultSort: [
    {
      field: 'offerRanking',
      direction: 'ASC',
    },
    {
      field: 'availability',
      direction: 'ASC',
    },
    {
      field: 'rental',
      direction: 'ASC',
    },
  ],
  initialFilters: {} as IFiltersData,
  isAllProductsRequest: false,
} as IProps;

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
      freeInsurance: null,
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
        manufacturerNames: ['bmw'],
        rangeName: ['3 series'],
      } as IFiltersData),
    ).toEqual({
      budget: {
        max: 300,
        min: 150,
      },
      manufacturerNames: ['bmw'],
      rangeNames: ['3 series'],
      onOffer: null,
      financeTypes: ['BCH'],
    });
  });
  it('buildFiltersRequestObject should return correct object with financeType', () => {
    expect(
      buildFiltersRequestObject(
        {
          from: ['150'],
          to: ['300'],
          manufacturerNames: ['bmw'],
          rangeName: ['3 series'],
        } as IFiltersData,
        true,
        true,
      ),
    ).toEqual({
      budget: {
        max: 300,
        min: 150,
      },
      manufacturerNames: ['bmw'],
      rangeNames: ['3 series'],
      onOffer: true,
      financeTypes: ['PCH'],
    });
  });
  it('buildInitialFilterState should return correct filter object', () => {
    expect(
      buildInitialFilterState({
        searchTerm: 'ford',
        bodyStyles: 'Hatchback',
        budget: '150%7C550',
        enginePowerBhp: '160%7C240',
      }),
    ).toEqual({
      bodyStyles: ['Hatchback'],
      from: ['150'],
      to: ['550'],
      fromEnginePower: [160],
      toEnginePower: [240],
    });
  });
  it('isSimilarPage should return true', () => {
    expect(isSimilarPage(props, props)).toEqual(true);
  });
  it('isSimilarPage should return false', () => {
    expect(
      isSimilarPage(props, {
        ...props,
        preLoadProductDerivatives: {
          total: 0,
          derivatives: null,
        },
      }),
    ).toEqual(false);
  });
});
