import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import Avatar from '.';

storiesOf(`${atomicDir(base)}/Avatar`, module)
  .add('Small', () => (
    <Avatar src="https://www.thispersondoesnotexist.com/image" size="small" />
  ))

  .add('Regular', () => (
    <Avatar src="https://www.thispersondoesnotexist.com/image" size="regular" />
  ))

  .add('Large', () => (
    <Avatar src="https://www.thispersondoesnotexist.com/image" size="large" />
  ));
