import { useQuery } from '@apollo/client';
import { getDataFromTree } from '@apollo/react-ssr';
import BluetoothSharp from '@vanarama/uibook/lib/assets/icons/BluetoothSharp';
import CompassSharp from '@vanarama/uibook/lib/assets/icons/CompassSharp';
import Flame from '@vanarama/uibook/lib/assets/icons/Flame';
import SnowSharp from '@vanarama/uibook/lib/assets/icons/SnowSharp';
import WifiSharp from '@vanarama/uibook/lib/assets/icons/WifiSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Media from '@vanarama/uibook/lib/components/atoms/media';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Card, {
  CardContent,
  CardMedia,
} from '@vanarama/uibook/lib/components/molecules/card';
import Tabs from '@vanarama/uibook/lib/components/molecules/tabs';
import Tab from '@vanarama/uibook/lib/components/molecules/tabs/Tab';
import TabList from '@vanarama/uibook/lib/components/molecules/tabs/TabList';
import TabPanel from '@vanarama/uibook/lib/components/molecules/tabs/TabPanel';
import TabPanels from '@vanarama/uibook/lib/components/molecules/tabs/TabPanels';
import Tile from '@vanarama/uibook/lib/components/molecules/tile';
import TrustPilot from '@vanarama/uibook/lib/components/molecules/trustpilot';
import Slider from '@vanarama/uibook/lib/components/organisms/carousel';
import IconList, {
  IconListItem,
} from '@vanarama/uibook/lib/components/organisms/icon-list';
import League from '@vanarama/uibook/lib/components/organisms/league';
import ProductCard from '@vanarama/uibook/lib/components/organisms/product-card';
import { NextPage } from 'next';
import { useState } from 'react';
import {
  HomePageData,
  HomePageData_homePage_sections_tiles_tiles as TileData,
} from '../../generated/HomePageData';
import Hero, { HeroHeading, HeroTitle } from '../components/Hero';
import { ALL_CONTENT } from '../gql/homepage';
import withApollo from '../hocs/withApollo';

export const HomePage: NextPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { data, loading, error } = useQuery<HomePageData>(ALL_CONTENT);
  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <Hero>
        <div className="hero--title">
          <HeroHeading>{data?.homePage.sections.hero.title}</HeroHeading>
          <br />
          <HeroTitle>{data?.homePage.sections.hero.body}</HeroTitle>
        </div>
        <Image
          className="hero--image"
          plain
          size="expand"
          src={data?.homePage.sections.hero.image.file.url || ''}
        />
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
          <Tabs activeIndex={activeTab} onChange={setActiveTab}>
            <TabList>
              <Tab index={0}>Vans</Tab>
              <Tab index={1}>Pickups</Tab>
              <Tab index={2}>Cars</Tab>
            </TabList>
            <TabPanels>
              <TabPanel index={0}>
                <div>
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
                              icon: (
                                <Icon icon={<BluetoothSharp />} color="dark" />
                              ),
                              label: 'Bluetooth',
                            },
                            {
                              icon: (
                                <Icon icon={<CompassSharp />} color="dark" />
                              ),
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
              </TabPanel>
              <TabPanel index={1}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button label="View All Pickup Offers" color="teal" />
                  </div>
                </div>
              </TabPanel>
              <TabPanel index={2}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button label="View All Car Offers" color="teal" />
                  </div>
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </section>

      <section className="row:bg-lighter">
        <div className="row:cards-3col">
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
        </div>
      </section>

      <section className="section -bg-lighter">
        <div className="container">
          <div>
            <div className="-inset -middle">
              <div style={{ padding: '1rem' }}>
                <Heading size="large" color="black">
                  {data?.homePage.sections.featured1.title}
                </Heading>
                <Text tag="p" size="regular" color="darker">
                  {data?.homePage.sections.featured1.body}
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
            </div>
            <div>
              <Media
                responsive
                src="https://player.vimeo.com/video/263419265"
                vimeoConfig={{ color: 'EC6408', portrait: false }}
                className="media-wrapper"
                controls
                width="100%"
                height="100%"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div>
            <div>
              <Image src="https://source.unsplash.com/collection/2102317/1000x650?sig=40349" />
            </div>
            <div className="-inset -middle -col-400">
              <div>
                <Heading size="large" color="black">
                  {data?.homePage.sections.featured2.title}
                </Heading>
                <Text tag="p" size="regular" color="darker">
                  {data?.homePage.sections.featured2.body}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section -bg-lighter">
        <div className="container">
          <div>
            {data?.homePage.sections.tiles.tiles?.map((t: TileData) => (
              <div key={t.title}>
                <Tile className="-plain -button -align-center" plain>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Image
                      inline
                      round
                      size="large"
                      src={
                        t.image?.file?.url ||
                        ' https://source.unsplash.com/collection/2102317/1000x650?sig=403411'
                      }
                    />
                  </div>
                  <a className="tile--link" href="##">
                    <Heading tag="span" size="regular" color="black">
                      {t.title}
                    </Heading>
                  </a>
                  <Text tag="p">{t.body}</Text>
                </Tile>
              </div>
            ))}
          </div>
        </div>
      </section>

      <League altText="vanarama national league" />

      {/* <LogoRow
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
      /> */}

      <TrustPilot src="https://widget.trustpilot.com/trustboxes/53aa8912dec7e10d38f59f36/index.html?templateId=53aa8912dec7e10d38f59f36&amp;businessunitId=594a982f0000ff0005a50d80#locale=en-GB&amp;styleHeight=130px&amp;styleWidth=100%25&amp;theme=light&amp;stars=4%2C5&amp;schemaType=Organization" />
    </>
  );
};

export default withApollo(HomePage, { getDataFromTree });
