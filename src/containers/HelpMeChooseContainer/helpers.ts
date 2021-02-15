import { NextRouter } from 'next/router';
import { formatProductPageUrl } from '../../utils/url';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { ProductVehicleList_productVehicleList_edges_node as EdgesNode } from '../../../generated/ProductVehicleList';
import { IVehicleCarousel } from '../../utils/comparatorHelpers';

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
    active: activeData?.includes(bucket.key),
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
  pathName?: string,
  isEdit?: string,
) => {
  let pathname = pathName || router.route.replace('[[...param]]', '');
  const queryString = new URLSearchParams();
  const queries = {} as any;
  if (isEdit) {
    queries.isEdit = isEdit;
  }
  Object.entries(newStep).forEach(filter => {
    const [key, step] = filter;
    if (
      step?.value?.length ||
      ((key === 'rental' || key === 'initialPeriods') && step.value)
    ) {
      queries[key] = step.value;
    }
    if (pathName && key === 'rental') {
      queries.pricePerMonth = `0|${step.value}`;
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
      pathname: pathName || router.route,
      query: queries,
    },
    pathname,
    { shallow: true },
  );
};

export const buildAnObjectFromAQuery = (
  query: any,
  steps: IInitStep,
  editStep?: number,
  showResults?: number,
) => {
  const object = {} as any;
  query.forEach((value: string, key: string) => {
    if (
      (key === 'financeTypes' &&
        value.length &&
        !steps.financeTypes.active &&
        !editStep) ||
      (key === 'financeTypes' && value.length && editStep && editStep > 1)
    ) {
      object.financeTypes = [value];
    }
    if (
      (key === 'bodyStyles' &&
        value.length &&
        !steps.bodyStyles.active &&
        !editStep) ||
      (key === 'bodyStyles' && value.length && editStep && editStep > 2)
    ) {
      object.bodyStyles = value.split(',');
    }
    if (
      (key === 'fuelTypes' &&
        value.length &&
        !steps.fuelTypes.active &&
        !editStep) ||
      (key === 'fuelTypes' && value.length && editStep && editStep > 3)
    ) {
      object.fuelTypes = value.split(',');
    }
    if (
      (key === 'transmissions' &&
        value.length &&
        !steps.transmissions.active &&
        !editStep) ||
      (key === 'transmissions' && value.length && editStep && editStep > 4)
    ) {
      object.transmissions = value.split(',');
    }
    if (
      (key === 'terms' && value.length && !steps.terms.active && !editStep) ||
      (key === 'terms' && value.length && editStep && editStep > 5)
    ) {
      object.terms = [parseInt(value, 10)];
    }
    if (
      (key === 'mileages' &&
        value.length &&
        !steps.mileages.active &&
        !editStep) ||
      (key === 'mileages' && value.length && editStep && editStep > 6)
    ) {
      object.mileages = [parseInt(value, 10)];
    }
    if (
      (key === 'availability' &&
        value.length &&
        !steps.availability.active &&
        !editStep) ||
      (key === 'availability' && value.length && editStep && editStep > 7)
    ) {
      object.availability = parseInt(value, 10);
    }
    if (
      (key === 'rental' && value.length && !editStep) ||
      steps.rental.active
    ) {
      object.rental = {
        max: parseFloat(steps.rental.value as any),
      };
    }
    if (
      (key === 'initialPeriods' && value.length && !editStep) ||
      steps.initialPeriods.active
    ) {
      object.initialPeriods = [parseInt(steps.initialPeriods.value as any, 10)];
    }
  });
  object.from = 0;
  object.size = showResults || 12;
  object.vehicleTypes = [VehicleTypeEnum.CAR];
  return object;
};

export const formatForCompare = (
  node: EdgesNode | null,
  financeTypes: string,
  mainImageUrl: string,
): IVehicleCarousel | null => {
  if (!node) {
    return null;
  }
  return {
    pageUrl: formatProductPageUrl(
      // el.legacyUrl || el.url || '',
      '',
      node?.derivativeId,
    ),
    bodyStyle: node?.capBodyStyle,
    capId: node?.derivativeId || '',
    manufacturerName: node?.manufacturerName || '',
    rangeName: node?.rangeName || '',
    modelName: node?.modelName || '',
    derivativeName: node?.derivativeName || '',
    averageRating: null,
    isOnOffer: null,
    offerPosition: null,
    leadTime: null,
    imageUrl: mainImageUrl || null,
    keyInformation: null,
    businessRate: financeTypes === 'BCH' ? node?.rental || null : null,
    personalRate: financeTypes === 'PCH' ? node?.rental || null : null,
    vehicleType: VehicleTypeEnum.CAR,
  };
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

export const initialSteps: IInitStep = {
  financeTypes: {
    active: true,
    value: ['PCH'],
  },
  bodyStyles: {
    active: false,
    value: [],
  },
  fuelTypes: {
    active: false,
    value: [],
  },
  transmissions: {
    active: false,
    value: [],
  },
  terms: {
    active: false,
    value: [],
  },
  mileages: {
    active: false,
    value: [],
  },
  availability: {
    active: false,
    value: [],
  },
  rental: {
    active: false,
    value: '' as any,
  },
  initialPeriods: {
    active: false,
    value: '' as any,
  },
};
