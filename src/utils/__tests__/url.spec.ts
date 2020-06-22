import { getUrlParam } from '../url';

describe('Url utils', () => {
  describe('getUrlParam', () => {
    it('getUrlParam should return string with params for url ex.(?key=value&key=value)', () => {
      const actual = getUrlParam({ key: 'value', key2: 'value2' });

      expect(actual).toEqual('?key=value&key2=value2');
    });
    it('getUrlParam should return string with params for url ex.(&key=value&key=value)', () => {
      const actual = getUrlParam({ key: 'value', key2: 'value2' }, true);

      expect(actual).toEqual('&key=value&key2=value2');
    });
  });
});
