import dynamic from 'next/dynamic';
import React from 'react';
import ShieldFreeInsurance from 'core/assets/icons/ShieldFreeInsurance';
import LifeEventInsurance from 'core/assets/icons/LifeEventInsurance';
import RouterLink from '../RouterLink/RouterLink';
import Skeleton from '../Skeleton';

const Text = dynamic(() => import('core/atoms/text'));
const Icon = dynamic(() => import('core/atoms/icon'), {
  loading: () => <Skeleton count={1} />,
  ssr: false,
});

const FreeInsuranceCards = () => {
  return (
    <div className="two-col">
      <div className="option-icon-left">
        <Icon icon={<ShieldFreeInsurance />} color="white" />
        <div className="copy">
          <Text tag="p">
            Leasing This Car Online & Get
            <Text tag="span">1 Year&apos;s FREE Insurance</Text>
          </Text>

          <span className="-mt-100">Worth Avg £538</span>
          <RouterLink
            link={{
              href: '/car-leasing/free-car-insurance',
              label: 'Find Out More',
            }}
          />
        </div>
      </div>

      <div className="option-icon-left">
        <Icon icon={<LifeEventInsurance />} color="white" />
        <div className="copy --xsmall">
          <Text tag="p">
            This Vehicle Include Free Redundancy &amp; Life Event Cover For The
            Duration Of Your Lease
          </Text>
          <Text tag="span">
            So you can return it anytime, no charge, should the worst happen.
          </Text>

          <RouterLink
            link={{
              href: '/redundancy-and-life-event-cover.html',
              label: 'Find Out More',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FreeInsuranceCards;
