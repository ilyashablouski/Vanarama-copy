import React from 'react';
import { useRouter } from 'next/router';
import ProgressIndicator from '@vanarama/uibook/lib/components/molecules/progress-indicator';
import Step from '@vanarama/uibook/lib/components/molecules/progress-indicator/Step';
import StepLink from '@vanarama/uibook/lib/components/molecules/progress-indicator/StepLink';
import NextJsLink from 'next/link';

interface IProps {
  steps: {
    href: string;
    label: string;
    step: number;
  }[];
}

type QueryParams = {
  redirect?: string;
  uuid: string;
};

const ContextualProgressIndicator: React.FC<IProps> = ({ steps }) => {
  const { pathname, query } = useRouter();
  const { redirect, uuid } = query as QueryParams;

  // Work out the current step based on the URL
  const currentStep = steps.find(x => x.href === pathname)?.step;
  // If the querystring contains `redirect=summary` then the current step is being edited
  const editingStep = redirect === 'summary' ? currentStep : 0;
  // If the current step is being edited then mark the summary step as the active step
  const activeStep = editingStep
    ? steps.find(x => x.href === '/olaf/summary/[uuid]')?.step
    : currentStep;

  return (
    <ProgressIndicator activeStep={activeStep || 0}>
      {steps.map(({ href, label, step }) => (
        <Step key={href} editing={editingStep === step} step={step}>
          <NextJsLink href={href} as={href.replace('[uuid]', uuid)} passHref>
            <StepLink label={label} />
          </NextJsLink>
        </Step>
      ))}
    </ProgressIndicator>
  );
};

export default ContextualProgressIndicator;
