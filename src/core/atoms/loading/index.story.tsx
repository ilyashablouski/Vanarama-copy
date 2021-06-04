import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import Loading from '.';

storiesOf(`${atomicDir(base)}/Loading`, module)
  .add('Default', () => <Loading />)

  .add('Large', () => <Loading size="large" />);
