import { storiesOf } from '@storybook/react';
import base from 'paths.macro';
import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { atomicDir } from '../../../helpers/atomicDirUtils';
import Formgroup from '../formgroup';
import AddressFinder from './AddressFinder';
import { IAddressSuggestion } from './interfaces';

const path = `${atomicDir(base)}|AddressFinder`;
const apiKey = 'CG96-BE17-EY43-CM69';

storiesOf(path, module)
  .add('Empty', () => {
    const [suggestion, setSuggestion] = useState<IAddressSuggestion>();
    return (
      <AddressFinder
        apiKey={apiKey}
        onSuggestionChange={value => {
          action('onSuggestionChange')(value);
          setSuggestion(value);
        }}
        selected={suggestion}
      >
        <Formgroup
          className="address-finder--input"
          controlId="empty"
          label="Your Postcode or Address"
        >
          <AddressFinder.Input id="empty" dataTestId="empty__input" />
          <AddressFinder.Selected dataTestId="empty__edit" />
          <AddressFinder.Intermediate dataTestId="empty__change" />
        </Formgroup>
        <AddressFinder.Results dataTestId="empty__results" />
      </AddressFinder>
    );
  })
  .add('Filled', () => {
    const [suggestion, setSuggestion] = useState<
      IAddressSuggestion | undefined
    >({
      id: '',
      label: 'London Orthodontics, 40 Harley Street, London, W1G 9PP',
    });

    return (
      <AddressFinder
        apiKey={apiKey}
        onSuggestionChange={value => {
          action('onSuggestionChange')(value);
          setSuggestion(value);
        }}
        selected={suggestion}
      >
        <Formgroup controlId="filled" label="Your Postcode or Address">
          <AddressFinder.Input id="filled" dataTestId="filled__input" />
          <AddressFinder.Selected dataTestId="filled__edit" />
          <AddressFinder.Intermediate dataTestId="filled__change" />
        </Formgroup>
        <AddressFinder.Results dataTestId="filled__results" />
      </AddressFinder>
    );
  });
