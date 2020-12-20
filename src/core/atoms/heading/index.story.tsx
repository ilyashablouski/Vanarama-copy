import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import Heading from '.';

storiesOf(`${atomicDir(base)}|Heading`, module)
  .add('H1 Primary Small', () => (
    <Heading tag="h1" color="primary" size="small">
      Heading
    </Heading>
  ))

  .add('H2 Secondary Regular', () => (
    <Heading tag="h2" color="secondary" size="regular">
      Heading
    </Heading>
  ))

  .add('Default Orange Large', () => (
    <Heading color="orange" size="large">
      Heading
    </Heading>
  ));
