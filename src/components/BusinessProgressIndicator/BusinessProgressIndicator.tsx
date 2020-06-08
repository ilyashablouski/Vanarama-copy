import ProgressIndicator from '@vanarama/uibook/lib/components/molecules/progress-indicator';
import Step from '@vanarama/uibook/lib/components/molecules/progress-indicator/Step';
import StepLink from '@vanarama/uibook/lib/components/molecules/progress-indicator/StepLink';
import React from 'react';

const BusinessProgressIndicator: React.FC = () => (
  <ProgressIndicator activeStep={1}>
    <Step step={1}>
      <StepLink label="About You" />
    </Step>
  </ProgressIndicator>
);

export default BusinessProgressIndicator;
