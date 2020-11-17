import { VehicleTypeEnum } from '../../../generated/globalTypes';
import {
  getUrlParam,
  setSource,
  formatProductPageUrl,
  formatNewUrl,
  formatUrl,
  formatLegacyUrl,
  getLegacyUrl,
  getNewUrl,
  getVehicleConfigurationPath,
  isNotShowBreadcrumbs,
  removeUrlQueryPart,
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

  describe('formatUrl + formatLegacyUrl + getLegacyUrl', () => {
    it('getLegacyUrl should return legacyUrl from data', () => {
      const actual = getLegacyUrl(
        [
          {
            node: { derivativeId: 'derivativeId', legacyUrl: 'legacyUrl' },
          } as any,
        ],
        'derivativeId',
      );

      expect(actual).toEqual('legacyUrl');
    });
    it('getLegacyUrl should return dynamic van-leasing legacyUrl and call formatLegacyUrl and formatUrl ', () => {
      const actualGetLegacyUrl = getLegacyUrl(
        [
          {
            node: {
              derivativeId: 'derivativeId',
              legacyUrl: '',
              vehicleType: VehicleTypeEnum.LCV,
              url: '/BMW/2 Series/Coupe/218i m sport 2dr nav step auto 151254',
            },
          } as any,
        ],
        'derivativeId',
      );
      const actualFormatLegacyUrl = formatLegacyUrl({
        node: {
          derivativeId: 'derivativeId',
          legacyUrl: '',
          vehicleType: VehicleTypeEnum.LCV,
          url: '/BMW/2 Series/Coupe/218i m sport 2dr nav step auto 151254',
        },
      } as any);
      const actualFormatUrl = formatUrl(
        '/BMW-van-leasing/2 Series/Coupe/218i m sport 2dr nav step auto 151254.html',
      );

      expect(actualGetLegacyUrl).toEqual(
        '/bmw-van-leasing/2-series/coupe/218i-m-sport-2dr-nav-step-auto-151254.html',
      );
      expect(actualFormatLegacyUrl).toEqual(
        '/bmw-van-leasing/2-series/coupe/218i-m-sport-2dr-nav-step-auto-151254.html',
      );
      expect(actualFormatUrl).toEqual(
        '/bmw-van-leasing/2-series/coupe/218i-m-sport-2dr-nav-step-auto-151254.html',
      );
    });
    it('getLegacyUrl should return dynamic car-leasing legacyUrl and call formatLegacyUrl and formatUrl ', () => {
      const actualGetLegacyUrl = getLegacyUrl(
        [
          {
            node: {
              derivativeId: 'derivativeId',
              legacyUrl: '',
              vehicleType: VehicleTypeEnum.CAR,
              url: '/BMW/2 Series/Coupe/218i m sport 2dr nav step auto 151254',
            },
          } as any,
        ],
        'derivativeId',
      );
      const actualFormatLegacyUrl = formatLegacyUrl({
        node: {
          derivativeId: 'derivativeId',
          legacyUrl: '',
          vehicleType: VehicleTypeEnum.CAR,
          url: '/BMW/2 Series/Coupe/218i m sport 2dr nav step auto 151254',
        },
      } as any);
      const actualFormatUrl = formatUrl(
        '/BMW-car-leasing/2 Series/Coupe/218i m sport 2dr nav step auto 151254.html',
      );

      expect(actualGetLegacyUrl).toEqual(
        '/bmw-car-leasing/2-series/coupe/218i-m-sport-2dr-nav-step-auto-151254.html',
      );
      expect(actualFormatLegacyUrl).toEqual(
        '/bmw-car-leasing/2-series/coupe/218i-m-sport-2dr-nav-step-auto-151254.html',
      );
      expect(actualFormatUrl).toEqual(
        '/bmw-car-leasing/2-series/coupe/218i-m-sport-2dr-nav-step-auto-151254.html',
      );
    });
  });

  describe('getVehicleConfigurationPath', () => {
    it('getVehicleConfigurationPath should return newPath', () => {
      const actual = getVehicleConfigurationPath(
        '/bmw-van-leasing/2-series/coupe',
      );

      expect(actual).toEqual('/bmw-van-leasing/2-series/coupe');
    });
    it('getVehicleConfigurationPath should return newPath', () => {
      const actual = getVehicleConfigurationPath(
        '/bmw-van-leasing/2-series/coupe/',
      );

      expect(actual).toEqual('/bmw-van-leasing/2-series/coupe/');
    });
  });

  describe('isNotShowBreadcrumbs', () => {
    it('isNotShowBreadcrumbs should return false', () => {
      const actual = isNotShowBreadcrumbs('/bmw-van-leasing/2-series/coupe');

      expect(actual).toEqual(false);
    });
    it('isNotShowBreadcrumbs should return true', () => {
      const actual = isNotShowBreadcrumbs('/');

      expect(actual).toEqual(true);
    });
    it('isNotShowBreadcrumbs should return true', () => {
      const actual = isNotShowBreadcrumbs('/insurance/2-series');

      expect(actual).toEqual(true);
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
});
