import ProgressIndicator from '@vanarama/uibook/lib/components/molecules/progress-indicator';
import { useRouter } from 'next/router';
import React from 'react';

const OLAFProgressIndicator: React.FC = () => {
  const uuid = useRouter().query.uuid as string;
  return (
    <ProgressIndicator>
      <ProgressIndicator.Step
        href={uuid ? `/olaf/about/${uuid}` : '/olaf/about'}
        label="About You"
        status="incomplete"
        step={1}
      />
      <ProgressIndicator.Step
        href={`/olaf/address-history/${uuid}`}
        label="Address History"
        status="incomplete"
        step={2}
      />
      <ProgressIndicator.Step
        href={`/olaf/employment-history/${uuid}`}
        label="Employment History"
        status="incomplete"
        step={3}
      />
      <ProgressIndicator.Step
        href={`/olaf/expenses/${uuid}`}
        label="Expenses"
        status="incomplete"
        step={4}
      />
      <ProgressIndicator.Step
        href={`/olaf/bank-details/${uuid}`}
        label="Details"
        status="incomplete"
        step={5}
      />
      <ProgressIndicator.Step
        href={`/olaf/summary/${uuid}`}
        label="Summary"
        status="incomplete"
        step={6}
      />
    </ProgressIndicator>
  );
};

export default OLAFProgressIndicator;
