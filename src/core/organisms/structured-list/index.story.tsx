import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import StructuredList from './StructuredList';
import { editableList, defaultList } from './__fixtures__';

const priceList = [
  { name: 'rental', label: 'Initial Rental', value: '£815.70 (inc VAT)' },
  { name: 'contract', label: 'Contract Length', value: '60 months' },
];

storiesOf(`${atomicDir(base)}/StructuredList`, module)
  .add('Default', () => (
    <StructuredList
      editable={false}
      list={defaultList}
      heading="Your Details"
      onChange={event => console.log(event)}
    />
  ))
  .add('Editable', () => (
    <StructuredList
      editable
      list={editableList}
      heading="Your Details"
      onChange={event => console.log(event)}
      onEditClicked={action('onEditClicked')}
    />
  ))
  .add('With Price', () => (
    <StructuredList
      editable={false}
      list={priceList}
      priceTag={{ price: 209.99, info: 'Per Month ex. VAT' }}
      heading="
      59 month contact (inc VAT). Paid by Direct Debit. First due ≈ 10 days after delivery."
      headingSize="xsmall"
    />
  ));
