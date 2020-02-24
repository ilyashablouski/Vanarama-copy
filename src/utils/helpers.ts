import moment from 'moment';

export const genMonths = () => moment.months();

export const genYears = (back) => {
  const year = new Date().getFullYear();
  return Array.from({ length: back }, (v, i) => year - back + i + 1);
};
