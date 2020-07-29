/* eslint-disable @typescript-eslint/camelcase */
import moment from 'moment';
import {
  GetVehicleDetails_derivativeInfo_colours,
  GetVehicleDetails_derivativeInfo_trims,
} from '../../generated/GetVehicleDetails';
import { GetQuoteDetails_quoteByCapId } from '../../generated/GetQuoteDetails';
import { VehicleTypeEnum } from '../../generated/globalTypes';
import { GetProductCard_productCard as ICard } from '../../generated/GetProductCard';

export interface ICompareVehicle {
  capId: string | null;
  derivativeName: string | null;
  manufacturerName: string | null;
  rangeName: string | null;
}

export interface IVehicle extends ICard {
  bodyStyle: string | null | undefined;
}

export const genDays = () => [...Array(31)].map((_, i) => i + 1);

export const genMonths = moment.months;

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
      value: quoteByCapId?.stock
        ? `${quoteByCapId?.stock}Free, Fast Delivery`
        : '-',
      id: 'stock',
      key: `${quoteByCapId?.stock}`,
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

export const changeCompares = async (vehicle: IVehicle | ICompareVehicle) => {
  const compares = sessionStorage.getItem('compares');

  // if compares already exist
  if (compares) {
    const arrayCompares = JSON.parse(compares);

    if (
      arrayCompares.some(
        (compare: IVehicle | ICompareVehicle) =>
          `${compare.capId}` === `${vehicle.capId}`,
      )
    ) {
      // delete vehicle from compare
      const deletedVehicle = arrayCompares.find(
        (compare: IVehicle | ICompareVehicle) =>
          `${compare.capId}` === `${vehicle.capId}`,
      );
      const index = arrayCompares.indexOf(deletedVehicle);
      if (index > -1) {
        arrayCompares.splice(index, 1);
      }
      await sessionStorage.setItem('compares', JSON.stringify(arrayCompares));
      return arrayCompares;
    }

    if (arrayCompares.length < 3) {
      // add vehicle to compare
      await sessionStorage.setItem(
        'compares',
        JSON.stringify([...arrayCompares, vehicle]),
      );

      return [...arrayCompares, vehicle];
    }
    return arrayCompares;
  }
  await sessionStorage.setItem('compares', JSON.stringify([vehicle]));
  return [vehicle];
};

export const isCorrectCompareType = (
  data: IVehicle,
  compareVehicles: IVehicle[],
) => {
  if (
    compareVehicles.some(
      vehicle =>
        vehicle.vehicleType === VehicleTypeEnum.LCV &&
        vehicle.bodyStyle !== 'Pickup',
    ) &&
    data.vehicleType === VehicleTypeEnum.CAR
  ) {
    return false;
  }

  if (
    compareVehicles.some(
      vehicle => vehicle.vehicleType === VehicleTypeEnum.CAR,
    ) &&
    data.bodyStyle !== 'Pickup' &&
    data.vehicleType === VehicleTypeEnum.LCV
  ) {
    return false;
  }

  return true;
};

export const getCompares = () => {
  const compares = sessionStorage.getItem('compares');
  return compares ? JSON.parse(compares) : [];
};

export const getVehiclesForComparator = (
  vehicles: IVehicle[],
): ICompareVehicle[] => {
  return vehicles.map(vehicle => ({
    capId: vehicle.capId,
    derivativeName: vehicle.derivativeName,
    manufacturerName: vehicle.manufacturerName,
    rangeName: vehicle.rangeName,
  }));
};
