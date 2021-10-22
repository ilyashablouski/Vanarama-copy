import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import BlackFridaySummaryBanner from 'core/atoms/black-friday-banner/BlackFridaySummaryBanner';

import {
  getOrderList,
  isBlackFridayCampaignEnabled,
} from '../../utils/helpers';
import { IProps } from './interfaces';
import Skeleton from '../Skeleton';
import FreeInsuranceLabel from '../FreeInsuranceLabel';
import FreeHomeChargerLabel from '../FreeHomeChargerLabel';

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
  isShowFreeHomeChargerMerch,
  roadsideAssistance,
  warrantyDetails,
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
      roadsideAssistance,
      warrantyDetails,
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
        roadsideAssistance,
        warrantyDetails,
      }),
    );
  }, [
    quoteByCapId,
    stateVAT,
    maintenance,
    trim,
    colours,
    trims,
    pickups,
    roadsideAssistance,
    warrantyDetails,
  ]);

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
      {isBlackFridayCampaignEnabled() && (
        <BlackFridaySummaryBanner className="-mt-300" />
      )}
      {!isShowFreeInsuranceMerch && isShowFreeHomeChargerMerch && (
        <FreeHomeChargerLabel />
      )}
      {isShowFreeInsuranceMerch && (
        <>
          <FreeInsuranceLabel />
          {isShowFreeHomeChargerMerch && <FreeHomeChargerLabel />}
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
