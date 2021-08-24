import React from 'react';
import base from 'paths.macro';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { atomicDir } from '../../../helpers/atomicDirUtils';
import { Nullish } from '../../../types/common';

import LeaseScanner from './LeaseScanner';

const leasingProviders = [
  'LeasePlan',
  'Arval',
  'Lex',
  'Hitachi',
  'ALD',
  'BNP Paribas',
  'Leasys',
  'Santander',
  'Toyota Finance',
  'Agility Fleet',
  'BlackHorse',
];

const params = {
  args: {
    startLoading: false,
  },
  argTypes: {
    startLoading: {
      control: {
        type: 'boolean',
      },
    },
  },
};

interface ICustomArgs {
  startLoading?: boolean;
}

storiesOf(`${atomicDir(base)}/LeaseScanner`, module)
  .add(
    'Default',
    (args: Nullish<ICustomArgs>) => (
      <div className="lease-scanner--sticky-wrap">
        <LeaseScanner
          price={229.0}
          startLoading={args?.startLoading ?? false}
          classNameHeading="headingText"
          orderNowClick={action('Order now')}
          headingText="PM inc. VAT"
          leasingProviders={leasingProviders}
          priceLabel="+£38 Maintenance"
          endAnimation={() => {}}
        />
      </div>
    ),
    params,
  )
  .add(
    'with checkbox',
    (args: Nullish<ICustomArgs>) => (
      <div
        style={{
          maxWidth: 410,
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '100%',
        }}
      >
        <LeaseScanner
          price={229.0}
          startLoading={args?.startLoading ?? false}
          orderNowClick={action('Order now')}
          headingText="PM inc. VAT"
          withCheckBox
          endAnimation={() => {}}
          leasingProviders={leasingProviders}
        />
      </div>
    ),
    params,
  )
  .add(
    'with next best price',
    (args: Nullish<ICustomArgs>) => (
      <div
        style={{
          maxWidth: 410,
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '100%',
        }}
      >
        <LeaseScanner
          price={229.0}
          startLoading={args?.startLoading ?? false}
          nextBestPrice="£524.10 PM Ex VAT"
          orderNowClick={action('Order now')}
          headingText="PM inc. VAT"
          withCheckBox
          endAnimation={() => {}}
          leasingProviders={leasingProviders}
        />
      </div>
    ),
    params,
  );
