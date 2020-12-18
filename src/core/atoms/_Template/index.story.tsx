import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import Template from '.';

storiesOf(`${atomicDir(base)}|_Template`, module).add('Default', () => (
  <Template />
));
