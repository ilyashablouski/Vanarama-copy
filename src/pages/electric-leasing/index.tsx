import { useState, FC } from 'react';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import dynamic from 'next/dynamic';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown/with-html';
import SchemaJSON from 'core/atoms/schema-json';
import Media from 'core/atoms/media';
import Image from 'core/atoms/image';
import TrustPilot from 'core/molecules/trustpilot';
import useLeaseType from '../../hooks/useLeaseType';
import FeaturedOnSection from '../../components/FeaturedOnBanner';
import { evOffersRequest, IEvOffersData } from '../../utils/offers';
import createApolloClient from '../../apolloClient';
import { getFeaturedClassPartial } from '../../utils/layout';
import { LeaseTypeEnum } from '../../../generated/globalTypes';
import {
  GenericPageQuery,
  GenericPageQuery_genericPage_sections_tiles_tiles as TileData,
} from '../../../generated/GenericPageQuery';
import { GENERIC_PAGE } from '../../gql/genericPage';
import {
  // HeroTitle,
  // HeroHeading,
  HeroEv as Hero,
  HeroPrompt,
} from '../../components/Hero';
import getTitleTag from '../../utils/getTitleTag';
import TileLink from '../../components/TileLink/TileLink';
import Head from '../../components/Head/Head';
import Skeleton from '../../components/Skeleton';
import { isServerRenderOrAppleDevice } from '../../utils/deviceType';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Tile = dynamic(() => import('core/molecules/tile'), {
  loading: () => <Skeleton count={3} />,
});
const League = dynamic(() => import('core/organisms/league'), {
  loading: () => <Skeleton count={2} />,
});
const RouterLink = dynamic(() =>
  import('../../components/RouterLink/RouterLink'),
);
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
const ProductCarousel = dynamic(
  () => import('../../components/ProductCarousel/ProductCarousel'),
  {
    loading: () => <Skeleton count={4} />,
  },
);

interface IProps extends IEvOffersData {
  data: GenericPageQuery;
}

const FeaturedSection: FC<any> = ({
  video,
  image,
  title,
  titleTag,
  body,
  layout,
}) => (
  <section className={`row:${getFeaturedClassPartial(layout)}`}>
    {video ? (
      <Media src={video || ''} width="100%" height="360px" />
    ) : (
      <Image
        optimisedHost={process.env.IMG_OPTIMISATION_HOST}
        src={
          image?.file?.url ||
          'https://source.unsplash.com/collection/2102317/1000x650?sig=40349'
        }
      />
    )}

    <div className="-inset -middle -col-400">
      <Heading
        size="large"
        color="black"
        tag={getTitleTag(titleTag || 'p') as keyof JSX.IntrinsicElements}
      >
        {title}
      </Heading>
      <div className="markdown">
        <ReactMarkdown
          allowDangerousHtml
          source={body || ''}
          renderers={{
            link: props => {
              const { href, children } = props;
              return <RouterLink link={{ href, label: children }} />;
            },
            heading: props => (
              <Text {...props} size="lead" color="darker" tag="h3" />
            ),
            paragraph: props => <Text {...props} tag="p" color="darker" />,
          }}
        />
      </div>
    </div>
  </section>
);

