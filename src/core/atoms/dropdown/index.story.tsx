import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import Dropdown from '.';

storiesOf(`${atomicDir(base)}/Dropdown`, module).add('Default', () => (
  <Dropdown label="Dropdown">
    <h3>One</h3>
    <h3>Two</h3>
    <h3>Three</h3>
  </Dropdown>
));
