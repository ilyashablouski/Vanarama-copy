import { FC } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import EligibilityCheckerButton from './EligibilityCheckerButton';

const CustomerThing: FC = () => (
  <div className="row:lead-text">
    <Heading size="large" color="black">
      What Do Our Customers Think?
    </Heading>
    <Text tag="p" size="regular" color="darker">
      More than 1,000 people use our Eligibility Checker every week to find out
      their likelihood of getting accepted to lease a new car lease.
    </Text>
    <EligibilityCheckerButton />
  </div>
);

export default CustomerThing;
