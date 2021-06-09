import { NextRouter } from 'next/router';
import { formatProductPageUrl } from '../../utils/url';
import {
  SortDirection,
  SortField,
  VehicleTypeEnum,
} from '../../../generated/globalTypes';
import {
  HelpMeChooseVariables,
  HelpMeChoose_helpMeChoose_vehicles as Vehicles,
} from '../../../generated/HelpMeChoose';
import { IVehicleCarousel } from '../../utils/comparatorHelpers';

const MOR_MILES_VALUE = 30;

const getBucketLabel = (type: string, label: string) => {
  switch (type) {
    case 'terms':
      return `${parseInt(label, 10) / 12} Years`;
    case 'mileages':
      // eslint-disable-next-line no-case-declarations
      const mileage = parseInt(label, 10) / 1000;
      return `${mileage === 6 ? '<' : ''}${mileage}K${
        mileage === MOR_MILES_VALUE ? '+' : ''
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
  isEdit?: string | null,
) => {
  let pathname = pathName || router.route.replace('[[...param]]', '');
  const queryString = new URLSearchParams();
  const queries = {} as any;
  if (isEdit) {
    queries.isEdit = isEdit;
  }
  Object.entries(newStep).forEach(filter => {
    const [key, step] = filter;
    if (pathName) {
      if (
        (step?.value?.length && step.value[0].length) ||
        (key === 'initialPeriods' && step.value)
      ) {
        queries[key] = step.value;
      }
      if (key === 'rental') {
        queries.pricePerMonth =
          (step.value as any) === 0 ? '0|' : `0|${step.value}`;
      }
    } else if (
      step?.value?.length ||
      ((key === 'rental' || key === 'initialPeriods') && step.value)
    ) {
      queries[key] = step.value;
    }
  });
  Object.entries(queries).forEach(([key, value]) => {
    return queryString.set(key, value as string);
  });
  if (Object.keys(queries).length) {
    pathname += `?${decodeURIComponent(queryString.toString())}`;
  }
  // changing url dynamically
  router.push(
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
  showResults?: {
    size: number;
  },
): HelpMeChooseVariables => {
  const object = {} as any;
  if (editStep) {
    query.forEach((value: string, key: string) => {
      if (
        (key === 'bodyStyles' &&
          steps.bodyStyles?.value?.length &&
          steps.bodyStyles?.value[0].length &&
          !steps.bodyStyles.active &&
          !editStep) ||
        (key === 'bodyStyles' &&
          steps.bodyStyles?.value?.length &&
          steps.bodyStyles?.value[0].length &&
          editStep &&
          editStep > 2)
      ) {
        object.bodyStyles = steps.bodyStyles.value;
      }
      if (
        (key === 'fuelTypes' &&
          steps.fuelTypes?.value?.length &&
          steps.fuelTypes?.value[0].length &&
          !steps.fuelTypes.active &&
          !editStep) ||
        (key === 'fuelTypes' &&
          steps.fuelTypes?.value?.length &&
          steps.fuelTypes?.value[0].length &&
          editStep &&
          editStep > 3)
      ) {
        object.fuelTypes = steps.fuelTypes.value;
      }
      if (
        (key === 'transmissions' &&
          steps.transmissions?.value?.length &&
          steps.transmissions?.value[0].length &&
          !steps.transmissions.active &&
          !editStep) ||
        (key === 'transmissions' &&
          steps.transmissions?.value?.length &&
          steps.transmissions?.value[0].length &&
          editStep &&
          editStep > 4)
      ) {
        object.transmissions = steps.transmissions.value;
      }
      if (
        (key === 'terms' &&
          steps.terms?.value?.length &&
          steps.terms?.value[0].length &&
          !steps.terms.active &&
          !editStep) ||
        (key === 'terms' &&
          steps.terms?.value?.length &&
          steps.terms?.value[0].length &&
          editStep &&
          editStep > 5)
      ) {
        object.terms = [parseInt(steps.terms.value[0], 10)];
      }
      if (
        (key === 'mileages' &&
          steps.mileages?.value?.length &&
          steps.mileages?.value[0].length &&
          !steps.mileages.active &&
          !editStep) ||
        (key === 'mileages' &&
          steps.mileages?.value?.length &&
          steps.mileages?.value[0].length &&
          editStep &&
          editStep > 6)
      ) {
        object.mileages = [parseInt(steps.mileages.value[0] || '', 10)];
      }
      if (
        (key === 'availability' &&
          steps.availability?.value?.length &&
          steps.availability?.value[0].length &&
          !steps.availability.active &&
          !editStep) ||
        (key === 'availability' &&
          steps.availability?.value?.length &&
          steps.availability?.value[0].length &&
          editStep &&
          editStep > 7)
      ) {
        object.availability = parseInt(steps.availability.value[0] || '', 10);
      }
      if (
        (key === 'rental' &&
          value?.length &&
          !editStep &&
          steps.rental.active) ||
        steps.rental.active
      ) {
        object.rental =
          parseFloat(steps.rental.value as any) === 0
            ? {
                min: 0,
              }
            : {
                max: parseFloat(steps.rental.value as any),
              };
      }
      if (
        (key === 'initialPeriods' &&
          value?.length &&
          !editStep &&
          steps.initialPeriods.active) ||
        steps.initialPeriods.active
      ) {
        object.initialPeriods = [
          parseInt(steps.initialPeriods.value as any, 10),
        ];
      }
    });
  } else {
    Object.entries(steps).forEach(([key, val]) => {
      if (
        key === 'bodyStyles' &&
        val.value?.length &&
        val.value[0].length &&
        !val.active
      ) {
        object.bodyStyles = val.value;
      }
      if (
        key === 'fuelTypes' &&
        val.value?.length &&
        val.value[0].length &&
        !val.active
      ) {
        object.fuelTypes = val.value;
      }
      if (
        key === 'transmissions' &&
        val?.value?.length &&
        val.value[0].length &&
        !val.active
      ) {
        object.transmissions = val.value;
      }
      if (
        key === 'terms' &&
        val?.value?.length &&
        val.value[0].length &&
        !val.active
      ) {
        object.terms = [parseInt(val.value[0], 10)];
      }
      if (
        key === 'mileages' &&
        val?.value?.length &&
        val.value[0].length &&
        !val.active
      ) {
        object.mileages = [parseInt(val.value[0] || '', 10)];
      }
      if (
        key === 'availability' &&
        val?.value?.length &&
        val.value[0].length &&
        !val.active
      ) {
        object.availability = parseInt(val.value[0] || '', 10);
      }
      if (
        (key === 'rental' && val.value?.length && val.active) ||
        (key === 'rental' && val.active)
      ) {
        object.rental =
          parseFloat(val.value as any) === 0
            ? {
                min: 0,
              }
            : {
                max: parseFloat(val.value as any),
              };
      }
      if (
        (key === 'initialPeriods' && val.value?.length && val.active) ||
        (key === 'initialPeriods' && val.active)
      ) {
        object.initialPeriods = [parseInt(val.value as any, 10)];
      }
    });
  }
  object.financeTypes = steps.financeTypes.value;
  object.vehicleTypes = [VehicleTypeEnum.CAR];
  const variables = {
    filter: object,
    pagination: {
      size: 12,
      from: showResults?.size || 0,
    },
    sort: [
      {
        field: SortField.offerRanking,
        direction: SortDirection.ASC,
      },
      {
        field: SortField.availability,
        direction: SortDirection.ASC,
      },
      {
        field: SortField.rental,
        direction: SortDirection.ASC,
      },
    ],
  };
  return variables;
};

export const formatForCompare = (
  node: Vehicles | null,
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
    businessRate: financeTypes[0] === 'BCH' ? node!.rental || null : null,
    personalRate: financeTypes[0] === 'PCH' ? node!.rental || null : null,
    vehicleType: VehicleTypeEnum.CAR,
  };
};

export interface IStep {
  active: boolean;
  value: string[] | string;
  title: string;
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
    title: 'About You',
  },
  bodyStyles: {
    active: false,
    value: [],
    title: 'Style',
  },
  fuelTypes: {
    active: false,
    value: [],
    title: 'Fuel Types',
  },
  transmissions: {
    active: false,
    value: [],
    title: 'Gearbox',
  },
  terms: {
    active: false,
    value: [],
    title: 'Lease Length',
  },
  mileages: {
    active: false,
    value: [],
    title: 'Mileage',
  },
  availability: {
    active: false,
    value: [],
    title: 'Availability',
  },
  rental: {
    active: false,
    value: '' as any,
    title: 'Results',
  },
  initialPeriods: {
    active: false,
    value: '' as any,
    title: 'Results',
  },
};

export const RENTAL_VALUE = {
  '150': 150,
  '250': 250,
  '350': 350,
  '450': 450,
  '550': 550,
  '0': 0,
};

export const RENTAL_DATA = [
  {
    value: RENTAL_VALUE['150'],
    label: '£150',
  },
  {
    value: RENTAL_VALUE['250'],
    label: '£250',
  },
  {
    value: RENTAL_VALUE['350'],
    label: '£350',
  },
  {
    value: RENTAL_VALUE['450'],
    label: '£450',
  },
  {
    value: RENTAL_VALUE['550'],
    label: '£550+',
  },
  {
    value: RENTAL_VALUE['0'],
    label: 'above £550',
  },
];
