import React from 'react';
import dynamic from 'next/dynamic';

import BlackFridayCardLabel from 'core/molecules/cards/BlackFridayCardLabel';
import RouterLink from '../RouterLink/RouterLink';
import Skeleton from '../Skeleton';
import { ProductCardData_productCarousel_keyInformation as IKeyInfo } from '../../../generated/ProductCardData';
import { features } from '../ProductCarousel/helpers';
import { isBlackFridayCampaignEnabled } from '../../utils/helpers';

const Card = dynamic(() => import('core/molecules/cards'), {
  loading: () => <Skeleton count={3} />,
});
const CardIcons = dynamic(() => import('core/molecules/cards/CardIcons'), {
  loading: () => <Skeleton count={1} />,
});
const Icon = dynamic(() => import('core/atoms/icon'), {
  loading: () => <Skeleton count={1} />,
});
const Button = dynamic(() => import('core/atoms/button'), {
  loading: () => <Skeleton count={1} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Rating = dynamic(() => import('core/atoms/rating'), {
  loading: () => <Skeleton count={1} />,
});
const Price = dynamic(() => import('core/atoms/price'), {
  loading: () => <Skeleton count={1} />,
});
const Flame = dynamic(() => import('core/assets/icons/Flame'), {
  ssr: false,
});
const CarSharp = dynamic(() => import('core/assets/icons/CarSharp'), {
  ssr: false,
});
const HeartSharp = dynamic(() => import('core/assets/icons/HeartSharp'), {
  ssr: false,
});
const ArrowForwardSharp = dynamic(
  () => import('core/assets/icons/ArrowForwardSharp'),
  {
    ssr: false,
  },
);

interface IDealOfMonthProps {
  wished: boolean | undefined;
  compared: boolean | undefined;
  onWishlist: () => void;
  onCompare: () => void;
  vehicle: string;
  specification: string;
  rating?: number;
  price: number;
  imageSrc: string;
  flagText?: string;
  isPersonal: boolean;
  keyInfo?: (IKeyInfo | null)[];
  capId?: string;
  viewOfferClick: () => void;
  link: {
    href: string;
    url: string;
  };
}

const DealOfMonth: React.FC<IDealOfMonthProps> = ({
  vehicle,
  specification,
  rating,
  keyInfo,
  capId,
  price,
  viewOfferClick,
  imageSrc,
  isPersonal,
  flagText = 'DEAL OF THE MONTH',
  link,
  wished,
  compared,
  onWishlist,
  onCompare,
}) => (
  <>
    <div>
      <Card
        optimisedHost={process.env.IMG_OPTIMISATION_HOST}
        header={{
          accentIcon: <Icon icon={<Flame />} color="white" />,
          accentText: 'Hot Offer',
          text: flagText,
        }}
        imageSrc={imageSrc}
      >
        {isBlackFridayCampaignEnabled() && (
          <BlackFridayCardLabel className="bf-card-label--deal" />
        )}
      </Card>
    </div>
    <div className="-col">
      <div>
        <Heading size="xlarge" color="black">
          {vehicle}
        </Heading>
        <Text tag="p" size="lead" color="darker">
          {specification}
        </Text>
        {rating && <Rating score={rating} color="orange" />}
      </div>
      {!!keyInfo?.length && (
        <div>
          <CardIcons
            featuredProduct
            icons={features(keyInfo || [], capId || '', Icon)}
          />
        </div>
      )}
      <div className="-flex-h">
        <Price
          size="xlarge"
          price={price}
          priceDescription={
            isPersonal ? 'Per Month Inc VAT' : 'Per Month Ex. VAT'
          }
        />
        <RouterLink
          link={{
            href: link.url,
            label: 'View Offer',
          }}
          onClick={viewOfferClick}
          classNames={{ color: 'teal', solid: true, size: 'regular' }}
          className="button"
          dataTestId="deal-of-month__view-offer"
          withoutDefaultClassName
        >
          <div className="button--inner">
            View Offer
            <Icon color="white" icon={<ArrowForwardSharp />} />
          </div>
        </RouterLink>
      </div>
      <div className="card-footer">
        {onCompare && (
          <Button
            color={compared ? 'teal' : 'dark'}
            iconColor="dark"
            fill="clear"
            iconPosition="before"
            label={
              <>
                <Icon icon={<CarSharp />} color={compared ? 'teal' : 'dark'} />
                {compared ? 'Remove' : 'Compare'}
              </>
            }
            size="expand"
            onClick={onCompare}
          />
        )}
        {onWishlist && (
          <Button
            color={wished ? 'teal' : 'dark'}
            iconColor="dark"
            fill="clear"
            iconPosition="before"
            label={
              <>
                <Icon icon={<HeartSharp />} color={wished ? 'teal' : 'dark'} />
                {wished ? 'Remove' : 'Wishlist'}
              </>
            }
            size="expand"
            onClick={onWishlist}
          />
        )}
      </div>
    </div>
  </>
);

export default DealOfMonth;
