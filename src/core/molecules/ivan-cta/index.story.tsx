import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import IvanCta from '.';

storiesOf(`${atomicDir(base)}|IvanCta`, module)
  .add('Default', () => (
    <IvanCta
      body="Our helpful chatbot iVan is available 24/7 to answer your van financing questions"
      title="Meet iVan"
      imageSrc="https://images.ctfassets.net/3xid768u5joa/31iQbyGS1DYs7b9viQHtXh/86ae2d62793162409d230b2042d9e00a/header-ivan.svg"
    />
  ))

  .add('Compact', () => (
    <IvanCta
      isCompact
      body="We're open again at 8:30am. Why not chat to iVan?"
      title=""
      imageSrc="https://www.vanarama.com/assets/images-optimised/header-ivan.svg"
    />
  ));
