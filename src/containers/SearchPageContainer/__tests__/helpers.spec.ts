import preloadAll from 'jest-next-dynamic';
import {
  bodyUrls,
  buildUrlWithFilter,
  getFuelType,
  isBodyStyleForCMS,
  normalizePathname,
  onMadeLineBreaks,
  trimSlug,
  isOnOffer,
  sortGlossaryByAlphabetic,
  getPageTypeAndContext,
  hasFiltersForSearch,
  makeSimpleSearchAPICall,
  getCapsIds,
} from '../helpers';
import { SearchPageTypes } from '../interfaces';
import { vehicleList_vehicleList_edges as IVehicles } from '../../../../generated/vehicleList';

const mockGetPartnerProperties = jest.fn();

jest.mock('../../../utils/partnerProperties', () => ({
  getPartnerProperties: () => mockGetPartnerProperties(),
}));

describe('<helpers />', () => {
  beforeEach(async () => {
    await preloadAll();
  });

  it('should work with value', () => {
    expect(onMadeLineBreaks('Volkswagen Tiguan Allspace Leasing')).toEqual([
      'Volkswagen',
      'Tiguan Allspace',
      'Leasing',
    ]);
  });

  it('should work with custom line length', () => {
    expect(onMadeLineBreaks('Volkswagen Tiguan Allspace Leasing', 26)).toEqual([
      'Volkswagen Tiguan Allspace',
      'Leasing',
    ]);
  });

  it('isOnOffer() should return null for all cases', () => {
    expect(isOnOffer(true, SearchPageTypes.RANGE_PAGE)).toEqual(null);
    expect(isOnOffer(true, SearchPageTypes.MODEL_PAGE)).toEqual(null);
    expect(isOnOffer(true, SearchPageTypes.FUEL_TYPE_PAGE)).toEqual(null);
    expect(isOnOffer(true, SearchPageTypes.BODY_STYLE_PAGE)).toEqual(null);
    expect(isOnOffer(false, SearchPageTypes.MANUFACTURER_PAGE)).toEqual(null);
    expect(isOnOffer(false, SearchPageTypes.SPECIAL_OFFER_PAGE)).toEqual(null);
    expect(isOnOffer(false, SearchPageTypes.SIMPLE_SEARCH_PAGE)).toEqual(null);
    expect(isOnOffer(false, SearchPageTypes.ALL_MANUFACTURERS_PAGE)).toEqual(
      null,
    );
    expect(isOnOffer(false)).toEqual(null);
  });

  it('isOnOffer() should return true for all cases', () => {
    expect(isOnOffer(true, SearchPageTypes.ALL_MANUFACTURERS_PAGE)).toEqual(
      true,
    );
    expect(isOnOffer(true, SearchPageTypes.MANUFACTURER_PAGE)).toEqual(true);
    expect(isOnOffer(true, SearchPageTypes.SPECIAL_OFFER_PAGE)).toEqual(true);
    expect(isOnOffer(true, SearchPageTypes.SIMPLE_SEARCH_PAGE)).toEqual(true);
  });
});

describe('trimSlug', () => {
  it('trimSlug should return trim slug', () => {
    expect(trimSlug('/car-leasing/land-rover/range-rover-evoque')).toBe(
      'car-leasing/land-rover/range-rover-evoque',
    );
  });
});

describe('getFuelType', () => {
  it('getFuelType should return fuel types from filterFuel', () => {
    expect(getFuelType(['Electric'])).toEqual(['Electric']);
  });

  describe('should get fuel type from queryFuel for fuel page', () => {
    it('queryFuel electric', () => {
      expect(getFuelType(['Electric'], 'electric', true)).toEqual(['Electric']);
    });

    it('queryFuel hybrid', () => {
      expect(getFuelType(['Electric'], 'hybrid', true)).toEqual([
        'Diesel/plugin Elec Hybrid',
        'Petrol/plugin Elec Hybrid',
        'Petrol/electric Hybrid',
      ]);
    });
  });

  describe('should get fuel type from partner properties', () => {
    beforeEach(() => {
      mockGetPartnerProperties.mockReset();
    });

    it('partner properties are present', () => {
      mockGetPartnerProperties.mockReturnValueOnce({
        fuelTypes: ['electric'],
      });

      expect(getFuelType([])).toEqual(['electric']);
    });

    it('no partner properties', () => {
      mockGetPartnerProperties.mockReturnValueOnce(undefined);

      expect(getFuelType([])).toEqual(undefined);
    });
  });
});

describe('isBodyStyleForCMS', () => {
  it(`manufacturer url param string shouldn't return true if compared 
    body url param`, () => {
    expect(isBodyStyleForCMS(bodyUrls, 'iveco')).toEqual(false);
    expect(isBodyStyleForCMS(bodyUrls, 'specialist-van-leasing')).toEqual(true);
  });
});

describe('normalizePathname', () => {
  it('normalizePathname should return correct url', () => {
    expect(
      normalizePathname('/car-leasing/[dynamicParam]', {
        bodyStyles: 'estate',
        dynamicParam: 'estate',
      }),
    ).toEqual('/car-leasing/estate');
    expect(
      normalizePathname('/car-leasing/[dynamicParam]/[rangeName]', {
        dynamicParam: 'bmw',
        make: 'bmw',
        rangeName: '1-series',
      }),
    ).toEqual('/car-leasing/bmw/1-series');
  });
});

