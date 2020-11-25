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
} from '../url';

describe('Url utils', () => {
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
    it('getProductPageBreadCrumb should return string without ?', () => {
      const actual = getProductPageBreadCrumb(
        {
          manufacturer: { name: 'Audi', slug: 'audi' },
          name: '30 TFSI Technik 5 Doors [Comfort+Sound]',
          range: { name: 'A3', slug: 'a3' },
        },
        'audi-car-leasing/a3/sport-back/30-tfsi-technik-5dr-comfort-sound-167549.html',
        true,
      );

      expect(actual).toEqual([
        { link: { href: '/audi-car-leasing.html', label: 'Audi' } },
        { link: { href: '/audi-car-leasing/a3.html', label: 'A3' } },
        {
          link: {
            href: '/audi-car-leasing/a3/sport-back.html',
            label: 'Sport Back',
          },
        },
        {
          link: { href: '', label: '30 TFSI Technik 5 Doors [Comfort+Sound]' },
        },
      ]);
    });
    it('getProductPageBreadCrumb should return the same string', () => {
      const actual = getProductPageBreadCrumb(
        {
          manufacturer: { name: 'Mercedes-Benz', slug: 'mercedes-benz' },
          name: '109CDI Van',
          range: { name: 'Citan', slug: 'citan' },
        },
        'mercedes-benz-van-leasing/citan/109cdi-van-7247.html',
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
        { link: { href: '', label: '109CDI Van' } },
      ]);
    });
  });
});
