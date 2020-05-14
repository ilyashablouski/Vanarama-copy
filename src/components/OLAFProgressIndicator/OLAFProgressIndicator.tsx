import ProgressIndicator from '@vanarama/uibook/lib/components/molecules/progress-indicator';
import Step from '@vanarama/uibook/lib/components/molecules/progress-indicator/Step';
import StepLink from '@vanarama/uibook/lib/components/molecules/progress-indicator/StepLink';
import NextJsLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

const OLAFProgressIndicator: React.FC = () => {
  const { pathname, query } = useRouter();
  const { redirect, uuid } = query as { [key: string]: string };

  // Only regenerate the steps if the `uuid` changes
  const steps = useMemo(() => generateSteps(uuid), [uuid]);
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

function generateSteps(uuid: string) {
  return [
    {
      href: uuid ? `/olaf/about/[uuid]` : '/olaf/about',
      label: 'About You',
      step: 1,
    },
    {
      href: `/olaf/address-history/[uuid]`,
      label: 'Address History',
      step: 2,
    },
    {
      href: `/olaf/employment-history/[uuid]`,
      label: 'Employment History',
      step: 3,
    },
    {
      href: `/olaf/expenses/[uuid]`,
      label: 'Expenses',
      step: 4,
    },
    {
      href: `/olaf/bank-details/[uuid]`,
      label: 'Bank Details',
      step: 5,
    },
    {
      href: `/olaf/summary/[uuid]`,
      label: 'Summary',
      step: 6,
    },
  ];
}

export default OLAFProgressIndicator;
