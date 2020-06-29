/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect, useState } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import StructuredList from '@vanarama/uibook/lib/components/organisms/structured-list';
import { IProps } from './interfaces';
import {
  GetVehicleDetails_derivativeInfo_colours,
  GetVehicleDetails_derivativeInfo_trims,
} from '../../../generated/GetVehicleDetails';

const getOrderList = ({
  quoteByCapId,
  stateVAT,
  maintenance,
  colours,
  trims,
  trim,
}: IProps) => {
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
      value: `${quoteByCapId?.stock || '-'}`,
      id: 'stock',
      key: `${quoteByCapId?.stock}`,
      dataTestId: 'stock',
    },
  ];
};

const OrderSummary: React.FC<IProps> = ({
  quoteByCapId,
  stateVAT,
  maintenance,
  colours,
  trims,
  trim,
}) => {
  const [orderSummaryList, setOrderSummaryList] = useState(
    getOrderList({ quoteByCapId, stateVAT, maintenance, colours, trims, trim }),
  );

  useEffect(() => {
    setOrderSummaryList(
      getOrderList({
        quoteByCapId,
        stateVAT,
        maintenance,
        colours,
        trims,
        trim,
      }),
    );
  }, [quoteByCapId, stateVAT, maintenance, trim, colours, trims]);

  return (
    <div className="pdp--order-summary">
      <Heading size="small" className="-inherit">
        ORDER SUMMARY
      </Heading>
      <StructuredList
        key={orderSummaryList.map(item => `${item.key}`).join('')}
        className="-compact"
        editable={false}
        list={[...orderSummaryList]}
      />
    </div>
  );
};

export default OrderSummary;
