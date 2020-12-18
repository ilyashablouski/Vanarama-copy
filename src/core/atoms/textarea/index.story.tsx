import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import Textarea from '.';
import Formgroup from '../../molecules/formgroup';

storiesOf(`${atomicDir(base)}|Textarea`, module)
  .add('Default', () => <Textarea />)
  .add('Disabled', () => <Textarea disabled />)
  .add('Invalid', () => (
    <Formgroup
      controlId="example"
      label="Textarea label"
      error="Please enter content"
    >
      <Textarea id="example" />
    </Formgroup>
  ));
