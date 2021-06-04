import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import Tooltip from '.';

storiesOf(`${atomicDir(base)}/Tooltip`, module)
  .add('Top tooltips', () => (
    <div className="tooltip-preview">
      <Tooltip
        text="Hello. This is a pop-up which allows for of content. Hello. This is a pop-up which allows for of content."
        color="orange"
        position="top left"
      />
      <Tooltip
        text="Hello. This is a pop-up."
        color="orange"
        position="top center"
      />
      <Tooltip
        text="Hello. This is a pop-up which allows for of content."
        color="orange"
        position="top right"
      />
    </div>
  ))
  .add('Bottom tooltips', () => (
    <div className="tooltip-preview">
      <Tooltip
        text="Hello. This is a pop-up which allows for of content."
        color="orange"
        position="bottom left"
      />
      <Tooltip
        text="Hello. This is a pop-up which allows for of content."
        color="orange"
        position="bottom center"
      />
      <Tooltip
        text="Hello. This is a pop-up which allows for of content."
        color="orange"
        position="bottom right"
      />
    </div>
  ))
  .add('Side tooltips', () => (
    <div className="tooltip-preview">
      <Tooltip
        text="Hello. This is a pop-up which allows for of content."
        color="orange"
        position="side right"
      />
      <Tooltip
        text="Hello. This is a pop-up which allows for of content."
        color="orange"
        position="side left"
      />
    </div>
  ));
