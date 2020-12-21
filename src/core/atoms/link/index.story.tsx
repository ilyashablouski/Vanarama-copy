import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import Link from '.';

storiesOf(`${atomicDir(base)}|Link`, module)
  .add('Default', () => <Link href="https://www.google.com/" />)

  .add('Label', () => <Link href="https://www.google.com/">Google</Link>)

  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  .add('OnClick', () => <Link onClick={action('onClick')}>Click</Link>);
