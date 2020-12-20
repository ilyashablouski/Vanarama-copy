/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { getOrderList } from '../../utils/helpers';
import { IProps } from './interfaces';
import Skeleton from '../Skeleton';

const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const StructuredList = dynamic(
  () => import('@vanarama/uibook/lib/components/organisms/structured-list'),
  {
    loading: () => <Skeleton count={3} />,
  },
);

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
        list={orderSummaryList}
      />
    </div>
  );
};

export default OrderSummary;
