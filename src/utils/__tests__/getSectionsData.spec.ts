import { getSectionsData } from '../getSectionsData';

describe('Date utils', () => {
  describe('toYearsAndMonthsDisplay', () => {
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
});
