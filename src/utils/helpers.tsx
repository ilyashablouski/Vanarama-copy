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
import { IColor, IGetColourGroupList } from '../types/detailsPage';
import {
  GetColourAndTrimGroupList_colourGroupList as ColorGroupList,
  GetColourAndTrimGroupList_trimGroupList as TrimGroupList,
  GetColourAndTrimGroupList_trimGroupList_trims as TrimItem,
} from '../../generated/GetColourAndTrimGroupList';

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
  colours: Nullable<IGetColourGroupList[]>;
  trims: Nullable<Nullable<TrimGroupList[]>>;
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

export const getColorItem = (
  colorList: Nullable<IGetColourGroupList[]>,
  value?: Nullable<string>,
) => {
  return colorList?.reduce<Nullable<IColor>>((acc, colorGroup) => {
    const foundedItem = colorGroup?.colors?.find(
      colorItem => `${colorItem?.optionId}` === value,
    );

    if (foundedItem) {
      // eslint-disable-next-line no-param-reassign
      acc = foundedItem;
    }

    return acc;
  }, null);
};

export const getTrimItem = (
  trimList: Nullable<Nullable<TrimGroupList>[]>,
  value?: Nullable<string>,
) => {
  return trimList?.reduce<Nullable<TrimItem>>((acc, trimGroup) => {
    const foundedItem = trimGroup?.trims?.find(
      trimItem => `${trimItem?.optionId}` === value,
    );

    if (foundedItem) {
      // eslint-disable-next-line no-param-reassign
      acc = foundedItem;
    }

    return acc;
  }, null);
};

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
    getColorItem(colours, quoteByCapId?.colour)?.label ?? '';

  const trimDescription =
    getTrimItem(trims, quoteByCapId?.trim)?.label ||
    getTrimItem(trims, String(trim))?.label ||
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
  UPDATED_SERVICE_PLAN = 'DIG-7556',
  BLACK_FRIDAY = 'DIG-7658',
  ACCOUNT_SECTION_MAINTENANCE = 'DIG-7932',
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

export function isAccountSectionFeatureFlagEnabled(
  cookies: Cookies.CookiesStatic<object> | string | undefined,
) {
  return isFeatureFlagEnabled(
    cookies,
    FeatureFlags.ACCOUNT_SECTION_MAINTENANCE,
  );
}

export function isDerangedFeatureFlagEnabled(
  cookies: Cookies.CookiesStatic<object> | string | undefined,
) {
  return isFeatureFlagEnabled(cookies, FeatureFlags.DERANGED);
}

export function isUpdatedServicePlanFeatureFlagEnabled(
  cookies: Cookies.CookiesStatic<object> | string | undefined,
) {
  return isFeatureFlagEnabled(cookies, FeatureFlags.UPDATED_SERVICE_PLAN);
}

export const isCookieBarFeatureEnabled = () => {
  return Cookies.get('DIG-6994') === '1';
};

const blackFridayTime = Number(new Date(2021, 9, 31, 23, 59, 59));
export const isBlackFridayCampaignEnabled = () => {
  const currentTime = Date.now();

  if (currentTime >= blackFridayTime) {
    return true;
  }

  return Cookies.get(FeatureFlags.BLACK_FRIDAY) === '1';
};

export function addImacaHexToColourList(
  colorsList: Nullable<Nullable<ColorGroupList>[]>,
  imacaColors?: Nullable<GetImacaAssets_getImacaAssets_colours[]>,
): IGetColourGroupList[] | null {
  return (
    colorsList?.map(colorGroup => {
      return {
        leadTime: colorGroup?.leadTime || '',
        colors: colorGroup?.colours?.map(colorData => {
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
