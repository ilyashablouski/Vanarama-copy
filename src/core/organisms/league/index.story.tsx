import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import League from '.';

storiesOf(`${atomicDir(base)}|League`, module).add('Default', () => (
  <League clickReadMore={() => {}} altText="alternative" />
));
