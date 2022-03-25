import preloadAll from 'jest-next-dynamic';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import {
  getUrlParam,
  setSource,
  formatProductPageUrl,
  formatNewUrl,
  getNewUrl,
  getVehicleConfigurationPath,
  removeUrlQueryPart,
  getProductPageBreadCrumb,
  formatToSlugFormat,
  generateRangeSlugs,
  getCanonicalUrl,
  getMetadataForPagination,
  shouldManufacturersStateUpdate,
  manufacturersSlugInitialState,
  isManufacturerMigrated,
} from '../url';

describe('Url utils', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  describe('getUrlParam', () => {
    it('getUrlParam should return string with params for url ex.(?key=value)', () => {
      const actual = getUrlParam({ key: '', key2: 'value2' });

      expect(actual).toEqual('?key2=value2');
    });
    it('getUrlParam should return string with params for url ex.(?key=value&key=value)', () => {
      const actual = getUrlParam({ key: 'value', key2: 'value2' });

      expect(actual).toEqual('?key=value&key2=value2');
    });
    it('getUrlParam should return string with params for url ex.(&key=value&key=value)', () => {
      const actual = getUrlParam({ key: 'value', key2: 'value2' }, true);

      expect(actual).toEqual('&key=value&key2=value2');
    });
  });

  describe('setSource', () => {
    it('setSource should return new source string without domain', () => {
      const actual = setSource(
        'https://www.vanarama.com/car-leasing/all-car-manufacturers.html',
      );

      expect(actual).toEqual('/car-leasing/all-car-manufacturers.html');
    });
  });

  describe('formatProductPageUrl', () => {
    it('formatProductPageUrl should return object', () => {
      const actual = formatProductPageUrl(
        'https://www.vanarama.com/car-leasing/all-car-manufacturers.html',
        'capId',
      );

      expect(actual).toEqual({
        url: 'https://www.vanarama.com/car-leasing/all-car-manufacturers.html',
        href: 'https://www.vanarama.com/car-leasing/all-car-manufacturers.html',
        capId: 'capId',
      });
    });

    it('formatProductPageUrl should return object with empty string in url and href', () => {
      const actual = formatProductPageUrl(null, 'capId');

      expect(actual).toEqual({
        url: '',
        href: '',
        capId: 'capId',
      });
    });
  });

  describe('formatNewUrl + getNewUrl', () => {
    it('formatNewUrl should return van-leasing url without url', () => {
      const actual = formatNewUrl(null);

      expect(actual).toEqual('/van-leasing');
    });

    it('formatNewUrl should return car-leasing url', () => {
      const actual = formatNewUrl({
        node: { vehicleType: VehicleTypeEnum.CAR, url: '/url' },
      } as any);

      expect(actual).toEqual('/car-leasing/url');
    });

    it('getNewUrl and formatNewUrl should return van-leasing url', () => {
      const actualGetNewUrl = getNewUrl(
        [
          {
            node: {
              vehicleType: VehicleTypeEnum.LCV,
              url: '/url',
              derivativeId: 'derivativeId',
            },
          } as any,
        ],
        'derivativeId',
      );
      const actual = formatNewUrl({
        node: { vehicleType: VehicleTypeEnum.LCV, url: '/url' },
      } as any);

      expect(actualGetNewUrl).toEqual('/van-leasing/url');
      expect(actual).toEqual('/van-leasing/url');
    });
  });

  describe('getVehicleConfigurationPath', () => {
    it('getVehicleConfigurationPath should return newPath', () => {
      const actual = getVehicleConfigurationPath(
        '/bmw-van-leasing/2-series/coupe',
      );

      expect(actual).toEqual('bmw-van-leasing/2-series/coupe');
    });

    it('getVehicleConfigurationPath should return newPath', () => {
      const actual = getVehicleConfigurationPath(
        '/bmw-van-leasing/2-series/coupe/',
      );

      expect(actual).toEqual('bmw-van-leasing/2-series/coupe/');
    });
  });

  describe('removeUrlQueryPart', () => {
    it('removeUrlQueryPart should return string without ?', () => {
      const actual = removeUrlQueryPart('/bmw-van-leasing/2-series/coupe?test');

      expect(actual).toEqual('/bmw-van-leasing/2-series/coupe');
    });
    it('removeUrlQueryPart should return the same string', () => {
      const actual = removeUrlQueryPart('/bmw-van-leasing/2-series/coupe');

      expect(actual).toEqual('/bmw-van-leasing/2-series/coupe');
    });
  });

  describe('getProductPageBreadCrumb', () => {
    it('getProductPageBreadCrumb should return breadcrumb', () => {
      const actual = getProductPageBreadCrumb(
        {
          name: '40 TFSI 204 S Line 2 Doors S Tronic',
          manufacturer: { name: 'Audi', slug: 'audi' },
          range: { name: 'A5', slug: 'a5' },
          fuelType: { name: 'Petrol' },
          transmission: {
            name: 'Automatic',
          },
          bodyStyle: {
            name: 'Coupe',
          },
          bodyType: {
            name: 'Coupe',
            slug: 'coupe',
          },
          model: {
            name: 'A5 Coupe',
            slug: 'a5-coupe',
          },
          technicals: [
            {
              categoryDescription: 'Weight and Capacities',
              derivativeId: '94216',
              effectiveFrom: '2020-08-10T00:00:00.000Z',
              effectiveTo: null,
              id: '3',
              technicalDescription: 'Minimum Kerbweight',
              technicalLongDescription: 'Minimum Kerbweight',
              unit: 'kg',
              value: '1485',
            },
          ],
          colours: [
            { id: '143084', optionDescription: 'Audi Exclusive - Custom' },
          ],
          trims: [
            {
              id: '152549',
              optionDescription:
                'Fine nappa leather - Black with Rock Grey stitching and black dashboard + front sport seats with S embossed logo',
            },
          ],
        },
        [
          {
            slug: 'car-leasing/audi/a5/coupe',
            legacyUrl: 'audi-car-leasing/a5/sport-back.html',
          },
          {
            slug: 'car-leasing/audi/a5',
            legacyUrl: 'audi-car-leasing/a5.html',
          },
          {
            slug: 'car-leasing/audi',
            legacyUrl: 'audi-car-leasing.html',
          },
          {
            slug:
              'car-leasing/audi/a5/coupe/40-tfsi-204-s-line-2-doors-s-tronic-2020',
            legacyUrl:
              'audi-car-leasing/a5/coupe/40-tfsi-204-s-line-2dr-s-tronic-168623.html',
          },
          {
            slug: 'car-leasing',
            legacyUrl: 'car-leasing.html',
          },
        ],
        'car-leasing/audi/a5/coupe/40-tfsi-204-s-line-2-doors-s-tronic-2020',
        true,
      );

      expect(actual).toEqual([
        { link: { href: '/audi-car-leasing.html', label: 'Audi' } },
        { link: { href: '/audi-car-leasing/a5.html', label: 'A5' } },
        {
          link: { href: '', label: '40 TFSI 204 S Line 2 Doors S Tronic' },
        },
      ]);
    });

    it('getProductPageBreadCrumb should return breadcrumb from slug', () => {
      const actual = getProductPageBreadCrumb(
        {
          name: '40 TFSI 204 S Line 2 Doors S Tronic',
          manufacturer: { name: 'Audi', slug: 'audi' },
          range: { name: 'A5', slug: 'a5' },
          fuelType: { name: 'Petrol' },
          transmission: {
            name: 'Automatic',
          },
          bodyStyle: {
            name: 'Coupe',
          },
          bodyType: {
            name: 'Coupe',
            slug: 'coupe',
          },
          model: {
            name: 'A5 Coupe',
            slug: 'a5-coupe',
          },
          technicals: [
            {
              categoryDescription: 'Weight and Capacities',
              derivativeId: '94216',
              effectiveFrom: '2020-08-10T00:00:00.000Z',
              effectiveTo: null,
              id: '3',
              technicalDescription: 'Minimum Kerbweight',
              technicalLongDescription: 'Minimum Kerbweight',
              unit: 'kg',
              value: '1485',
            },
          ],
          colours: [
            { id: '143084', optionDescription: 'Audi Exclusive - Custom' },
          ],
          trims: [
            {
              id: '152549',
              optionDescription:
                'Fine nappa leather - Black with Rock Grey stitching and black dashboard + front sport seats with S embossed logo',
            },
          ],
        },
        null,
        'car-leasing/audi/a5/coupe/40-tfsi-204-s-line-2-doors-s-tronic-2020',
        true,
      );

      expect(actual).toEqual([
        { link: { href: '/audi-car-leasing.html', label: 'Audi' } },
        { link: { href: '/audi-car-leasing/a5.html', label: 'A5' } },
        {
          link: {
            href: '',
            label: '40 TFSI 204 S Line 2 Doors S Tronic',
          },
        },
      ]);
    });

    it('getProductPageBreadCrumb should return breadcrumb', () => {
      const actual = getProductPageBreadCrumb(
        {
          name: '109CDI Pure Van',
          manufacturer: { name: 'Mercedes-Benz', slug: 'mercedes-Benz' },
          range: { name: 'Citan', slug: 'citan' },
          fuelType: { name: 'Petrol' },
          transmission: {
            name: 'Diesel',
          },
          bodyStyle: {
            name: null,
          },
          bodyType: {
            name: 'Van',
            slug: 'van',
          },
          model: {
            name: 'Citan L3',
            slug: 'citan-L3',
          },
          technicals: [
            {
              categoryDescription: 'Tyres',
              derivativeId: '45588',
              effectiveFrom: '2019-07-01T00:00:00.000Z',
              effectiveTo: null,
              id: '69',
              technicalDescription: 'Wheel Style',
              technicalLongDescription: 'Wheel Style',
              unit: null,
              value: 'N',
            },
          ],
          colours: [
            { id: '11309', optionDescription: 'Metallic - Bornite red' },
          ],
          trims: [
            {
              id: '9787',
              optionDescription: 'Lima cloth - Black',
            },
          ],
        },
        [
          {
            slug: 'van-leasing/mercedes-benz/citan/l3-109cdi-pure-van-2019',
            legacyUrl: null,
          },
          {
            slug: 'van-leasing',
            legacyUrl: 'van-leasing.html',
          },
          {
            slug: 'van-leasing/mercedes-benz/citan',
            legacyUrl: 'mercedes-benz-van-leasing/citan.html',
          },
          {
            slug: 'van-leasing/mercedes-benz',
            legacyUrl: 'mercedes-benz-van-leasing.html',
          },
        ],
        'mercedesbenz-van-leasing/citan/109cdi-van-7247.html',
        false,
      );

      expect(actual).toEqual([
        {
          link: {
            href: '/mercedes-benz-van-leasing.html',
            label: 'Mercedes-Benz',
          },
        },
        {
          link: {
            href: '/mercedes-benz-van-leasing/citan.html',
            label: 'Citan',
          },
        },
        { link: { href: '', label: '109CDI Pure Van' } },
      ]);
    });
  });

  describe('formatToSlugFormat', () => {
    it('formatToSlugFormat should return valid slug value', () => {
      const actual = formatToSlugFormat('test ID.3.');
      expect(actual).toEqual('test-id-3');
    });
  });

  describe('generateRangeSlugs', () => {
    it('generateRangeSlugs should return valid slug collection', () => {
      const mockRangeList = {
        rangeList: [
          { rangeName: '7 series', rangeId: null, count: null, minPrice: null },
          { rangeName: '2 series', rangeId: null, count: null, minPrice: null },
          { rangeName: '3 series', rangeId: null, count: null, minPrice: null },
        ],
      };
      const actual = generateRangeSlugs(mockRangeList, 'bmw');
      expect(actual).toEqual([
        'car-leasing/bmw/7-series',
        'car-leasing/bmw/2-series',
        'car-leasing/bmw/3-series',
      ]);
    });
  });

  describe('getCanonicalUrl', () => {
    const origin = 'http://localhost';

    it('getCanonicalUrl should return correct canonical url', () => {
      const canonicalUrl = `${origin}/test-canonical-path`;

      expect(getCanonicalUrl(canonicalUrl)).toEqual(canonicalUrl);
    });
  });
  describe('shouldManufacturersStateUpdate', () => {
    it('shouldManufacturersStateUpdate should return correct result', () => {
      expect(
        shouldManufacturersStateUpdate(
          manufacturersSlugInitialState,
          manufacturersSlugInitialState,
        ),
      ).toEqual(false);
      expect(
        shouldManufacturersStateUpdate(
          {
            vehicles: {
              car: {
                manufacturers: ['BMW'],
              },
              lcv: {
                manufacturers: [],
              },
            },
          },
          manufacturersSlugInitialState,
        ),
      ).toEqual(true);
    });
  });

  describe('getMetadataForPagination', () => {
    const origin = 'http://localhost';
    const canonicalUrl = `${origin}/test-canonical-path`;
    const metaData = {
      title: 'page title',
      name: 'page name',
      metaDescription: 'page description',
      metaRobots: null,
      legacyUrl: null,
      pageType: null,
      slug: null,
      schema: null,
      publishedOn: null,
      breadcrumbs: null,
    };

    it('getMetadataForPagination should return metadata with correct canonical url', () => {
      const pageNumber = 2;
      const metaDataWithCanonicalUrl = {
        canonicalUrl,
        ...metaData,
      };

      expect(
        getMetadataForPagination(metaDataWithCanonicalUrl, pageNumber),
      ).toEqual({
        canonicalUrl: `${canonicalUrl}/page/${pageNumber}`,
        ...metaData,
      });
    });

    it('getMetadataForPagination should return metadata with correct legacy canonical url', () => {
      const pageNumber = 2;
      const metaDataWithCanonicalUrl = {
        canonicalUrl: `${canonicalUrl}.html`,
        ...metaData,
      };

      expect(
        getMetadataForPagination(metaDataWithCanonicalUrl, pageNumber),
      ).toEqual({
        canonicalUrl: `${canonicalUrl}/page/${pageNumber}.html`,
        ...metaData,
      });
    });

    it('getMetadataForPagination should return metadata with original canonical url if page number < 2', () => {
      const pageNumber = 1;
      const metaDataWithCanonicalUrl = {
        canonicalUrl,
        ...metaData,
      };

      expect(
        getMetadataForPagination(metaDataWithCanonicalUrl, pageNumber),
      ).toEqual(metaDataWithCanonicalUrl);
    });
  });

  describe('isManufacturerMigrated', () => {
    const manufacturersList = [
      'Abarth',
      'Alfa Romeo',
      'Cupra',
      'Dacia',
      'Land Rover',
    ];
    it('isManufacturerMigrated should return true', () => {
      expect(isManufacturerMigrated(manufacturersList, 'Dacia')).toEqual(true);
      expect(isManufacturerMigrated(manufacturersList, 'Alfa Romeo')).toEqual(
        true,
      );
    });
    it('isManufacturerMigrated should return false', () => {
      expect(isManufacturerMigrated(manufacturersList, 'BMW')).toEqual(false);
    });
  });
});
