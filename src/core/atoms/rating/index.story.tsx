import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import Rating from '.';

storiesOf(`${atomicDir(base)}/Rating`, module)
  .add('Small', () => <Rating score={1} size="small" color="sky" />)

  .add('Regular', () => <Rating score={5} size="regular" />)

  .add('Large', () => <Rating score={3.5} size="large" />)

  .add('Xlarge', () => <Rating score={0} max={5} size="xlarge" color="teal" />)

  .add('Without Label', () => (
    <Rating score={0} max={5} size="xlarge" color="teal" noLabel />
  ))

  .add('Label custom color', () => (
    <Rating score={0} max={5} size="xlarge" color="teal" labelColor="danger" />
  ))

  .add('Clickable', () => (
    <Rating
      score={2}
      max={5}
      size="xlarge"
      color="orange"
      onClick={value => console.log(`your mark: ${value}`)}
    />
  ));
