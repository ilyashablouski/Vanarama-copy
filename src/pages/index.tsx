import { NextPage } from 'next';
import { useState } from 'react';
import Router from 'next/router';
import { useQuery } from '@apollo/client';
import { getDataFromTree } from '@apollo/react-ssr';
import ReactMarkdown from 'react-markdown/with-html';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import Tabs from '@vanarama/uibook/lib/components/molecules/tabs';
import Tab from '@vanarama/uibook/lib/components/molecules/tabs/Tab';
import TabList from '@vanarama/uibook/lib/components/molecules/tabs/TabList';
import TabPanel from '@vanarama/uibook/lib/components/molecules/tabs/TabPanel';
import TabPanels from '@vanarama/uibook/lib/components/molecules/tabs/TabPanels';
import Tile from '@vanarama/uibook/lib/components/molecules/tile';
import TrustPilot from '@vanarama/uibook/lib/components/molecules/trustpilot';
import IconList, {
  IconListItem,
} from '@vanarama/uibook/lib/components/organisms/icon-list';
import League from '@vanarama/uibook/lib/components/organisms/league';
import Media from '@vanarama/uibook/lib/components/atoms/media';
import Head from '../components/Head/Head';

import RouterLink from '../components/RouterLink/RouterLink';
import {
  HomePageData,
  HomePageData_homePage_sections_tiles_tiles as TileData,
  HomePageData_homePage_sections_cards_cards as CardData,
  HomePageData_homePage_sections_featured1_iconList as IIconList,
} from '../../generated/HomePageData';
import { ProductCardData } from '../../generated/ProductCardData';
import Hero, { HeroHeading, HeroTitle } from '../components/Hero';
import { ALL_HOME_CONTENT } from '../gql/homepage';
import { PRODUCT_CARD_CONTENT } from '../gql/productCard';
import withApollo from '../hocs/withApollo';
import { LeaseTypeEnum, VehicleTypeEnum } from '../../generated/globalTypes';
import ProductCarousel from '../components/ProductCarousel/ProductCarousel';
import { useCarDerivativesData } from '../containers/OrdersInformation/gql';
import getTitleTag from '../utils/getTitleTag';
import useLeaseType from '../hooks/useLeaseType';
import { getSectionsData } from '../utils/getSectionsData';
import { useVehicleListUrl } from '../gql/vehicleList';
import TileLink from '../components/TileLink/TileLink';

