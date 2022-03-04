import React, { FC } from 'react';
import RouterLink from '../../RouterLink/RouterLink';

const EligibilityCheckerButton: FC<{}> = () => {
  return (
    <RouterLink
      className="button"
      classNames={{ color: 'teal', solid: true, size: 'regular' }}
      link={{
        label: 'Check Your Eligibility',
        href: '/lease-eligibility-checker/details',
      }}
      withoutDefaultClassName
      dataTestId="eligibility-Checker-btn"
    >
      <div className="button--inner">Check Your Eligibility</div>
    </RouterLink>
  );
};

export default EligibilityCheckerButton;
