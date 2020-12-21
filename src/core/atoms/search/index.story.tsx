import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';
import React from 'react';
import { atomicDir } from '../../../helpers/atomicDirUtils';
import Search from './Search';

const placeholder = 'Search Your Ideal Car...';

const results = [
  'Mercedes 1.6 labore assumenda delectus  ',
  'Porche 3.0 labore assumenda delectus  ',
  'Bmw 2.5 labore assumenda delectus  ',
  'Tesla 2.5 labore assumenda delectus  ',
  'Range Rover 4.0 labore assumenda delectus  ',
];

storiesOf(`${atomicDir(base)}|Search`, module)
  .add('Default', () => (
    <Search placeholder={placeholder} onChange={action('onChnage')} />
  ))

  .add('OnSelect', () => (
    <Search
      results={results}
      placeholder={placeholder}
      onChange={action('onChnage')}
    />
  ))

  .add('Intermediate state', () => (
    <Search
      results={results}
      placeholder={placeholder}
      onChange={action('onChnage')}
      isIntermediateState
    />
  ));
