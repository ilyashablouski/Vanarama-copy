import { storiesOf } from '@storybook/react';
import base from 'paths.macro';
import React from 'react';
import { SwiperSlide } from 'swiper/react';
import BluetoothSharp from '../../assets/icons/BluetoothSharp';
import CompassSharp from '../../assets/icons/CompassSharp';
import Flame from '../../assets/icons/Flame';
import SnowSharp from '../../assets/icons/SnowSharp';
import WifiSharp from '../../assets/icons/WifiSharp';
import { atomicDir } from '../../../helpers/atomicDirUtils';
import CarouselSwiper from './CarouselSwiper';
import Price from '../../atoms/price';
import Button from '../../atoms/button';
import Icon from '../../atoms/icon';
import ProductCard from '../../molecules/cards/ProductCard/ProductCard';
import ReviewCard from '../../molecules/cards/ReviewCard/ReviewCard';

const noop = () => {};
const images = [
  'https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best/v1581538983/cars/KiaProceed0219_4_bpoxte.jpg',
  'https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best/v1581538982/cars/AudiQ70719_2_kk0b0n.jpg',
  /* 'https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best/v1581538983/cars/MazdaMX50718_5_ls0q6d.jpg',
  'https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best/v1581538983/cars/CitroenBerlingo0718_4_xjonps.jpg',
  'https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best/v1581538983/cars/RenaultMeganeRS0518_4_bvqgs1.jpg', */
];

const header = {
  accentIcon: <Icon icon={<Flame />} color="white" />,
  accentText: 'Hot Offer',
  text: 'In Stock - 14-21 Days Delivery',
};

const features = [
  {
    icon: <Icon icon={<SnowSharp />} color="dark" />,
    label: 'Aircon',
    name: 'Aircon',
    index: '1',
  },
  {
    icon: <Icon icon={<BluetoothSharp />} color="dark" />,
    label: 'Bluetooth',
    name: 'Bluetooth',
    index: '2',
  },
  {
    icon: <Icon icon={<CompassSharp />} color="dark" />,
    label: 'Navigation',
    name: 'Navigation',
    index: '3',
  },
  {
    icon: <Icon icon={<WifiSharp />} color="dark" />,
    label: 'Sensors',
    name: 'Sensors',
    index: '4',
  },
];

storiesOf(`${atomicDir(base)}/CarouselSwiper`, module)
  .add('CarouselSwiper with ProductCard', () => {
    return (
      <CarouselSwiper countItems={images.length}>
        {images.map(src => (
          <SwiperSlide key={src}>
            <ProductCard
              header={header}
              description="Minim consectetur adipisicing aute consequat velit exercitation enim deserunt occaecat sit ut incididunt dolor id"
              imageSrc="https://source.unsplash.com/collection/2102317/1000x650?sig=403440"
              features={features}
              onCompare={noop}
              onWishlist={noop}
              title={{
                title: '',
                link: (
                  <a href="#" className="heading -large -black">
                    Peugeot 208
                  </a>
                ),
                description: '1.0 IG-T 100 Tekna 5dr Xtronic [Leather]',
                score: 4.5,
              }}
            >
              <div className="-flex-h">
                <Price
                  price={233.95}
                  size="large"
                  separator="."
                  priceDescription="Per Month Exc.VAT"
                />
                <Button
                  color="teal"
                  fill="solid"
                  label="View Offer"
                  onClick={noop}
                  size="regular"
                />
              </div>
            </ProductCard>
          </SwiperSlide>
        ))}
      </CarouselSwiper>
    );
  })
  .add('CarouselSwiper with ReviewCard', () => {
    return (
      <CarouselSwiper countItems={2}>
        {[1, 2].map(src => (
          <SwiperSlide key={src}>
            <ReviewCard
              review={{
                text:
                  'Cillum sit et in nostrud occaecat est labore ea laborum voluptate magna eu aliquip mollit',
                author: 'Review Card',
                score: 4.5,
              }}
            />
          </SwiperSlide>
        ))}
      </CarouselSwiper>
    );
  });
