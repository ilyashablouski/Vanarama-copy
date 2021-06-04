import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';
import React from 'react';
import { ToastPosition } from 'react-toastify';
import { atomicDir } from '../../../helpers/atomicDirUtils';
import Button from '../button';
import { error, info, success, ToastContainer, warning } from './Toast';

const buttonContainerStyles = {
  display: 'grid',
  gap: '0.75rem',
  gridAutoColumns: 'max-content',
  gridAutoFlow: 'column',
};

const message =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

storiesOf(`${atomicDir(base)}/Toast`, module)
  .addDecorator(withKnobs)
  .add('Example', () => {
    const position = select<ToastPosition>(
      'Position',
      [
        'bottom-center',
        'bottom-left',
        'bottom-right',
        'top-center',
        'top-left',
        'top-right',
      ],
      'bottom-right',
    );

    return (
      <>
        <ToastContainer position={position} />
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
    );
  });
