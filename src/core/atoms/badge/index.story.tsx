import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import Badge from '.';

storiesOf(`${atomicDir(base)}/Badge`, module)
  .add('Danger', () => <Badge color="danger" label="Badge" />)

  .add('Success', () => <Badge color="success" label="Badge" />)

  .add('Warning', () => <Badge color="warning" label="Badge" />);
