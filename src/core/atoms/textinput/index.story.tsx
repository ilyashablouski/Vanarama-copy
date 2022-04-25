import { storiesOf } from '@storybook/react';
import base from 'paths.macro';
import React, { useState } from 'react';
import TextInput from '.';
import { atomicDir } from '../../../helpers/atomicDirUtils';
import Formgroup from '../../molecules/formgroup';

storiesOf(`${atomicDir(base)}/TextInput`, module)
  .add('Default (uncontrolled)', () => <TextInput />)
  .add('Default (uncontrolled with default value)', () => (
    <TextInput defaultValue="Default" />
  ))
  .add('Default (controlled)', () => {
    const [value, setValue] = useState('');
    return (
      <TextInput
        value={value}
        onChange={event => setValue(event.target.value)}
      />
    );
  })
  .add('Default with label', () => (
    <Formgroup controlId="example" label="Text Input Label">
      <TextInput id="example" />
    </Formgroup>
  ))
  .add('Hint', () => (
    <Formgroup
      hint="I come with a hint"
      controlId="example"
      label="Text Input Label"
    >
      <TextInput id="example" />
    </Formgroup>
  ))
  .add('Width', () => <TextInput width={45} />)
  .add('Disabled', () => <TextInput disabled />)
  .add('Prefix', () => <TextInput id="example" prefix="£" />)
  .add('Suffix', () => <TextInput suffix="%" type="number" min="0" max="100" />)
  .add('Calculated', () => (
    <Formgroup controlId="example" label="Text Input Label">
      <TextInput id="example" calculated defaultValue="209.00" prefix="£" />
    </Formgroup>
  ))
  .add('Invalid', () => (
    <Formgroup
      controlId="example"
      label="Text Input Label"
      error="Please enter a valid email address"
    >
      <TextInput id="example" defaultValue="john.smith@gmailcom" />
    </Formgroup>
  ));
