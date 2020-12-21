import { storiesOf } from '@storybook/react';
import base from 'paths.macro';
import React from 'react';
import Form from '.';
import { atomicDir } from '../../../helpers/atomicDirUtils';
import FormError from './FormError';

storiesOf(`${atomicDir(base)}|Form`, module)
  .add('Default', () => (
    <Form dataTestId="default-example">
      <p>Form content</p>
    </Form>
  ))
  .add('Invalid', () => (
    <Form dataTestId="invalid-example" invalid>
      <FormError dataTestId="default-example-message">
        Email address and password combination is not valid
      </FormError>
      <p>Form content</p>
    </Form>
  ));
