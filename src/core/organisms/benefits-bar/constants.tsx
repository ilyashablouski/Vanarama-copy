import PriceLowest from 'core/assets/icons/PriceLowest';
import ReturnCircle from 'core/assets/icons/ReturnCircle';
// import BreakdownCar from 'core/assets/icons/BreakdownCar';
import DeliveryCar from 'core/assets/icons/DeliveryCar';
import PoundCircle from 'core/assets/icons/PoundCircle';

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
    icon: (
      <img
        alt="Trust pilot logo"
        src="/Assets/images/benefits-bar/trust-pilot-logo.png"
      />
    ),
  },
  // {
  //   title: 'Road Tax & Roadside Assistance Included',
  //   icon: <BreakdownCar />,
  // },
  {
    title: '£250 Cashback On Every Vehicle',
    icon: <PoundCircle />,
  },
  {
    title: 'FREE & Fast Delivery',
    icon: <DeliveryCar />,
  },
];
