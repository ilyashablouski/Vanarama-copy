import React, { useState } from 'react';
import base from 'paths.macro';
import { storiesOf } from '@storybook/react';

import Button from 'core/atoms/button';
import { atomicDir } from '../../../helpers/atomicDirUtils';

import FullScreenImageCarousel from '.';

storiesOf(`${atomicDir(base)}/FullScreenImageCarousel`, module).add(
  'Default',
  () => {
    const [isOpenModal, setOpenModal] = useState(true);

    return (
      <>
        <Button
          color="teal"
          label="Open Modal"
          onClick={() => {
            setOpenModal(true);
          }}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100%',
          }}
        >
          <FullScreenImageCarousel
            images={[
              'https://res.cloudinary.com/diun8mklf/image/upload/v1581538983/cars/PeugeotRifter0718_7_lqteyc.jpg',
              'https://source.unsplash.com/collection/2102317/1000x650?sig=403425',
              'https://source.unsplash.com/collection/2102317/1000x650?sig=403425',
              'https://source.unsplash.com/collection/2102317/1000x650?sig=403425',
              'https://source.unsplash.com/collection/2102317/1000x650?sig=403425',
              'https://source.unsplash.com/collection/2102317/1000x650?sig=403425',
            ]}
            isOpenModal={isOpenModal}
            setOpenModal={() => setOpenModal(false)}
          />
        </div>
      </>
    );
  },
);