export const HomePage: NextPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { cachedLeaseType } = useLeaseType(null);
  const { data, loading, error } = useQuery<HomePageData>(ALL_HOME_CONTENT);

  const { data: productsVan } = useQuery<ProductCardData>(
    PRODUCT_CARD_CONTENT,
    {
      variables: {
        type: VehicleTypeEnum.LCV,
        excludeBodyType: 'Pickup',
        size: 9,
        offer: true,
      },
    },
  );

  const productsVanCapIds = productsVan?.productCarousel?.map(
    el => el?.capId || '',
  ) || [''];
  const { data: productsVanDerivatives } = useCarDerivativesData(
    productsVanCapIds,
    VehicleTypeEnum.LCV,
  );

  const { data: productsCar } = useQuery<ProductCardData>(
    PRODUCT_CARD_CONTENT,
    {
      variables: { type: VehicleTypeEnum.CAR, size: 9, offer: true },
    },
  );

  const productsCarCapIds = productsCar?.productCarousel?.map(
    el => el?.capId || '',
  ) || [''];
  const { data: productsCarDerivatives } = useCarDerivativesData(
    productsCarCapIds,
    VehicleTypeEnum.CAR,
  );

  const { data: productsPickUp } = useQuery<ProductCardData>(
    PRODUCT_CARD_CONTENT,
    {
      variables: {
        type: VehicleTypeEnum.LCV,
        bodyType: 'Pickup',
        size: 9,
        offer: true,
      },
    },
  );

  const productsPickUpCapIds = productsPickUp?.productCarousel?.map(
    el => el?.capId || '',
  ) || [''];
  const { data: productsPickUpDerivatives } = useCarDerivativesData(
    productsPickUpCapIds,
    VehicleTypeEnum.LCV,
  );

  const { data: productsVehicle } = useVehicleListUrl([
    ...productsPickUpCapIds,
    ...productsVanCapIds,
    ...productsCarCapIds,
  ]);

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const isPersonalLcv = cachedLeaseType.lcv === 'Personal';
  const isPersonalCar = cachedLeaseType.car === 'Personal';

  return (
    <>
      {data && (
        <Head
          metaData={data?.homePage.metaData}
          featuredImage={data?.homePage.featuredImage}
        />
      )}
      <Hero>
        <div className="hero--title">
          <HeroHeading
            text={
              getSectionsData(['hero', 'title'], data?.homePage?.sections) || ''
            }
            titleTag={
              getTitleTag(
                getSectionsData(
                  ['hero', 'titleTag'],
                  data?.homePage?.sections,
                ) || 'p',
              ) as keyof JSX.IntrinsicElements
            }
          />
          <br />
          <HeroTitle
            text={
              getSectionsData(['hero', 'body'], data?.homePage?.sections) || ''
            }
          />
        </div>
        <Image
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
          className="hero--image"
          plain
          size="expand"
          src={
            getSectionsData(
              ['hero', 'image', 'file', 'url'],
              data?.homePage?.sections,
            ) ||
            'https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/Audi-Hero-Image-removebg-preview.png'
          }
        />
      </Hero>

      <section className="row:lead-text">
        <Heading
          size="xlarge"
          color="black"
          tag={
            getTitleTag(
              getSectionsData(
                ['leadText', 'titleTag'],
                data?.homePage?.sections,
              ) || null,
            ) as keyof JSX.IntrinsicElements
          }
        >
          {getSectionsData(['leadText', 'heading'], data?.homePage?.sections)}
        </Heading>
        <Text size="lead" color="darker">
          {getSectionsData(
            ['leadText', 'description'],
            data?.homePage?.sections,
          )}
        </Text>
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
                <ProductCarousel
                  leaseType={
                    isPersonalLcv
                      ? LeaseTypeEnum.PERSONAL
                      : LeaseTypeEnum.BUSINESS
                  }
                  data={{
                    derivatives: productsVanDerivatives?.derivatives || null,
                    productCard: productsVan?.productCarousel || null,
                    vehicleList: productsVehicle?.vehicleList!,
                  }}
                  countItems={productsVan?.productCarousel?.length || 6}
                  dataTestIdBtn="van-view-offer"
                />
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
                <ProductCarousel
                  leaseType={
                    isPersonalLcv
                      ? LeaseTypeEnum.PERSONAL
                      : LeaseTypeEnum.BUSINESS
                  }
                  productType="Pickup"
                  data={{
                    derivatives: productsPickUpDerivatives?.derivatives || null,
                    productCard: productsPickUp?.productCarousel || null,
                    vehicleList: productsVehicle?.vehicleList!,
                  }}
                  countItems={productsPickUp?.productCarousel?.length || 6}
                  dataTestIdBtn="pickup-view-offer"
                />
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
                <ProductCarousel
                  leaseType={
                    isPersonalCar
                      ? LeaseTypeEnum.PERSONAL
                      : LeaseTypeEnum.BUSINESS
                  }
                  data={{
                    derivatives: productsCarDerivatives?.derivatives || null,
                    productCard: productsCar?.productCarousel || null,
                    vehicleList: productsVehicle?.vehicleList!,
                  }}
                  countItems={productsCar?.productCarousel?.length || 6}
                  dataTestIdBtn="car-view-offer"
                />
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
          {(getSectionsData(
            ['cards', 'cards'],
            data?.homePage?.sections,
          ) as CardData[])?.map((c: CardData, idx) => (
            <Card
              key={c.title || idx}
              title={{
                title: '',
                withBtn: true,
                link: (
                  <Heading tag={getTitleTag(c.titleTag || 'span') as any}>
                    <RouterLink
                      link={{
                        href: c.link?.url || '#',
                        label: c.link?.text || '',
                      }}
                      className="heading"
                      classNames={{ size: 'lead', color: 'black' }}
                    >
                      {c.title}
                    </RouterLink>
                  </Heading>
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
          <Heading
            size="large"
            color="black"
            tag={
              getTitleTag(
                getSectionsData(
                  ['featured1', 'titleTag'],
                  data?.homePage?.sections,
                ) || 'p',
              ) as keyof JSX.IntrinsicElements
            }
          >
            {getSectionsData(['featured1', 'title'], data?.homePage?.sections)}
          </Heading>
          <div className="markdown">
            <ReactMarkdown
              escapeHtml={false}
              source={
                getSectionsData(
                  ['featured1', 'body'],
                  data?.homePage?.sections,
                ) || ''
              }
              renderers={{
                link: props => {
                  const { href, children } = props;
                  return <RouterLink link={{ href, label: children }} />;
                },
              }}
            />
          </div>
          <IconList>
            {(getSectionsData(
              ['featured1', 'iconList'],
              data?.homePage?.sections,
            ) as IIconList[])?.map((icon: IIconList, idx) => (
              <IconListItem iconColor="orange" key={icon?.text || idx}>
                {icon?.text}
              </IconListItem>
            ))}
          </IconList>
        </div>
        {data?.homePage?.sections?.featured1?.video ? (
          <Media
            src={
              getSectionsData(
                ['featured1', 'video'],
                data?.homePage.sections,
              ) || ''
            }
            width="100%"
            height="360px"
          />
        ) : (
          <Image
            optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            src={
              getSectionsData(
                ['featured1', 'image', 'file', 'url'],
                data?.homePage.sections,
              ) ||
              'https://source.unsplash.com/collection/2102317/1000x650?sig=40349'
            }
          />
        )}
      </section>

      <section className="row:featured-left">
        {data?.homePage?.sections?.featured2?.video ? (
          <Media
            src={
              getSectionsData(
                ['featured2', 'video'],
                data?.homePage.sections,
              ) || ''
            }
            width="100%"
            height="360px"
          />
        ) : (
          <Image
            optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            src={
              getSectionsData(
                ['featured2', 'image', 'file', 'url'],
                data?.homePage.sections,
              ) ||
              'https://source.unsplash.com/collection/2102317/1000x650?sig=40349'
            }
          />
        )}
        <div>
          <Heading
            size="large"
            color="black"
            tag={
              getTitleTag(
                getSectionsData(
                  ['featured2', 'titleTag'],
                  data?.homePage?.sections,
                ) || 'p',
              ) as keyof JSX.IntrinsicElements
            }
          >
            {getSectionsData(['featured2', 'title'], data?.homePage?.sections)}
          </Heading>
          <div className="markdown">
            <ReactMarkdown
              escapeHtml={false}
              source={
                getSectionsData(
                  ['featured2', 'body'],
                  data?.homePage?.sections,
                ) || ''
              }
              renderers={{
                link: props => {
                  const { href, children } = props;
                  return <RouterLink link={{ href, label: children }} />;
                },
              }}
            />
          </div>
        </div>
      </section>

      <section className="row:features-4col">
        <Heading
          size="large"
          color="black"
          tag={
            getTitleTag(
              getSectionsData(
                ['tiles', 'titleTag'],
                data?.homePage?.sections,
              ) || 'p',
            ) as keyof JSX.IntrinsicElements
          }
        >
          {getSectionsData(['tiles', 'tilesTitle'], data?.homePage?.sections)}
        </Heading>
        {(getSectionsData(
          ['tiles', 'tiles'],
          data?.homePage?.sections,
        ) as TileData[])?.map((tile: TileData, idx) => (
          <div key={tile.title || idx}>
            <Tile className="-plain -button -align-center" plain>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image
                  optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                  inline
                  round
                  size="large"
                  src={
                    tile.image?.file?.url ||
                    ' https://source.unsplash.com/collection/2102317/1000x650?sig=403411'
                  }
                />
              </div>
              <TileLink tile={tile} />
              <Text tag="p">{tile.body}</Text>
            </Tile>
          </div>
        ))}
      </section>

      <section className="row:league">
        <League
          clickReadMore={() => Router.push('/fan-hub')}
          altText="vanarama national league"
        />
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
            <Image
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              key={label}
              src={href}
              alt={label}
              size="expand"
              plain
            />
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
