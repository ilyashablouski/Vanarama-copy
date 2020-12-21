import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import Breadcrumb from '.';

const props = {
  items: [
    { label: 'Page1', href: '/' },
    { label: 'Page2', href: '/' },
    { label: 'Page3', href: '/' },
  ],
};

storiesOf(`${atomicDir(base)}|Breadcrumb`, module).add('Default', () => (
  <Breadcrumb items={props.items} />
));
