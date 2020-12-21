import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import SlideoutModal from '.';

import { searchFilters, selectedFilters } from './__fixtures__';

storiesOf(`${atomicDir(base)}|SlideoutModal`, module)
  .add('Default', () => <SlideoutModal searchFilters={searchFilters} />)
  .add('Opened', () => <SlideoutModal searchFilters={searchFilters} isOpen />)
  .add('With values', () => (
    <SlideoutModal
      searchFilters={searchFilters}
      selectedFilters={selectedFilters}
    />
  ));
