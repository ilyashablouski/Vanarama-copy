import moment from 'moment';

export interface THistoryEntry {
  year: string;
  month: string;
}

export const historyToMoment = <T extends THistoryEntry>(history: T) =>
  // NOTE: Default to the first of the month because we don't capture the day
  moment(`1-${history.month}-${history.year}`, 'D-M-YYYY');

export const historyToDate = <T extends THistoryEntry>(history: T) =>
  historyToMoment(history).toDate();

const pluralise = (count: number, config: { one: string; many: string }) => {
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
