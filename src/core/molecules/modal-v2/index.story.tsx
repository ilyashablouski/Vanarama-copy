import React, { useState } from 'react';
import base from 'paths.macro';
import { storiesOf } from '@storybook/react';

import Text from 'core/atoms/text';
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
        color="secondary"
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100%',
          }}
        >
          <Text color="lighter" tag="p">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
            ducimus eum fugit harum hic ipsam nihil nisi quis recusandae
            reiciendis! Alias animi asperiores aut, consectetur consequatur
            distinctio, error est magni maiores mollitia nobis possimus quam
            sapiente. Cumque eveniet exercitationem explicabo fugiat harum,
            minus, nam nihil officia, perspiciatis quas reiciendis voluptates?
          </Text>
        </div>
      </ModalV2>
    </>
  );
});