describe('buildUrlWithFilter', () => {
  it('buildUrlWithFilter should return new url with filters', () => {
    const route = '/car-leasing/[dynamicParam]';
    const query = { bodyStyles: 'estate', dynamicParam: 'estate' };
    const filters = {
      bodyStyles: ['Estate'],
      fuelTypes: [],
      manufacturerSlug: 'bmw',
      rangeSlug: '',
      rate: { min: 350, max: NaN },
      transmissions: [],
    };
    const { queries, pathname } = buildUrlWithFilter(
      route,
      query,
      filters,
      false,
      SearchPageTypes.BODY_STYLE_PAGE,
    );
    expect(queries).toEqual({
      bodyStyles: ['Estate'],
      make: 'bmw',
      pricePerMonth: '350|',
    });
    expect(pathname).toEqual('/car-leasing/estate?make=bmw&pricePerMonth=350|');
  });
});

describe('sortByAlphabetic', () => {
  it('should sort by alphabetic', () => {
    const glossaryEntries = [
      {
        title: 'Www',
        body: '',
      },
      {
        title: '!@',
        body: '',
      },
      {
        title: '5',
        body: '',
      },
      {
        title: 'Aaa',
        body: '',
      },
    ];
    const result = [
      {
        title: '!@',
        body: '',
      },
      {
        title: '5',
        body: '',
      },
      {
        title: 'Aaa',
        body: '',
      },
      {
        title: 'Www',
        body: '',
      },
    ];
    expect(sortGlossaryByAlphabetic(glossaryEntries)).toMatchObject(result);
  });
});

describe('getPageTypeAndContext', () => {
  it('getPageTypeAndContext should return correct page type & context values', () => {
    const router = {
      push: jest.fn(),
      pathname: '/car-leasing/[dynamicParam]',
      route: '/car-leasing/[dynamicParam]',
      query: { dynamicParam: 'hybrid', isChangePage: 'true' },
    } as any;
    const [type, context] = getPageTypeAndContext(router);

    expect(type).toEqual('isFuelType');
    expect(context).toEqual({
      req: {
        url: '/car-leasing/hybrid',
      },
      query: {
        isChangePage: 'true',
        dynamicParam: 'hybrid',
      },
    });
  });
});

it('hasFiltersForSearch() must return true if you have selected one or more filters', () => {
  const filters = {
    bodyStyles: ['Estate'],
    fuelTypes: [],
    manufacturerSlug: 'bmw',
    rangeSlug: '',
    rate: { min: 350, max: NaN },
    transmissions: [],
  };

  expect(hasFiltersForSearch(filters)).toEqual(true);
});

it('hasFiltersForSearch() should return false for empty object', () => {
  expect(hasFiltersForSearch({})).toEqual(false);
});

describe('getCapsIds', () => {
  it('getCapsIds should return Ids from array of objects', () => {
    const data: IVehicles[] = [
      {
        cursor: 'MIT',
        node: {
          url: null,
          legacyUrl: null,
          vehicleType: null,
          offerRanking: null,
          onOffer: null,
          derivativeId: '12345',
          capCode: null,
          manufacturerName: null,
          modelName: null,
          derivativeName: null,
          bodyStyle: null,
          transmission: null,
          fuelType: null,
          financeProfiles: null,
        },
      },
      {
        cursor: 'MIT',
        node: {
          url: null,
          legacyUrl: null,
          vehicleType: null,
          offerRanking: null,
          onOffer: null,
          derivativeId: '12346',
          capCode: null,
          manufacturerName: null,
          modelName: null,
          derivativeName: null,
          bodyStyle: null,
          transmission: null,
          fuelType: null,
          financeProfiles: null,
        },
      },
      {
        cursor: 'MIT',
        node: {
          url: null,
          legacyUrl: null,
          vehicleType: null,
          offerRanking: null,
          onOffer: null,
          derivativeId: '12347',
          capCode: null,
          manufacturerName: null,
          modelName: null,
          derivativeName: null,
          bodyStyle: null,
          transmission: null,
          fuelType: null,
          financeProfiles: null,
        },
      },
    ];
    const emptyData: IVehicles[] = [];
    expect(getCapsIds(data)).toEqual(['12345', '12346', '12347']);
    expect(getCapsIds(emptyData)).toEqual([]);
  });
});

describe('makeSimpleSearchAPICall', () => {
  it("makeSimpleSearchAPICall shouldn't call api if there's no data in session storage", () => {
    const router = {
      push: jest.fn(),
      pathname: '/car-leasing/[dynamicParam]',
      route: '/car-leasing/[dynamicParam]',
      query: {},
    } as any;
    const apiCall = jest.fn();
    makeSimpleSearchAPICall(router, apiCall);
    expect(apiCall).not.toBeCalled();
  });
  it("makeSimpleSearchAPICall shouldn't call api if there's queries", () => {
    const router = {
      push: jest.fn(),
      pathname: '/car-leasing/[dynamicParam]',
      route: '/car-leasing/[dynamicParam]',
      query: { dynamicParam: 'test', fuelTypes: 'test' },
    } as any;
    const apiCall = jest.fn();
    makeSimpleSearchAPICall(router, apiCall);
    expect(apiCall).not.toBeCalled();
  });
  it("makeSimpleSearchAPICall should call api when there's value in session storage", () => {
    window.sessionStorage.setItem('Car', 'true');
    const router = {
      push: jest.fn(),
      pathname: '/car-leasing/[dynamicParam]',
      route: '/car-leasing/[dynamicParam]',
      query: {},
    } as any;
    const apiCall = jest.fn();
    makeSimpleSearchAPICall(router, apiCall, true);
    expect(apiCall).toBeCalled();
  });
});
