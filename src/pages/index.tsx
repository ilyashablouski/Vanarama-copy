import { NextPage } from 'next';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Media from '@vanarama/uibook/lib/components/atoms/media';
import Tabs from '@vanarama/uibook/lib/components/molecules/tabs';
import Tile from '@vanarama/uibook/lib/components/molecules/tile';
import TrustPilot from '@vanarama/uibook/lib/components/molecules/trustpilot';
import League from '@vanarama/uibook/lib/components/organisms/league';
import LogoRow from '@vanarama/uibook/lib/components/molecules/logo-row';
import ProductCard from '@vanarama/uibook/lib/components/organisms/product-card';
import { Grid, Column } from '@vanarama/uibook/lib/components/molecules/grid';
import Card, {
  CardContent,
  CardMedia,
} from '@vanarama/uibook/lib/components/molecules/card';
import Slider from '@vanarama/uibook/lib/components/organisms/slider';
import BluetoothSharp from '@vanarama/uibook/lib/assets/icons/BluetoothSharp';
import CompassSharp from '@vanarama/uibook/lib/assets/icons/CompassSharp';
import SnowSharp from '@vanarama/uibook/lib/assets/icons/SnowSharp';
import WifiSharp from '@vanarama/uibook/lib/assets/icons/WifiSharp';
import Flame from '@vanarama/uibook/lib/assets/icons/Flame';
import IconList, {
  IconListItem,
} from '@vanarama/uibook/lib/components/organisms/icon-list';

import Hero, { HeroTitle, HeroHeading } from '../components/Hero';

const tabs = [{ label: 'Vans' }, { label: 'Pickups' }, { label: 'Cars' }];

