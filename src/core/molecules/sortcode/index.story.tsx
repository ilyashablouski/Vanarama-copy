import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';
import React, { useState, useRef } from 'react';
import { atomicDir } from '../../../helpers/atomicDirUtils';
import SortCode from './SortCode';
import { SortCodeValue } from './interfaces';

storiesOf(`${atomicDir(base)}/Sortcode`, module)
  .add('Default', () => {
    const [value, setValue] = useState<SortCodeValue>(['', '', '']);
    return (
      <SortCode
        onChange={(...args) => {
          action('Value changed')(...args);
          setValue(args[1]);
        }}
        value={value}
      />
    );
  })
  .add('With custom input props', () => {
    const firstRef = useRef<HTMLInputElement | null>(null);
    const [value, setValue] = useState<SortCodeValue>(['', '', '']);
    return (
      <SortCode
        firstInputProps={{
          dataTestId: 'first',
          'aria-label': 'first-label',
          ref: firstRef,
        }}
        middleInputProps={{
          dataTestId: 'middle',
          'aria-label': 'middle-label',
          onFocus: event => {
            action('Middle input focused')(event);
          },
        }}
        lastInputProps={{
          dataTestId: 'last',
          'aria-label': 'last-label',
          onBlur: event => {
            action('Last input blurred')(event);
          },
        }}
        onChange={(...args) => {
          action('Value changed')(...args);
          setValue(args[1]);
        }}
        value={value}
      />
    );
  })
  .add('Disabled', () => {
    const [value, setValue] = useState<SortCodeValue>(['', '', '']);
    return (
      <SortCode
        disabled
        onChange={(...args) => {
          action('Value changed')(...args);
          setValue(args[1]);
        }}
        value={value}
      />
    );
  });
