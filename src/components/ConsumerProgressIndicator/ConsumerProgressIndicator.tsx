/* eslint-disable react-hooks/exhaustive-deps */
import ProgressIndicator from '@vanarama/uibook/lib/components/molecules/progress-indicator';
import Step from '@vanarama/uibook/lib/components/molecules/progress-indicator/Step';
import StepLink from '@vanarama/uibook/lib/components/molecules/progress-indicator/StepLink';
import NextJsLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { getUrlParam } from '../../utils/url';

type QueryParams = {
  redirect?: string;
  uuid: string;
  orderId: string;
};

const ConsumerProgressIndicator: React.FC = () => {
  const { pathname, query } = useRouter();
  const { redirect, uuid, orderId } = query as QueryParams;

  // Only regenerate the steps if the `orderId` changes
  const steps = useMemo(() => generateSteps(), [orderId]);
  // Work out the current step based on the URL
  const currentStep = steps.find(x => x.href === pathname)?.step;
  // If the querystring contains `redirect=summary` then the current step is being edited
  const editingStep = redirect === 'summary' ? currentStep : 0;
  // If the current step is being edited then mark the summary step as the active step
  const activeStep = editingStep
    ? steps.find(x => x.href === '/olaf/summary/[orderId]')?.step
    : currentStep;

  const asHref = getUrlParam({
    uuid,
    redirect: activeStep === 6 ? 'summary' : '',
  });

  return (
    <ProgressIndicator activeStep={activeStep || 0}>
      {steps.map(({ href, label, step }) => {
        const url = href + asHref;
        return (
          <Step key={href} editing={editingStep === step} step={step}>
            <NextJsLink
              href={url}
              as={url.replace('[orderId]', orderId)}
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

function generateSteps() {
  return [
    {
      href: '/olaf/about/[orderId]',
      label: 'About You',
      step: 1,
    },
    {
      href: '/olaf/address-history/[orderId]',
      label: 'Address History',
      step: 2,
    },
    {
      href: '/olaf/employment-history/[orderId]',
      label: 'Employment History',
      step: 3,
    },
    {
      href: '/olaf/expenses/[orderId]',
      label: 'Expenses',
      step: 4,
    },
    {
      href: '/olaf/bank-details/[orderId]',
      label: 'Bank Details',
      step: 5,
    },
    {
      href: '/olaf/summary/[orderId]',
      label: 'Summary',
      step: 6,
    },
  ];
}

export default ConsumerProgressIndicator;
