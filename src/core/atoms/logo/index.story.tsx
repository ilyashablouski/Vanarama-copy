import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import Logo from '.';

storiesOf(`${atomicDir(base)}/Logo`, module)
  .add('Vanarama', () => <Logo assetName="vanarama" />)
  .add('BVRLA', () => <Logo assetName="bvrla" />);
