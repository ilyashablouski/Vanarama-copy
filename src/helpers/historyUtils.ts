import moment from 'moment';

import { TEmploymentHistory } from '../core/organisms/employment-history/interfaces';

// Actual month and year.
const getNow = () => {
  return moment([
    moment().year(),
    moment()
      .add(1, 'months') // Add an extra month as moment.js is considering only 11 month from today month to next year month.
      .month(),
  ]);
};

// Set values for month dropdown.
export const buildMonths = () => {
  let data = [];
  data = moment
    .months()
    .map((month, key) => ({ value: key + 1, label: month }));
  return { data };
};

// Set values for year dropdown.
export const buildYears = (lookBackYears: number, year = moment().year()) => {
  let i: number;
  const years = [];
  for (i = year; i > year - lookBackYears; i -= 1) {
    years.push(i);
  }

  return {
    data: years.map(value => ({ value, label: String(value) })),
  };
};

// Get last date in history.
export const getLastDate = (history: TEmploymentHistory[]) => {
  if (history.length === 0) return null;

  // Last entry in history.
  const lastEntry = history[history.length - 1];

  return lastEntry.year && lastEntry.month
    ? moment([lastEntry.year, lastEntry.month])
    : null;
};

// Check if a date is in the future
export const isDateInTheFuture = (entry: TEmploymentHistory | null) => {
  if (!entry || !entry.year || !entry.month) return false;

  const now = getNow();
  const date = moment([entry.year, entry.month]);
  const offset = now.diff(date, 'months');

  return offset < 0;
};

// Check if single history entry is complete.
export const isElementComplete = (entry: TEmploymentHistory) => {
  const keys = Object.keys(entry);

  for (let index = 0; index < keys.length; index += 1) {
    const property = keys[index];
    if ((entry as any)[property] === null) {
      return false;
    }
  }

  return true;
};

// Check if all elements are valid.
export const areAllElementsValid = (history: TEmploymentHistory[]) => {
  // Exit if no history at all.
  if (history.length === 0) return false;

  // Loop all elements and check if they're valid.
  for (let i = 0; i < history.length; i += 1) {
    if (!isElementComplete(history[i]) || isDateInTheFuture(history[i])) {
      return false;
    }
  }
  return true;
};

// Check if history match the minimun year length.
export const isHistoryComplete = (
  history: TEmploymentHistory[],
  minYearsOfHistory: number,
) => {
  // Exit if no  history at all.
  if (!history || history.length === 0) return false;

  // Check if all elements are complete.
  for (let key = 0; key < history.length; key += 1) {
    if (!isElementComplete(history[key])) return false;
  }

  const now = getNow();

  // Last entry in  history.
  const lastDate = getLastDate(history);
  if (!lastDate) return false;

  return now.diff(lastDate, 'years', true) >= minYearsOfHistory;
};

type IHistory = {
  year: number | null;
  month: number | null;
};

// Sort address history descending by year and month.
export const sortHistoryDesc = <T extends IHistory>(history: T[]) =>
  history.sort((a, b) => {
    // Return only when all values are selected.
    if (b.year && a.year && b.month && a.month)
      return b.year - a.year || b.month - a.month;

    return 0;
  });
