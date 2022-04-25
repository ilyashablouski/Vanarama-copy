import ProgressIndicator from 'core/molecules/progress-indicator';
import Step from 'core/molecules/progress-indicator/Step';
import StepLink from 'core/molecules/progress-indicator/StepLink';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { getUrlParam } from '../../utils/url';
import useProgressHistory from '../../hooks/useProgressHistory';
import { useMobileViewport } from '../../hooks/useMediaQuery';
import { scrollingSteps } from './helpers';
import generateConsumerSteps from './generateConsumerSteps';

type QueryParams = {
  redirect?: string;
  uuid: string;
  orderId: string;
};

const ConsumerProgressIndicator: React.FC = () => {
  const { pathname, query, asPath } = useRouter();
  const { uuid, redirect } = query as QueryParams;
  const { setCachedLastStep, cachedLastStep } = useProgressHistory();
  const isMobile = useMobileViewport();

  // Only regenerate the steps if the `orderId` changes
  const steps = useMemo(() => generateConsumerSteps(), []);
  // Work out the current step based on the URL
  const currentStep =
    steps.find(stepItem => stepItem.href === pathname)?.step || 1;

  // do not show redirect param in url
  const queryParamsMask = getUrlParam({
    uuid,
  });

  useEffect(() => {
    if (currentStep > cachedLastStep) {
      setCachedLastStep(currentStep);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, cachedLastStep]);

  useEffect(() => {
    if (isMobile && !!document) {
      scrollingSteps(currentStep);
    }
  }, [isMobile, currentStep]);

  return (
    <ProgressIndicator activeStep={cachedLastStep || 0} id="progress-indicator">
      {steps.map(({ href, label, step }) => {
        const url = `${href}${getUrlParam({
          uuid,
          redirect: step < cachedLastStep ? redirect || asPath : undefined,
        })}`;
        const urlMask = `${href}${queryParamsMask}`;

        return (
          <Step
            key={href}
            step={step}
            id={`step_${step}`}
            hidden={step === cachedLastStep && href !== pathname}
            editing={href === pathname && step < cachedLastStep}
          >
            <Link href={url} as={urlMask} passHref prefetch={false}>
              <StepLink label={label} />
            </Link>
          </Step>
        );
      })}
    </ProgressIndicator>
  );
};

export default ConsumerProgressIndicator;
