import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Score from '@vanarama/uibook/lib/components/atoms/score';
import Link from '@vanarama/uibook/lib/components/atoms/link';
import Breadcrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Slider from '@vanarama/uibook/lib/components/organisms/carousel';
import BluetoothSharp from '@vanarama/uibook/lib/assets/icons/BluetoothSharp';
import CompassSharp from '@vanarama/uibook/lib/assets/icons/CompassSharp';
import SnowSharp from '@vanarama/uibook/lib/assets/icons/SnowSharp';
import WifiSharp from '@vanarama/uibook/lib/assets/icons/WifiSharp';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Flame from '@vanarama/uibook/lib/assets/icons/Flame';
import Price from '@vanarama/uibook/lib/components/atoms/price';
import ProductCard from '@vanarama/uibook/lib/components/molecules/cards/ProductCard/ProductCard';
import RouterLink from '../../components/RouterLink/RouterLink';

const CreditChecker: NextPage = () => {
  const router = useRouter();
  const scoreParam = router.query.score as string;
  const score = parseInt(scoreParam, 10) || 0;

  const breadcrumbProps = {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Eligibility Checker', href: '/' },
      { label: 'Your Result', href: '/' },
    ],
  };

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
            Choose Your Vehicle
          </Heading>
          <Text tag="p" size="regular" color="darker">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod odio
            blanditiis amet reiciendis cupiditate voluptas dolorum? Quidem nam
            ad debitis!
          </Text>
          <Button
            color="teal"
            size="regular"
            fill="solid"
            label="Choose Your Vehicle"
            role="button"
          />
          <Text tag="p">
            Not sure? We can <Link>help you choose</Link>
          </Text>
        </div>
      </div>

      <div className="row:bg-lighter -col-300">
        <Heading className="-a-center" tag="h3" size="large" color="black">
          Top Offers
        </Heading>
        <Slider className="-mh-auto" slidesToShow={3} gutter={16}>
          {[1, 2, 3, 4, 5].map(k => (
            <div key={k.toString()} style={{ width: 394 }}>
              <ProductCard
                header={{
                  accentIcon: <Icon icon={<Flame />} color="white" />,
                  accentText: 'Hot Deal',
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
            </div>
          ))}
        </Slider>
        <div className="-justify-content-row -pt-500">
          <Button label="View All Top Offers" color="teal" />
        </div>
      </div>
    </>
  );
};

export default CreditChecker;
