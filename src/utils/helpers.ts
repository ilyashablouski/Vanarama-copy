import moment from 'moment';

export const genMonths = moment.months;

export const genYears = (back: number) => {
  const year = new Date().getFullYear();
  return Array.from({ length: back }, (_, i) => year - back + i + 1);
};
