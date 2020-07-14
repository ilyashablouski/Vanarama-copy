import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Score from '@vanarama/uibook/lib/components/atoms/score';
import Link from '@vanarama/uibook/lib/components/atoms/link';
import Breadcrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Carousel from '@vanarama/uibook/lib/components/organisms/carousel';
import BluetoothSharp from '@vanarama/uibook/lib/assets/icons/BluetoothSharp';
import CompassSharp from '@vanarama/uibook/lib/assets/icons/CompassSharp';
import SnowSharp from '@vanarama/uibook/lib/assets/icons/SnowSharp';
import WifiSharp from '@vanarama/uibook/lib/assets/icons/WifiSharp';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Flame from '@vanarama/uibook/lib/assets/icons/Flame';
import Price from '@vanarama/uibook/lib/components/atoms/price';
import ProductCard from '@vanarama/uibook/lib/components/molecules/cards/ProductCard/ProductCard';
import RouterLink from '../../components/RouterLink/RouterLink';
import useSliderProperties from '../../hooks/useSliderProperties';

const CreditChecker: NextPage = () => {
  const router = useRouter();
  const scoreParam = router.query.score as string;
  const score = parseInt(scoreParam, 10) || 0;
  const { slidesToShow } = useSliderProperties();

  const breadcrumbProps = {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Eligibility Checker', href: '/' },
      { label: 'Your Result', href: '/' },
    ],
  };

  const setText = () => {
    // Average.
    let text = {
      heading: 'Congratulations!',
      body: `This means you’re likely to be accepted for credit to lease with us. So, what are you waiting for? Take a look at the latest deals on brand-new vehicles now.`,
      buttonLabel: 'Choose Your Vehicle',
    };
    // Poor.
    if (score <= 50)
      text = {
        heading: 'Don’t worry!',
        body:
          'Your score doesn’t necessarily mean you won’t be accepted for credit to lease a vehicle. Get in touch and we’ll look into this for you and see what we can do.',
        buttonLabel: 'Get In Touch',
      };
    // Good.
    if (score >= 90)
      text = {
        heading: 'Congratulations!',
        body:
          'This means you’re extremely likely to be accepted for credit to lease with us. So, what are you waiting for? Take a look at the latest deals on brand-new vehicles now.',
        buttonLabel: 'Choose Your Vehicle',
      };

    return text;
  };

  const contentForCurrentScore = setText();

  return (
    <>
      <div className="row:title">
        <Breadcrumb items={breadcrumbProps.items} />
        <Heading tag="h1" color="black" size="xlarge">
          Your Result
        </Heading>
      </div>
      <div className="row:featured-left">
        <Score score={score} />
        <div>
          <Heading tag="span" size="large">
            {contentForCurrentScore.heading}
          </Heading>
          <Text tag="p" size="regular" color="darker">
            {contentForCurrentScore.body}
          </Text>
          <Button
            color="teal"
            size="regular"
            fill="solid"
            label={contentForCurrentScore.buttonLabel}
            role="button"
          />
          <Text tag="p">
            Not sure? We can <Link>help you choose</Link>
          </Text>
        </div>
      </div>

      <div className="row:bg-lighter">
        <div>
          <Heading size="large" color="black">
            <span
              style={{ textAlign: 'center', display: 'block' }}
              className="-mb-400"
            >
              Top Offers
            </span>
          </Heading>
          <Carousel className="-mh-auto" countItems={5}>
            {[1, 2, 3, 4, 5].map(k => (
              <ProductCard
                key={k.toString()}
                header={{
                  accentIcon:
                    slidesToShow > 2 ? (
                      <Icon icon={<Flame />} color="white" />
                    ) : (
                      ''
                    ),
                  accentText: slidesToShow > 2 ? 'Hot Deal' : '',
                  text: 'In Stock - 14-21 Days Delivery',
                }}
                features={[
                  {
                    icon: <Icon icon={<SnowSharp />} color="dark" />,
                    label: 'Aircon',
                  },
                  {
                    icon: <Icon icon={<BluetoothSharp />} color="dark" />,
                    label: 'Bluetooth',
                  },
                  {
                    icon: <Icon icon={<CompassSharp />} color="dark" />,
                    label: 'Navigation',
                  },
                  {
                    icon: <Icon icon={<WifiSharp />} color="dark" />,
                    label: 'Sensors',
                  },
                ]}
                imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/v1581538983/cars/PeugeotRifter0718_7_lqteyc.jpg"
                onCompare={() => true}
                onWishlist={() => true}
                title={{
                  title: '',
                  link: (
                    <RouterLink
                      link={{ href: '#', label: 'Peugeot 208' }}
                      className="heading"
                      classNames={{ size: 'large', color: 'black' }}
                    />
                  ),
                  description: '1.0 IG-T 100 Tekna 5dr Xtronic [Leather]',
                  score: 4.5,
                }}
              >
                <div className="-flex-h">
                  <Price
                    price={209}
                    size="large"
                    separator="."
                    priceDescription="Per Month Exc.VAT"
                  />
                  <Button
                    color="teal"
                    fill="solid"
                    label="View Offer"
                    onClick={() => true}
                    size="regular"
                  />
                </div>
              </ProductCard>
            ))}
          </Carousel>
          <div className="-justify-content-row -pt-500">
            <Button label="View All Vans" color="teal" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreditChecker;
