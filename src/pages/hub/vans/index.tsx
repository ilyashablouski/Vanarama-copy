import { NextPage } from 'next';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Media from '@vanarama/uibook/lib/components/atoms/media';
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
import ArrowForwardSharp from '@vanarama/uibook/lib/assets/icons/ArrowForwardSharp';
import CheckmarkCircleSharp from '@vanarama/uibook/lib/assets/icons/CheckmarkCircleSharp';
import CompassSharp from '@vanarama/uibook/lib/assets/icons/CompassSharp';
import SnowSharp from '@vanarama/uibook/lib/assets/icons/SnowSharp';
import WifiSharp from '@vanarama/uibook/lib/assets/icons/WifiSharp';
import Flame from '@vanarama/uibook/lib/assets/icons/Flame';
import Step from '@vanarama/uibook/lib/components/molecules/step';

import Hero, { HeroTitle, HeroHeading } from '../../../components/Hero';
import DealOfMonth from '../../../components/DealOfMonth';

const styles = {
  iconList: {
    marginTop: '1rem',
    marginBottom: '1rem',
    fontWeight: 500,
  },
  iconListFirstLi: {
    paddingTop: '0.75rem',
    marginTop: '0.75rem',
    display: 'flex',
    alignItems: 'center',
  },
  iconListLi: {
    paddingTop: '0.75rem',
    marginTop: '0.75rem',
    borderTop: ' 1px solid #e7ebee',
    display: 'flex',
    alignItems: 'center',
  },
};