export const EVHubPage: NextPage<IProps> = ({
  data,
  productsEvCar,
  productsEvVan,
  productsEvVanDerivatives,
  productsEvCarDerivatives,
  vehicleListUrlData,
}) => {
  const [activeTab, setActiveTab] = useState(1);
  const { cachedLeaseType } = useLeaseType(null);

  const optimisationOptions = {
    height: 620,
    width: 620,
    quality: 59,
  };

  const isPersonalLcv = cachedLeaseType.lcv === 'Personal';
  const isPersonalCar = cachedLeaseType.car === 'Personal';
  const sections = data?.genericPage.sections;

  return (
    <>
      <Hero>
        <div className="hero--left">
          {/* <HeroHeading
          text={
            sections?.hero?.title || ''
          }
          titleTag={
            getTitleTag(
              sections?.hero?.titleTag || 'p',
            ) as keyof JSX.IntrinsicElements
          }
        />
        <br />
        <HeroTitle
          text={
            sections?.hero?.body || ''
          }
        />
        <br /> */}
          <div className="nlol" style={{ left: 'auto' }}>
            <p>Find Your</p>
            <h2>New Lease Of Life</h2>
            <p>With Vanarama</p>
          </div>
          {sections?.hero?.heroLabel?.[0]?.visible && (
            <HeroPrompt
              label={sections?.hero?.heroLabel?.[0]?.link?.text || ''}
              url={sections?.hero?.heroLabel?.[0]?.link?.url || ''}
              text={sections?.hero?.heroLabel?.[0]?.text || ''}
              btnVisible={sections?.hero?.heroLabel?.[0]?.link?.visible}
            />
          )}
        </div>
        <div className="hero--right">
          <Image
            loadImage
            optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            optimisationOptions={optimisationOptions}
            className="hero--image"
            plain
            size="expand"
            src={
              sections?.hero?.image?.file?.url ||
              'https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/connect.png'
            }
          />
        </div>
      </Hero>
      <div className="row:lead-text">
        <Heading
          size="xlarge"
          color="black"
          tag={
            getTitleTag(
              sections?.leadText?.titleTag || null,
            ) as keyof JSX.IntrinsicElements
          }
        >
          {sections?.leadText?.heading}
        </Heading>
        <Text tag="span" size="lead" color="darker">
          {sections?.leadText?.description}
        </Text>
      </div>

      <section className="tabs-wrap row:tabbed">
        <Tabs
          activeIndex={activeTab}
          onChange={setActiveTab}
          variant="alternative"
          align="center"
        >
          <TabList className="lead">
            <Tab index={0}>Vans</Tab>
            <Tab index={1}>Cars</Tab>
          </TabList>
          <TabPanels>
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
                      derivatives:
                        productsEvVanDerivatives?.derivatives || null,
                      productCard:
                        productsEvVan?.productCarousel?.slice(0, 6) || null,
                      vehicleList: vehicleListUrlData,
                    }}
                    countItems={productsEvVan?.productCarousel?.length || 6}
                    dataTestIdBtn="van-view-offer"
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
                      label: 'View Latest Electric Van Deals',
                      href: '/van-leasing/search',
                      query: {
                        fuelTypes: ['Electric', 'Petrol/plugin Elec Hybrid'],
                      },
                    }}
                    withoutDefaultClassName
                    dataTestId="view-all-vans"
                  >
                    <div className="button--inner">
                      View Latest Electric Van Deals
                    </div>
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
                      isPersonalCar
                        ? LeaseTypeEnum.PERSONAL
                        : LeaseTypeEnum.BUSINESS
                    }
                    data={{
                      derivatives:
                        productsEvCarDerivatives?.derivatives || null,
                      productCard:
                        productsEvCar?.productCarousel?.slice(0, 6) || null,
                      vehicleList: vehicleListUrlData,
                    }}
                    countItems={productsEvCar?.productCarousel?.length || 6}
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
                      label: 'View Latest Electric Car Deals',
                      href: '/car-leasing/search',
                      query: {
                        fuelTypes: [
                          'Diesel/plugin Elec Hybrid',
                          'Electric',
                          'Petrol/plugin Elec Hybrid',
                        ],
                      },
                    }}
                    withoutDefaultClassName
                    dataTestId="view-all-cars"
                  >
                    <div className="button--inner">
                      View Latest Electric Car Deals
                    </div>
                  </RouterLink>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </section>

      <FeaturedSection {...sections?.featured1} />
      <FeaturedSection {...sections?.featured2} />
      <FeaturedSection {...sections?.featured3} />

      <section className="row:features-4col">
        <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
          <Heading
            size="large"
            color="black"
            tag={
              getTitleTag(
                sections?.tiles?.titleTag || 'p',
              ) as keyof JSX.IntrinsicElements
            }
          >
            {sections?.tiles?.tilesTitle}
          </Heading>
          {sections?.tiles?.tiles?.map((tile: TileData, idx) => (
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
                      'https://source.unsplash.com/collection/2102317/1000x650?sig=403411'
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
        <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
          <League
            clickReadMore={() => Router.push('/fan-hub.html')}
            altText="vanarama national league"
            link="/fan-hub.html"
          />
        </LazyLoadComponent>
      </section>

      <FeaturedOnSection />

      <section className="row:trustpilot">
        <TrustPilot />
      </section>

      {data?.genericPage.metaData && (
        <>
          <Head
            metaData={data?.genericPage.metaData}
            featuredImage={data?.genericPage.featuredImage}
          />
          <SchemaJSON
            json={JSON.stringify(data?.genericPage.metaData.schema)}
          />
        </>
      )}
    </>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    // const paths = context?.params?.pages as string[];

    const { data } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: 'electric-leasing',
      },
    });

    const {
      productsEvVan,
      productsEvCar,
      productsEvVanDerivatives,
      productsEvCarDerivatives,
      vehicleListUrlData,
    } = await evOffersRequest(client);

    return {
      revalidate: Number(process.env.REVALIDATE_INTERVAL),
      props: JSON.parse(
        JSON.stringify({
          data,
          productsEvCar,
          productsEvVan,
          productsEvVanDerivatives,
          productsEvCarDerivatives,
          vehicleListUrlData,
        }),
      ),
    };
  } catch (err) {
    throw new Error(err);
  }
}

export default EVHubPage;
