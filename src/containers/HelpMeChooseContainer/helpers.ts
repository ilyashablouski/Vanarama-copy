import { NextRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { formatProductPageUrl } from '../../utils/url';
import {
  FilterListObject,
  SortDirection,
  SortField,
  VehicleTypeEnum,
} from '../../../generated/globalTypes';
import {
  HelpMeChooseVariables,
  HelpMeChoose_helpMeChoose_vehicles as Vehicles,
} from '../../../generated/HelpMeChoose';
import { IVehicleCarousel } from '../../utils/comparatorHelpers';
import { ModelImages } from '../../../generated/ModelImages';
import { Nullish } from '../../types/common';
import { OnOffer } from '../../../entities/global';

const MOR_MILES_VALUE = 30;

export const HELP_ME_CHOOSE_STEPS = {
  FINANCE_TYPES: 'financeTypes',
  BODY_STYLES: 'bodyStyles',
  FUEL_TYPES: 'fuelTypes',
  TRANSMISSIONS: 'transmissions',
  TERMS: 'terms',
  MILEAGES: 'mileages',
  AVAILABILITY: 'availability',
  RENTAL: 'rental',
  INITIAL_PERIODS: 'initialPeriods',
  RESULTS: 'results',
};

export const HELP_ME_CHOSE_QUERY_PARAMS = [
  HELP_ME_CHOOSE_STEPS.FINANCE_TYPES,
  HELP_ME_CHOOSE_STEPS.BODY_STYLES,
  HELP_ME_CHOOSE_STEPS.FUEL_TYPES,
  HELP_ME_CHOOSE_STEPS.TRANSMISSIONS,
  HELP_ME_CHOOSE_STEPS.TERMS,
  HELP_ME_CHOOSE_STEPS.MILEAGES,
  HELP_ME_CHOOSE_STEPS.AVAILABILITY,
  HELP_ME_CHOOSE_STEPS.RENTAL,
  HELP_ME_CHOOSE_STEPS.INITIAL_PERIODS,
];

const getBucketLabel = (type: string, label: string) => {
  switch (type) {
    case HELP_ME_CHOOSE_STEPS.TERMS:
      return `${parseInt(label, 10) / 12} Years`;
    case HELP_ME_CHOOSE_STEPS.MILEAGES:
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
  newStep: IInitStep,
  pathName?: string,
  isEdit?: string | null,
) => {
  let pathname = pathName || router.route.replace('[[...param]]', '');
  const queryString = new URLSearchParams();
  const queries = {} as ParsedUrlQuery;
  const currentQueries = router.query;
  Object.entries(currentQueries).forEach(([key, value]) => {
    if (!HELP_ME_CHOSE_QUERY_PARAMS.includes(key)) {
      queries[key] = value;
    }
  });
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

export const removePlusesFromStringArray = (value: string[]) => {
  if (!Array.isArray(value)) {
    return value;
  }
  return value.map((item: string) => item.replace(/\+/g, ' '));
};

export const buildAnObjectFromAQuery = (
  steps: IInitStep,
  showResults?: {
    size: number;
  },
): HelpMeChooseVariables => {
  const object = {
    lqBodyStyles: removePlusesFromStringArray(
      steps.bodyStyles.value as string[],
    ),
    fuelTypes: removePlusesFromStringArray(steps.fuelTypes.value as string[]),
    transmissions: steps.transmissions.value,
    terms: steps.terms.value[0] ? [parseInt(steps.terms.value[0], 10)] : [],
    mileages: steps.mileages.value[0]
      ? [parseInt(steps.mileages.value[0] || '', 10)]
      : [],
    availability: steps.availability.value[0]
      ? parseInt(steps.availability.value[0] || '', 10)
      : null,
    rental: steps.rental.value
      ? {
          max: parseFloat(steps.rental.value as any),
        }
      : {},
    initialPeriods: steps.initialPeriods.value
      ? [parseInt(steps.initialPeriods.value as any, 10)]
      : [],
    financeTypes: steps.financeTypes.value,
    vehicleTypes: [VehicleTypeEnum.CAR],
  } as FilterListObject;
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

export const getMainImageUrl = (
  imageData: Nullish<ModelImages>,
  vehicleId: Nullish<string>,
) => {
  const parsedVehicleId = parseInt(vehicleId ?? '', 10);
  const mainVehicleImage = imageData?.vehicleImages?.find(
    vehicleImage => vehicleImage?.capId === parsedVehicleId,
  );

  return (
    mainVehicleImage?.mainImageUrl ??
    `${process.env.HOST_DOMAIN}/vehiclePlaceholder.jpg`
  );
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
      node.lqUrl || node.url || '',
      node?.derivativeId,
    ),
    bodyStyle: node?.lqBodyStyle,
    capId: node?.derivativeId || '',
    manufacturerName: node?.manufacturerName || '',
    rangeName: node?.rangeName || '',
    modelName: node?.modelName || '',
    derivativeName: node?.derivativeName || '',
    averageRating: null,
    isOnOffer: OnOffer.FILTER_DISABLED,
    offerPosition: null,
    leadTime: null,
    imageUrl: mainImageUrl || null,
    keyInformation: null,
    freeInsurance: null,
    businessRate: financeTypes[0] === 'BCH' ? node!.rental || null : null,
    personalRate: financeTypes[0] === 'PCH' ? node!.rental || null : null,
    vehicleType: VehicleTypeEnum.CAR,
  };
};

export const formatForWishlist = (
  node: Vehicles | null,
  financeTypes: string,
  mainImageUrl: string,
): IVehicleCarousel | null => {
  if (!node) {
    return null;
  }

  return {
    pageUrl: formatProductPageUrl(
      node.lqUrl || node.url || '',
      node?.derivativeId,
    ),
    bodyStyle: node?.lqBodyStyle,
    capId: node?.derivativeId || '',
    manufacturerName: node?.manufacturerName || '',
    rangeName: node?.rangeName || '',
    modelName: node?.modelName || '',
    derivativeName: node?.derivativeName || '',
    averageRating: null,
    isOnOffer: node.onOffer,
    offerPosition: null,
    leadTime: null,
    imageUrl: mainImageUrl || null,
    freeInsurance: null,
    keyInformation: [
      {
        name: 'Transmission',
        value: node.transmission,
      },
      {
        name: 'Fuel Type',
        value: node.fuelType,
      },
    ],
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

interface IValue {
  [key: string]: string | string[] | number;
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
    active: false,
    value: [],
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

export const getPathName = (router: NextRouter, queries: IValue) => {
  let pathname = router.route.replace('[[...param]]', '');
  const queryString = new URLSearchParams();
  Object.entries(queries).forEach(([key, value]) => {
    return queryString.set(key, value as string);
  });
  if (Object.keys(queries).length) {
    pathname += `?${decodeURIComponent(queryString.toString())}`;
  }
  return pathname;
};

export const setQuery = (router: NextRouter, query: IValue) => {
  const queries = { ...router.query, ...query };
  const pathname = getPathName(router, queries);

  router.push(
    {
      pathname: router.route,
      query: queries,
    },
    pathname,
    { shallow: true },
  );
};

export const getNextProgressStep = (
  searchParams: string,
  copyInitialSteps: IInitStep,
) => {
  const arrOfSearchParams = searchParams
    .replace('?', '')
    .split('&')
    .map(param => {
      const [key, value] = param.split('=');
      const splitedValue = value.split(',');
      if (
        key === HELP_ME_CHOOSE_STEPS.RENTAL ||
        key === HELP_ME_CHOOSE_STEPS.INITIAL_PERIODS
      ) {
        Object.defineProperty(
          copyInitialSteps[key as keyof IInitStep],
          'value',
          {
            value: splitedValue[0],
          },
        );
      } else {
        Object.defineProperty(
          copyInitialSteps[key as keyof IInitStep],
          'value',
          { value: splitedValue[0] ? splitedValue : [] },
        );
      }
      return [key, splitedValue];
    });

  const lastSearchParam = arrOfSearchParams[arrOfSearchParams.length - 1][0];
  const lastStepIndex = HELP_ME_CHOSE_QUERY_PARAMS.indexOf(
    lastSearchParam as string,
  );
  const nextStep = HELP_ME_CHOSE_QUERY_PARAMS[lastStepIndex + 1];
  if (!nextStep) {
    Object.defineProperty(copyInitialSteps.rental, 'active', { value: true });
    Object.defineProperty(copyInitialSteps.initialPeriods, 'active', {
      value: true,
    });
  } else {
    Object.defineProperty(
      copyInitialSteps[nextStep as keyof IInitStep],
      'active',
      { value: true },
    );
  }
};
