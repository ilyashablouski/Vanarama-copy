import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import Details from '.';

storiesOf(`${atomicDir(base)}/Details`, module)
  .add('Open', () => (
    <Details summary="Details" open>
      <ul>
        <li>This is a text.</li>
        <li>This is a text.</li>
        <li>This is a text.</li>
      </ul>
    </Details>
  ))
  .add('Closed', () => (
    <Details summary="Details" open={false}>
      <ul>
        <li>This is a text.</li>
        <li>This is a text.</li>
        <li>This is a text.</li>
      </ul>
    </Details>
  ));
