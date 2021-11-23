import React from 'react';
import base from 'paths.macro';
import { storiesOf } from '@storybook/react';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import BlackFridayBanner from './BlackFridayBanner';
import BlackFridayPlainBanner from './BlackFridayPlainBanner';
import { isExtensionBlackFridayCampaignEnabled } from '../../../utils/helpers';

storiesOf(`${atomicDir(base)}/BlackFridayBanner`, module)
  .add('PDP', () => (
    <BlackFridayBanner
      className="bf-banner--pdp"
      rightText={
        isExtensionBlackFridayCampaignEnabled()
          ? 'Extended To 29th Nov'
          : 'Ends 26th November'
      }
    />
  ))
  .add('HMC', () => (
    <BlackFridayBanner
      className="bf-banner--hmc"
      rightText="On every vehicle"
    />
  ))
  .add('Summary', () => (
    <BlackFridayPlainBanner className="bf-banner--summary" />
  ))
  .add('Global Search', () => (
    <BlackFridayPlainBanner className="bf-banner--global-search" />
  ));
