import React from 'react';

import Heading from 'core/atoms/heading';
import Text from 'core/atoms/text';

import RouterLink from '../../../components/RouterLink';

const FreeInsurance = () => (
  <>
    <Heading className="title -mt-400" color="black" size="large" tag="span">
      Lease This Car Online & Get 1 Year&apos;s FREE Insurance
    </Heading>
    <Text size="regular" color="darker" className="copy -mt-500">
      At Vanarama we’re helping our customers find a New Lease Of Life and now,
      when you lease a brand-new car, you’ll get 12 month&apos;s FREE insurance*
      cover worth £538 too!
    </Text>
    <Text size="regular" color="darker" className="copy -mt-200">
      As an insurance broker, Vanarama Insurance Services has designed a
      comprehensive policy specifically for leasing and you&apos;re covered free
      of charge for a whole year!
    </Text>
    <div className="row:text -mv-300">
      <Text size="regular" color="darker">
        {'*Offer available on selected models only. '}
        <RouterLink
          link={{
            href: '/legal/terms-and-conditions.html',
            label: 'Terms and conditions apply',
          }}
          classNames={{ color: 'teal' }}
        >
          Terms and conditions apply
        </RouterLink>
        .
      </Text>
    </div>
    <RouterLink
      classNames={{
        color: 'teal',
      }}
      link={{
        href: '/car-leasing/free-car-insurance',
        label: 'Find Out More',
      }}
    />
  </>
);

export default FreeInsurance;