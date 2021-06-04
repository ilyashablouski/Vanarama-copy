import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import Text from '.';

storiesOf(`${atomicDir(base)}/Text`, module).add('Default', () => (
  <Text>Example Text</Text>
));

storiesOf(`${atomicDir(base)}/Text`, module).add('Label', () => (
  <Text tag="label">Example Text</Text>
));

storiesOf(`${atomicDir(base)}/Text`, module).add('Paragraph', () => (
  <Text tag="p">Example Text</Text>
));
