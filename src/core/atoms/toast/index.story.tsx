import React from 'react';
import base from 'paths.macro';
import { storiesOf } from '@storybook/react';
import { ToastPosition } from 'react-toastify';

import { atomicDir } from '../../../helpers/atomicDirUtils';
import { Nullish } from '../../../types/common';

import { error, info, success, ToastContainer, warning } from './Toast';

import Button from '../button';

const buttonContainerStyles = {
  display: 'grid',
  gap: '0.75rem',
  gridAutoColumns: 'max-content',
  gridAutoFlow: 'column',
};

const message =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

const params = {
  args: {
    position: 'bottom-right',
  },
  argTypes: {
    position: {
      options: [
        'bottom-center',
        'bottom-left',
        'bottom-right',
        'top-center',
        'top-left',
        'top-right',
      ],
      control: {
        type: 'select',
      },
    },
  },
};

interface ICustomArgs {
  position?: ToastPosition;
}

storiesOf(`${atomicDir(base)}/Toast`, module).add(
  'Example',
  (args: Nullish<ICustomArgs>) => (
    <>
      <ToastContainer position={args?.position} />
      <div style={buttonContainerStyles}>
        <Button
          color="darker"
          label="Show info toast"
          onClick={() => info('Info Toast', message)}
          size="small"
        />
        <Button
          color="danger"
          label="Show error toast"
          onClick={() => error('Error Toast', message)}
          size="small"
        />
        <Button
          color="warning"
          label="Show warning toast"
          onClick={() => warning('Warning Toast', message)}
          size="small"
        />
        <Button
          color="success"
          label="Show success toast"
          onClick={() => success('Success Toast', message)}
          size="small"
        />
      </div>
    </>
  ),
  params,
);
