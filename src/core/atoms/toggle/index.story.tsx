import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import Toggle from '.';

storiesOf(`${atomicDir(base)}|Toggle`, module)
  .add('Default', () => (
    <Toggle id="example" onLabel="Toggle On" offLabel="Toggle Off" />
  ))
  .add('Toggled', () => (
    <Toggle
      id="example"
      onLabel="Toggle On"
      offLabel="Toggle Off"
      defaultChecked
    />
  ))
  .add('Color', () => (
    <>
      <Toggle id="orange" onLabel="Toggle On" offLabel="Toggle Off" />
      <br />
      <Toggle
        id="teal"
        onLabel="Toggle On"
        offLabel="Toggle Off"
        color="teal"
      />
      <br />
      <Toggle
        id="darker"
        onLabel="Toggle On"
        offLabel="Toggle Off"
        color="darker"
      />
    </>
  ))
  .add('Disabled', () => (
    <Toggle id="example" onLabel="Toggle On" offLabel="Toggle Off" disabled />
  ));
