import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import Pagination from '.';

const pages = Array.from({ length: 60 }, (page, index) => index + 1);
const selected = 8;
const selectedtwo = 2;
const pagesSecond = [5, 4, 3, 2, 1];

storiesOf(`${atomicDir(base)}/Pagination`, module)
  .add('Default', () => (
    <Pagination
      pages={pages}
      selected={selected}
      path="page"
      onClick={action('onClick')}
    />
  ))
  .add('custom pathes', () => (
    <Pagination
      pages={pages}
      selected={selected}
      path="test/page"
      pathForFirstPage="test"
      pathWithHtml
      onClick={action('onClick')}
    />
  ))

  .add('Secondary', () => (
    <Pagination
      pages={pagesSecond}
      selected={selectedtwo}
      path="page"
      onClick={action('onClick')}
    />
  ));
