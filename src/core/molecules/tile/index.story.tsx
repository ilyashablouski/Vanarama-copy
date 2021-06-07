import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import Tile from '.';

import Heading from '../../atoms/heading';
import Text from '../../atoms/text';

const children = [
  <Heading tag="h2" size="lead">
    Heading Title
  </Heading>,
  <Text tag="p">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tristique
    quam ut nisi molestie, ut consequat arcu porta. Maecenas vel feugiat quam.
    Cras sed lectus at ex egestas placerat. Nam leo lorem, posuere sed feugiat
    et, venenatis eu est. Donec dignissim varius purus vel fringilla. Phasellus
    porta dapibus leo consequat placerat. Lorem ipsum dolor sit amet,
    consectetur adipiscing elit. Vivamus tristique quam ut nisi molestie, ut
    consequat arcu porta. Maecenas vel feugiat quam. Cras sed lectus at ex
    egestas placerat. Nam leo lorem, posuere sed feugiat et, venenatis eu est.
    Donec dignissim varius purus vel fringilla. Phasellus porta dapibus leo
    consequat placerat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Vivamus tristique quam ut nisi molestie, ut consequat arcu porta. Maecenas
    vel feugiat quam. Cras sed lectus at ex egestas placerat. Nam leo lorem,
    posuere sed feugiat et, venenatis eu est. Donec dignissim varius purus vel
    fringilla. Phasellus porta dapibus leo consequat placerat.
  </Text>,
];

storiesOf(`${atomicDir(base)}/Tile`, module)
  .add('Default', () => <Tile>{children}</Tile>)

  .add('Scrollable', () => <Tile scrollable>{children}</Tile>)

  .add('Coloured', () => <Tile color="white">{children}</Tile>);
