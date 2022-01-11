import PriceLowest from 'core/assets/icons/PriceLowest';
import ReturnCircle from 'core/assets/icons/ReturnCircle';
import BreakdownCar from 'core/assets/icons/BreakdownCar';
import DeliveryCar from 'core/assets/icons/DeliveryCar';
import Image from 'core/atoms/image/Image';

// import tpLogo from '../../../../public/Assets/images/benefits-bar/trust-pilot-logo.png';

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
      <Image
        optimisedHost={process.env.IMG_OPTIMISATION_HOST}
        src={`${process.env.HOST_DOMAIN}/Assets/images/benefits-bar/trust-pilot-logo.png`}
        size="expand"
        plain
      />
      // <ImageV2 width={61} height={25} alt="Trust pilot logo" src={tpLogo} />
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
