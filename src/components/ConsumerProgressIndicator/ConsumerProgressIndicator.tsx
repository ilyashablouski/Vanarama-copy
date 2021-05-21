import ProgressIndicator from 'core/molecules/progress-indicator';
import Step from 'core/molecules/progress-indicator/Step';
import StepLink from 'core/molecules/progress-indicator/StepLink';
import NextJsLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import { getUrlParam } from '../../utils/url';
import useProgressHistory from '../../hooks/useProgressHistory';
import useGetOrderId from '../../hooks/useGetOrderId';
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
  const { uuid } = query as QueryParams;
  const orderId = useGetOrderId();
  const { setCachedLastStep, cachedLastStep } = useProgressHistory();
  const isMobile = useMobileViewport();

  // Only regenerate the steps if the `orderId` changes
  const steps = useMemo(() => generateConsumerSteps(), [orderId]);
  // Work out the current step based on the URL
  const currentStep = steps.find(x => x.href === pathname)?.step || 1;

  const queryParams = getUrlParam({
    uuid,
    redirect: asPath,
  });

  // do not show redirect param in url
  const queryParamsMask = getUrlParam({
    uuid,
  });

  useEffect(() => {
    if (currentStep > cachedLastStep) {
      setCachedLastStep(currentStep);
    }
  }, [currentStep]);

  useEffect(() => {
    if (isMobile && !!document) {
      scrollingSteps(currentStep);
    }
  }, [isMobile]);

  return (
    <ProgressIndicator activeStep={cachedLastStep || 0} id="progress-indicator">
      {steps.map(({ href, label, step }) => {
        const url = `${href}${queryParams}`;
        const urlMask = `${href}${queryParamsMask}`;

        return (
          <Step
            key={href}
            step={step}
            id={`step_${step}`}
            editing={href === pathname && step <= cachedLastStep}
          >
            <NextJsLink href={url} as={urlMask} passHref>
              <StepLink label={label} />
            </NextJsLink>
          </Step>
        );
      })}
    </ProgressIndicator>
  );
};

export default ConsumerProgressIndicator;
