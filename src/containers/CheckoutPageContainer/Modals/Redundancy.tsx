import React from 'react';

import Text from 'core/atoms/text';
import Heading from 'core/atoms/heading';

import RouterLink from '../../../components/RouterLink';

const Redundancy = () => (
  <>
    <Heading className="title -mt-400" color="black" size="large" tag="span">
      This Vehicle Includes Free Redundancy & Life Event Cover For The Duration
      Of Your Lease
    </Heading>
    <Text size="regular" color="darker" className="copy -mt-500 -mb-300">
      If something changes unexpectedly with your personal circumstances, the
      last thing you want to be worrying about is your van or car. That&apos;s
      why, with our Loss Of Earnings & Life Event Cover on vans and our
      Redundancy & Life Event Cover on cars, during the life of your contract,
      we&apos;ll help negotiate a settlement figure for you to return your
      vehicle, without any additional cost to you.
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

export default Redundancy;
