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

export const buildAnObjectFromAQuery = (query: any, steps: IInitStep) => {
  const object = {} as any;
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
        max: parseFloat(value),
      };
    }
    if (key === 'initialPeriods' && value.length) {
      object.initialPeriods = [parseInt(value, 10)];
    }
  });
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
    value: 'PCH' as any,
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
    value: '' as any,
  },
  mileages: {
    active: false,
    value: '' as any,
  },
  availability: {
    active: false,
    value: '' as any,
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
