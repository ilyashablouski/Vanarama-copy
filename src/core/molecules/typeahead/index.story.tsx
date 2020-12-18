import { storiesOf } from '@storybook/react';
import base from 'paths.macro';
import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { atomicDir } from '../../../helpers/atomicDirUtils';
import Typeahead from '.';

type Language = { label: string; year: number };
const languages = [
  { label: 'C', year: 1972 },
  { label: 'C#', year: 2000 },
  { label: 'C++', year: 1983 },
  { label: 'Clojure', year: 2007 },
  { label: 'Elm', year: 2012 },
  { label: 'Go', year: 2009 },
  { label: 'Haskell', year: 1990 },
  { label: 'Java', year: 1995 },
  { label: 'Javascript', year: 1995 },
  { label: 'Perl', year: 1987 },
  { label: 'PHP', year: 1995 },
  { label: 'Python', year: 1991 },
  { label: 'Ruby', year: 1995 },
  { label: 'Scala', year: 2003 },
];

const getSuggestions = (value: string) => {
  if (!value) {
    return [];
  }

  return languages.filter(lang =>
    lang.label.toLowerCase().includes(value.toLowerCase()),
  );
};

storiesOf(`${atomicDir(base)}|Typeahead`, module).add('Default', () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSugggestions] = useState<Language[]>([]);

  return (
    <Typeahead
      suggestions={suggestions}
      onSuggestionsFetchRequested={({ value }) => {
        setSugggestions(getSuggestions(value));
      }}
      onSuggestionsClearRequested={() => {
        setSugggestions([]);
      }}
      onSuggestionSelected={action('onSuggestionSelected')}
      getSuggestionValue={suggestion => suggestion.label}
      renderSuggestion={suggestion => (
        <div>
          {suggestion.label} - <b>{suggestion.year}</b>
        </div>
      )}
      inputProps={{
        dataTestId: 'some-custom-data-test-id',
        value: inputValue,
        onChange: (_, { newValue }) => {
          setInputValue(newValue);
        },
      }}
    />
  );
});
