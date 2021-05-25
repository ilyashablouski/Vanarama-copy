/* eslint-disable react-hooks/exhaustive-deps */
import dynamic from 'next/dynamic';
import React, { useEffect, useMemo } from 'react';
import NextJsLink from 'next/link';
import { useRouter } from 'next/router';
import generateLimitedSteps from './generateLimitedSteps';
import generateSoleTraderSteps from './generateSoleTraderSteps';
import { IBusinessProgressIndicatorProps } from './interfaces';
import { getUrlParam } from '../../utils/url';
import useProgressHistory from '../../hooks/useProgressHistory';
import useGetPersonUuid from '../../hooks/useGetPersonUuid';
import useGetOrderId from '../../hooks/useGetOrderId';
import { useMobileViewport } from '../../hooks/useMediaQuery';
import { scrollingSteps } from '../ConsumerProgressIndicator/helpers';

const ProgressIndicator = dynamic(() =>
  import('core/molecules/progress-indicator'),
);
const Step = dynamic(() => import('core/molecules/progress-indicator/Step'));
const StepLink = dynamic(() =>
  import('core/molecules/progress-indicator/StepLink'),
);

type QueryParams = {
  companyUuid: string;
  redirect?: string;
  orderId: string;
};

const BusinessProgressIndicator: React.FC<IBusinessProgressIndicatorProps> = ({
  isSoleTraderJourney,
}) => {
  const { pathname, query, asPath } = useRouter();
  const { companyUuid } = query as QueryParams;
  const { setCachedLastStep, cachedLastStep } = useProgressHistory();
  const orderId = useGetOrderId();
  const personUuid = useGetPersonUuid();
  const isMobile = useMobileViewport();

  // Only regenerate the steps if the `orderId` changes
  const steps = useMemo(
    () =>
      isSoleTraderJourney ? generateSoleTraderSteps() : generateLimitedSteps(),
    [orderId],
  );
  // Work out the current step based on the URL
  const currentStep = steps.find(x => x.href === pathname)?.step || 1;

  const queryParams = getUrlParam({
    companyUuid,
    isSoleTraderJourney,
    redirect: currentStep < cachedLastStep ? undefined : asPath,
  });

  // do not show redirect param in url
  const queryParamsMask = getUrlParam({
    companyUuid,
    isSoleTraderJourney,
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
        const urlMask = `${href}${queryParamsMask}`
          .replace('[companyUuid]', companyUuid)
          .replace('[personUuid]', personUuid);

        return (
          <Step
            key={href}
            step={step}
            id={`step_${step}`}
            hidden={step === cachedLastStep && href !== pathname}
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

export default BusinessProgressIndicator;
