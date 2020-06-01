import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Score from '@vanarama/uibook/lib/components/atoms/score';
import Link from '@vanarama/uibook/lib/components/atoms/link';
import Breadcrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Slider from '@vanarama/uibook/lib/components/organisms/slider';
import ProductCard from '@vanarama/uibook/lib/components/organisms/product-card';
import BluetoothSharp from '@vanarama/uibook/lib/assets/icons/BluetoothSharp';
import CompassSharp from '@vanarama/uibook/lib/assets/icons/CompassSharp';
import SnowSharp from '@vanarama/uibook/lib/assets/icons/SnowSharp';
import WifiSharp from '@vanarama/uibook/lib/assets/icons/WifiSharp';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Flame from '@vanarama/uibook/lib/assets/icons/Flame';
import { Column } from '@vanarama/uibook/lib/components/molecules/grid';

const CreditChecker: NextPage = () => {
  const router = useRouter();
  const scoreParam = router.query.score as string;
  const score = parseInt(scoreParam, 10) || 0;

  const breadcrumbProps = {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Leasing Guide', href: '/' },
      { label: 'Check Your Eligibility', href: '/' },
    ],
  };

  return (
    <div>
      <section className="section">
        <div className="container">
          <div>
            <div>
              <Breadcrumb items={breadcrumbProps.items} />
            </div>
            <div className="-col-400">
              <Heading color="black" size="xlarge">
                Your Result
              </Heading>
              <Column md="2">
                <Score score={score} />
              </Column>
              <Column className="column -inset -col-400" md="4">
                <Heading tag="span" size="large">
                  Choose Your Vehicle
                </Heading>
                <Text tag="p" size="regular" color="darker">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                  odio blanditiis amet reiciendis cupiditate voluptas dolorum?
                  Quidem nam ad debitis!
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
              </Column>
            </div>
          </div>
        </div>
      </section>
      <div className="row:carousel">
        <div className="row:bg-lighter">
          <div className="-a-center" style={{ margin: '4rem 0 2rem 0' }}>
            <Heading size="large" color="black">
              Top Offers
            </Heading>
          </div>
          <Slider className="-mh-auto" gutter={16}>
            {[1, 2, 3, 4, 5].map(k => (
              <div key={k.toString()} style={{ width: 345 }}>
                <ProductCard
                  flag={{
                    accentIcon: <Icon icon={<Flame />} color="white" />,
                    accentText: 'Hot Deal',
                    text: 'In Stock - 14-21 Days Delivery',
                  }}
                  href="#"
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
                  onViewOffer={() => true}
                  onWishlist={() => true}
                  price={209}
                  rating={4.5}
                  subtitle="1.0 IG-T 100 Tekna 5dr Xtronic [Leather]"
                  title="Peugeot 208"
                />
              </div>
            ))}
          </Slider>
          <div className="-a-center" style={{ margin: '4rem 0 2rem 0' }}>
            <Button
              color="teal"
              size="regular"
              fill="solid"
              label="View All Top Offers"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditChecker;
