import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import Step from '.';

storiesOf(`${atomicDir(base)}|Step`, module).add('One step', () => (
  <Step step={1} heading="Heading" text="Text" />
));
