import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import Initials from '.';

storiesOf(`${atomicDir(base)}|Initials`, module).add('default', () => (
  <Initials fullName="Gianluca Agnocchetti" />
));
