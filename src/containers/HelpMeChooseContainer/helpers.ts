import { NextRouter } from 'next/router';

const getBucketLabel = (type: string, label: string) => {
  switch (type) {
    case 'terms':
      return `${parseInt(label, 10) / 12} Years`;
    case 'mileages':
      // eslint-disable-next-line no-case-declarations
      const mileage = parseInt(label, 10) / 1000;
      return `${mileage === 6 ? '<' : ''}${mileage}K${
        mileage === 20 ? '+' : ''
      }`;
    default:
      return label;
  }
};

export const getBuckets = (data: any[], activeData: string[], type?: string) =>
  data.map(bucket => ({
    label: getBucketLabel(type || '', bucket.key),
    value: bucket.key,
    active: activeData.includes(bucket.key),
  }));

export const onReplace = (
  router: NextRouter,
  newStep: {
    financeTypes: IStep;
    bodyStyles: IStep;
    fuelTypes: IStep;
    transmissions: IStep;
    terms: IStep;
    mileages: IStep;
    rental: IStep;
    preferToPay: IStep;
  },
) => {
  let pathname = router.route.replace('[[...param]]', '');
  const queryString = new URLSearchParams();
  const queries = {} as any;
  Object.entries(newStep).forEach(filter => {
    const [key, step] = filter;
    if (step.value.length) {
      queries[key] = step.value;
    }
  });
  Object.entries(queries).forEach(([key, value]) =>
    queryString.set(key, value as string),
  );
  if (Object.keys(queries).length)
    pathname += `?${decodeURIComponent(queryString.toString())}`;
  // changing url dynamically
  router.replace(
    {
      pathname: router.route,
      query: queries,
    },
    pathname,
    { shallow: true },
  );
};

export const buildAnObjectFromAQuery = (query: any) => {
  const object = {} as any;
  query.forEach((value: string, key: string) => {
    if (key === 'financeTypes' && value.length) {
      object.financeTypes = value;
    }
    if (key === 'bodyStyles' && value.length) {
      object.bodyStyles = value.split(',');
    }
    if (key === 'fuelTypes' && value.length) {
      object.fuelTypes = value.split(',');
    }
    if (key === 'transmissions' && value.length) {
      object.transmissions = value.split(',');
    }
    if (key === 'terms' && value.length) {
      object.terms = [parseInt(value, 10)];
    }
    if (key === 'mileages' && value.length) {
      object.mileages = [parseInt(value, 10)];
    }
    if (key === 'rental' && value.length) {
      const valueData = value.split('-');
      object.rental = {
        min: parseInt(valueData && valueData[0], 10) || null,
        max: parseInt(valueData && valueData[1], 10) || null,
      };
    }
  });
  return object;
};

export interface IStep {
  active: boolean;
  value: string[];
}

export interface IInitStep {
  financeTypes: IStep;
  bodyStyles: IStep;
  fuelTypes: IStep;
  transmissions: IStep;
  terms: IStep;
  mileages: IStep;
  rental: IStep;
  preferToPay: IStep;
}
