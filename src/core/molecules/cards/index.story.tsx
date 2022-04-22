import React, { CSSProperties } from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';
import { action } from '@storybook/addon-actions';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import Text from '../../atoms/text';
import Card from '.';
import Button from '../../atoms/button';
import Icon from '../../atoms/icon';

import BluetoothSharp from '../../assets/icons/BluetoothSharp';
import CompassSharp from '../../assets/icons/CompassSharp';
import SnowSharp from '../../assets/icons/SnowSharp';
import WifiSharp from '../../assets/icons/WifiSharp';
import Flame from '../../assets/icons/Flame';
import Price from '../../atoms/price';
import MediaCard from './MediaCard/MediaCard';
import ReviewCard from './ReviewCard/ReviewCard';
import ProductCard from './ProductCard/ProductCard';
import OlafCard from './OlafCard/OlafCard';
import OrderCard from './OrderCard/OrderCard';
import BlogCarouselCard from './BlogCarouselCard/BlogCarouselCard';

import placeholderImage from '../../assets/images/vehicle_image_placeholder.png';
import { LeaseTypeEnum } from '../../../../generated/globalTypes';
import { OnOffer } from '../../../../entities/global';

const FEATURES = [
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

storiesOf(`${atomicDir(base)}/Card`, module)
  .add('Card only image', () => (
    <div className="row:cards-3col">
      <Card
        header={{
          text: 'In Stock - 14-21 Days Delivery',
        }}
        imageSrc="https://source.unsplash.com/collection/2102317/1000x650?sig=403440"
      />
    </div>
  ))
  .add('Basic Card', () => (
    <div className="row:cards-3col">
      <Card
        title={{
          title: 'Basic Card',
          tag: 'h2',
        }}
        description="Dolore Lorem culpa ea irure do ad exercitation cillum laborum culpa sint aliqua voluptate duis"
      />
    </div>
  ))
  .add('Media Card', () => (
    <div className="row:cards-3col">
      <MediaCard
        title={{ title: 'Media Card' }}
        media={{
          src: 'https://player.vimeo.com/video/263419265',
          responsive: true,
          className: 'media-player',
          width: '100%',
          height: '100%',
        }}
      >
        <div className="-flex-h">
          <Text color="black" tag="div">
            Johannes Kepler
          </Text>
          <Text color="dark" tag="div">
            16/05/2020
          </Text>
        </div>
      </MediaCard>
    </div>
  ))
  .add('Review Card', () => (
    <div className="row:cards-3col">
      <ReviewCard
        review={{
          text:
            'Cillum sit et in nostrud occaecat est labore ea laborum voluptate magna eu aliquip mollit',
          author: 'Review Card',
          score: 4.5,
        }}
      />
    </div>
  ))
  .add('Featured Review Card', () => (
    <div className="row:cards-3col">
      <Card
        title={{
          title: '',
          link: (
            <a href="#" className="heading -large -black">
              Featured Review Card
            </a>
          ),
          score: 4.5,
        }}
        description="Minim consectetur adipisicing aute consequat velit exercitation enim deserunt occaecat sit ut incididunt dolor id"
        imageSrc="https://source.unsplash.com/collection/2102317/1000x650?sig=403440"
      >
        <Button
          color="teal"
          size="small"
          fill="clear"
          type="button"
          label="Read Review"
        />
      </Card>
    </div>
  ))
  .add('Article Card', () => (
    <div className="row:cards-3col">
      <Card
        title={{
          title: 'Article Card',
        }}
        description="Minim consectetur adipisicing aute consequat velit exercitation enim deserunt occaecat sit ut incididunt dolor id"
        imageSrc="https://source.unsplash.com/collection/2102317/1000x650?sig=403440"
      >
        <Button
          color="teal"
          size="small"
          fill="clear"
          type="button"
          label="Continue Reading"
        />
      </Card>
    </div>
  ))
  .add('Product Cards', () => (
    <div className="row:cards-3col">
      <ProductCard
        header={{
          accentIcon: (
            <Icon icon={<Flame />} color="white" className="md hydrated" />
          ),
          accentText: 'Hot Offer',
          text: 'In Stock - 14-21 Days Delivery',
        }}
        description="Minim consectetur adipisicing aute consequat velit exercitation enim deserunt occaecat sit ut incididunt dolor id"
        imageSrc=""
        features={FEATURES}
        onCompare={action('onCompare')}
        onWishlist={action('onWishlist')}
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
        initialRentalDataTestId="about_intial-rental-testID"
        controlLengthDataTestId="about_control-length-testID"
        annualMileageDataTestId="about_annual-mileage-testID"
        annualMileageBoosterDataTestId="about_annual-milage-booster-testID"
        damageCoverDataTestId="about_damage-cover-testID"
        maintenanceDataTestId="about_maintenance-testID"
        fuelDataTestId="about_fuel-testID"
        transmissionDataTestId="about_transmission-testID"
        colorDataTestId="about_color-testID"
        trimDataTestId="about_trim-testID"
        descriptionDataTestId="about_description-testID"
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
            onClick={action('onViewOffer')}
            size="regular"
          />
        </div>
      </ProductCard>
      <ProductCard
        header={{
          accentIcon: (
            <Icon icon={<Flame />} color="white" className="md hydrated" />
          ),
          accentText: 'Hot Offer',
          text: 'In Stock - 14-21 Days Delivery',
        }}
        description="Minim consectetur adipisicing aute consequat velit exercitation enim deserunt occaecat sit ut incididunt dolor id"
        imageSrc="https://source.unsplash.com/collection/2102317/1000x650?sig=403440"
        features={FEATURES}
        onCompare={action('onCompare')}
        onWishlist={action('onWishlist')}
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
            onClick={action('onViewOffer')}
            size="regular"
          />
        </div>
      </ProductCard>
      <ProductCard
        header={{
          accentIcon: (
            <Icon icon={<Flame />} color="white" className="md hydrated" />
          ),
          accentText: 'Hot Offer',
          text: 'In Stock - 14-21 Days Delivery',
        }}
        description="Minim consectetur adipisicing aute consequat velit exercitation enim deserunt occaecat sit ut incididunt dolor id"
        imageSrc="https://source.unsplaffsdfdfssh.com/collection/2102317/1000x650?sig=403440"
        features={FEATURES}
        placeholderImage={placeholderImage}
        onCompare={action('onCompare')}
        onWishlist={action('onWishlist')}
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
            onClick={action('onViewOffer')}
            size="regular"
          />
        </div>
      </ProductCard>
    </div>
  ))
  .add('Short Product Card', () => (
    <div className="row:cards-3col">
      <ProductCard
        header={{
          accentIcon: (
            <Icon icon={<Flame />} color="white" className="md hydrated" />
          ),
          accentText: 'Hot Offer',
          text: 'In Stock - 14-21 Days Delivery',
        }}
        description="Minim consectetur adipisicing aute consequat velit exercitation enim deserunt occaecat sit ut incididunt dolor id"
        features={FEATURES}
        onCompare={action('onCompare')}
        onWishlist={action('onWishlist')}
        compared
        title={{
          title: '',
          link: (
            <a href="#" className="heading -large -black">
              Short Product Card
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
            onClick={action('onViewOffer')}
            size="regular"
          />
        </div>
      </ProductCard>
      <ProductCard
        header={{
          accentIcon: (
            <Icon icon={<Flame />} color="white" className="md hydrated" />
          ),
          accentText: 'Hot Offer',
          text: 'In Stock - 14-21 Days Delivery',
        }}
        description="Minim consectetur adipisicing aute consequat velit exercitation enim deserunt occaecat sit ut incididunt dolor id"
        features={FEATURES}
        onCompare={action('onCompare')}
        onWishlist={action('onWishlist')}
        title={{
          title: '',
          link: (
            <a href="#" className="heading -large -black">
              Short Product Card
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
            onClick={action('onViewOffer')}
            size="regular"
          />
        </div>
      </ProductCard>
    </div>
  ))
  .add('Model Card', () => (
    <div className="row:cards-3col">
      <Card
        imageSrc="https://source.unsplash.com/collection/2102317/1000x650?sig=403440"
        description="Minim consectetur adipisicing aute consequat velit exercitation enim deserunt occaecat sit ut incididunt dolor id"
        title={{
          title: '',
          link: (
            <a href="#" className="heading -large -black">
              Model Card
            </a>
          ),
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
            label="View All"
            onClick={action('onViewAll')}
            size="regular"
          />
        </div>
      </Card>
    </div>
  ))
  .add('Category Card', () => (
    <div className="row:cards-3col">
      <Card
        imageSrc="https://source.unsplash.com/collection/2102317/1000x650?sig=403440"
        description="Minim consectetur adipisicing aute consequat velit exercitation enim deserunt occaecat sit ut incididunt dolor id"
        title={{
          title: '',
          link: (
            <a href="#" className="heading -large -black">
              Category Card
            </a>
          ),
          withBtn: true,
        }}
      />
    </div>
  ))
  .add('Range Card', () => (
    <div className="row:cards-2col">
      <Card
        inline
        imageSrc="https://source.unsplash.com/collection/2102317/1000x650?sig=403440"
        description="Minim consectetur adipisicing aute consequat velit exercitation enim deserunt occaecat sit ut incididunt dolor id"
        title={{
          title: '',
          link: (
            <a href="#" className="heading -large -black">
              Range Card
            </a>
          ),
        }}
      >
        <div className="-flex-h">
          <Price
            price={233.95}
            size="large"
            separator="."
            priceDescription="Per Month Exc.VAT"
            priceLabel="From"
          />
          <Button
            color="teal"
            fill="solid"
            label="View 33 Offers"
            onClick={action('onViewAll')}
            size="regular"
          />
        </div>
      </Card>
    </div>
  ))
  .add('Order Card', () => (
    <div className="row:cards-1col">
      <OrderCard
        style={{ '--img-w': '300px' } as CSSProperties}
        inline
        orderDetails={{
          price: 209,
          priceDescription: 'Per Month ex. VAT',
          available: 'now',
          initailRental: '£815.70 (inc VAT)',
          contractLength: '60 months',
          annualMileage: '6000 miles',
          maintenance: 'No',
          fuel: 'Petrol',
          transmission: 'Manual',
          color: 'Solid - Polar white',
          trim: 'Cloth - Black',
          orderNumber: '204334-44-44',
          orderDate: '12.12.2020',
          orderButton: (
            <Button
              color="teal"
              fill="solid"
              label="View Order"
              onClick={action('onViewOrder')}
              size="regular"
            />
          ),
        }}
        title={{
          title: '',
          link: (
            <a href="#" className="heading -large -black">
              Order Card
            </a>
          ),
          score: 4.5,
          description: '1.4T ecoTEC Elite Nav 5dr',
        }}
        header={{
          text: 'Complete',
          complete: true,
        }}
        imageSrc="https://source.unsplash.com/collection/2102317/1000x650?sig=403440"
      />
      <OrderCard
        style={{ '--img-w': '300px' } as CSSProperties}
        inline
        orderDetails={{
          price: 209,
          priceDescription: 'Per Month ex. VAT',
          available: 'now',
          initailRental: '£815.70 (inc VAT)',
          contractLength: '60 months',
          annualMileage: '6000 miles',
          maintenance: 'No',
          fuel: 'Petrol',
          transmission: 'Manual',
          color: 'Solid - Polar white',
          trim: 'Cloth - Black',
          orderNumber: undefined,
          orderDate: '12.12.2020',
          orderButton: undefined,
        }}
        title={{
          title: '',
          link: (
            <a href="#" className="heading -large -black">
              Order Card
            </a>
          ),
          score: 4.5,
          description: '1.4T ecoTEC Elite Nav 5dr',
        }}
        header={{
          text: 'Incomplete',
          incomplete: true,
        }}
        imageSrc="https://source.unsplash.com/collection/2102317/1000x650?sig=403440"
      />
    </div>
  ))
  .add('Olaf Card', () => (
    <div className="olaf-aside">
      <OlafCard
        olafDetails={{
          price: 209,
          priceDescription: 'Per Month Exc.VAT',
          initailRental: '£815.70 (inc VAT)',
          contractLength: '60 months',
          annualMileage: '6000 miles',
          fuel: 'Petrol',
          transmission: 'Manual',
          color: 'Solid - Polar white',
          trim: 'Cloth - Black',
          maintenance: 'No',
          description:
            '59 month contact (inc VAT). Paid by Direct Debit. First due ≈ 10 days after delivery.',
        }}
        initialRentalDataTestId="about_intial-rental-testID"
        controlLengthDataTestId="about_control-length-testID"
        annualMileageDataTestId="about_annual-mileage-testID"
        annualMileageBoosterDataTestId="about_annual-milage-booster-testID"
        damageCoverDataTestId="about_damage-cover-testID"
        maintenanceDataTestId="about_maintenance-testID"
        fuelDataTestId="about_fuel-testID"
        transmissionDataTestId="about_transmission-testID"
        colorDataTestId="about_color-testID"
        trimDataTestId="about_trim-testID"
        descriptionDataTestId="about_description-testID"
        title={{
          title: '',
          link: (
            <a href="#" className="heading -large -black">
              Order Card
            </a>
          ),
          score: 4.5,
          description: '1.4T ecoTEC Elite Nav 5dr',
          size: 'large',
          ratingSize: 'lead',
        }}
        imageSrc="https://source.unsplash.com/collection/2102317/1000x650?sig=403440"
      />
    </div>
  ))
  .add('Optimised', () => (
    <div className="row:cards-3col">
      <Card
        header={{
          text: 'In Stock - 14-21 Days Delivery',
        }}
        imageSrc="https://source.unsplash.com/collection/2102317/1000x650?sig=403440"
        optimisedHost="https://dev.vanarama-nonprod.com"
      />
    </div>
  ))
  .add('Blog Carousel Card', () => {
    const props = {
      leaseType: LeaseTypeEnum.PERSONAL,
      cardIndex: 1,
      cardData: {
        url: 'url',
        onOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_TRUE,
        capId: '12345',
        availability: 5,
        rental: 242.95,
        manufacturerName: 'Audi',
        modelName: 'A5',
        averageRating: 4.5,
        imageUrl:
          'https://images.autorama.co.uk/Photos/Vehicles/161658/teslamodel30519(3).jpg',
        derivativeName: 'Test Test',
        fuelType: 'Electric',
      },
    };
    return (
      <div className="row:cards-3col">
        <BlogCarouselCard {...props} />
      </div>
    );
  });
