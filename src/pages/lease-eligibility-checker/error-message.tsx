import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import Skeleton from '../../components/Skeleton';
import Link from '../../core/atoms/link';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

const ErrorMessage: FC = () => (
  <div style={{ paddingBottom: '1rem' }}>
    <Heading
      tag="span"
      size="regular"
      color="danger"
      dataTestId="eligibility-checker-error-message"
    >
      Ooops - Something Went Wrong
    </Heading>
    <Text tag="p" color="danger">
      We’re sorry, we can’t seem to find any information using the details
      you’ve provided. Please get in touch with Experian on 0344 481 0800 to
      update your credit profile or you can call us on{` `}
      <Link className="InfinityNumber" color="danger" href="01442838195">
        01442 838 195{` `}
      </Link>
      to find out more.
    </Text>
  </div>
);

export default ErrorMessage;
