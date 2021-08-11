import { storiesOf } from '@storybook/react';
import base from 'paths.macro';
import React, { useState } from 'react';
import ChoiceBoxesV2 from './ChoiceboxesV2';
import { atomicDir } from '../../../helpers/atomicDirUtils';

storiesOf(`${atomicDir(base)}/ChoiceboxesV2`, module)
  .add('Default', () => {
    const initialValues = ['12345', '67890'];
    const [selectedValues, setSelectedValues] = useState(['67890']);

    return (
      <ChoiceBoxesV2
        values={initialValues}
        selectedValues={selectedValues}
        onChange={values => {
          setSelectedValues(values as typeof selectedValues);
        }}
      />
    );
  })
  .add('Multiselect', () => {
    const initialValues = ['12345', '67890'];
    const [selectedValues, setSelectedValues] = useState(['67890']);

    return (
      <ChoiceBoxesV2
        multiSelect
        values={initialValues}
        selectedValues={selectedValues}
        onChange={values => {
          setSelectedValues(values as typeof selectedValues);
        }}
      />
    );
  });
