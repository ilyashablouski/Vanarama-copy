import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';
import NumericInput from './NumericInput';
import { atomicDir } from '../../../helpers/atomicDirUtils';

storiesOf(`${atomicDir(base)}/NumericInput`, module)
  .add('Default (uncontrolled)', () => <NumericInput />)
  .add('Default (controlled)', () => {
    const [value, setValue] = useState('');
    return (
      <NumericInput
        value={value}
        onChange={event => setValue(event.target.value)}
      />
    );
  });
