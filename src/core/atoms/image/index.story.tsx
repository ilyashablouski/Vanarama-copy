import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import Image from '.';

storiesOf(`${atomicDir(base)}/Image`, module)
  .add('XLarge', () => (
    <Image
      src="https://source.unsplash.com/collection/2102317/1000x650?sig=403425"
      size="xlarge"
    />
  ))

  .add('Expand', () => (
    <Image
      src="https://source.unsplash.com/collection/2102317/1000x650?sig=403443"
      size="expand"
    />
  ))

  .add('Round', () => (
    <Image
      src="https://source.unsplash.com/collection/2102317/1000x650?sig=403412"
      size="xlarge"
      round
    />
  ))

  .add('Plain', () => (
    <Image
      src="https://source.unsplash.com/collection/2102317/1000x650?sig=40342"
      size="xlarge"
      plain
    />
  ))

  .add('Optimised', () => (
    <Image
      src="//source.unsplash.com/collection/2102317/1000x650?sig=403425"
      size="xlarge"
      optimisedHost="https://dev.vanarama-nonprod.com"
    />
  ));
