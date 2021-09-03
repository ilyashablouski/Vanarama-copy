import React, { useState } from 'react';
import base from 'paths.macro';
import { storiesOf } from '@storybook/react';

import Button from 'core/atoms/button';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import ModalV2 from '.';

storiesOf(`${atomicDir(base)}/ModalV2`, module).add('Default', () => {
  const [isOpen, setOpen] = useState(true);

  return (
    <>
      <Button
        color="teal"
        label="Open Modal"
        onClick={() => {
          setOpen(true);
        }}
      />
      <ModalV2
        open={isOpen}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
});
