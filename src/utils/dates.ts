export interface THistoryEntry {
  year: string;
  month: string;
}

// return format like DD MMMM YYYY
export const formatDate = (year: string, month: string, day: string) => {
  const d = new Date(+year, +month - 1, +day);
  const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(d);
  const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
  const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
  return `${da} ${mo} ${ye}`;
};

// return format like MMMM YYYY
export const fullMonthFormatDate = (date: Date) => {
  const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);
  const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
  return `${mo} ${ye}`;
};

// return format like YYYY-MM-DD
export const reverseDefaultFormatDate = (date: Date, separator = '-') => {
  const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
  const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
  const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
  return `${ye}${separator}${mo}${separator}${da}`;
};

// return format like DD.MM.YYYY
export const defaultFormatDate = (date: Date, separator = '.') => {
  const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
  const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
  const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
  return `${da}${separator}${mo}${separator}${ye}`;
};

export const dateToFormat = (date: string) => {
  const arr = date.split('-');
  return formatDate(arr[0], arr[1], arr[2]);
};

export const parseDate = (day: string, month: string, year: string) =>
  `${year}-${month}-${day}`;

export const historyToDateObject = <T extends THistoryEntry>(history: T) =>
  // NOTE: Default to the first of the month because we don't capture the day
  new Date(parseInt(history.year, 10), parseInt(history.month, 10) - 1, 1);

export const historyToDate = <T extends THistoryEntry>(history: T) =>
  historyToDateObject(history);

export const pluralise = (
  count: number,
  config: { one: string; many: string },
) => {
  return count === 1 ? config.one : config.many;
};

export const toYearsAndMonthsDisplay = (totalMonths: number) => {
  const absMonths = Math.max(0, totalMonths);
  const years = Math.floor(absMonths / 12);
  const months = absMonths % 12;
  if (years && months) {
    return [
      years,
      pluralise(years, { one: 'year', many: 'years' }),
      'and',
      months,
      pluralise(months, { one: 'month', many: 'months' }),
    ].join(' ');
  }

  if (years) {
    return [years, pluralise(years, { one: 'year', many: 'years' })].join(' ');
  }

  return [months, pluralise(months, { one: 'month', many: 'months' })].join(
    ' ',
  );
};

export const getMonthName = (n: number) =>
  [
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
  ][n - 1];

export const getMonday = (timestamp: number) => {
  const date = new Date(timestamp);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  return new Date(date.setDate(diff));
};

export function calculateExtraneousEntries(
  entries: THistoryEntry[],
  required: number,
) {
  const thresholdMonth = new Date().setMonth(new Date().getMonth() - required);
  const threshold = getMonday(thresholdMonth);

  // Find the first entry that satisfies the minimum number of months
  const lastValidIndex = entries
    .filter(x => x.month && x.year)
    .map(historyToDateObject)
    .findIndex(x => x.getTime() < threshold.getTime());

  // Make sure there is at least one valid date
  if (lastValidIndex === -1) {
    return [];
  }
  return entries
    .map((_, index) => index)
    .filter(index => index > lastValidIndex);
}

export function calculateUnorderedEntries(entries: THistoryEntry[]) {
  const dates = entries.filter(x => x.month && x.year).map(historyToDate);

  // Don't actually sort the array, just maintain a list of indices we need to swap
  return dates.reduce((previousValue: Array<Array<number>>, _, index) => {
    if (dates[index - 1]) {
      const diff = dates[index - 1].getTime() - dates[index].getTime();
      if (diff < 0) {
        return [...previousValue, [index, index - 1]];
      }
    }
    return previousValue;
  }, []);
}

export const diffInMonth = (d1: Date, d2: Date) => {
  let months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
};

export const diffInYear = (year: number, month: number, day: number) =>
  new Date(
    new Date().getTime() - new Date(year, month - 1, day).getTime(),
  ).getUTCFullYear() - 1970;

export function calculateRemainingMonths(
  entries: THistoryEntry[],
  required: number,
) {
  const completed = entries
    .filter(x => x.month && x.year)
    .map(historyToDateObject);

  if (completed.length === 0) {
    // None are completed so we still need the required months
    return required;
  }

  const earliest = completed.reduce((a, b) =>
    a.getTime() < b.getTime() ? a : b,
  );
  const diff = diffInMonth(earliest, new Date());
  return Math.max(required - diff, 0);
}

// validate for existing date, for example 31 Feb
export const validateDateString = (
  day: string,
  month: string,
  year: string,
) => {
  const dayNumber = Number(day);
  const monthNumber = Number(month) - 1; // bloody 0-indexed month
  const yearNumber = Number(year);

  const d = new Date(yearNumber, monthNumber, dayNumber);

  const yearMatches = d.getFullYear() === yearNumber;
  const monthMatches = d.getMonth() === monthNumber;
  const dayMatches = d.getDate() === dayNumber;

  return yearMatches && monthMatches && dayMatches;
};
