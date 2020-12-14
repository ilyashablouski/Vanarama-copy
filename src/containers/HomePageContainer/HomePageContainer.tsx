import { useState } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { ApolloError } from '@apollo/client';
import ReactMarkdown from 'react-markdown/with-html';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import Head from '../../components/Head/Head';
import {
  HomePageData,
  HomePageData_homePage_sections_tiles_tiles as TileData,
  HomePageData_homePage_sections_cards_cards as CardData,
  HomePageData_homePage_sections_featured1_iconList as IIconList,
} from '../../../generated/HomePageData';
import { ProductCardData } from '../../../generated/ProductCardData';
import { LeaseTypeEnum } from '../../../generated/globalTypes';
import getTitleTag from '../../utils/getTitleTag';
import useLeaseType from '../../hooks/useLeaseType';
import { getSectionsData } from '../../utils/getSectionsData';
import {
  useVehicleListUrl,
  useVehicleListUrlFetchMore,
} from '../../gql/vehicleList';
import TileLink from '../../components/TileLink/TileLink';
import { GetDerivatives } from '../../../generated/GetDerivatives';
// import Hero from '../../components/Hero';
import Hero, { HeroHeading, HeroTitle } from '../../components/Hero';
import Skeleton from '../../components/Skeleton';

const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Image = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/image'),
  {
    loading: () => <Skeleton count={4} />,
  },
);
const Text = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/text'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Card = dynamic(
  () => import('@vanarama/uibook/lib/components/molecules/cards'),
  {
    loading: () => <Skeleton count={5} />,
  },
);
const Tabs = dynamic(
  () => import('@vanarama/uibook/lib/components/molecules/tabs'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Tab = dynamic(
  () => import('@vanarama/uibook/lib/components/molecules/tabs/Tab'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const TabList = dynamic(() =>
  import('@vanarama/uibook/lib/components/molecules/tabs/TabList'),
);
const TabPanel = dynamic(
  () => import('@vanarama/uibook/lib/components/molecules/tabs/TabPanel'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const TabPanels = dynamic(
  () => import('@vanarama/uibook/lib/components/molecules/tabs/TabPanels'),
  {
    loading: () => <Skeleton count={3} />,
  },
);
const Tile = dynamic(
  () => import('@vanarama/uibook/lib/components/molecules/tile'),
  {
    loading: () => <Skeleton count={3} />,
  },
);
const TrustPilot = dynamic(
  () => import('@vanarama/uibook/lib/components/molecules/trustpilot'),
  {
    loading: () => <Skeleton count={4} />,
    ssr: false,
  },
);
const IconList = dynamic(
  () => import('@vanarama/uibook/lib/components/organisms/icon-list'),
  {
    loading: () => <Skeleton count={3} />,
  },
);
// @ts-ignore
const IconListItem = dynamic(() =>
  import('@vanarama/uibook/lib/components/organisms/icon-list').then(
    mod => mod.IconListItem,
  ),
);
const League = dynamic(
  () => import('@vanarama/uibook/lib/components/organisms/league'),
  {
    loading: () => <Skeleton count={2} />,
  },
);
const Media = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/media'),
  {
    loading: () => <Skeleton count={3} />,
  },
);
const ProductCarousel = dynamic(
  () => import('../../components/ProductCarousel/ProductCarousel'),
  {
    loading: () => <Skeleton count={4} />,
  },
);
const RouterLink = dynamic(() =>
  import('../../components/RouterLink/RouterLink'),
);

// // Hero
// const HeroHeading = dynamic(
//   // @ts-ignore
//   () => import('../../components/Hero').then(mod => mod.HeroHeading),
//   {
//     loading: () => <Skeleton count={2} />,
//   },
// );
// const HeroTitle = dynamic(
//   // @ts-ignore
//   () => import('../../components/Hero').then(mod => mod.HeroTitle),
//   {
//     loading: () => <Skeleton count={2} />,
//   },
// );

const SchemaJSON = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/schema-json'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const optimisationOptions = {
  height: 620,
  width: 620,
  quality: 59,
};

export interface IHomePageContainer {
  data: HomePageData;
  loading: boolean;
  error: ApolloError | undefined;
  productsVan: ProductCardData;
  productsCar: ProductCardData;
  productsPickUp: ProductCardData;
  productsVanDerivatives: GetDerivatives;
  productsCarDerivatives: GetDerivatives;
  productsPickUpDerivatives: GetDerivatives;
  derivativeIds: string[];
}

export const HomePageContainer: React.FC<IHomePageContainer> = ({
  // loading,
  error,
  data,
  productsVanDerivatives,
  productsCarDerivatives,
  productsPickUpDerivatives,
  productsVan,
  productsCar,
  productsPickUp,
  derivativeIds,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const { cachedLeaseType } = useLeaseType(null);

  const vehicleListUrlQuery = useVehicleListUrl(derivativeIds);

  useVehicleListUrlFetchMore(vehicleListUrlQuery, derivativeIds);

  // if (loading) {
  //   return <Loading size="large" />;
  // }

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
          <>
            <HeroHeading
              text={
                getSectionsData(['hero', 'title'], data?.homePage?.sections) ||
                ''
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
                getSectionsData(['hero', 'body'], data?.homePage?.sections) ||
                ''
              }
            />
          </>
        </div>
        <Image
          loadImage
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
          optimisationOptions={optimisationOptions}
          className="hero--image"
          plain
          size="expand"
          src={
            getSectionsData(
              ['hero', 'image', 'file', 'url'],
              data?.homePage?.sections,
            ) || null
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
                    vehicleList: vehicleListUrlQuery.data?.vehicleList!,
                  }}
                  countItems={productsVan?.productCarousel?.length || 6}
                  dataTestIdBtn="van-view-offer"
                />
                <div className="-justify-content-row -pt-500">
                  <RouterLink
                    className="button"
                    classNames={{
                      color: 'teal',
                      solid: true,
                      size: 'regular',
                    }}
                    link={{
                      label: 'View All Van Offers',
                      href: '/special-offers.html',
                    }}
                    withoutDefaultClassName
                    dataTestId="view-all-vans"
                  >
                    <div className="button--inner">View All Van Offers</div>
                  </RouterLink>
                </div>
              </div>
            </TabPanel>
            <TabPanel index={1}>
              <div style={{ maxWidth: 1216 }} className="-mh-auto">
                <LazyLoadComponent>
                  <ProductCarousel
                    leaseType={
                      isPersonalLcv
                        ? LeaseTypeEnum.PERSONAL
                        : LeaseTypeEnum.BUSINESS
                    }
                    productType="Pickup"
                    data={{
                      derivatives:
                        productsPickUpDerivatives?.derivatives || null,
                      productCard: productsPickUp?.productCarousel || null,
                      vehicleList: vehicleListUrlQuery.data?.vehicleList!,
                    }}
                    countItems={productsPickUp?.productCarousel?.length || 6}
                    dataTestIdBtn="pickup-view-offer"
                  />
                </LazyLoadComponent>
                <div className="-justify-content-row -pt-500">
                  <RouterLink
                    className="button"
                    classNames={{
                      color: 'teal',
                      solid: true,
                      size: 'regular',
                    }}
                    link={{
                      label: 'View All Truck Offers',
                      href: '/pickup-special-offers.html',
                    }}
                    withoutDefaultClassName
                    dataTestId="view-all-pickups"
                  >
                    <div className="button--inner">View All Truck Offers</div>
                  </RouterLink>
                </div>
              </div>
            </TabPanel>
            <TabPanel index={2}>
              <div style={{ maxWidth: 1216 }} className="-mh-auto">
                <LazyLoadComponent>
                  <ProductCarousel
                    leaseType={
                      isPersonalCar
                        ? LeaseTypeEnum.PERSONAL
                        : LeaseTypeEnum.BUSINESS
                    }
                    data={{
                      derivatives: productsCarDerivatives?.derivatives || null,
                      productCard: productsCar?.productCarousel || null,
                      vehicleList: vehicleListUrlQuery.data?.vehicleList!,
                    }}
                    countItems={productsCar?.productCarousel?.length || 6}
                    dataTestIdBtn="car-view-offer"
                  />
                </LazyLoadComponent>
                <div className="-justify-content-row -pt-500">
                  <RouterLink
                    className="button"
                    classNames={{
                      color: 'teal',
                      solid: true,
                      size: 'regular',
                    }}
                    link={{
                      label: 'View All Car Offers',
                      href: '/car-leasing-special-offers.html',
                    }}
                    withoutDefaultClassName
                    dataTestId="view-all-cars"
                  >
                    <div className="button--inner">View All Car Offers</div>
                  </RouterLink>
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
          ) as CardData[])?.map((card: CardData, index) => (
            <RouterLink
              link={{
                href: card.link?.legacyUrl || card.link?.url || '#',
                label: card.link?.text || '',
              }}
              key={card.title || index}
            >
              <Card
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                title={{
                  title: '',
                  withBtn: true,
                  link: (
                    <Heading tag={getTitleTag(card.titleTag || 'span') as any}>
                      {card.title}
                    </Heading>
                  ),
                }}
                imageSrc={
                  card.image?.file?.url ||
                  'https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538983/cars/CitroenBerlingo0718_4_xjonps.jpg'
                }
                description={card.body || ''}
              />
            </RouterLink>
          ))}
        </div>
      </section>

      <section className="row:featured-right">
        <LazyLoadComponent>
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
              {getSectionsData(
                ['featured1', 'title'],
                data?.homePage?.sections,
              )}
            </Heading>
            <div className="markdown">
              <ReactMarkdown
                allowDangerousHtml
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
        </LazyLoadComponent>
      </section>

      <section className="row:featured-left">
        <LazyLoadComponent>
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
              {getSectionsData(
                ['featured2', 'title'],
                data?.homePage?.sections,
              )}
            </Heading>
            <div className="markdown">
              <ReactMarkdown
                allowDangerousHtml
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
        </LazyLoadComponent>
      </section>

      <section className="row:features-4col">
        <LazyLoadComponent>
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
        </LazyLoadComponent>
      </section>

      <section className="row:league">
        <LazyLoadComponent>
          <League
            clickReadMore={() => Router.push('/fan-hub.html')}
            altText="vanarama national league"
          />
        </LazyLoadComponent>
      </section>

      <section className="row:featured-logos">
        <LazyLoadComponent>
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
        </LazyLoadComponent>
      </section>

      <section className="row:trustpilot">
        <LazyLoadComponent>
          <TrustPilot src="https://widget.trustpilot.com/trustboxes/53aa8912dec7e10d38f59f36/index.html?templateId=53aa8912dec7e10d38f59f36&amp;businessunitId=594a982f0000ff0005a50d80#locale=en-GB&amp;styleHeight=130px&amp;styleWidth=100%25&amp;theme=light&amp;stars=4%2C5&amp;schemaType=Organization" />
        </LazyLoadComponent>
      </section>

      {data && (
        <SchemaJSON json={JSON.stringify(data?.homePage?.metaData?.schema)} />
      )}
    </>
  );
};

export default HomePageContainer;
