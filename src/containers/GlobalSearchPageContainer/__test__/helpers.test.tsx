import { VehicleTypeEnum } from '../../../../generated/globalTypes';
import {
  productCardDataMapper,
  buildFiltersRequestObject,
  isSimilarPage,
  buildInitialFilterState,
  getVehicleListForRender,
} from '../helpers';
import { IFiltersData, IProps } from '../interfaces';
import { productDerivatives_productDerivatives_derivatives as IVehiclesList } from '../../../../generated/productDerivatives';
import { OnOffer } from '../../../../entities/global';

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
        onOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_TRUE,
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
        onOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_TRUE,
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
        onOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_TRUE,
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
      isOnOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_TRUE,
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
      onOffer: OnOffer.FILTER_DISABLED,
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
      onOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_TRUE,
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
  describe('getVehicleListForRender', () => {
    const vehiclesCardsData = {
      LCV: [],
      CAR: [
        {
          averageRating: 0,
          businessRate: 226.9,
          capId: '94060',
          freeInsurance: false,
          imageUrl:
            'https://images.autorama.co.uk/Photos/Models/9610/alfaromeogiulietta0319(3).jpg',
          isOnOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_FALSE,
          keyInformation: [
            {
              name: 'Transmission',
              value: 'Manual',
            },
          ],
          leadTime: 'Factory Order',
          personalRate: 272.9,
          vehicleType: VehicleTypeEnum.CAR,
        },
      ],
    };
    const migratedManufacturers = {
      car: {
        manufacturers: [],
      },
      lcv: {
        manufacturers: [],
      },
    };
    it('should return empty array if vehiclesList is empty array', () => {
      expect(
        getVehicleListForRender([], vehiclesCardsData, migratedManufacturers),
      ).toMatchObject([]);
    });
    it('should return empty array if vehiclesList is array of null', () => {
      expect(
        getVehicleListForRender(
          [null, null],
          vehiclesCardsData,
          migratedManufacturers,
        ),
      ).toMatchObject([]);
    });
    it('should works correct', () => {
      const vehiclesList = [
        {
          alloys: true,
          availability: 0,
          capBodyStyle: 'Hatchback',
          capCode: 'ALGI14SR25HPTM',
          capId: '94060',
          derivativeId: 94060,
          derivativeName: '1.4 TB Sprint 5 Doors',
          doors: 5,
          enginePowerBhp: 120,
          enginePowerKw: 88,
          engineSize: 1400,
          engineTorque: 215,
          financeType: 'PCH',
          fuelType: 'Petrol',
          fullDescription:
            'Car Alfa Romeo Giulietta Hatchback Petrol Manual 1.4 TB Sprint 5 Doors',
          fullPrice: 21900,
          funder: 'ARV',
          height: 1465,
          inStock: false,
          indexedAt: '2022-01-22T14:55:28.249Z',
          initialPayment: 3958.8,
          initialPaymentMaintained: 4317.36,
          initialPeriod: 12,
          insuranceGroup: '16E',
          introducedAt: '2020-08-01T00:00:00.000Z',
          inventoryCount: 0,
          length: 4351,
          loadLength: null,
          loadWidth: null,
          lqBodyStyle: 'Hatchback',
          lqFunderId: 2,
          lqFunderRateId: 395935878,
          lqUrl:
            'alfa-romeo-car-leasing/giulietta/hatchback/1-4-tb-sprint-5dr-168550.html',
          lqVehicleId: 168550,
          maintenancePrice: 29.88,
          manufacturerId: 1,
          manufacturerName: 'Alfa Romeo',
          mileage: 10000,
          modelId: 51060,
          modelName: 'Giulietta Hatchback',
          modelYear: 2010,
          noOfGears: 6,
          noOfSeats: 5,
          offerRanking: 999999999,
          onOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_FALSE,
          rangeId: 266,
          rangeName: 'Giulietta',
          receivedAt: '2022-01-22T03:35:49.889834Z',
          rental: 329.9,
          rentalMaintained: 359.78,
          sku: 'CAR-94060-ARV-PCH-0-12-48-10',
          stockBatchId: 0,
          term: 48,
          topSpeed: null,
          totalLeaseCost: 19464.1,
          totalLeaseCostMaintained: 21227.02,
          towingCapacity: null,
          transmission: 'Manual',
          updatedAt: '2022-01-18T23:19:10.193Z',
          url:
            'car-leasing/alfa-romeo/giulietta/hatchback/14-tb-sprint-5-doors-2010',
          vehicleCategory: 'Car',
          vehicleType: 'CAR',
          weight: null,
          wheelbase: 2634,
          width: 1798,
        },
      ];
      const result = [
        {
          data: {
            vehicleType: 'CAR',
            capId: '94060',
            manufacturerName: 'Alfa Romeo',
            rangeName: 'Giulietta',
            modelName: 'Giulietta Hatchback',
            derivativeName: '1.4 TB Sprint 5 Doors',
            averageRating: 0,
            isOnOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_FALSE,
            freeInsurance: false,
            offerPosition: 999999999,
            leadTime: 'Factory Order',
            imageUrl:
              'https://images.autorama.co.uk/Photos/Models/9610/alfaromeogiulietta0319(3).jpg',
            keyInformation: [
              {
                name: 'Transmission',
                value: 'Manual',
              },
            ],
            businessRate: 226.9,
            personalRate: 272.9,
          },
          derivativeId: '94060',
          title: {
            title: 'Alfa Romeo Giulietta Hatchback',
            description: '1.4 TB Sprint 5 Doors',
          },
          url:
            'alfa-romeo-car-leasing/giulietta/hatchback/1-4-tb-sprint-5dr-168550.html',
          capBodyStyle: 'Hatchback',
        },
      ];
      expect(
        getVehicleListForRender(
          vehiclesList,
          vehiclesCardsData,
          migratedManufacturers,
        ),
      ).toMatchObject(result);
    });
  });
});
