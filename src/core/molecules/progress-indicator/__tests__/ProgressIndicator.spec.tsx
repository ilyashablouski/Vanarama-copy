import { render, screen } from '@testing-library/react';
import React from 'react';
import Step from '../Step';
import ProgressIndicator from '../ProgressIndicator';
import StepLink from '../StepLink';

describe('<ProgressIndicator />', () => {
  it('should render links correctly for each step', () => {
    render(
      <ProgressIndicator activeStep={3}>
        <Step step={1}>
          <StepLink href="/step-one" label="Step one" />
        </Step>
        <Step step={2} editing>
          <StepLink href="/step-two" label="Step two" />
        </Step>
        <Step step={3}>
          <StepLink href="/step-three" label="Step three" />
        </Step>
        <Step step={4}>
          <StepLink href="/step-four" label="Step four" />
        </Step>
      </ProgressIndicator>,
    );

    expect(screen.getByRole('link', { name: /Step one/ })).toHaveProperty(
      'href',
      'http://localhost/step-one',
    );

    expect(screen.queryByRole('link', { name: /Step two/ })).toHaveProperty(
      'href',
      'http://localhost/step-two',
    );

    expect(screen.queryByRole('link', { name: /Step three/ })).toHaveProperty(
      'href',
      'http://localhost/step-three',
    );

    // Link should not exist for incomplete steps
    expect(
      screen.queryByRole('link', { name: /Step four/ }),
    ).not.toBeInTheDocument();
  });

  it('should only show a tick icon if the step is completed', () => {
    render(
      <ProgressIndicator activeStep={3}>
        <Step step={1}>
          <StepLink href="/step-one" label="Step one" />
        </Step>
        <Step step={2} editing>
          <StepLink href="/step-two" label="Step two" />
        </Step>
        <Step step={3}>
          <StepLink href="/step-three" label="Step three" />
        </Step>
        <Step step={4}>
          <StepLink href="/step-four" label="Step four" />
        </Step>
      </ProgressIndicator>,
    );

    // Tick here because completed
    expect(
      screen.getByRole('link', { name: /Step one - complete/ }),
    ).toBeInTheDocument();

    // No tick here as being edited
    expect(
      // eslint-disable-next-line testing-library/prefer-presence-queries
      screen.queryByRole('link', { name: /Step two - editing/ }),
    ).toBeInTheDocument();

    // No tick here because current step
    expect(
      screen.getByRole('link', { name: /Step three - current/ }),
    ).toBeInTheDocument();

    // No tick here because incomplete step
    expect(
      screen.queryByRole('link', { name: /^Step four - incomplete/ }),
    ).not.toBeInTheDocument();
  });
});
