import { useQuery } from '@apollo/client';
import { getDataFromTree } from '@apollo/react-ssr';
import BluetoothSharp from '@vanarama/uibook/lib/assets/icons/BluetoothSharp';
import CompassSharp from '@vanarama/uibook/lib/assets/icons/CompassSharp';
import ArrowForwardSharp from '@vanarama/uibook/lib/assets/icons/ArrowForwardSharp';
import Flame from '@vanarama/uibook/lib/assets/icons/Flame';
import SnowSharp from '@vanarama/uibook/lib/assets/icons/SnowSharp';
import WifiSharp from '@vanarama/uibook/lib/assets/icons/WifiSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
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

      <section className="row:lead-text">
        <span className="heading -xlarge -black">Large Sales Heading</span>
        <span className="text -lead -darker">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          aspernatur fugiat. Lorem ipsum dolor sit amet consectetur adipisicing
          elit.
        </span>
      </section>

      <section className="tabs-wrap row:tabbed">
        <Tabs
          activeIndex={activeTab}
          onChange={setActiveTab}
          variant="alternative"
          align="center"
        >
          <TabList className="lead">
            <Tab index={0}>Vans</Tab>
            <Tab index={1}>Pickups</Tab>
            <Tab index={2}>Cars</Tab>
          </TabList>
          <TabPanels>
            <TabPanel index={0}>
              <div style={{ maxWidth: 1216 }} className="-mh-auto">
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
      </section>

      <section className="row:bg-lighter">
        <div className="row:cards-3col">
          <Card>
            <CardMedia imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538983/cars/CitroenBerlingo0718_4_xjonps.jpg" />
            <CardContent>
              <div className="title flex-h">
                <Heading size="lead" color="black">
                  Search Vans
                  <Button
                    className=""
                    label=""
                    size="xsmall"
                    color="teal"
                    fill="solid"
                    round
                    icon={<ArrowForwardSharp />}
                    iconColor="white"
                    iconPosition="after"
                  />
                </Heading>
              </div>
              <Text tag="span" color="dark" size="regular">
                Get the car you want from our range of manufacturers - from
                something sporty to something for all the family
              </Text>
            </CardContent>
          </Card>

          <Card>
            <CardMedia imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538983/cars/BMWX70419_4_bvxdvu.jpg" />
            <CardContent>
              <div className="title flex-h">
                <Heading size="lead" color="black">
                  Search Pickups
                  <Button
                    className=""
                    label=""
                    size="xsmall"
                    color="teal"
                    fill="solid"
                    round
                    icon={<ArrowForwardSharp />}
                    iconColor="white"
                    iconPosition="after"
                  />
                </Heading>
              </div>
              <Text tag="span" color="dark" size="regular">
                Get the car you want from our range of manufacturers - from
                something sporty to something for all the family
              </Text>
            </CardContent>
          </Card>

          <Card>
            <CardMedia imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538982/cars/AudiQ30718_4_k5ojqt.jpg" />
            <CardContent>
              <div className="title flex-h">
                <Heading size="lead" color="black">
                  Search Cars
                  <Button
                    className=""
                    label=""
                    size="xsmall"
                    color="teal"
                    fill="solid"
                    round
                    icon={<ArrowForwardSharp />}
                    iconColor="white"
                    iconPosition="after"
                  />
                </Heading>
              </div>
              <Text tag="span" color="dark" size="regular">
                Get the car you want from our range of manufacturers - from
                something sporty to something for all the family
              </Text>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="row:featured-right">
        <div style={{ padding: '1rem' }}>
          <Heading size="large" color="black">
            {data && data.homePage.sections.featured1.title}
          </Heading>
          <Text tag="p" size="regular" color="darker">
            {data && data.homePage.sections.featured1.body}
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
        <Image src="https://source.unsplash.com/collection/2102317/1000x650?sig=40349" />
      </section>

      <section className="row:featured-left">
        <Image src="https://source.unsplash.com/collection/2102317/900x500?sig=403422" />
        <div>
          <Heading size="large" color="black">
            {data && data.homePage.sections.featured2.title}
          </Heading>
          <Text tag="p" size="regular" color="darker">
            {data && data.homePage.sections.featured2.body}
          </Text>
        </div>
      </section>

      <section className="row:features-4col">
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
      </section>

      <section className="row:league">
        <League altText="vanarama national league" />
      </section>

      <section className="row:featured-logos">
        <Heading tag="span" size="small" color="darker">
          AS FEATURED ON
        </Heading>
        <div>
          {[
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
              label: 'dailymail',
              href:
                'https://www.vanarama.com/Assets/images-optimised/home/featured/dailymail.png',
            },
            {
              label: 'dailymirror',
              href:
                'https://www.vanarama.com/Assets/images-optimised/home/featured/dailymirror.png',
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
          ].map(({ href, label }) => (
            <Image key={label} src={href} alt={label} size="expand" plain />
          ))}
        </div>
      </section>
      <section className="row:trustpilot">
        <TrustPilot src="https://widget.trustpilot.com/trustboxes/53aa8912dec7e10d38f59f36/index.html?templateId=53aa8912dec7e10d38f59f36&amp;businessunitId=594a982f0000ff0005a50d80#locale=en-GB&amp;styleHeight=130px&amp;styleWidth=100%25&amp;theme=light&amp;stars=4%2C5&amp;schemaType=Organization" />
      </section>
    </>
  );
};

export default withApollo(HomePage, { getDataFromTree });
