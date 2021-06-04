import { storiesOf } from '@storybook/react';
import base from 'paths.macro';
import React from 'react';
import Formgroup from '.';
import TextInput from '../../atoms/textinput/TextInput';
import Text from '../../atoms/text';
import Link from '../../atoms/link';
import { atomicDir } from '../../../helpers/atomicDirUtils';

storiesOf(`${atomicDir(base)}/Formgroup`, module)
  .add('Default', () => (
    <Formgroup label="Formgroup">
      <TextInput />
    </Formgroup>
  ))
  .add('Validation', () => (
    <Formgroup label="Formgroup" error="You must select an option">
      <TextInput />
    </Formgroup>
  ))
  .add('Hint', () => (
    <Formgroup hint="Formgroup">
      <TextInput />
    </Formgroup>
  ))
  .add('Editable', () => (
    <Formgroup editable="Formgroup">
      <TextInput />
    </Formgroup>
  ))
  .add('Inline', () => (
    <Formgroup label="Formgroup (inline)" inline>
      <TextInput />
      <TextInput />
    </Formgroup>
  ))
  .add('Custom error message', () => (
    <Formgroup
      label="Custom error"
      error={
        <Text color="danger" size="xsmall">
          {'Your email address already exists. Do you wish to '}
          <Link color="teal" size="xsmall">
            login
          </Link>
          {' using this email?'}
        </Text>
      }
    >
      <TextInput />
    </Formgroup>
  ));
