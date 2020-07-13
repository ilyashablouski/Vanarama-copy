import { NextPage } from 'next';
import { useState } from 'react';
import Router from 'next/router';
import { useQuery } from '@apollo/client';
import { getDataFromTree } from '@apollo/react-ssr';
import ReactMarkdown from 'react-markdown/with-html';
import Flame from '@vanarama/uibook/lib/assets/icons/Flame';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import ProductCard from '@vanarama/uibook/lib/components/molecules/cards/ProductCard/ProductCard';
import Tabs from '@vanarama/uibook/lib/components/molecules/tabs';
import Tab from '@vanarama/uibook/lib/components/molecules/tabs/Tab';
import TabList from '@vanarama/uibook/lib/components/molecules/tabs/TabList';
import TabPanel from '@vanarama/uibook/lib/components/molecules/tabs/TabPanel';
import TabPanels from '@vanarama/uibook/lib/components/molecules/tabs/TabPanels';
import Tile from '@vanarama/uibook/lib/components/molecules/tile';
import TrustPilot from '@vanarama/uibook/lib/components/molecules/trustpilot';
import Carousel from '@vanarama/uibook/lib/components/organisms/carousel';
import IconList, {
  IconListItem,
} from '@vanarama/uibook/lib/components/organisms/icon-list';
import League from '@vanarama/uibook/lib/components/organisms/league';
import Price from '@vanarama/uibook/lib/components/atoms/price';
import Head from '../components/Head/Head';

import RouterLink from '../components/RouterLink/RouterLink';
import {
  HomePageData,
  HomePageData_homePage_sections_tiles_tiles as TileData,
  HomePageData_homePage_sections_cards_cards as CardData,
} from '../../generated/HomePageData';
import { ProductCardData } from '../../generated/ProductCardData';
import Hero, { HeroHeading, HeroTitle } from '../components/Hero';
import { ALL_HOME_CONTENT } from '../gql/homepage';
import { PRODUCT_CARD_CONTENT } from '../gql/productCard';
import withApollo from '../hocs/withApollo';
import useSliderProperties from '../hooks/useSliderProperties';
import getIconMap from '../utils/getIconMap';
import truncateString from '../utils/truncateString';

