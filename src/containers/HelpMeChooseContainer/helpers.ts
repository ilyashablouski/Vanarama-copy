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
    availability: IStep;
    rental: IStep;
    initialPeriods: IStep;
  },
) => {
  console.log(newStep);
  let pathname = router.route.replace('[[...param]]', '');
  const queryString = new URLSearchParams();
  const queries = {} as any;
  Object.entries(newStep).forEach(filter => {
    const [key, step] = filter;
    if (
      step?.value?.length ||
      ((key === 'rental' || key === 'initialPeriods') && step.value)
    ) {
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

export const buildAnObjectFromAQuery = (query: any, steps: IInitStep) => {
  const object = {} as any;
  // object.initialPeriods = [6];
  query.forEach((value: string, key: string) => {
    if (key === 'financeTypes' && value.length && !steps.financeTypes.active) {
      object.financeTypes = value;
    }
    if (key === 'bodyStyles' && value.length && !steps.bodyStyles.active) {
      object.bodyStyles = value.split(',');
    }
    if (key === 'fuelTypes' && value.length && !steps.fuelTypes.active) {
      object.fuelTypes = value.split(',');
    }
    if (
      key === 'transmissions' &&
      value.length &&
      !steps.transmissions.active
    ) {
      object.transmissions = value.split(',');
    }
    if (key === 'terms' && value.length && !steps.terms.active) {
      object.terms = [parseInt(value, 10)];
    }
    if (key === 'mileages' && value.length && !steps.mileages.active) {
      object.mileages = [parseInt(value, 10)];
    }
    if (key === 'rental' && value.length) {
      object.rental = {
        min: parseFloat(value),
      };
    }
    if (key === 'initialPeriods' && value.length) {
      object.initialPeriods = [parseInt(value, 10)];
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
  availability: IStep;
  rental: IStep;
  initialPeriods: IStep;
}
