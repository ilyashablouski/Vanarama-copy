import { FC } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import EligibilityCheckerButton from './EligibilityCheckerButton';

const CustomerThing: FC = () => (
  <section className="section">
    <div className="container">
      <div>
        <div className="-col-400 -a-center">
          <Heading size="large" color="black">
            What Do Our Customers Think?
          </Heading>
          <Text tag="p" size="expand" color="darker">
            More than 1,000 people use our Eligibility Checker every week to
            find out their likelihood of getting accepted to lease a new car
            lease.
          </Text>
          <EligibilityCheckerButton />
        </div>
      </div>
    </div>
  </section>
);

export default CustomerThing;