export const HomePage: NextPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { slidesToShow } = useSliderProperties();

  const { data, loading, error } = useQuery<HomePageData>(ALL_HOME_CONTENT);

  const { data: productsVan } = useQuery<ProductCardData>(
    PRODUCT_CARD_CONTENT,
    {
      variables: { type: 'LCV', subType: 'VAN', size: 9, offer: true },
    },
  );

  const { data: productsCar } = useQuery<ProductCardData>(
    PRODUCT_CARD_CONTENT,
    {
      variables: { type: 'CAR', size: 9, offer: true },
    },
  );

  const { data: productsPickUp } = useQuery<ProductCardData>(
    PRODUCT_CARD_CONTENT,
    {
      variables: { type: 'LCV', subType: 'PICKUP', size: 9, offer: true },
    },
  );

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <Head />
      <Hero>
        <div className="hero--title">
          <HeroHeading text={data?.homePage.sections.hero?.title || ''} />
          <br />
          <HeroTitle text={data?.homePage.sections.hero?.body || ''} />
        </div>
        <Image
          className="hero--image"
          plain
          size="expand"
          src={
            data?.homePage.sections.hero?.image?.file?.url ||
            'https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/Audi-Hero-Image-removebg-preview.png'
          }
        />
      </Hero>

      <section className="row:lead-text">
        <span className="heading -xlarge -black">
          {data?.homePage.sections.leadText?.heading}
        </span>
        <span className="text -lead -darker">
          {data?.homePage.sections.leadText?.description}
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
                <Carousel
                  className="-mh-auto"
                  countItems={productsVan?.productCarousel?.length || 6}
                >
                  {productsVan?.productCarousel?.map((item, idx) => {
                    const iconMap = getIconMap(item?.keyInformation || []);
                    return (
                      <ProductCard
                        key={item?.capId || idx}
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
                        features={item?.keyInformation?.map(info => ({
                          icon: iconMap.get(info?.name?.replace(/\s+/g, '')),
                          label: info?.value || '',
                        }))}
                        imageSrc={item?.imageUrl || '/vehiclePlaceholder.jpg'}
                        onCompare={() => true}
                        onWishlist={() => true}
                        title={{
                          title: '',
                          link: (
                            <RouterLink
                              link={{
                                href: `/vans/van-details/${item?.capId}`,
                                label: truncateString(
                                  `${item?.manufacturerName} ${item?.rangeName}`,
                                ),
                              }}
                              className="heading"
                              classNames={{ size: 'large', color: 'black' }}
                            />
                          ),
                          description: item?.derivativeName || '',
                          score: item?.averageRating || 0,
                        }}
                      >
                        <div className="-flex-h">
                          <Price
                            price={item?.businessRate}
                            size="large"
                            separator="."
                            priceDescription="Per Month Exc.VAT"
                          />
                          <Button
                            color="teal"
                            fill="solid"
                            label="View Offer"
                            dataTestId="van-view-offer"
                            onClick={() =>
                              Router.push(`/vans/van-details/${item?.capId}`)
                            }
                            size="regular"
                          />
                        </div>
                      </ProductCard>
                    );
                  })}
                </Carousel>
                <div className="-justify-content-row -pt-500">
                  <Button
                    label="View All Van Offers"
                    color="teal"
                    onClick={() => Router.push('/van-leasing')}
                    dataTestId="view-all-vans"
                  />
                </div>
              </div>
            </TabPanel>
            <TabPanel index={1}>
              <div style={{ maxWidth: 1216 }} className="-mh-auto">
                <Carousel
                  className="-mh-auto"
                  countItems={productsPickUp?.productCarousel?.length || 6}
                >
                  {productsPickUp?.productCarousel?.map((item, idx) => {
                    const iconMap = getIconMap(item?.keyInformation || []);
                    return (
                      <ProductCard
                        key={item?.capId || idx}
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
                        features={item?.keyInformation?.map(info => ({
                          icon: iconMap.get(info?.name?.replace(/\s+/g, '')),
                          label: info?.value || '',
                        }))}
                        imageSrc={item?.imageUrl || '/vehiclePlaceholder.jpg'}
                        onCompare={() => true}
                        onWishlist={() => true}
                        title={{
                          title: '',
                          link: (
                            <RouterLink
                              link={{
                                href: `/pickups/pickup-details/${item?.capId}`,
                                label: truncateString(
                                  `${item?.manufacturerName} ${item?.rangeName}`,
                                ),
                              }}
                              className="heading"
                              classNames={{ size: 'large', color: 'black' }}
                            />
                          ),
                          description: item?.derivativeName || '',
                          score: item?.averageRating || 0,
                        }}
                      >
                        <div className="-flex-h">
                          <Price
                            price={item?.businessRate}
                            size="large"
                            separator="."
                            priceDescription="Per Month Exc.VAT"
                          />
                          <Button
                            color="teal"
                            fill="solid"
                            label="View Offer"
                            dataTestId="pickup-view-offer"
                            onClick={() =>
                              Router.push(
                                `/pickups/pickup-details/${item?.capId}`,
                              )
                            }
                            size="regular"
                          />
                        </div>
                      </ProductCard>
                    );
                  })}
                </Carousel>
                <div className="-justify-content-row -pt-500">
                  <Button
                    label="View All Pickup Offers"
                    color="teal"
                    onClick={() =>
                      Router.push('/van-leasing?bodyStyles=Pickup')
                    }
                    dataTestId="view-all-pickups"
                  />
                </div>
              </div>
            </TabPanel>
            <TabPanel index={2}>
              <div style={{ maxWidth: 1216 }} className="-mh-auto">
                <Carousel
                  className="-mh-auto"
                  countItems={productsCar?.productCarousel?.length || 6}
                >
                  {productsCar?.productCarousel?.map((item, idx) => {
                    const iconMap = getIconMap(item?.keyInformation || []);
                    return (
                      <ProductCard
                        key={item?.capId || idx}
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
                        features={item?.keyInformation?.map(info => ({
                          icon: iconMap.get(info?.name?.replace(/\s+/g, '')),
                          label: info?.value || '',
                        }))}
                        imageSrc={item?.imageUrl || '/vehiclePlaceholder.jpg'}
                        onCompare={() => true}
                        onWishlist={() => true}
                        title={{
                          title: '',
                          link: (
                            <RouterLink
                              link={{
                                href: `/cars/car-details/${item?.capId}`,
                                label: truncateString(
                                  `${item?.manufacturerName} ${item?.rangeName}`,
                                ),
                              }}
                              className="heading"
                              classNames={{ size: 'large', color: 'black' }}
                            />
                          ),
                          description: item?.derivativeName || '',
                          score: item?.averageRating || 0,
                        }}
                      >
                        <div className="-flex-h">
                          <Price
                            price={item?.businessRate}
                            size="large"
                            separator="."
                            priceDescription="Per Month Exc.VAT"
                          />
                          <Button
                            color="teal"
                            fill="solid"
                            label="View Offer"
                            dataTestId="car-view-offer"
                            onClick={() =>
                              Router.push(`/cars/car-details/${item?.capId}`)
                            }
                            size="regular"
                          />
                        </div>
                      </ProductCard>
                    );
                  })}
                </Carousel>
                <div className="-justify-content-row -pt-500">
                  <Button
                    label="View All Car Offers"
                    color="teal"
                    onClick={() => Router.push('/car-leasing')}
                    dataTestId="view-all-cars"
                  />
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </section>

      <section className="row:bg-lighter">
        <div className="row:cards-3col">
          {data?.homePage.sections.cards?.cards?.map((c: CardData, idx) => (
            <Card
              key={c.title || idx}
              title={{
                title: '',
                withBtn: true,
                link: (
                  <RouterLink
                    link={{
                      href: c.link?.url || '',
                      label: c.link?.text || '',
                    }}
                    className="heading"
                    classNames={{ size: 'lead', color: 'black' }}
                  >
                    {c.title}
                  </RouterLink>
                ),
              }}
              imageSrc={
                c.image?.file?.url ||
                'https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538983/cars/CitroenBerlingo0718_4_xjonps.jpg'
              }
              description={c.body || ''}
            />
          ))}
        </div>
      </section>

      <section className="row:featured-right">
        <div style={{ padding: '1rem' }}>
          <Heading size="large" color="black">
            {data && data.homePage.sections.featured1?.title}
          </Heading>
          <Text tag="div" className="markdown" size="regular" color="darker">
            <ReactMarkdown
              escapeHtml={false}
              source={data?.homePage.sections.featured1?.body || ''}
            />
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
            {data && data.homePage.sections.featured2?.title}
          </Heading>
          <Text className="markdown" tag="div" size="regular" color="darker">
            <ReactMarkdown
              escapeHtml={false}
              source={data?.homePage.sections.featured2?.body || ''}
            />
          </Text>
        </div>
      </section>

      <section className="row:features-4col">
        {data?.homePage.sections.tiles?.tiles?.map((t: TileData, idx) => (
          <div key={t.title || idx}>
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
