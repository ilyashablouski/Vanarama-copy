import { hotOfferColorList } from 'core/molecules/color-selection/mocks';
import {
  LeaseTypeEnum,
  PdpVehicleType,
  VehicleTypeEnum,
} from '../../../../generated/globalTypes';
import { GetPdpContent_pdpContent_banners as IPdpBanner } from '../../../../generated/GetPdpContent';
import { GetVehicleDetails } from '../../../../generated/GetVehicleDetails';
import { IWishlistProduct } from '../../../types/wishlist';
import {
  convertProductDetailsToWishlistProduct,
  filterBannersByTitle,
  pdpCarType,
  pdpVanType,
  removeImacaColoursDuplications,
} from '../helpers';

const capId = '93456';

const banners = (): IPdpBanner[] => [
  {
    description: 'Worth Avg £538',
    image: {
      file: {
        url: '/shield.png',
      },
      title: 'shield',
    },
    link: {
      text: 'Find Out More',
      url: 'https://www.vanarama.com/car-leasing/free-car-insurance',
    },
    title: "Special Offer: Lease This Car Online & Get 1 Year's FREE Insurance",
  },
  {
    description:
      'When you lease this car online, if the worst happens, you can return it anytime.',
    image: {
      file: {
        url: '/hand_and_heart.png',
      },
      title: 'hand and heart',
    },
    link: {
      text: 'Find Out More',
      url: 'https://www.vanarama.com/redundancy-and-life-event-cover.html',
    },
    title: 'Special Offer: Free Redundancy & Life Event Cover',
  },
];

const productDetails = (): GetVehicleDetails => ({
  vehicleConfigurationByCapId: {
    uuid: 'd70a446b-ad14-41d5-8271-bfe4037b749f',
    capManufacturerDescription: 'Volkswagen',
    capRangeDescription: 'T-Roc',
    capModelDescription: 'T-Roc Hatchback',
    capDerivativeDescription: '1.0 TSI 110 Design 5 Doors',
    capPaintDescription: 'Metallic - Ravenna blue',
    capTrimDescription: 'Tracks 4 cloth - Black Oak /Ceramique',
    onOffer: true,
    offerRanking: 1,
    url:
      'car-leasing/volkswagen/t-roc/hatchback/10-tsi-110-design-5-doors-2017',
    legacyUrl:
      'volkswagen-car-leasing/troc/hatchback/1-0-tsi-110-design-5dr-168777.html',
    financeProfile: {
      leaseType: LeaseTypeEnum.PERSONAL,
      term: 48,
      mileage: 8000,
      upfront: 9,
    },
  },
  standardEquipment: [],
  leaseAdjustParams: {
    mileages: [],
    terms: [],
    upfronts: [],
  },
  vehicleDetails: {
    freeInsurance: true,
    averageRating: 4.7,
    brochureUrl:
      'http://images.autorama.co.uk/Uploads/Models/10387/trocbrochurepricelistp11d.pdf',
    independentReview: '',
    vehicleValue: 20026.67,
    rangeFaqs: null,
    relatedVehicles: null,
    customerReviews: [],
    roadsideAssistance: {
      years: 1,
    },
    warrantyDetails: {
      years: 3,
      mileage: 60000,
    },
    keyInformation: [
      {
        name: 'Transmission',
        value: 'Manual',
      },
      {
        name: 'Fuel Type',
        value: 'Petrol',
      },
      {
        name: '0-62mph',
        value: '10.8 Seconds',
      },
      {
        name: 'No. Of Seats',
        value: '5',
      },
      {
        name: 'Boot Capacity',
        value: '445 Litres',
      },
      {
        name: 'Bluetooth',
        value: 'Yes',
      },
      {
        name: 'Parking Sensors',
        value: 'Yes',
      },
      {
        name: 'Alloy Wheels',
        value: 'Yes',
      },
      {
        name: 'Air Conditioning',
        value: 'Yes',
      },
      {
        name: 'Manufacturer OTR',
        value: '£24,595.00',
      },
    ],
  },
  derivativeInfo: {
    name: '1.0 TSI 110 Design 5 Doors',
    manufacturer: {
      name: 'Volkswagen',
      slug: 'volkswagen',
    },
    range: {
      name: 'T-Roc',
      slug: 't-roc',
    },
    fuelType: {
      name: 'Petrol',
    },
    transmission: {
      name: 'Manual',
    },
    bodyStyle: {
      name: 'Hatchback',
    },
    bodyType: {
      name: 'Hatchback',
      slug: 'hatchback',
    },
    model: {
      name: 'T-Roc Hatchback',
      slug: 't-roc-hatchback',
    },
    technicals: [],
    colours: [],
    trims: [],
  },
  vehicleImages: [
    {
      capId: parseInt(capId, 10),
      mainImageUrl:
        'https://images.autorama.co.uk/Photos/Vehicles/168777/volkswagen-t-roc-design.jpg',
      colourImages: null,
      vehicleType: VehicleTypeEnum.CAR,
      videoUrl: 'https://www.youtube.com/embed/vAZrbF9pCYE',
      threeSixtyVideoUrl: null,
      imageUrls: [],
    },
  ],
});

