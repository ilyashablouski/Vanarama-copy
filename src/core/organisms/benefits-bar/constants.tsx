import React from 'react';

import ImageV2 from 'core/atoms/image/ImageV2';
import PriceLowest from 'core/assets/icons/PriceLowest';
import ReturnCircle from 'core/assets/icons/ReturnCircle';
import BreakdownCar from 'core/assets/icons/BreakdownCar';
import DeliveryCar from 'core/assets/icons/DeliveryCar';

const baseImageUrl = `${process.env.HOST_DOMAIN}/Assets/images/benefits-bar`;

// eslint-disable-next-line import/prefer-default-export
export const BENEFIT_LIST = [
  {
    title: 'Lowest Price Guaranteed',
    icon: <PriceLowest />,
  },
  {
    title: 'FREE 30-Day Returns',
    icon: <ReturnCircle />,
  },
  {
    title: 'Rated Excellent',
    iconWidth: 61,
    icon: (
      <ImageV2
        width={234}
        height={96}
        quality={60}
        sizes="20vw"
        optimisedHost
        src={`${baseImageUrl}/trust-pilot-logo.png`}
        alt="Trust pilot logo"
        size="expand"
        plain
      />
    ),
  },
  {
    title: 'Road Tax & Roadside Assistance Included',
    icon: <BreakdownCar />,
  },
  {
    title: 'FREE & Fast Delivery',
    icon: <DeliveryCar />,
  },
];
