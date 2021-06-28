import React from 'react';

import Text from 'core/atoms/text';
import Heading from 'core/atoms/heading';

import RouterLink from '../../../components/RouterLink';

const LossOfEarnings = () => (
  <>
    <Heading className="title -mt-400" color="black" size="large" tag="span">
      This Vehicle Includes Free Loss Of Earnings & Life Event Cover For the
      Duration Of Your Lease
    </Heading>
    <Text size="regular" color="darker" className="copy -mt-500 -mb-300">
      If you&apos;re self-employed or running your own business and need to
      return your vehicle earlier than expected due to loss of earnings,
      we&apos;ve got your back. We&apos;ll negotiate a flat-rate charge of 6
      months&apos; rentals, so even if you have a few years left on your
      contract you can return your vehicle hassle-free. If you have less than 6
      months left on your contract you will only need to cover what is left.
    </Text>
    <RouterLink
      classNames={{
        color: 'teal',
      }}
      link={{
        href: '/redundancy-and-life-event-cover.html',
        label: 'Find Out More',
      }}
    />
  </>
);

export default LossOfEarnings;
