import React from 'react';
import base from 'paths.macro';
import { storiesOf } from '@storybook/react';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import BlackFridayBanner from './BlackFridayBanner';
import BlackFridayPlainBanner from './BlackFridayPlainBanner';

storiesOf(`${atomicDir(base)}/BlackFridayBanner`, module)
  .add('PDP', () => <BlackFridayBanner />)
  .add('Summary', () => <BlackFridayPlainBanner />);
