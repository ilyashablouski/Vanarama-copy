import { useContext } from 'react';
import { ApolloError } from '@apollo/client';
import { GetStaticPropsContext, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import ReactMarkdown from 'react-markdown/with-html';
import SchemaJSON from 'core/atoms/schema-json';
import Media from 'core/atoms/media';
import Image from 'core/atoms/image';
import TrustPilot from 'core/molecules/trustpilot';
import createApolloClient from '../../apolloClient';
import { getFeaturedClassPartial } from '../../utils/layout';
import {
  HubVanPageData,
  HubVanPageDataVariables,
  HubVanPageData_hubVanPage_sections_cards_cards as CardData,
  HubVanPageData_hubVanPage_sections_steps_steps as StepData,
  HubVanPageData_hubVanPage_sections_tiles_tiles as TileData,
} from '../../../generated/HubVanPageData';
import { ProductCardData_productCarousel as ProdCardData } from '../../../generated/ProductCardData';

import { HUB_VAN_CONTENT } from '../../gql/hub/hubVanPage';
import Hero, { HeroPrompt } from '../../components/Hero';
import DealOfMonth from '../../components/DealOfMonth';
import { LeaseTypeEnum, VehicleTypeEnum } from '../../../generated/globalTypes';
import ProductCarousel from '../../components/ProductCarousel/ProductCarousel';
import { formatProductPageUrl, getLegacyUrl, getNewUrl } from '../../utils/url';
import getTitleTag from '../../utils/getTitleTag';
import useWishlist from '../../hooks/useWishlist';
import useLeaseType from '../../hooks/useLeaseType';
import { getCardsName, getSectionsData } from '../../utils/getSectionsData';
import TileLink from '../../components/TileLink/TileLink';
import { VansSearch } from '../../models/enum/SearchByManufacturer';
import Head from '../../components/Head/Head';
import FeaturedOnSection from '../../components/FeaturedOnBanner';
import Skeleton from '../../components/Skeleton';
import {
  filterList as IFilterList,
  filterListVariables as IFilterListVariables,
} from '../../../generated/filterList';
import { GET_SEARCH_POD_DATA } from '../../containers/SearchPodContainer/gql';
import { CompareContext } from '../../utils/comparatorTool';
import { isWished } from '../../utils/wishlistHelpers';
import { isCompared } from '../../utils/comparatorHelpers';
import { IVansPageOffersData, vansPageOffersRequest } from '../../utils/offers';
import { decodeData, encodeData } from '../../utils/data';
import { isServerRenderOrAppleDevice } from '../../utils/deviceType';
import NationalLeagueBanner from '../../components/NationalLeagueBanner';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../utils/env';
import ErrorPage from '../_error';
import { convertErrorToProps } from '../../utils/helpers';
import { IErrorProps } from '../../types/common';

const ArrowForwardSharp = dynamic(
  () => import('core/assets/icons/ArrowForwardSharp'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Tile = dynamic(() => import('core/molecules/tile'), {
  loading: () => <Skeleton count={3} />,
});
const Step = dynamic(() => import('core/molecules/step'), {
  loading: () => <Skeleton count={3} />,
});
const Card = dynamic(() => import('core/molecules/cards'), {
  loading: () => <Skeleton count={3} />,
});
const RouterLink = dynamic(() =>
  import('../../components/RouterLink/RouterLink'),
);

interface IExtProdCardData extends ProdCardData {
  bodyStyle: string;
}

interface IProps extends IVansPageOffersData {
  data: HubVanPageData;
  searchPodVansData: IFilterList;
  offer?: IExtProdCardData;
  error?: IErrorProps;
}

export const VansPage: NextPage<IProps> = ({
  data: encodedData,
  searchPodVansData,
  productsSmallVan,
  productsMediumVan,
  productsLargeVan,
  productsSmallVanDerivatives,
  productsMediumVanDerivatives,
  productsLargeVanDerivatives,
  vehicleListUrlData: encodeVehicleListUrlData,
  offer,
  error,
}) => {
  const { cachedLeaseType } = useLeaseType(false);
  const { wishlistVehicleIds, wishlistChange } = useWishlist();
  const { compareVehicles, compareChange } = useContext(CompareContext);

  if (error || !encodedData) {
    return <ErrorPage errorData={error} />;
  }

  const data = decodeData(encodedData);
  const vehicleListUrlData = decodeData(encodeVehicleListUrlData);

  const dealOfMonthUrl = formatProductPageUrl(
    getLegacyUrl(vehicleListUrlData.edges, offer?.capId),
    offer?.capId,
  );

  const dealOfMonthHref = getNewUrl(vehicleListUrlData.edges, offer?.capId);

  const isPersonal = cachedLeaseType === LeaseTypeEnum.PERSONAL;

  const optimisationOptions = {
    height: 620,
    width: 620,
    quality: 59,
  };

  return (
    <>
      <Hero searchPodVansData={searchPodVansData}>
        {/* <HeroHeading
          text={
            getSectionsData(['hero', 'title'], data?.hubVanPage.sections) || ''
          }
          titleTag={
            getTitleTag(
              getSectionsData(
                ['hero', 'titleTag'],
                data?.hubVanPage.sections,
              ) || 'p',
            ) as keyof JSX.IntrinsicElements
          }
        />
        <br />
        <HeroTitle
          text={
            getSectionsData(['hero', 'body'], data?.hubVanPage.sections) || ''
          }
        />
        <br /> */}
        <div className="nlol">
          <p>Find Your</p>
          <h2>New Lease Of Life</h2>
          <p>With Vanarama</p>
        </div>
        <div>
          <Image
            optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            optimisationOptions={optimisationOptions}
            className="hero--image"
            plain
            size="expand"
            src={
              getSectionsData(
                ['hero', 'image', 'file', 'url'],
                data?.hubVanPage.sections,
              ) ||
              'https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/connect.png'
            }
          />
        </div>
        {data?.hubVanPage.sections?.hero?.heroLabel?.[0]?.visible && (
          <HeroPrompt
            label={
              data?.hubVanPage.sections?.hero?.heroLabel?.[0]?.link?.text || ''
            }
            url={
              data?.hubVanPage.sections?.hero?.heroLabel?.[0]?.link?.url || ''
            }
            text={data?.hubVanPage.sections?.hero?.heroLabel?.[0]?.text || ''}
            btnVisible={
              data?.hubVanPage.sections?.hero?.heroLabel?.[0]?.link?.visible
            }
          />
        )}
      </Hero>
      <div className="row:lead-text">
        <Heading
          size="xlarge"
          color="black"
          tag={
            getTitleTag(
              getSectionsData(
                ['leadText', 'titleTag'],
                data?.hubVanPage.sections,
              ) || null,
            ) as keyof JSX.IntrinsicElements
          }
        >
          {getSectionsData(['leadText', 'heading'], data?.hubVanPage.sections)}
        </Heading>
        <Text tag="span" size="lead" color="darker">
          {getSectionsData(
            ['leadText', 'description'],
            data?.hubVanPage.sections,
          )}
        </Text>
      </div>
      <hr className="-fullwidth" />
      {offer && (
        <div className="row:featured-product">
          <DealOfMonth
            isPersonal={isPersonal}
            imageSrc={offer?.imageUrl || ''}
            keyInfo={offer?.keyInformation || []}
            capId={offer?.capId || ''}
            vehicle={`${offer?.manufacturerName} ${offer?.modelName}`}
            specification={offer?.derivativeName || ''}
            price={
              (isPersonal ? offer?.personalRate : offer?.businessRate) || 0
            }
            rating={offer?.averageRating || 3}
            viewOfferClick={() => {
              sessionStorage.setItem('capId', offer?.capId || '');
            }}
            link={{ href: dealOfMonthHref, url: dealOfMonthUrl.url }}
            wished={isWished(wishlistVehicleIds, offer)}
            compared={isCompared(compareVehicles, offer)}
            onWishlist={() => {
              wishlistChange({
                ...offer,
                bodyStyle: offer.bodyStyle,
                pageUrl: dealOfMonthUrl,
              });
            }}
            onCompare={() => {
              compareChange({
                ...offer,
                bodyStyle: offer.bodyStyle,
                pageUrl: dealOfMonthUrl,
              });
            }}
          />
        </div>
      )}
      {productsSmallVan?.productCarousel &&
        productsSmallVan?.productCarousel?.length > 0 && (
          <div className="row:bg-lighter">
            <div>
              <Heading size="large" color="black" tag="h2">
                <span
                  style={{ textAlign: 'center', display: 'block' }}
                  className="-mb-400"
                >
                  Small Vans
                </span>
              </Heading>
              <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
                <ProductCarousel
                  leaseType={
                    isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS
                  }
                  data={{
                    derivatives:
                      productsSmallVanDerivatives?.derivatives || null,
                    productCard: productsSmallVan?.productCarousel || null,
                    vehicleList: vehicleListUrlData!,
                  }}
                  countItems={productsSmallVan?.productCarousel?.length || 6}
                  dataTestIdBtn="van-view-offer"
                />
              </LazyLoadComponent>
            </div>
            <div className="-justify-content-row -pt-500">
              <RouterLink
                className="button"
                classNames={{ color: 'teal', solid: true, size: 'regular' }}
                link={{
                  label: 'View Small Vans',
                  href: '/small-van-leasing.html',
                }}
                withoutDefaultClassName
                dataTestId="small-van-leasing"
              >
                <div className="button--inner">View Small Vans</div>
              </RouterLink>
            </div>
          </div>
        )}

      {productsMediumVan?.productCarousel &&
        productsMediumVan?.productCarousel?.length > 0 && (
          <div className="row:bg-lighter">
            <div>
              <Heading size="large" color="black" tag="h2">
                <span
                  style={{ textAlign: 'center', display: 'block' }}
                  className="-mb-400"
                >
                  Medium Vans
                </span>
              </Heading>
              <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
                <ProductCarousel
                  leaseType={
                    isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS
                  }
                  data={{
                    derivatives:
                      productsMediumVanDerivatives?.derivatives || null,
                    productCard: productsMediumVan?.productCarousel || null,
                    vehicleList: vehicleListUrlData!,
                  }}
                  countItems={productsMediumVan?.productCarousel?.length || 6}
                  dataTestIdBtn="van-view-offer"
                />
              </LazyLoadComponent>
            </div>
            <div className="-justify-content-row -pt-500">
              <RouterLink
                className="button"
                classNames={{ color: 'teal', solid: true, size: 'regular' }}
                link={{
                  label: 'View Medium Vans',
                  href: '/medium-van-leasing.html',
                }}
                withoutDefaultClassName
                dataTestId="medium-van-leasing"
              >
                <div className="button--inner">View Medium Vans</div>
              </RouterLink>
            </div>
          </div>
        )}

      {productsLargeVan?.productCarousel &&
        productsLargeVan?.productCarousel?.length > 0 && (
          <div className="row:bg-lighter">
            <div>
              <Heading size="large" color="black" tag="h2">
                <span
                  style={{ textAlign: 'center', display: 'block' }}
                  className="-mb-400"
                >
                  Large Vans
                </span>
              </Heading>
              <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
                <ProductCarousel
                  leaseType={
                    isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS
                  }
                  data={{
                    derivatives:
                      productsLargeVanDerivatives?.derivatives || null,
                    productCard: productsLargeVan?.productCarousel || null,
                    vehicleList: vehicleListUrlData!,
                  }}
                  countItems={productsLargeVan?.productCarousel?.length || 6}
                  dataTestIdBtn="van-view-offer"
                />
              </LazyLoadComponent>
            </div>
            <div className="-justify-content-row -pt-500">
              <RouterLink
                className="button"
                classNames={{ color: 'teal', solid: true, size: 'regular' }}
                link={{
                  label: 'View Large Vans',
                  href: '/large-van-leasing.html',
                }}
                withoutDefaultClassName
                dataTestId="large-van-leasing"
              >
                <div className="button--inner">View Large Vans</div>
              </RouterLink>
            </div>
          </div>
        )}

      <div className="row:bg-lighter ">
        <div className="row:cards-4col">
          <Heading
            size="large"
            color="black"
            tag={
              getTitleTag(
                getSectionsData(
                  ['cards', 'titleTag'],
                  data?.hubVanPage.sections,
                ) || null,
              ) as keyof JSX.IntrinsicElements
            }
          >
            {getCardsName(data?.hubVanPage)}
          </Heading>
          <Text
            className="-justify-content-row -mb-400"
            tag="p"
            size="regular"
            color="darker"
          >
            {getSectionsData(
              ['cards', 'description'],
              data?.hubVanPage.sections,
            )}
          </Text>
          <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
            {(getSectionsData(
              ['cards', 'cards'],
              data?.hubVanPage.sections,
            ) as CardData[])?.map((card: CardData, index) => (
              <Card
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                key={card.title || index}
                title={{
                  title: '',
                  withBtn: true,
                  link: (
                    <RouterLink
                      link={{
                        href: card.link?.legacyUrl || card.link?.url || '#',
                        label: card.title || '',
                      }}
                      className="heading"
                      classNames={{ size: 'lead', color: 'black' }}
                    >
                      <Heading
                        size="regular"
                        color="black"
                        tag={
                          getTitleTag(
                            card.titleTag || null,
                          ) as keyof JSX.IntrinsicElements
                        }
                      >
                        {card.title}
                      </Heading>
                    </RouterLink>
                  ),
                }}
                imageSrc={card.image?.file?.url}
                description={card.body || ''}
              />
            ))}
          </LazyLoadComponent>
        </div>
      </div>

      <section className="row:steps-4col">
        <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
          <Heading
            className="-a-center -mb-400"
            size="large"
            color="black"
            tag={
              getTitleTag(
                getSectionsData(
                  ['steps', 'titleTag'],
                  data?.hubVanPage.sections,
                ) || null,
              ) as keyof JSX.IntrinsicElements
            }
          >
            {getSectionsData(['steps', 'heading'], data?.hubVanPage.sections)}
          </Heading>
          {(getSectionsData(
            ['steps', 'steps'],
            data?.hubVanPage.sections,
          ) as StepData[])?.map((step: StepData, index) => (
            <Step
              className="-mh-auto"
              key={step.title || index}
              heading={step.title || ''}
              step={index + 1}
              text={step.body || ''}
            />
          ))}
        </LazyLoadComponent>
      </section>

      <section
        className={`row:${getFeaturedClassPartial(
          getSectionsData(['featured1'], data?.hubVanPage.sections),
        )}`}
      >
        {data?.hubVanPage?.sections?.featured1?.video ? (
          <Media
            src={
              getSectionsData(
                ['featured1', 'video'],
                data?.hubVanPage.sections,
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
                data?.hubVanPage.sections,
              ) ||
              'https://source.unsplash.com/collection/2102317/1000x650?sig=40349'
            }
          />
        )}

        <div className="-inset -middle -col-400">
          <Heading
            size="large"
            color="black"
            tag={
              getTitleTag(
                getSectionsData(
                  ['featured1', 'titleTag'],
                  data?.hubVanPage.sections,
                ) || 'p',
              ) as keyof JSX.IntrinsicElements
            }
          >
            {getSectionsData(['featured1', 'title'], data?.hubVanPage.sections)}
          </Heading>
          <div className="markdown">
            <ReactMarkdown
              allowDangerousHtml
              source={
                getSectionsData(
                  ['featured1', 'body'],
                  data?.hubVanPage.sections,
                ) || ''
              }
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
      <section
        className={`row:${getFeaturedClassPartial(
          getSectionsData(['featured2'], data?.hubVanPage.sections),
        )}`}
      >
        {data?.hubVanPage?.sections?.featured2?.video ? (
          <Media
            src={
              getSectionsData(
                ['featured2', 'video'],
                data?.hubVanPage.sections,
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
                data?.hubVanPage.sections,
              ) ||
              'https://source.unsplash.com/collection/2102317/1000x650?sig=40349'
            }
          />
        )}
        <div className="-inset -middle -col-400">
          <Heading
            size="large"
            color="black"
            tag={
              getTitleTag(
                getSectionsData(
                  ['featured2', 'titleTag'],
                  data?.hubVanPage.sections,
                ) || 'p',
              ) as keyof JSX.IntrinsicElements
            }
          >
            {getSectionsData(['featured2', 'title'], data?.hubVanPage.sections)}
          </Heading>
          <div className="markdown">
            <ReactMarkdown
              allowDangerousHtml
              source={
                getSectionsData(
                  ['featured2', 'body'],
                  data?.hubVanPage.sections,
                ) || ''
              }
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
      <hr className="fullWidth" />
      <section className="row:text">
        <Heading
          size="large"
          color="black"
          tag={
            getTitleTag(
              getSectionsData(
                ['rowText', 'titleTag'],
                data?.hubVanPage.sections,
              ) || 'p',
            ) as keyof JSX.IntrinsicElements
          }
        >
          {getSectionsData(['rowText', 'heading'], data?.hubVanPage.sections)}
        </Heading>
        <div>
          <Text tag="p" size="regular" color="darker">
            {getSectionsData(['rowText', 'body'], data?.hubVanPage.sections)}
          </Text>
          <Heading size="regular" color="black">
            {getSectionsData(
              ['rowText', 'subHeading'],
              data?.hubVanPage.sections,
            )}
          </Heading>
          <RouterLink
            className="-pt-200"
            classNames={{ color: 'teal', size: 'regular' }}
            link={{
              label: 'View Leasing Guides',
              href: '/van-leasing-explained.html',
            }}
          >
            View Leasing Guides <ArrowForwardSharp />
          </RouterLink>
        </div>
      </section>

      <hr className="fullWidth" />
      <section className="row:features-4col">
        <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
          <Heading
            size="large"
            color="black"
            tag={
              getTitleTag(
                getSectionsData(
                  ['tiles', 'titleTag'],
                  data?.hubVanPage.sections,
                ) || 'p',
              ) as keyof JSX.IntrinsicElements
            }
          >
            {getSectionsData(
              ['tiles', 'tilesTitle'],
              data?.hubVanPage.sections,
            )}
          </Heading>
          {(getSectionsData(
            ['tiles', 'tiles'],
            data?.hubVanPage.sections,
          ) as TileData[])?.map((tile: TileData, index) => (
            <div key={tile.title || index}>
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

      <section className="row:manufacturer-grid">
        <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
          <Heading
            size="large"
            color="black"
            className="-a-center -mb-500"
            tag="h2"
          >
            Search By Manufacturer
          </Heading>
          <div>
            {VansSearch.map(man => (
              <RouterLink
                className="button"
                key={man.label}
                classNames={{ color: 'teal', solid: true, size: 'large' }}
                link={{
                  label: man.label,
                  href: man.href,
                }}
                withoutDefaultClassName
              >
                <div className="button--inner">{man.label}</div>
              </RouterLink>
            ))}
          </div>
        </LazyLoadComponent>
      </section>

      <NationalLeagueBanner />

      <FeaturedOnSection />

      <section className="row:trustpilot">
        <TrustPilot />
      </section>

      {data?.hubVanPage.metaData && (
        <>
          <Head
            metaData={data?.hubVanPage.metaData}
            featuredImage={data?.hubVanPage.featuredImage}
          />
          <SchemaJSON json={JSON.stringify(data?.hubVanPage.metaData.schema)} />
        </>
      )}
    </>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const client = createApolloClient({});

  try {
    const { data } = await client.query<
      HubVanPageData,
      HubVanPageDataVariables
    >({
      query: HUB_VAN_CONTENT,
      variables: {
        isPreview: !!context?.preview,
      },
    });
    const { data: searchPodVansData } = await client.query<
      IFilterList,
      IFilterListVariables
    >({
      query: GET_SEARCH_POD_DATA,
      variables: {
        vehicleTypes: [VehicleTypeEnum.LCV],
      },
    });
    const {
      productsSmallVan,
      productsMediumVan,
      productsLargeVan,
      productsSmallVanDerivatives,
      productsMediumVanDerivatives,
      productsLargeVanDerivatives,
      vehicleListUrlData,
    } = await vansPageOffersRequest(client);
    const offers = [
      productsSmallVan?.productCarousel?.[0]
        ? {
            ...productsSmallVan?.productCarousel?.[0],
            bodyStyle: 'SmallVan',
          }
        : ({} as IExtProdCardData),
      productsMediumVan?.productCarousel?.[0]
        ? {
            ...productsMediumVan?.productCarousel?.[0],
            bodyStyle: 'MediumVan',
          }
        : ({} as IExtProdCardData),
      productsLargeVan?.productCarousel?.[0]
        ? {
            ...productsLargeVan?.productCarousel?.[0],
            bodyStyle: 'LargeVan',
          }
        : ({} as IExtProdCardData),
    ].filter(value => Object.keys(value).length !== 0);

    // pluck random offer until offer position available
    const offer: IExtProdCardData | null =
      offers.find(card => card?.offerPosition === 1) || null;

    return {
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        data: encodeData(data),
        searchPodVansData,
        productsSmallVan: productsSmallVan || null,
        productsMediumVan: productsMediumVan || null,
        productsLargeVan: productsLargeVan || null,
        productsSmallVanDerivatives: productsSmallVanDerivatives || null,
        productsMediumVanDerivatives: productsMediumVanDerivatives || null,
        productsLargeVanDerivatives: productsLargeVanDerivatives || null,
        vehicleListUrlData: encodeData(vehicleListUrlData),
        offer,
      },
    };
  } catch (error) {
    const apolloError = error as ApolloError;
    const revalidate = DEFAULT_REVALIDATE_INTERVAL_ERROR;

    // handle graphQLErrors as 404
    // Next will render our custom pages/404
    if (apolloError?.graphQLErrors?.length) {
      return {
        revalidate,
        notFound: true,
      };
    }

    return {
      revalidate,
      props: {
        error: convertErrorToProps(error),
      },
    };
  }
}

export default VansPage;
