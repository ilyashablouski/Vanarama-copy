import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import { IBaseProps } from 'core/interfaces/base';
import RouterLink from '../../../components/RouterLink/RouterLink';
import Skeleton from '../../../components/Skeleton';

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

const TermsAndConditions: FC<IBaseProps> = ({ dataUiTestId }) => (
  <div className="row:text">
    <Text size="regular" color="dark">
      Photos and videos are for illustration purposes only.{' '}
      <RouterLink
        link={{
          href: '/legal/terms-and-conditions',
          label: 'Terms and conditions apply',
        }}
        classNames={{ color: 'teal' }}
        dataUiTestId={`${dataUiTestId}_link_terms-and-conditions`}
      >
        Terms and conditions apply
      </RouterLink>
      .
    </Text>
  </div>
);

export default TermsAndConditions;
