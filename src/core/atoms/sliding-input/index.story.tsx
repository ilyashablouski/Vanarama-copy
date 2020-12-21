import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';
import { atomicDir } from '../../../helpers/atomicDirUtils';
import SlidingInput from './SlidingInput';

const steps = [6000, 7000, 10000, 12000, 15000, 30000, 35000, 40000];
const stepsObject = [
  {
    value: 150,
    label: '$150',
  },
  {
    value: 250,
    label: '$250',
  },
  {
    value: 350,
    label: '$350',
  },
  {
    value: 450,
    label: '$450',
  },
  {
    value: 550,
    label: '$550+',
  },
];

storiesOf(`${atomicDir(base)}|SlidingInput`, module).add('Default', () => (
  <div className="pdp--sidebar" style={{ maxWidth: 350 }}>
    <SlidingInput steps={steps} onChange={() => {}} />
  </div>
));

storiesOf(`${atomicDir(base)}|SlidingInput`, module).add('7K', () => (
  <div className="pdp--sidebar" style={{ maxWidth: 350 }}>
    <SlidingInput steps={steps} defaultValue={2} onChange={() => {}} />
  </div>
));

storiesOf(`${atomicDir(base)}|SlidingInput`, module).add('Disabled', () => (
  <div className="pdp--sidebar" style={{ maxWidth: 350 }}>
    <SlidingInput steps={steps} disabled defaultValue={2} onChange={() => {}} />
  </div>
));

storiesOf(`${atomicDir(base)}|SlidingInput`, module).add('Steps Object', () => (
  <div className="pdp--sidebar" style={{ maxWidth: 350 }}>
    <SlidingInput steps={stepsObject} defaultValue={2} onChange={() => {}} />
  </div>
));
