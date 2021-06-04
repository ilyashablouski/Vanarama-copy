import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import Header from '.';

import { topBarLinks, loginLink, message } from './__fixtures__';

storiesOf(`${atomicDir(base)}/Header`, module)
  .add('Default', () => (
    <Header topBarLinks={topBarLinks} loginLink={loginLink} />
  ))

  .add('iVan CTA', () => (
    <Header topBarLinks={topBarLinks} loginLink={loginLink} showIvan />
  ))

  .add('Message', () => (
    <Header topBarLinks={topBarLinks} loginLink={loginLink} message={message} />
  ));
