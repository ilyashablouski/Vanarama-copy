import { NextRouter } from 'next/router';

export const getBuckets = (data: any[], activeData: string[]) =>
  data.map(bucket => ({
    label: bucket.key,
    value: bucket.key,
    active: activeData.includes(bucket.key),
  }));

export const onReplace = (
  router: NextRouter,
  newStep: {
    leaseType: IStep;
    bodyStyles: IStep;
    fuelTypes: IStep;
    transmissions: IStep;
  },
) => {
  let pathname = router.route.replace('[[...param]]', '');
  const queryString = new URLSearchParams();
  // don't add range and make to query for make/range pages
  const queries = {} as any;
  Object.entries(newStep).forEach(filter => {
    const [key, step] = filter;
    if (step.value?.length) {
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
    if (key === 'bodyStyles' && value.length) {
      object.bodyStyles = value.split(',');
    }
    if (key === 'fuelTypes' && value.length) {
      object.fuelTypes = value.split(',');
    }
    if (key === 'transmissions' && value.length) {
      object.transmissions = value.split(',');
    }
  });
  return object;
};

export interface IStep {
  active: boolean;
  value: string[];
}

export interface IInitStep {
  leaseType: IStep;
  bodyStyles: IStep;
  fuelTypes: IStep;
  transmissions: IStep;
}
