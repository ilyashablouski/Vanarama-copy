import { storiesOf } from '@storybook/react';
import base from 'paths.macro';
import React from 'react';
import ProgressIndicator from '.';
import { atomicDir } from '../../../helpers/atomicDirUtils';
import Step from './Step';
import StepLink from './StepLink';

storiesOf(`${atomicDir(base)}|ProgressIndicator`, module)
  .add('Default', () => (
    <ProgressIndicator activeStep={1}>
      <Step step={1}>
        <StepLink href="#" label="About You" />
      </Step>
      <Step step={2}>
        <StepLink href="#" label="Address History" />
      </Step>
      <Step step={3}>
        <StepLink href="#" label="Employment History" />
      </Step>
      <Step step={4}>
        <StepLink href="#" label="Expenses" />
      </Step>
      <Step step={5}>
        <StepLink href="#" label="Bank Details" />
      </Step>
      <Step step={6}>
        <StepLink href="#" label="Summary" />
      </Step>
    </ProgressIndicator>
  ))
  .add('Index', () => (
    <ProgressIndicator activeStep={5}>
      <Step step={1}>
        <StepLink href="#" label="About You" />
      </Step>
      <Step step={2}>
        <StepLink href="#" label="Address History" />
      </Step>
      <Step step={3}>
        <StepLink href="#" label="Employment History" />
      </Step>
      <Step step={4}>
        <StepLink href="#" label="Expenses" />
      </Step>
      <Step step={5}>
        <StepLink href="#" label="Bank Details" />
      </Step>
      <Step step={6}>
        <StepLink href="#" label="Summary" />
      </Step>
    </ProgressIndicator>
  ))
  .add('Editing', () => (
    <ProgressIndicator activeStep={4}>
      <Step step={1}>
        <StepLink href="#" label="About You" />
      </Step>
      <Step step={2} editing>
        <StepLink href="#" label="Address History" />
      </Step>
      <Step step={3}>
        <StepLink href="#" label="Employment History" />
      </Step>
      <Step step={4}>
        <StepLink href="#" label="Expenses" />
      </Step>
      <Step step={5}>
        <StepLink href="#" label="Bank Details" />
      </Step>
      <Step step={6}>
        <StepLink href="#" label="Summary" />
      </Step>
    </ProgressIndicator>
  ));
