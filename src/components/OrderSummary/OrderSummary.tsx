import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { getOrderList } from '../../utils/helpers';
import { IProps } from './interfaces';
import Skeleton from '../Skeleton';
import FreeInsuranceLabel from '../FreeInsuranceLabel';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const StructuredList = dynamic(() => import('core/organisms/structured-list'), {
  loading: () => <Skeleton count={3} />,
});

const OrderSummary: React.FC<IProps> = ({
  quoteByCapId,
  stateVAT,
  maintenance,
  colours,
  trims,
  trim,
  pickups,
  isShowFreeInsuranceMerch,
}) => {
  const [orderSummaryList, setOrderSummaryList] = useState(
    getOrderList({
      quoteByCapId,
      stateVAT,
      maintenance,
      colours,
      trims,
      trim,
      pickups,
    }),
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
        pickups,
      }),
    );
  }, [quoteByCapId, stateVAT, maintenance, trim, colours, trims, pickups]);

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
      {isShowFreeInsuranceMerch && (
        <>
          <FreeInsuranceLabel />
          <div className="subject-to---">
            <span>
              <sup>*</sup>Subject to Eligibility
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSummary;
