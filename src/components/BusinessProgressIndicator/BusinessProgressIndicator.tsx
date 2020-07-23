import ProgressIndicator from '@vanarama/uibook/lib/components/molecules/progress-indicator';
import Step from '@vanarama/uibook/lib/components/molecules/progress-indicator/Step';
import StepLink from '@vanarama/uibook/lib/components/molecules/progress-indicator/StepLink';
import React, { useMemo } from 'react';
import NextJsLink from 'next/link';
import { useRouter } from 'next/router';
import generateLimitedSteps from './generateLimitedSteps';
import generateSoleTraderSteps from './generateSoleTraderSteps';
import { IBusinessProgressIndicatorProps } from './interfaces';

type QueryParams = {
  companyUuid: string;
};

const BusinessProgressIndicator: React.FC<IBusinessProgressIndicatorProps> = ({
  isSoleTraderJouney,
}) => {
  const { pathname, query } = useRouter();
  const { companyUuid } = query as QueryParams;
  const steps = useMemo(
    () =>
      isSoleTraderJouney ? generateSoleTraderSteps() : generateLimitedSteps(),
    [],
  );

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

export default BusinessProgressIndicator;
