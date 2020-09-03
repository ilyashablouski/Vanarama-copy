import { getSectionsData, getCardsName } from '../getSectionsData';

describe('Section utils', () => {
  describe('getSectionsData', () => {
    it.each([
      [
        ['sections', 'cards', 'description'],
        {
          sections: {
            cards: { description: 'description', cards: [{ name: 'name' }] },
          },
        },
        'description',
      ],
      [
        ['sections', 'cards', 'cards'],
        {
          sections: {
            cards: { description: 'description', cards: [{ name: 'name' }] },
          },
        },
        [{ name: 'name' }],
      ],
      [['cards'], null, undefined],
    ])('getSectionsData(%d) should return "%s"', (path, data, expected) => {
      const actual = getSectionsData(path, data);
      expect(actual).toEqual(expected);
    });
  });
  describe('getCardsName', () => {
    it.each([
      [
        {
          sections: {
            cards: { description: 'description', name: 'name' },
          },
        },
        'name',
      ],
      [null, undefined],
    ])('getCardsName(%d) should return "%s"', (data, expected) => {
      const actual = getCardsName(data);
      expect(actual).toEqual(expected);
    });
  });
});