const wishlistProduct: IWishlistProduct = {
  capId,
  vehicleType: VehicleTypeEnum.CAR,
  imageUrl:
    'https://images.autorama.co.uk/Photos/Vehicles/168777/volkswagen-t-roc-design.jpg',
  averageRating: 4.7,
  keyInformation: [
    {
      name: 'Transmission',
      value: 'Manual',
    },
    {
      name: 'Fuel Type',
      value: 'Petrol',
    },
    {
      name: '0-62mph',
      value: '10.8 Seconds',
    },
    {
      name: 'No. Of Seats',
      value: '5',
    },
    {
      name: 'Boot Capacity',
      value: '445 Litres',
    },
    {
      name: 'Bluetooth',
      value: 'Yes',
    },
    {
      name: 'Parking Sensors',
      value: 'Yes',
    },
    {
      name: 'Alloy Wheels',
      value: 'Yes',
    },
    {
      name: 'Air Conditioning',
      value: 'Yes',
    },
    {
      name: 'Manufacturer OTR',
      value: '£24,595.00',
    },
  ],
  leadTime: null,
  businessRate: null,
  personalRate: null,
  bodyStyle: 'Hatchback',
  pageUrl: {
    url:
      'volkswagen-car-leasing/troc/hatchback/1-0-tsi-110-design-5dr-168777.html',
    href:
      'volkswagen-car-leasing/troc/hatchback/1-0-tsi-110-design-5dr-168777.html',
    capId,
  },
  manufacturerName: 'Volkswagen',
  modelName: 'T-Roc Hatchback',
  derivativeName: '1.0 TSI 110 Design 5 Doors',
  rangeName: 'T-Roc',
  offerPosition: 1,
  isOnOffer: true,
  freeInsurance: true,
};

describe('convertProductDetailsToWishlistProduct', () => {
  it('convertProductDetailsToWishlistProduct should return correct wishlist product', () => {
    const details = productDetails();
    expect(convertProductDetailsToWishlistProduct(details)).toEqual(
      wishlistProduct,
    );
  });
});

describe('pdpVanType/pdpCarType', () => {
  let details = productDetails();
  beforeEach(() => {
    details = productDetails();
  });
  it('should be return Hot Offers Car type', () => {
    expect(pdpCarType(details)).toEqual(PdpVehicleType.HotOffersCars);
  });
  it('should be return Car type', () => {
    details.vehicleConfigurationByCapId!.onOffer = false;
    expect(pdpCarType(details)).toEqual(PdpVehicleType.Car);
  });
  it('should be return Electric Car type', () => {
    details.derivativeInfo!.fuelType!.name = 'Electric';
    details.vehicleConfigurationByCapId!.onOffer = false;
    expect(pdpCarType(details)).toEqual(PdpVehicleType.ElectricCar);
  });
  it('should be return Pickup type', () => {
    expect(pdpVanType(details)).toEqual(PdpVehicleType.Pickup);
  });
});

describe('removeImacaColoursDuplications', () => {
  const imacaColourList = [...hotOfferColorList, ...hotOfferColorList];

  it('should remove duplicate Imaca colors', () => {
    expect(removeImacaColoursDuplications(imacaColourList)).toEqual(
      hotOfferColorList,
    );
  });
});

describe('filterBannersByTitle', () => {
  const bannerList = banners();

  it('should remove banners with specified title', () => {
    expect(filterBannersByTitle(bannerList, 'free insurance')).toEqual(
      bannerList.slice(1),
    );
  });
});
