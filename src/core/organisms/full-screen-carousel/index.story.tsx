import React, { useState } from 'react';
import base from 'paths.macro';
import { storiesOf } from '@storybook/react';
import FullScreenIcon from 'core/assets/icons/FullScreenIcon';
import { atomicDir } from '../../../helpers/atomicDirUtils';

import FullScreenImageCarousel from '.';

storiesOf(`${atomicDir(base)}/FullScreenImageCarousel`, module).add(
  'Default',
  () => {
    const [isOpenModal, setOpenModal] = useState(true);

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '200px',
          height: '200px',
          background: 'lightgray',
        }}
      >
        <button
          type="button"
          onClick={() => {
            setOpenModal(true);
          }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, .8)',
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            fontSize: '20px',
            cursor: 'pointer',
          }}
        >
          <FullScreenIcon />
        </button>

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
      </div>
    );
  },
);
