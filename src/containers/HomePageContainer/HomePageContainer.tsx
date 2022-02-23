import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown/with-html';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import Media from 'core/atoms/media';
import ImageV2 from 'core/atoms/image/ImageV2';
import TrustPilot from 'core/molecules/trustpilot';
import { IServiceBanner } from 'core/molecules/service-banner/interfaces';
import Head from '../../components/Head/Head';
import {
  HomePageData,
  HomePageData_homePage_sections_cards_cards as CardData,
  HomePageData_homePage_sections_featured1_iconList as IIconList,
} from '../../../generated/HomePageData';
import { filterList as IFilterList } from '../../../generated/filterList';
import { LeaseTypeEnum } from '../../../generated/globalTypes';
import getTitleTag from '../../utils/getTitleTag';
import useLeaseType from '../../hooks/useLeaseType';
import { getSectionsData } from '../../utils/getSectionsData';
import Skeleton from '../../components/Skeleton';
import { ISpecialOffersData } from '../../utils/offers';
import FeaturedOnSection from '../../components/FeaturedOnBanner';
import { isServerRenderOrAppleDevice } from '../../utils/deviceType';
import NationalLeagueBanner from '../../components/NationalLeagueBanner';
import WhyLeaseWithVanaramaTiles from '../../components/WhyLeaseWithVanaramaTiles';
import { IManufacturersSlug } from '../../types/manufacturerSlug';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Card = dynamic(() => import('core/molecules/cards'), {
  loading: () => <Skeleton count={5} />,
});
const Tabs = dynamic(() => import('core/molecules/tabs'), {
  loading: () => <Skeleton count={1} />,
});
const Tab = dynamic(() => import('core/molecules/tabs/Tab'), {
  loading: () => <Skeleton count={1} />,
});
const TabList = dynamic(() => import('core/molecules/tabs/TabList'));
const TabPanel = dynamic(() => import('core/molecules/tabs/TabPanel'), {
  loading: () => <Skeleton count={1} />,
});
const TabPanels = dynamic(() => import('core/molecules/tabs/TabPanels'), {
  loading: () => <Skeleton count={3} />,
});
const IconList = dynamic(() => import('core/organisms/icon-list'), {
  loading: () => <Skeleton count={3} />,
});
// @ts-ignore
const IconListItem = dynamic(() =>
  import('core/organisms/icon-list').then(mod => mod.IconListItem),
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
const HomePageHero = dynamic(() => import('./HomePageHero'));
const SchemaJSON = dynamic(() => import('core/atoms/schema-json'), {
  loading: () => <Skeleton count={1} />,
});

export interface IHomePageContainer extends ISpecialOffersData {
  data: HomePageData | undefined;
  searchPodVansData?: IFilterList;
  searchPodCarsData?: IFilterList;
  migrationSlugs?: IManufacturersSlug;
  serviceBanner?: IServiceBanner;
}

export const HomePageContainer: React.FC<IHomePageContainer> = ({
  data,
  productsVanDerivatives,
  productsCarDerivatives,
  productsPickupDerivatives,
  productsVan,
  productsCar,
  productsPickup,
  searchPodVansData,
  searchPodCarsData,
  vehicleListUrlData,
}) => {
  const [activeTab, setActiveTab] = useState(2);
  const { cachedLeaseType } = useLeaseType(null);
  // if (loading) {
  //   return <Loading size="large" />;
  // }

  const tiles = data?.homePage.sections?.tiles?.tiles;
  const tilesTitle = data?.homePage.sections?.tiles?.tilesTitle;
  const tilesTitleTag = data?.homePage.sections?.tiles?.titleTag;

  const isPersonalLcv = cachedLeaseType.lcv === LeaseTypeEnum.PERSONAL;
  const isPersonalCar = cachedLeaseType.car === LeaseTypeEnum.PERSONAL;

  const imageFeatured1 = getSectionsData(
    ['featured1', 'image', 'file'],
    data?.homePage.sections,
  );
  const imageFeatured2 = getSectionsData(
    ['featured2', 'image', 'file'],
    data?.homePage.sections,
  );

  return (
    <>
      {data?.homePage && (
        <Head
          metaData={data?.homePage.metaData}
          featuredImage={data?.homePage.featuredImage}
        />
      )}
      <HomePageHero
        searchPodCarsData={searchPodCarsData}
        searchPodVansData={searchPodVansData}
        data={data}
      />
      {data?.homePage && (
        <section className="row:lead-text">
          <Heading
            size="xlarge"
            color="black"
            dataUiTestId="homepage-heading-text"
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
      )}

      <section className="tabs-wrap row:tabbed">
        <Tabs
          activeIndex={activeTab}
          onChange={setActiveTab}
          variant="alternative"
          align="center"
        >
          <TabList className="lead">
            <Tab index={0} dataUiTestId="HomepageVansTab">
              Vans
            </Tab>
            <Tab index={1} dataUiTestId="HomepagePickupsTab">
              Pickups
            </Tab>
            <Tab index={2} dataUiTestId="HomepageCarsTab">
              Cars
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel index={2}>
              <div style={{ maxWidth: 1216 }} className="-mh-auto">
                <LazyLoadComponent
                  visibleByDefault={isServerRenderOrAppleDevice}
                >
                  <ProductCarousel
                    leaseType={
                      isPersonalCar
                        ? LeaseTypeEnum.PERSONAL
                        : LeaseTypeEnum.BUSINESS
                    }
                    data={{
                      derivatives: productsCarDerivatives?.derivatives || null,
                      productCard: productsCar?.productCarousel || null,
                      vehicleList: vehicleListUrlData,
                    }}
                    countItems={productsCar?.productCarousel?.length || 6}
                    dataTestIdBtn="car-view-offer"
                    dataUiTestIdMask="ui-car"
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
            <TabPanel index={0}>
              <div style={{ maxWidth: 1216 }} className="-mh-auto">
                <LazyLoadComponent
                  visibleByDefault={isServerRenderOrAppleDevice}
                >
                  <ProductCarousel
                    leaseType={
                      isPersonalLcv
                        ? LeaseTypeEnum.PERSONAL
                        : LeaseTypeEnum.BUSINESS
                    }
                    data={{
                      derivatives: productsVanDerivatives?.derivatives || null,
                      productCard: productsVan?.productCarousel || null,
                      vehicleList: vehicleListUrlData,
                    }}
                    countItems={productsVan?.productCarousel?.length || 6}
                    dataTestIdBtn="van-view-offer"
                    dataUiTestIdMask="ui-van"
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
                <LazyLoadComponent
                  visibleByDefault={isServerRenderOrAppleDevice}
                >
                  <ProductCarousel
                    leaseType={
                      isPersonalLcv
                        ? LeaseTypeEnum.PERSONAL
                        : LeaseTypeEnum.BUSINESS
                    }
                    productType="Pickup"
                    data={{
                      derivatives:
                        productsPickupDerivatives?.derivatives || null,
                      productCard: productsPickup?.productCarousel || null,
                      vehicleList: vehicleListUrlData,
                    }}
                    countItems={productsPickup?.productCarousel?.length || 6}
                    dataTestIdBtn="pickup-view-offer"
                    dataUiTestIdMask="ui-pickup"
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
          </TabPanels>
        </Tabs>
      </section>

      {data?.homePage && (
        <section className="row:bg-lighter">
          <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
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
                        <Heading
                          tag={getTitleTag(card.titleTag || 'span') as any}
                        >
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
          </LazyLoadComponent>
        </section>
      )}

      {data?.homePage && (
        <section className="row:featured-right">
          <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
            <div className="-inset -middle -col-400">
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
              <IconList textColor="orange">
                {(getSectionsData(
                  ['featured1', 'iconList'],
                  data?.homePage?.sections,
                ) as IIconList[])?.map((icon: IIconList, index) => (
                  <IconListItem iconColor="orange" key={icon?.text || index}>
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
              <ImageV2
                quality={60}
                objectFit="cover"
                width={imageFeatured1?.details.image.width ?? 1000}
                height={imageFeatured1?.details.image.height ?? 650}
                src={
                  imageFeatured1?.url ||
                  'https://source.unsplash.com/collection/2102317/1000x650?sig=40349'
                }
              />
            )}
          </LazyLoadComponent>
        </section>
      )}

      {data?.homePage && (
        <section className="row:featured-left">
          <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
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
              <ImageV2
                quality={60}
                objectFit="cover"
                width={imageFeatured2?.details.image.width ?? 1000}
                height={imageFeatured2?.details.image.height ?? 650}
                src={
                  imageFeatured2?.url ||
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
      )}

      {tiles && (
        <WhyLeaseWithVanaramaTiles
          tiles={tiles}
          title={tilesTitle || ''}
          titleTag={tilesTitleTag}
        />
      )}

      <NationalLeagueBanner />

      <FeaturedOnSection />

      <section className="row:trustpilot">
        <TrustPilot />
      </section>

      {data && (
        <SchemaJSON json={JSON.stringify(data?.homePage?.metaData?.schema)} />
      )}
    </>
  );
};

export default HomePageContainer;
