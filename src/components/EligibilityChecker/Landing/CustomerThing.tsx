import dynamic from 'next/dynamic';
import { FC } from 'react';
import Skeleton from '../../Skeleton';

const Text = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/text'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const EligibilityCheckerButton = dynamic(
  () => import('./EligibilityCheckerButton'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

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
