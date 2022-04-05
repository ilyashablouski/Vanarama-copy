import React from 'react';
import base from 'paths.macro';
import { storiesOf } from '@storybook/react';
import { atomicDir } from '../../../helpers/atomicDirUtils';
import MediaGallery from './MediaGallery';
import Icon from '../../atoms/icon';
import Flame from '../../assets/icons/Flame';

storiesOf(`${atomicDir(base)}/MediaGallery`, module)
  .add('Default with tree tabs', () => (
    <div className="page:pdp">
      <div style={{ maxWidth: 700 }}>
        <MediaGallery
          flag={{
            accentIcon: <Icon icon={<Flame />} color="white" />,
            accentText: 'Hot Offer',
            text: 'dealText',
          }}
          images={[
            'https://res.cloudinary.com/diun8mklf/image/upload/v1581538983/cars/PeugeotRifter0718_7_lqteyc.jpg',
            'https://source.unsplash.com/collection/2102317/1000x650?sig=403425',
            'https://source.unsplash.com/collection/2102317/1000x650?sig=403425',
            'https://source.unsplash.com/collection/2102317/1000x650?sig=403425',
            'https://source.unsplash.com/collection/2102317/1000x650?sig=403425',
            'https://source.unsplash.com/collection/2102317/1000x650?sig=403425',
          ]}
          videoSrc="https://player.vimeo.com/video/263419265"
          threeSixtyVideoSrc="https://player.vimeo.com/video/263419265"
          colour={1234}
          setColour={jest.fn()}
          imacaAssets={null}
          isCar={false}
          toggleColorAndTrimModalVisible={() => {}}
          isColourAndTrimOverlay={false}
        />
      </div>
    </div>
  ))
  .add('One image tab', () => (
    <div className="page:pdp">
      <div style={{ maxWidth: 700 }}>
        <MediaGallery
          flag={{
            accentIcon: <Icon icon={<Flame />} color="white" />,
            accentText: 'Hot Offer',
            text: 'dealText',
          }}
          images={[
            'https://res.cloudinary.com/diun8mklf/image/upload/v1581538983/cars/PeugeotRifter0718_7_lqteyc.jpg',
            'https://source.unsplash.com/collection/2102317/1000x650?sig=403425',
            'https://source.unsplash.com/collection/2102317/1000x650?sig=403425',
            'https://source.unsplash.com/collection/2102317/1000x650?sig=403425',
            'https://source.unsplash.com/collection/2102317/1000x650?sig=403425',
            'https://source.unsplash.com/collection/2102317/1000x650?sig=403425',
          ]}
          colour={1234}
          setColour={jest.fn()}
          imacaAssets={null}
          isCar={false}
          toggleColorAndTrimModalVisible={() => {}}
          isColourAndTrimOverlay={false}
        />
      </div>
    </div>
  ))
  .add('Two tabs', () => (
    <div className="page:pdp">
      <div style={{ maxWidth: 700 }}>
        <MediaGallery
          flag={{
            accentIcon: <Icon icon={<Flame />} color="white" />,
            accentText: 'Hot Offer',
            text: 'dealText',
          }}
          images={[
            'https://res.cloudinary.com/diun8mklf/image/upload/v1581538983/cars/PeugeotRifter0718_7_lqteyc.jpg',
            'https://source.unsplash.com/collection/2102317/1000x650?sig=403425',
            'https://source.unsplash.com/collection/2102317/1000x650?sig=403425',
            'https://source.unsplash.com/collection/2102317/1000x650?sig=403425',
            'https://source.unsplash.com/collection/2102317/1000x650?sig=403425',
            'https://source.unsplash.com/collection/2102317/1000x650?sig=403425',
          ]}
          videoSrc="https://player.vimeo.com/video/263419265"
          colour={1234}
          setColour={jest.fn()}
          imacaAssets={null}
          isCar={false}
          toggleColorAndTrimModalVisible={() => {}}
          isColourAndTrimOverlay={false}
        />
      </div>
    </div>
  ));
