import preloadAll from 'jest-next-dynamic';
import {
  bodyUrls,
  buildUrlWithFilter,
  getFuelType,
  isBodyStyleForCMS,
  normalizePathname,
  onMadeLineBreaks,
  trimSlug,
} from '../helpers';
import { SearchPageTypes } from '../interfaces';

const mockGetPartnerProperties = jest.fn();

jest.mock('../../../utils/partnerProperties', () => ({
  getPartnerProperties: () => mockGetPartnerProperties(),
}));

describe('<helpers />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('should work with value', async () => {
    expect(onMadeLineBreaks('Volkswagen Tiguan Allspace Leasing')).toEqual([
      'Volkswagen',
      'Tiguan Allspace',
      'Leasing',
    ]);
  });
  it('should work with custom line length', async () => {
    expect(onMadeLineBreaks('Volkswagen Tiguan Allspace Leasing', 26)).toEqual([
      'Volkswagen Tiguan Allspace',
      'Leasing',
    ]);
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
