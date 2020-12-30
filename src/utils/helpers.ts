/* eslint-disable @typescript-eslint/camelcase */
import {
  GetVehicleDetails_derivativeInfo_colours,
  GetVehicleDetails_derivativeInfo_trims,
} from '../../generated/GetVehicleDetails';
import { GetQuoteDetails_quoteByCapId } from '../../generated/GetQuoteDetails';

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
}

export const getOrderList = ({
  quoteByCapId,
  stateVAT,
  maintenance,
  colours,
  trims,
  trim,
}: IOrderList) => {
  const colourDescription = colours?.find(
    (item: GetVehicleDetails_derivativeInfo_colours | null) =>
      item?.id === quoteByCapId?.colour,
  )?.optionDescription;
  const trimDescription = trims?.find(
    (item: GetVehicleDetails_derivativeInfo_trims | null) =>
      item?.id === quoteByCapId?.trim || item?.id === `${trim}`,
  )?.optionDescription;

  return [
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
    },
    {
      label: 'Initial Payment:',
      value: `£${quoteByCapId?.leaseCost?.initialRental} (${stateVAT}. VAT)`,
      id: 'initialPayment',
      key: `${quoteByCapId?.leaseCost?.initialRental} ${stateVAT}`,
      dataTestId: 'initialPayment',
    },
    {
      label: 'Contract Length:',
      value: `${quoteByCapId?.term} months`,
      id: 'contractLengthile',
      key: `${quoteByCapId?.term}`,
      dataTestId: 'contractLengthile',
    },
    {
      label: 'Annual Mileage:',
      value: `${quoteByCapId?.mileage} miles`,
      id: 'annualMileage',
      key: `${quoteByCapId?.mileage}`,
      dataTestId: 'annualMileage',
    },
    {
      label: 'Maintenance:',
      value: `${maintenance ? 'Yes' : 'No'}`,
      id: 'maintenance',
      key: `${maintenance ? 'Yes' : 'No'}`,
      dataTestId: 'maintenance',
    },
    {
      label: 'Colour:',
      value: `${colourDescription || '-'}`,
      id: 'colour',
      key: `${colourDescription || ''}`,
      dataTestId: 'colour',
    },
    {
      label: 'Trim / Interior:',
      value: `${trimDescription || '-'}`,
      id: 'trim',
      key: `${trimDescription || '-'}`,
      dataTestId: 'trim',
    },
    {
      label: 'Stock:',
      value: quoteByCapId?.leadTime || '-',
      id: 'stock',
      key: `${quoteByCapId?.leadTime}`,
      dataTestId: 'stock',
    },
    {
      label: 'Redundancy & Life Cover:',
      value: 'Included',
      id: 'redundancy',
      key: 'redundancy',
      dataTestId: 'redundancy',
    },
  ];
};

export const isArraySame = (first: any[], second: any[]) =>
  first.length === second.length &&
  first.sort().every((value, index) => {
    return value === second.sort()[index];
  });
