import { storiesOf } from '@storybook/react';
import base from 'paths.macro';
import React from 'react';
import Checkbox from '.';
import { atomicDir } from '../../../helpers/atomicDirUtils';
import Formgroup from '../../molecules/formgroup';

storiesOf(`${atomicDir(base)}|Checkbox`, module)
  .add('Grouped', () => (
    <Formgroup label="Checkbox Group">
      <Checkbox id="leasing" label="Leasing" />
      <Checkbox id="finance" label="Finance Options" />
      <Checkbox id="hire" label="Business Contract Hire" />
    </Formgroup>
  ))
  .add('Default', () => (
    <Checkbox
      id="marketing"
      label="I wish to receive emails and SMS messages for updates on the latest deals, offers and promotions."
    />
  ))
  .add('Checked', () => (
    <Checkbox
      id="marketing"
      label="I wish to receive emails and SMS messages for updates on the latest deals, offers and promotions."
      defaultChecked
    />
  ))
  .add('Disabled', () => (
    <Checkbox
      id="marketing"
      label="I wish to receive emails and SMS messages for updates on the latest deals, offers and promotions."
      defaultChecked
      disabled
    />
  ))
  .add('Outline', () => (
    <Checkbox
      id="terms"
      label="I wish to receive emails and SMS messages."
      outline
    />
  ))
  .add('Invalid', () => (
    <Checkbox
      id="terms"
      label="I wish to receive emails and SMS messages."
      invalid
    />
  ))
  .add('Invalid grouped', () => (
    <Formgroup label="Checkbox Group" error="Please make a selection">
      <Checkbox id="leasing" label="Leasing" />
      <Checkbox id="finance" label="Finance Options" />
      <Checkbox id="hire" label="Business Contract Hire" />
    </Formgroup>
  ))
  .add('Color', () => (
    <Checkbox
      id="terms"
      label="I wish to receive emails and SMS messages."
      color="orange"
    />
  ))
  .add('Label with link', () => (
    <Checkbox
      id="terms"
      label={[
        'I agree to the ',
        <a
          className="link -teal"
          href="/legal/terms-and-conditions/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms and Conditions
        </a>,
      ]}
      color="orange"
    />
  ));
