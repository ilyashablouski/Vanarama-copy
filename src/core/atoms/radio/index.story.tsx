import { storiesOf } from '@storybook/react';
import base from 'paths.macro';
import React from 'react';
import Radio from '.';
import { atomicDir } from '../../../helpers/atomicDirUtils';
import Formgroup from '../../molecules/formgroup';

storiesOf(`${atomicDir(base)}|Radio`, module)
  .add('Default', () => (
    <Formgroup label="Default Radio Group">
      <Radio name="example" id="leasing" label="Leasing" />
      <Radio name="example" id="finance" label="Finance Options" />
      <Radio name="example" id="hire" label="Business Contract Hire" />
    </Formgroup>
  ))
  .add('With content', () => (
    <Formgroup label="Radio Group With Content">
      <Radio name="example" id="leasing" label="Leasing">
        Content
      </Radio>
      <Radio name="example" id="finance" label="Finance Options">
        Content
      </Radio>
      <Radio name="example" id="hire" label="Business Contract Hire">
        Content
      </Radio>
    </Formgroup>
  ))
  .add('Selected', () => (
    <Formgroup label="Selected Radio Group">
      <Radio name="example" id="leasing" label="Leasing" />
      <Radio
        name="example"
        id="finance"
        label="Finance Options"
        defaultChecked
      />
      <Radio name="example" id="hire" label="Business Contract Hire" />
    </Formgroup>
  ))
  .add('Disabled', () => (
    <Formgroup label="Disabled Radio Group">
      <Radio name="example" id="leasing" label="Leasing" disabled />
      <Radio name="example" id="finance" label="Finance Options" disabled />
      <Radio name="example" id="hire" label="Business Contract Hire" disabled />
    </Formgroup>
  ))
  .add('Inline', () => (
    <Formgroup label="Inline Radio Group" inline>
      <Radio name="example" id="leasing" label="Leasing" />
      <Radio name="example" id="finance" label="Finance Options" />
      <Radio name="example" id="hire" label="Business Contract Hire" />
    </Formgroup>
  ))
  .add('Invalid', () => (
    <Formgroup label="Invalid Radio Group" error="Please select an option">
      <Radio name="example" id="leasing" label="Leasing" />
      <Radio name="example" id="finance" label="Finance Options" />
      <Radio name="example" id="hire" label="Business Contract Hire" />
    </Formgroup>
  ));
