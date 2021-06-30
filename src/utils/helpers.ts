import {
  GetVehicleDetails_derivativeInfo_colours,
  GetVehicleDetails_derivativeInfo_trims,
  GetVehicleDetails_vehicleDetails_roadsideAssistance,
  GetVehicleDetails_vehicleDetails_warrantyDetails,
} from '../../generated/GetVehicleDetails';
import { GetProductCard_productCard } from '../../generated/GetProductCard';
import { GetQuoteDetails_quoteByCapId } from '../../generated/GetQuoteDetails';
import { VehicleTypeEnum } from '../../generated/globalTypes';
import { Nullish } from '../types/common';

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

export interface IOrderList {
  quoteByCapId: GetQuoteDetails_quoteByCapId | null | undefined;
  stateVAT: string;
  maintenance: boolean | null;
  colours:
    | (GetVehicleDetails_derivativeInfo_colours | null)[]
    | null
    | undefined;
  trims: (GetVehicleDetails_derivativeInfo_trims | null)[] | null | undefined;
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
    (item: GetVehicleDetails_derivativeInfo_colours | null) =>
      item?.id === quoteByCapId?.colour,
  )?.optionDescription;
  const trimDescription = trims?.find(
    (item: GetVehicleDetails_derivativeInfo_trims | null) =>
      item?.id === quoteByCapId?.trim || item?.id === `${trim}`,
  )?.optionDescription;

  const orderList = [
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
      isOrange: true,
    },
    {
      label: 'Initial Payment:',
      value: `£${quoteByCapId?.leaseCost?.initialRental} (${stateVAT}. VAT)`,
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
      label: 'Maintenance:',
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
      value: `${warrantyDetails?.years} Years Manufacturer Or ${warrantyDetails?.mileage} Milles`,
      id: 'warranty',
      key: `${warrantyDetails?.years} Years Manufacturer Or ${warrantyDetails?.mileage} Milles`,
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
    {
      label: 'Roadside Assistance:',
      value: `${roadsideAssistance?.years} YEAR INCLUDED`,
      id: 'roadsideAssistance',
      key: `${roadsideAssistance?.years}`,
      dataTestId: 'roadsideAssistance',
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
