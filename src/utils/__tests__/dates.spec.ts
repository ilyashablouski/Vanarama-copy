import { toYearsAndMonthsDisplay, formatDate } from '../dates';

describe('Date utils', () => {
  describe('toYearsAndMonthsDisplay', () => {
    it.each([
      [36, '3 years'],
      [12, '1 year'],
      [13, '1 year and 1 month'],
      [14, '1 year and 2 months'],
      [25, '2 years and 1 month'],
      [26, '2 years and 2 months'],
      [1, '1 month'],
      [3, '3 months'],
      [0, '0 months'],
      [-1, '0 months'],
      [-99, '0 months'],
    ])('toYearsAndMonthsDisplay(%d) should return "%s"', (input, expected) => {
      const actual = toYearsAndMonthsDisplay(input);
      expect(actual).toEqual(expected);
    });
  });

  describe('formatDate', () => {
    it('should format date to a more human readable variation', () => {
      const yr = '1999';
      const mth = '08';
      const day = '04';
      expect(formatDate(yr, mth, day)).toBe('04 August 1999');
    });
  });
});
