import Cookies from 'js-cookie';
import { ApolloError } from '@apollo/client';
import { IListItemProps } from 'core/organisms/structured-list/interfaces';
import {
  GetVehicleDetails_vehicleDetails_roadsideAssistance,
  GetVehicleDetails_vehicleDetails_warrantyDetails,
} from '../../generated/GetVehicleDetails';
import { GetProductCard_productCard } from '../../generated/GetProductCard';
import { GetQuoteDetails_quoteByCapId } from '../../generated/GetQuoteDetails';
import { VehicleTypeEnum } from '../../generated/globalTypes';
import { IErrorProps, Nullable, Nullish } from '../types/common';
import { getLocalStorage } from './windowLocalStorage';
import { GetImacaAssets_getImacaAssets_colours } from '../../generated/GetImacaAssets';
import { IOption, IOptionsList } from '../types/detailsPage';
import { GetColourAndTrimGroupList_colourGroupList as ColorGroupList } from '../../generated/GetColourAndTrimGroupList';

export enum LeadTimeList {
  FACTORY_ORDER = 'Factory Order',
}

export const genDays = () => [...Array(31)].map((_, i) => i + 1);

export const genMonths = () => [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const genYears = (back: number) => {
  const year = new Date().getFullYear();
  return Array.from({ length: back }, (_, i) => year - back + i + 1).reverse();
};

export const toCurrencyDisplay = (value: number) => {
  return `£${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
};

export const toPriceFormat = (price: number | undefined | null): string =>
  (price || 0).toFixed(2);

export const toDataAbTestIdFormat = (
  prefix: string,
  value: string | number,
): string =>
  `${prefix}_${value
    .toString()
    .toLowerCase()
    .replace(/ /g, '-')}`;

export const getAdditionalDataVariable = () => {
  const additionalData = getLocalStorage('additionalData');
  return additionalData ? { additionalData } : {};
};

export interface IOrderList {
  quoteByCapId: GetQuoteDetails_quoteByCapId | null | undefined;
  stateVAT: string;
  maintenance: boolean | null;
  colours: Nullable<IOptionsList[]>;
  trims: Nullable<IOptionsList[]>;
  trim: number | null | undefined;
  pickups?: boolean;
  roadsideAssistance?: GetVehicleDetails_vehicleDetails_roadsideAssistance | null;
  warrantyDetails?:
    | GetVehicleDetails_vehicleDetails_warrantyDetails
    | null
    | undefined;
}

export const createWarrantyText = (
  warrantyDetails?: GetVehicleDetails_vehicleDetails_warrantyDetails | null,
) =>
  `${warrantyDetails?.years} Years Manufacturer And ${
    warrantyDetails?.mileage === -1 ? 'Unlimited' : warrantyDetails?.mileage
  } Miles`;

export function isHotOfferSelect(
  array: Nullable<IOptionsList[]>,
  value: Nullish<string>,
): boolean | undefined | null {
  return getOptionFromList(array, value)?.hotOffer;
}

export function isFactoryOrderSelect(
  array: Nullable<IOptionsList[]>,
  value: Nullish<string>,
): boolean | undefined {
  return getOptionList(array, value)?.leadTime?.includes(
    LeadTimeList.FACTORY_ORDER,
  );
}

export function getOptionList(
  array: Nullable<IOptionsList[]>,
  value: Nullish<string>,
) {
  return array?.find(optionsList =>
    optionsList?.options?.find(option => `${option?.optionId}` === value),
  );
}

export function getOptionFromList(
  array: Nullable<IOptionsList[]>,
  value: Nullish<string>,
): Nullish<IOption> {
  return array?.reduce(
    (acc: Nullish<IOption>, group: Nullish<IOptionsList>) => {
      const foundValue = group?.options?.find(
        item => `${item?.optionId}` === value,
      );

      if (foundValue) {
        // eslint-disable-next-line no-param-reassign
        acc = foundValue;
      }

      return acc;
    },
    null,
  );
}

function removeFactoryOrderOptions(arr: Nullable<IOptionsList[]>) {
  return arr?.filter(
    optionsList => optionsList.leadTime !== LeadTimeList.FACTORY_ORDER,
  );
}

export function checkIsHotOffer(
  result: Nullable<Nullable<IOptionsList>[]>,
  isOnHotOffer: Nullish<boolean>,
  isOptionIsFactoryOrder: Nullish<boolean>,
) {
  const sortedByHotOffer = sortByHotOffer(result);

  if (isOnHotOffer && !isOptionIsFactoryOrder) {
    return removeFactoryOrderOptions(sortedByHotOffer) || [];
  }

  return sortedByHotOffer;
}

export const getOrderList = ({
  quoteByCapId,
  stateVAT,
  maintenance,
  colours,
  trims,
  trim,
  pickups,
  roadsideAssistance,
  warrantyDetails,
}: IOrderList) => {
  const colourDescription =
    getOptionFromList(colours, quoteByCapId?.colour)?.label ?? '';

  const trimDescription =
    getOptionFromList(trims, quoteByCapId?.trim)?.label ||
    getOptionFromList(trims, String(trim))?.label ||
    '';

  const orderList: IListItemProps[] = [
    {
      label: 'Processing Fee:',
      value:
        quoteByCapId?.processingFee === 0
          ? 'FREE'
          : `£${quoteByCapId?.processingFee}`,
      id: 'processingFee',
      key:
        quoteByCapId?.processingFee === 0
          ? 'FREE'
          : `£${quoteByCapId?.processingFee}`,
      dataTestId: 'processingFee',
      dataAbTestId: 'product-page_structured-list_processing-fee',
      labelElementAttributes: {
        dataAbTestId: 'product-page_structured-list_processing-fee-label',
      },
      valueElementAttributes: {
        dataAbTestId: 'product-page_structured-list_processing-fee-value',
      },
      isOrange: true,
    },
    {
      label: 'Initial Payment:',
      value: maintenance
        ? [
            `£${quoteByCapId?.leaseCost?.initialRental} (${stateVAT}. VAT)`,
            <div
              className="structured-list-row orange"
              style={{ borderBottom: 0 }}
            >
              <div className="structured-list-td">
                {`+£${quoteByCapId?.maintenanceCost?.initialRental} Vanarama Service Plan Initial payment`}
              </div>
            </div>,
          ]
        : `£${quoteByCapId?.leaseCost?.initialRental} (${stateVAT}. VAT)`,
      id: 'initialPayment',
      key: `${quoteByCapId?.leaseCost?.initialRental} ${stateVAT}`,
      dataTestId: 'initialPayment',
      isOrange: false,
    },
    {
      label: 'Contract Length:',
      value: `${quoteByCapId?.term} months`,
      id: 'contractLengthile',
      key: `${quoteByCapId?.term}`,
      dataTestId: 'contractLengthile',
      isOrange: false,
    },
    {
      label: 'Annual Mileage:',
      value: `${quoteByCapId?.mileage} miles`,
      id: 'annualMileage',
      key: `${quoteByCapId?.mileage}`,
      dataTestId: 'annualMileage',
      isOrange: false,
    },
    {
      label: 'Vanarama Service Plan:',
      value: `${maintenance ? 'Yes' : 'No'}`,
      id: 'maintenance',
      key: `${maintenance ? 'Yes' : 'No'}`,
      dataTestId: 'maintenance',
      isOrange: false,
    },
    {
      label: 'Colour:',
      value: `${colourDescription || '-'}`,
      id: 'colour',
      key: `${colourDescription || ''}`,
      dataTestId: 'colour',
      isOrange: false,
    },
    {
      label: 'Trim / Interior:',
      value: `${trimDescription || '-'}`,
      id: 'trim',
      key: `${trimDescription || '-'}`,
      dataTestId: 'trim',
      isOrange: false,
    },
    {
      label: 'Stock:',
      value: quoteByCapId?.leadTime || '-',
      id: 'stock',
      key: `${quoteByCapId?.leadTime}`,
      dataTestId: 'stock',
      isOrange: false,
    },
    {
      label: 'Warranty:',
      value: createWarrantyText(warrantyDetails),
      id: 'warranty',
      key: createWarrantyText(warrantyDetails),
      dataTestId: 'warranty',
      isOrange: false,
    },
    {
      label: 'Road Tax:',
      value: 'INCLUDED',
      id: 'roadTax',
      key: 'roadTax',
      dataTestId: 'roadTax',
      isOrange: true,
    },
    {
      label: 'Delivery:',
      value: 'FREE',
      id: 'delivery',
      key: 'delivery',
      dataTestId: 'delivery',
      isOrange: true,
    },
  ];

  if (!pickups) {
    orderList.splice(orderList.length - 1, 0, {
      label:
        quoteByCapId?.vehicleType === VehicleTypeEnum.CAR
          ? 'Redundancy & Life Event Cover:'
          : 'Loss Of Earnings & Life Event Cover:',
      value: 'FREE',
      id: 'lifeEventCover',
      key: 'lifeEventCover',
      dataTestId: 'lifeEventCover',
      isOrange: true,
    });
  }

  if (roadsideAssistance?.years) {
    orderList.push({
      label: 'Roadside Assistance:',
      value:
        roadsideAssistance?.years > 1
          ? `${roadsideAssistance?.years} YEARS INCLUDED`
          : `${roadsideAssistance?.years} YEAR INCLUDED`,
      id: 'roadsideAssistance',
      key: `${roadsideAssistance?.years}`,
      dataTestId: 'roadsideAssistance',
      isOrange: true,
    });
  }

  return orderList;
};

export const arraysAreEqual = (
  first: any[],
  second: any[],
  sortByKey?: string | null,
  unsorted?: boolean,
) => {
  if (unsorted) {
    return JSON.stringify(first) === JSON.stringify(second);
  }
  if (sortByKey) {
    const firstArray = first?.sort((a, b) => a[sortByKey] - b[sortByKey]);
    const secondArray = second?.sort((a, b) => a[sortByKey] - b[sortByKey]);
    return JSON.stringify(firstArray) === JSON.stringify(secondArray);
  }
  return JSON.stringify(first?.sort()) === JSON.stringify(second?.sort());
};

export const getVehicleConfigId = (
  product: Nullish<GetProductCard_productCard>,
) => `${product?.vehicleType}-${product?.capId}`;

export const parseVehicleConfigId = (configId: string) => {
  const [vehicleType, capId] = configId.split('-');

  return { vehicleType, capId } as {
    vehicleType: VehicleTypeEnum;
    capId: string;
  };
};

export const convertErrorToProps = (error: unknown): IErrorProps => {
  if (
    error instanceof ApolloError &&
    error.networkError &&
    'statusCode' in error.networkError
  ) {
    return {
      statusCode: error.networkError.statusCode,
      message: error.networkError.message,
    };
  }

  const errorMessage =
    error instanceof Error ? error.message : 'Server-side error occurred';

  return {
    statusCode: 500,
    message: errorMessage,
  };
};

export function addImacaHexToColourList(
  colorsList: Nullable<Nullable<ColorGroupList>[]>,
  imacaColors?: Nullable<GetImacaAssets_getImacaAssets_colours[]>,
): Nullable<Nullable<IOptionsList>[]> {
  return (
    colorsList?.map(colorGroup => {
      return {
        leadTime: colorGroup?.leadTime || '',
        options: colorGroup?.options?.map(colorData => {
          const imacaColor = imacaColors?.find(
            item => item.capId === colorData?.optionId,
          );

          return {
            ...colorData,
            hex: imacaColor?.hex || null,
          };
        }),
      };
    }) || null
  );
}

export function sortByHotOffer(optionsList: Nullish<Nullable<IOptionsList>[]>) {
  const hotOffer: IOptionsList[] = [];
  const notHotOffer: IOptionsList[] = [];

  (optionsList ?? []).forEach(optionList => {
    hotOffer.push({
      leadTime: optionList?.leadTime || '',
      hotOffer: true,
      options: optionList?.options?.filter(option => option?.hotOffer),
    });

    notHotOffer.push({
      leadTime: optionList?.leadTime || '',
      hotOffer: false,
      options: optionList?.options?.filter(option => !option?.hotOffer),
    });
  });

  return [
    ...hotOffer.filter(options => options.options?.length),
    ...notHotOffer.filter(options => options.options?.length),
  ];
}

export function moveFactoryOrderToEnd(
  optionsList: Nullable<Nullable<IOptionsList>[]>,
) {
  const listWithFactoryOrder = (optionsList ?? []).filter(
    optionList => optionList?.leadTime === LeadTimeList.FACTORY_ORDER,
  );
  const listWithoutFactoryOrder = (optionsList ?? [])?.filter(
    optionList => optionList?.leadTime !== LeadTimeList.FACTORY_ORDER,
  );

  return [...listWithoutFactoryOrder, ...listWithFactoryOrder];
}

export enum FeatureFlags {
  UPDATED_SERVICE_PLAN = 'DIG-7556',
  BLACK_FRIDAY = 'DIG-7658',
  EDIT_PERSONAL_INFORMATION = 'DIG-8722',
  CAR_HUB_REDESIGN = 'DIG-9034',
  BC_SESSION_ID_DELAY = 'DIG-9132',
}

function isFeatureFlagEnabled(
  cookies: Cookies.CookiesStatic<object> | string | undefined,
  featureFlag: string,
): boolean {
  if (!cookies) {
    return false;
  }

  if (typeof cookies !== 'string') {
    return cookies.get(featureFlag) === '1';
  }

  return cookies.includes(`${featureFlag}=1`);
}

export function isUpdatedServicePlanFeatureFlagEnabled(
  cookies: Cookies.CookiesStatic<object> | string | undefined,
) {
  return isFeatureFlagEnabled(cookies, FeatureFlags.UPDATED_SERVICE_PLAN);
}

export function isRedesignCarHubFeatureFlagEnabled(
  cookies: Cookies.CookiesStatic<object> | string | undefined,
) {
  return isFeatureFlagEnabled(cookies, FeatureFlags.CAR_HUB_REDESIGN);
}

export const isCookieBarFeatureEnabled = () => {
  return Cookies.get('DIG-6994') === '1';
};

export function isEditPersonalInformationFeatureFlagEnabled(
  cookies: Cookies.CookiesStatic<object> | string | undefined,
) {
  return isFeatureFlagEnabled(cookies, FeatureFlags.EDIT_PERSONAL_INFORMATION);
}

export const isBCSessionIDDelayFeatureFlagEnabled = () => {
  return Cookies.get(FeatureFlags.BC_SESSION_ID_DELAY) === '1';
};
