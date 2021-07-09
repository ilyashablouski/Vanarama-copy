import { storiesOf } from '@storybook/react';
import base from 'paths.macro';
import React, { useState } from 'react';
import Button from 'core/atoms/button/Button';
import Drawer from './Drawer';
import { atomicDir } from '../../../helpers/atomicDirUtils';

storiesOf(`${atomicDir(base)}/Drawer`, module).add('Drawer', () =>
  React.createElement(() => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Drawer
          onCloseDrawer={() => setIsOpen(false)}
          isShowDrawer={isOpen}
          title="Storybook"
        />
        <Button onClick={() => setIsOpen(true)} label="Open drawer" />
      </div>
    );
  }),
);
