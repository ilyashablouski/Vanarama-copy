import React from 'react';
import base from 'paths.macro';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { atomicDir } from '../../../helpers/atomicDirUtils';
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

storiesOf(`${atomicDir(base)}|LeaseScanner`, module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <div className="lease-scanner--sticky-wrap">
      <LeaseScanner
        price={229.0}
        classNameHeading="headingText"
        orderNowClick={action('Order now')}
        headingText="PM inc. VAT"
        leasingProviders={leasingProviders}
        priceLabel="+£38 Maintenance"
        endAnimation={() => {}}
        startLoading={boolean('Start Loading', false)}
      />
    </div>
  ))
  .add('with checkbox', () => (
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
        orderNowClick={action('Order now')}
        startLoading={boolean('Start Loading', false)}
        headingText="PM inc. VAT"
        withCheckBox
        endAnimation={() => {}}
        leasingProviders={leasingProviders}
      />
    </div>
  ))
  .add('with next best price', () => (
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
        nextBestPrice="£524.10 PM Ex VAT"
        orderNowClick={action('Order now')}
        startLoading={boolean('Start Loading', false)}
        headingText="PM inc. VAT"
        withCheckBox
        endAnimation={() => {}}
        leasingProviders={leasingProviders}
      />
    </div>
  ));
