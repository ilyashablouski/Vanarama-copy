import ProgressIndicator from '@vanarama/uibook/lib/components/molecules/progress-indicator';
import Step from '@vanarama/uibook/lib/components/molecules/progress-indicator/Step';
import StepLink from '@vanarama/uibook/lib/components/molecules/progress-indicator/StepLink';
import React, { useMemo } from 'react';
import NextJsLink from 'next/link';
import { useRouter } from 'next/router';

type QueryParams = {
  companyUuid: string;
};

const SoleTraderProgressIndicator: React.FC = () => {
  const { pathname, query } = useRouter();
  const { companyUuid } = query as QueryParams;
  const steps = useMemo(() => generateSteps(), []);

  // Work out the current step based on the URL
  const currentStep = steps.find(x => x.href === pathname)?.step;
  return (
    <ProgressIndicator activeStep={currentStep || 0}>
      {steps.map(({ href, label, step }) => (
        <Step key={href} step={step}>
          <NextJsLink
            href={href}
            as={href.replace('[companyUuid]', companyUuid)}
            passHref
          >
            <StepLink label={label} />
          </NextJsLink>
        </Step>
      ))}
    </ProgressIndicator>
  );
};

function generateSteps() {
  return [
    {
      href: '/b2b/olaf/about',
      label: 'About You',
      step: 1,
    },
    {
      href: '/b2b/olaf/sole-trader/company-details/[personUuid]',
      label: 'Company Details',
      step: 2,
    },
    {
      href: '/b2b/olaf/sole-trader/vat-details/[companyUuid]',
      label: 'VAT Details',
      step: 3,
    },
    {
      href: '/b2b/olaf/sole-trader/sole-trader-details/[companyUuid]',
      label: 'Sole Trader Details',
      step: 4,
    },
    {
      href: '/b2b/olaf/sole-trader/company-bank-details/[companyUuid]',
      label: 'Company Bank Details',
      step: 5,
    },
    {
      href: '/b2b/olaf/sole-trader/summary/[companyUuid]',
      label: 'Summary',
      step: 6,
    },
  ];
}

export default SoleTraderProgressIndicator;
