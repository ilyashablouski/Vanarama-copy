import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import Price from '.';

storiesOf(`${atomicDir(base)}/Price`, module)
  .add('Full price', () => <Price price={195.5} />)

  .add('Just pounds', () => <Price price={195} hidePence />)

  .add('Color', () => <Price price={195} color="teal" />)

  .add('POA', () => <Price />);
