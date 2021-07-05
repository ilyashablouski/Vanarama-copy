import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import ToggleV2 from '.';

storiesOf(`${atomicDir(base)}/ToggleV2`, module).add('Default', () => (
  <ToggleV2
    leftLabel="Personal"
    rightLabel="Business"
    leftId="r1"
    rightId="r2"
  />
));
