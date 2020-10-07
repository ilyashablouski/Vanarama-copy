/* eslint-disable react-hooks/exhaustive-deps */
import ProgressIndicator from '@vanarama/uibook/lib/components/molecules/progress-indicator';
import Step from '@vanarama/uibook/lib/components/molecules/progress-indicator/Step';
import StepLink from '@vanarama/uibook/lib/components/molecules/progress-indicator/StepLink';
import React, { useEffect, useMemo } from 'react';
import NextJsLink from 'next/link';
import { useRouter } from 'next/router';
import generateLimitedSteps from './generateLimitedSteps';
import generateSoleTraderSteps from './generateSoleTraderSteps';
import { IBusinessProgressIndicatorProps } from './interfaces';
import { getUrlParam } from '../../utils/url';
import useProgressHistory from '../../hooks/useProgressHistory';

type QueryParams = {
  companyUuid: string;
  redirect?: string;
  orderId: string;
};

const BusinessProgressIndicator: React.FC<IBusinessProgressIndicatorProps> = ({
  isSoleTraderJouney,
}) => {
  const { pathname, query } = useRouter();
  const { companyUuid, redirect, orderId } = query as QueryParams;
  const { setCachedLastStep, cachedLastStep } = useProgressHistory(orderId);

  const latestStep = cachedLastStep;

  // Only regenerate the steps if the `orderId` changes
  const steps = useMemo(
    () =>
      isSoleTraderJouney ? generateSoleTraderSteps() : generateLimitedSteps(),
    [orderId],
  );
  // Work out the current step based on the URL
  const currentStep = steps.find(x => x.href === pathname)?.step || 1;
  // If the querystring contains `redirect=summary` then the current step is being edited
  const editingStep = redirect === 'summary' ? currentStep : 0;
  // If the current step is being edited then mark the summary step as the active step
  const activeStep = editingStep ? steps[steps.length - 1]?.step : latestStep;

  const asHref = getUrlParam({
    companyUuid,
    orderId,
    redirect: activeStep === 6 ? 'summary' : '',
  });

  useEffect(() => {
    if (currentStep > latestStep) {
      setCachedLastStep(currentStep);
    }
  }, [currentStep]);

  return (
    <ProgressIndicator activeStep={activeStep || 0}>
      {steps.map(({ href, label, step }) => {
        const url = href + asHref;
        return (
          <Step key={href} editing={editingStep === step} step={step}>
            <NextJsLink
              href={url}
              as={url.replace('[companyUuid]', companyUuid)}
              passHref
            >
              <StepLink label={label} />
            </NextJsLink>
          </Step>
        );
      })}
    </ProgressIndicator>
  );
};

export default BusinessProgressIndicator;