const HomePage: NextPage = () => (
  <main>
    <Hero>
      <HeroHeading>The Vehicle Leasing Experts</HeroHeading>
      <br />
      <HeroTitle>
        Drive Your Dream Vehicle For
        <br /> Less With Vanarama
      </HeroTitle>
    </Hero>
    <section className="section -bg-lighter">
      <div className="container">
        <Heading size="large" color="black">
          <span
            style={{ textAlign: 'center', display: 'block' }}
            className="-mb-400"
          >
            Hot Deals
          </span>
        </Heading>
        <Tabs active={0} tabs={tabs}>
          <div>
            <Slider className="-mh-auto" gutter={16}>
              {[1, 2, 3, 4, 5].map(k => (
                <div key={k} style={{ width: 345 }}>
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
            <div className="-justify-content-row -pt-500">
              <Button label="View All Van Offers" color="teal" />
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button label="View All Pickup Offers" color="teal" />
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button label="View All Car Offers" color="teal" />
            </div>
          </div>
        </Tabs>
      </div>
    </section>
    <section className="section">
      <div className="container">
        <Grid lg="3" md="1" sm="1">
          <Column md="1">
            <Card className="-a-center">
              <Heading className="-pv-300" size="regular" color="black">
                Vans
              </Heading>
              <CardMedia imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538982/cars/AudiQ70719_2_kk0b0n.jpg" />
              <CardContent>
                <Text tag="p" className="-pt-400 -pb-400">
                  Get the car you want from our range of manufacturers - from
                  something sporty to something for all the family
                </Text>
                <Button label="Search Vans" color="teal" fill="solid" />
              </CardContent>
            </Card>
          </Column>
          <Column md="1">
            <Card className="-a-center">
              <Heading className="-pv-300" size="regular" color="black">
                Pickups
              </Heading>
              <CardMedia imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538983/cars/BMWX70419_4_bvxdvu.jpg" />
              <CardContent>
                <Text tag="p" className="-pt-400 -pb-400">
                  Get the car you want from our range of manufacturers - from
                  something sporty to something for all the family
                </Text>
                <Button label="Search Pickups" color="teal" fill="solid" />
              </CardContent>
            </Card>
          </Column>
          <Column md="1">
            <Card className="-a-center">
              <Heading className="-pv-300" size="regular" color="black">
                Cars
              </Heading>
              <CardMedia imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538982/cars/AudiQ30718_4_k5ojqt.jpg" />
              <CardContent>
                <Text tag="p" className="-pt-400 -pb-400">
                  Get the car you want from our range of manufacturers - from
                  something sporty to something for all the family
                </Text>
                <Button label="Search Cars" color="teal" fill="solid" />
              </CardContent>
            </Card>
          </Column>
        </Grid>
      </div>
    </section>
    <section className="section -bg-lighter">
      <div className="container">
        <Grid lg="6" md="2" sm="2">
          <Column className="-inset -middle" md="3">
            <div style={{ padding: '1rem' }}>
              <Heading size="large" color="black">
                Why Leasing ?
              </Heading>
              <Text tag="p" size="regular" color="darker">
                If you&apos;re looking to drive a brand new car, van or truck
                without any of the hassle - leasing might just be for you!
                It&apos;s affordable, simple and you&apos;re not left with a
                depreciating asset at the end of your contract.
              </Text>
              <IconList>
                <IconListItem iconColor="orange">
                  &nbsp;&nbsp;Choose your contract length &amp; agreed mileage
                </IconListItem>
                <IconListItem iconColor="orange">
                  &nbsp;&nbsp;Pay an initial payment
                </IconListItem>
                <IconListItem iconColor="orange">
                  &nbsp;&nbsp;Set up your agreed fixed monthly rental
                </IconListItem>
              </IconList>
            </div>
          </Column>
          <Column md="3">
            <Media
              responsive
              src="https://player.vimeo.com/video/263419265"
              vimeoConfig={{ color: 'EC6408', portrait: false }}
              className="media-wrapper"
              controls
              width="100%"
              height="100%"
            />
          </Column>
        </Grid>
      </div>
    </section>
    <section className="section">
      <div className="container">
        <Grid lg="6" md="2" sm="2">
          <Column md="3">
            <Image src="https://source.unsplash.com/collection/2102317/1000x650?sig=40349" />
          </Column>
          <Column className="-inset -middle -col-400" md="3">
            <div>
              <Heading size="large" color="black">
                What Makes Us The Lease Experts?
              </Heading>
              <Text tag="p" size="regular" color="darker">
                Vanarama is more than just a broker or leasing company,
                we&apos;ve been leading the market and putting our customers at
                the heart of everything we do for more than a decade.
                <br /> After 15 years of experience in business & personal van,
                pickup and car leasing, we&apos;re still pushing the industry
                forward & our vast buying power gives us access to a range of
                vehicles and lease deal pricing you can&apos;t get anywhere
                else.
              </Text>
            </div>
          </Column>
        </Grid>
      </div>
    </section>
    <section className="section -bg-lighter">
      <div className="container">
        <Grid lg="4" md="2" sm="1">
          <Column md="1">
            <Tile className="-plain -button -align-center" plain>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image
                  inline
                  round
                  size="large"
                  src="https://source.unsplash.com/collection/2102317/1000x650?sig=403420"
                />
              </div>
              <a className="tile--link" href="##">
                <Heading tag="span" size="regular" color="black">
                  Price Protection
                </Heading>
              </a>
              <Text tag="p">
                Pretium facilisi etiam pretium, cras interdum enim, nullam.
              </Text>
            </Tile>
          </Column>
          <Column md="1">
            <Tile className="-button -align-center" plain>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image
                  inline
                  round
                  size="large"
                  src="https://source.unsplash.com/collection/2102317/1000x650?sig=403411"
                />
              </div>
              <a className="tile--link" href="##">
                <Heading tag="span" size="regular" color="black">
                  Customer Reviews
                </Heading>
              </a>
              <Text tag="p">
                Pretium facilisi etiam pretium, cras interdum enim, nullam.
              </Text>
            </Tile>
          </Column>
          <Column md="1">
            <Tile className="-plain -button -align-center" plain>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image
                  inline
                  round
                  size="large"
                  src="https://source.unsplash.com/collection/2102317/1000x650?sig=403424"
                />
              </div>
              <a className="tile--link" href="##">
                <Heading tag="span" size="regular" color="black">
                  Quote Online
                </Heading>
              </a>
              <Text tag="p">
                Pretium facilisi etiam pretium, cras interdum enim, nullam.
              </Text>
            </Tile>
          </Column>
          <Column md="1">
            <Tile className="-plain -button -align-center" plain>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image
                  inline
                  round
                  size="large"
                  src="https://source.unsplash.com/collection/2102317/1000x650?sig=403445"
                />
              </div>
              <a className="tile--link" href="##">
                <Heading tag="span" size="regular" color="black">
                  Confused About Leasing?
                </Heading>
              </a>
              <Text tag="p">
                Pretium facilisi etiam pretium, cras interdum enim, nullam.
              </Text>
            </Tile>
          </Column>
        </Grid>
      </div>
    </section>

    <League altText="vanarama national league" />

    <LogoRow
      className="-bg-lighter"
      urls={[
        {
          label: 'bbc',
          href:
            'https://www.vanarama.com/Assets/images-optimised/home/featured/bbc.png',
        },
        {
          label: 'btsport',
          href:
            'https://www.vanarama.com/Assets/images-optimised/home/featured/btsport.png',
        },
        {
          label: 'dailymirror',
          href:
            'https://www.vanarama.com/Assets/images-optimised/home/featured/dailymail.png',
        },
        {
          label: 'itv',
          href:
            'https://www.vanarama.com/Assets/images-optimised/home/featured/itv.png',
        },
        {
          label: 'metro',
          href:
            'https://www.vanarama.com/Assets/images-optimised/home/featured/metro.png',
        },
        {
          label: 'thesun',
          href:
            'https://www.vanarama.com/Assets/images-optimised/home/featured/thesun.png',
        },
        {
          label: 'sky',
          href:
            'https://www.vanarama.com/Assets/images-optimised/home/featured/sky.png',
        },
        {
          label: 'thetelegraph',
          href:
            'https://www.vanarama.com/Assets/images-optimised/home/featured/thetelegraph.png',
        },
      ]}
    />
    <section className="section">
      <TrustPilot src="https://widget.trustpilot.com/trustboxes/53aa8912dec7e10d38f59f36/index.html?templateId=53aa8912dec7e10d38f59f36&amp;businessunitId=594a982f0000ff0005a50d80#locale=en-GB&amp;styleHeight=130px&amp;styleWidth=100%25&amp;theme=light&amp;stars=4%2C5&amp;schemaType=Organization" />
    </section>
  </main>
);

export default HomePage;
