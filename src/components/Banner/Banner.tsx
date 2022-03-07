import React from 'react';
import dynamic from 'next/dynamic';
import cx from 'classnames';
import RouterLink from '../RouterLink/RouterLink';
import Skeleton from '../Skeleton';

const LifeEventInsurance = dynamic(
  () => import('core/assets/icons/LifeEventInsurance'),
  {
    loading: () => <Skeleton count={1} />,
    ssr: false,
  },
);
const Icon = dynamic(() => import('core/atoms/icon/'), {
  loading: () => <Skeleton count={1} />,
  ssr: false,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IBanner {
  vans?: boolean;
  className?: string;
}

const Banner: React.FC<IBanner> = ({ vans, className }) => {
  return (
    <div className={cx('banner', className)}>
      <Icon className="-inherit md hydrated" icon={<LifeEventInsurance />} />
      <div>
        <Heading color="black" size="regular">
          {vans ? (
            <span>
              This Vehicle Includes Free Loss Of Earnings & Life Event Cover
              <br />
              For the Duration Of Your Lease
            </span>
          ) : (
            <span>
              This Vehicle Includes Free Redundancy & Life Event Cover
              <br /> For the Duration Of Your Lease
            </span>
          )}
        </Heading>
        <Text className="-pr-100" color="black" size="regular">
          If the worst happens, we&apos;ll help you return your vehicle.
        </Text>
        <RouterLink
          link={{
            href: '/redundancy-and-life-event-cover.html',
            label: '',
          }}
          classNames={{
            color: 'teal',
          }}
        >
          Find&nbsp;Out&nbsp;More
        </RouterLink>
      </div>
    </div>
  );
};

export default Banner;
