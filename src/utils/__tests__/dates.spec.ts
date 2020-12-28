import {
  toYearsAndMonthsDisplay,
  formatDate,
  dateToFormat,
  calculateExtraneousEntries,
  calculateUnorderedEntries,
  calculateRemainingMonths,
  fullMonthFormatDate,
  defaultFormatDate,
  reverseDefaultFormatDate,
} from '../dates';

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

  describe('formatDate + dataToFormat', () => {
    it('should format date to a more human readable variation', () => {
      const yr = '1999';
      const mth = '08';
      const day = '04';
      expect(formatDate(yr, mth, day)).toBe('04 August 1999');
      expect(dateToFormat('1988-06-04')).toBe('04 June 1988');
    });
  });

  describe('calculateExtraneousEntries', () => {
    it('should return empty array', () => {
      expect(
        calculateExtraneousEntries([{ month: '01', year: '1999' }] as any, 4),
      ).toStrictEqual([]);
    });
    it('should return array with index equal 1', () => {
      expect(
        calculateExtraneousEntries(
          [
            { month: '04', year: '1999' },
            { month: '08', year: '1999' },
          ] as any,
          4,
        ),
      ).toStrictEqual([1]);
    });
  });

  describe('calculateUnorderedEntries', () => {
    it('should return empty array', () => {
      expect(
        calculateUnorderedEntries([{ month: '01', year: '1999' }]),
      ).toStrictEqual([]);
    });
    it('should return array with item [1, 0]', () => {
      expect(
        calculateUnorderedEntries([
          { month: '04', year: '1999' },
          { month: '08', year: '1999' },
        ] as any),
      ).toStrictEqual([[1, 0]]);
    });
  });

  describe('calculateRemainingMonths', () => {
    it('should return 0', () => {
      expect(
        calculateRemainingMonths([{ month: '01', year: '1999' }], 4),
      ).toStrictEqual(0);
    });
  });

  describe('fullMonthFormatDate + reverseDefaultFormatDate + defaultFormatDate', () => {
    it('should format date to a excepted variation', () => {
      expect(fullMonthFormatDate(new Date('02-25-2012'))).toBe('February 2012');
      expect(defaultFormatDate(new Date('1988-06-04'))).toBe('04.06.1988');
      expect(reverseDefaultFormatDate(new Date('1988-06-04'))).toBe(
        '1988-06-04',
      );
    });
  });
});
