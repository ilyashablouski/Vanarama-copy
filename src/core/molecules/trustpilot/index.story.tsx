import { storiesOf } from '@storybook/react';
import base from 'paths.macro';
import React from 'react';

import Trustpilot from '.';
import { atomicDir } from '../../../helpers/atomicDirUtils';

storiesOf(`${atomicDir(base)}/Trustpilot`, module).add('Default', () => (
  <Trustpilot />
));
