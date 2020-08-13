import { FC } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import EligibilityCheckerButton from './EligibilityCheckerButton';

interface ICustomerThing {
  heading: string | null;
  description: string | null;
}

const CustomerThing: FC<ICustomerThing> = ({ heading, description }) => (
  <div className="row:lead-text">
    <Heading size="large" color="black">
      {heading}
    </Heading>
    <Text tag="p" size="regular" color="darker">
      {description}
    </Text>
    <EligibilityCheckerButton />
  </div>
);

export default CustomerThing;
