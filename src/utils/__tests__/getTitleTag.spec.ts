import getTitleTag from '../getTitleTag';

describe('getTitleTag', () => {
  describe('getTitleTag', () => {
    it('getTitleTag should return div', () => {
      const actual = getTitleTag('div');

      expect(actual).toEqual('div');
    });
    it('getTitleTag should return undefined', () => {
      const actual = getTitleTag('');

      expect(actual).toEqual(undefined);
    });
  });
});