const VansPage: NextPage = () => (
  <main>
    <Hero>
      <HeroHeading>Vans Hub Page</HeroHeading>
      <br />
      <HeroTitle>
        Drive Your Dream Vehicle For
        <br /> Less With Vanarama
      </HeroTitle>
    </Hero>
    <section className="section -pv-400">
      <div className="container">
        <DealOfMonth
          imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538983/cars/BMWX70419_4_bvxdvu.jpg"
          vehicle="Ford Ranger"
          specification="Pick Up Double Cab Wildtrak 3.2 EcoBlue 200 Auto"
          price={180}
          rating={4.5}
        />
      </div>
    </section>
    <section className="section">
      <div className="container">
        <Heading size="large" color="black">
          <span
            style={{ textAlign: 'center', display: 'block' }}
            className="-mb-400"
          >
            Van Special Offers
          </span>
        </Heading>
        <Slider className="-mh-400" gutter={16}>
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
          <Button label="View All Vans" color="teal" />
        </div>
      </div>
    </section>
    <section className="section">
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <Heading size="large" color="black">
            What Type Of Van Do You Need?
          </Heading>
          <Text
            className="-justify-content-row -mb-400"
            tag="p"
            size="regular"
            color="darker"
          >
            Choose from Small, Medium and Large vans, or Tippers/Lutons,
            Crew/Minibus, Pickups and Refrigerated Vans - whatever you need,
            we&apos;ve got it.
          </Text>
        </div>
        <Grid lg="4" md="1" sm="1">
          <Column md="1">
            <Card>
              <CardMedia imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538982/cars/AudiQ70719_2_kk0b0n.jpg" />
              <CardContent flex>
                <Heading tag="a" size="regular" color="black">
                  Small Vans
                </Heading>
                <Button
                  label=""
                  size="large"
                  color="teal"
                  fill="clear"
                  round
                  icon={<ArrowForwardSharp />}
                  iconPosition="after"
                />
              </CardContent>
            </Card>
          </Column>
          <Column md="1">
            <Card>
              <CardMedia imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538983/cars/BMWX70419_4_bvxdvu.jpg" />
              <CardContent flex>
                <Heading tag="a" size="regular" color="black">
                  Medium Vans
                </Heading>
                <Button
                  label=""
                  size="large"
                  color="teal"
                  fill="clear"
                  round
                  icon={<ArrowForwardSharp />}
                  iconPosition="after"
                />
              </CardContent>
            </Card>
          </Column>
          <Column md="1">
            <Card>
              <CardMedia imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538982/cars/AudiQ30718_4_k5ojqt.jpg" />
              <CardContent flex>
                <Heading tag="a" size="regular" color="black">
                  Large Vans
                </Heading>
                <Button
                  label=""
                  size="large"
                  color="teal"
                  fill="clear"
                  round
                  icon={<ArrowForwardSharp />}
                  iconPosition="after"
                />
              </CardContent>
            </Card>
          </Column>
          <Column md="1">
            <Card>
              <CardMedia imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538982/cars/AudiQ30718_4_k5ojqt.jpg" />
              <CardContent flex>
                <Heading tag="a" size="regular" color="black">
                  Other Vans
                </Heading>
                <Button
                  label=""
                  size="large"
                  color="teal"
                  fill="clear"
                  round
                  icon={<ArrowForwardSharp />}
                  iconPosition="after"
                />
              </CardContent>
            </Card>
          </Column>
        </Grid>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <Heading size="large" color="black">
          Leasing - The Simple Way To Get Your Brand New Car
        </Heading>
        <div className="-flex-h">
          <Step step={1}>
            <Heading tag="span" color="black" className="lead">
              Choose
            </Heading>
            <Text color="darker" size="regular">
              Get the car you want from our range of manufacturers - from
              something sporty to something for all the family.
            </Text>
          </Step>
          <Step step={2}>
            <Heading tag="span" color="black" className="lead">
              Apply
            </Heading>
            <Text color="darker" size="regular">
              To lease your new car, we&apos;ll just need a few details to apply
              for finance from one of our funding partners.
            </Text>
          </Step>
          <Step step={3}>
            <Heading tag="span" color="black" className="lead">
              Drive
            </Heading>
            <Text color="darker" size="regular">
              And that&apos;s it - once you&apos;ve been approved, your brand
              new car will be delivered direct to your door.
            </Text>
          </Step>
        </div>
      </div>
    </section>

    <section className="section">
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
              <ul className="icon-list -orange" style={styles.iconList}>
                <li style={styles.iconListFirstLi}>
                  <Icon icon={<CheckmarkCircleSharp />} color="orange" />
                  &nbsp;&nbsp;Choose your contract length &amp; agreed mileage
                </li>
                <li style={styles.iconListLi}>
                  <Icon icon={<CheckmarkCircleSharp />} color="orange" />
                  &nbsp;&nbsp;Pay an initial payment
                </li>
                <li style={styles.iconListLi}>
                  <Icon icon={<CheckmarkCircleSharp />} color="orange" />
                  &nbsp;&nbsp;Set up your agreed fixed monthly rental
                </li>
              </ul>
            </div>
          </Column>
          <Column md="3">
            <Media
              src="https://player.vimeo.com/video/263419265"
              vimeoConfig={{ color: 'EC6408', portrait: false }}
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
          <Column className="-inset -middle" md="3">
            <div
              style={{
                height: '100%',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <Heading size="large" color="black">
                Why Choose Vanarama For Your Van?
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
    <section className="section">
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <Heading size="large" color="black">
            Wide Range of Optional Accessories
          </Heading>
          <Text size="lead" color="dark">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </Text>
        </div>
        <br />
        <Grid lg="4" md="1" sm="1">
          <Column md="1">
            <Heading size="lead" color="black">
              Hard Tops
            </Heading>
            <Text tag="p" size="regular" color="darker">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptates provident magni quaerat, culpa repudiandae minima quo
              nobis error laboriosam ipsa.
            </Text>
          </Column>
          <Column md="1">
            <Heading size="lead" color="black">
              Bed Liners
            </Heading>
            <Text tag="p" size="regular" color="darker">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptates provident magni quaerat, culpa repudiandae minima quo
              nobis error laboriosam ipsa.
            </Text>
          </Column>
          <Column md="1">
            <Heading size="lead" color="black">
              Storage Systems
            </Heading>
            <Text tag="p" size="regular" color="darker">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptates provident magni quaerat, culpa repudiandae minima quo
              nobis error laboriosam ipsa.
            </Text>
          </Column>
          <Column md="1">
            <Heading size="lead" color="black">
              Roller Covers
            </Heading>
            <Text tag="p" size="regular" color="darker">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptates provident magni quaerat, culpa repudiandae minima quo
              nobis error laboriosam ipsa.
            </Text>
          </Column>
        </Grid>
      </div>
    </section>
    <section className="section">
      <div className="container">
        <Heading size="large" color="black">
          Not Sure How Van Leasing Works?
        </Heading>
        <Text size="regular" color="darker">
          Leasing a Van is really simple. You drive a brand new vehicle and pay
          fixed monthly rentals over 2-5 years after paying an initial rental at
          the start of your contract. At the end of your agreement, you simply
          hand the van back and choose which vehicle to upgrade to.
        </Text>
        <br />
        <Text size="regular" color="black">
          Everything you need to know is a click away in our easy to understand
          leasing guide
        </Text>
        <Button label="Veiw Leasing Guides" color="teal" />
      </div>
    </section>
    <section className="section">
      <div className="container">
        <Grid lg="4" md="2" sm="1">
          <Column md="1">
            <Tile className="-plain -button -align-center">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image
                  className="-inline"
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
            <Tile className="-plain -button -align-center">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image
                  className="-inline"
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
            <Tile className="-plain -button -align-center">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image
                  className="-inline"
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
            <Tile className="-plain -button -align-center">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image
                  className="-inline"
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

    <section className="section">
      <div className="container">
        <Grid md="1">
          <Column md="row" className="-align-center">
            <Heading>Search By Manufacturer</Heading>
          </Column>
        </Grid>
      </div>
    </section>

    <League altText="vanarama national league" />

    <LogoRow
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

    <TrustPilot src="https://widget.trustpilot.com/trustboxes/53aa8912dec7e10d38f59f36/index.html?templateId=53aa8912dec7e10d38f59f36&amp;businessunitId=594a982f0000ff0005a50d80#locale=en-GB&amp;styleHeight=130px&amp;styleWidth=100%25&amp;theme=light&amp;stars=4%2C5&amp;schemaType=Organization" />
  </main>
);

export default VansPage;
