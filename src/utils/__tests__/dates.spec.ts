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
  parseDate,
  historyToDateObject,
  THistoryEntry,
  historyToDate,
  getMonthName,
  getMonday,
  diffInMonth,
  validateDateString,
  diffInYear,
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
    it('should format date', () => {
      expect(fullMonthFormatDate(new Date(2012, 1, 25))).toBe('February 2012');
      expect(defaultFormatDate(new Date(1988, 5, 4))).toBe('04.06.1988');
      expect(reverseDefaultFormatDate(new Date(1988, 5, 4))).toBe('1988-06-04');
    });
  });

  describe('parseDate', () => {
    it('should parese date', () => {
      expect(parseDate('01', '02', '2021')).toBe('2021-02-01');
    });
  });

  describe('historyToDateObject', () => {
    it('should convert history object to date object', () => {
      const history: THistoryEntry = {
        year: '2021',
        month: '3',
      };
      const date = historyToDateObject(history);

      expect(date.getDate()).toBe(1);
      expect(date.getMonth()).toBe(2);
      expect(date.getFullYear()).toBe(2021);
    });
  });

  describe('historyToDate', () => {
    it('should convert history to date', () => {
      const history: THistoryEntry = {
        year: '2021',
        month: '3',
      };
      const date = historyToDate(history);

      expect(date.getDate()).toBe(1);
      expect(date.getMonth()).toBe(2);
      expect(date.getFullYear()).toBe(2021);
    });
  });

  describe('getMonthName', () => {
    it('should return correct month name', () => {
      const expected = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      const actual = [];
      for (let index = 1; index <= 12; index += 1) {
        actual.push(getMonthName(index));
      }
      expect(actual).toStrictEqual(expected);
    });
  });

  describe('getMonday', () => {
    it('should return monday in the same week with provided date', () => {
      expect(getMonday(new Date(2021, 5, 22).getTime())).toStrictEqual(
        new Date(2021, 5, 21),
      ); // Tuesday to Monday
      expect(getMonday(new Date(2021, 5, 27).getTime())).toStrictEqual(
        new Date(2021, 5, 21),
      ); // Sunday to Monday
    });
  });

  describe('diffInMonth', () => {
    it('should return difference between dates in month', () => {
      expect(
        diffInMonth(new Date(2021, 4, 1), new Date(2022, 6, 1)),
      ).toStrictEqual(14);
    });
    it('should return 0', () => {
      expect(
        diffInMonth(new Date(2021, 4, 1), new Date(2021, 4, 5)),
      ).toStrictEqual(0);
      expect(
        diffInMonth(new Date(2021, 4, 1), new Date(2018, 5, 5)),
      ).toStrictEqual(0);
    });
  });

  describe('validateDateString', () => {
    it('should return true', () => {
      expect(validateDateString('29', '2', '2020')).toStrictEqual(true);
      expect(validateDateString('5', '6', '2021')).toStrictEqual(true);
    });
    it('should return false', () => {
      expect(validateDateString('29', '2', '2021')).toStrictEqual(false);
      expect(validateDateString('31', '2', '2021')).toStrictEqual(false);
      expect(validateDateString('35', '7', '2021')).toStrictEqual(false);
    });
  });

  describe('diffInYear', () => {
    it('should return correct positive difference', () => {
      jest.useFakeTimers('modern').setSystemTime(new Date(2025, 6, 1));

      expect(diffInYear(2021, 8, 1)).toStrictEqual(3);
      expect(diffInYear(2021, 7, 1)).toStrictEqual(4);
      expect(diffInYear(2021, 6, 1)).toStrictEqual(4);

      jest.useRealTimers();
    });
    it('should return correct negative difference', () => {
      jest.useFakeTimers('modern').setSystemTime(new Date(2021, 6, 1));

      expect(diffInYear(2025, 8, 1)).toStrictEqual(-5);
      expect(diffInYear(2025, 7, 1)).toStrictEqual(-4);
      expect(diffInYear(2025, 6, 1)).toStrictEqual(-4);

      jest.useRealTimers();
    });
  });
});
