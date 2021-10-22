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
import { IErrorProps, Nullish } from '../types/common';
import {
  GetTrimAndColor_colourList as IColourList,
  GetTrimAndColor_trimList as ITrimList,
} from '../../generated/GetTrimAndColor';
import { getLocalStorage } from './windowLocalStorage';

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
  colours: (IColourList | null)[] | null;
  trims: (ITrimList | null)[] | null;
  trim: number | null | undefined;
  pickups?: boolean;
  roadsideAssistance?: GetVehicleDetails_vehicleDetails_roadsideAssistance | null;
  warrantyDetails?:
    | GetVehicleDetails_vehicleDetails_warrantyDetails
    | null
    | undefined;
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
  const colourDescription = colours?.find(
    item => item?.optionId?.toString() === quoteByCapId?.colour,
  )?.label;
  const trimDescription = trims?.find(
    item =>
      item?.optionId?.toString() === quoteByCapId?.trim ||
      item?.optionId === trim,
  )?.label;

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
      value: `${warrantyDetails?.years} Years Manufacturer Or ${warrantyDetails?.mileage} Miles`,
      id: 'warranty',
      key: `${warrantyDetails?.years} Years Manufacturer Or ${warrantyDetails?.mileage} Miles`,
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
    const firstArray = first.sort((a, b) => a[sortByKey] - b[sortByKey]);
    const secondArray = second.sort((a, b) => a[sortByKey] - b[sortByKey]);
    return JSON.stringify(firstArray) === JSON.stringify(secondArray);
  }
  return JSON.stringify(first.sort()) === JSON.stringify(second.sort());
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

export const convertErrorToProps = (
  error: Error | ApolloError,
): IErrorProps => {
  if (
    'networkError' in error &&
    error.networkError &&
    'statusCode' in error.networkError
  ) {
    return {
      statusCode: error.networkError.statusCode,
      message: error.networkError.message,
    };
  }

  return {
    statusCode: 500,
    message: error.message,
  };
};

export enum FeatureFlags {
  DERANGED = 'DIG-7592',
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

export function isDerangedFeatureFlagEnabled(
    cookies: Cookies.CookiesStatic<object> | string | undefined,
) {
  return isFeatureFlagEnabled(cookies, FeatureFlags.DERANGED);
}

export const isCookieBarFeatureEnabled = () => {
  return Cookies.get('DIG-6994') === '1';
};

export const isBlackFridayCampaignEnabled = () => {
  return Cookies.get('DIG-7658') === '1';
};
