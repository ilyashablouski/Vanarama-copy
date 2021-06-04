import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import Score from '.';

storiesOf(`${atomicDir(base)}/Score`, module)
  .add('0', () => <Score score={0} />)
  .add('25', () => <Score score={25} />)
  .add('50', () => <Score score={50} />)
  .add('75', () => <Score score={75} />)
  .add('100', () => <Score score={100} />);
