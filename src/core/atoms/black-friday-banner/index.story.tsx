import React from 'react';
import base from 'paths.macro';
import { storiesOf } from '@storybook/react';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import BlackFridayPDPBanner from './BlackFridayPDPBanner';
import BlackFridaySummaryBanner from './BlackFridaySummaryBanner';

storiesOf(`${atomicDir(base)}/BlackFridayBanner`, module)
  .add('PDP', () => <BlackFridayPDPBanner />)
  .add('Summary', () => <BlackFridaySummaryBanner />);
