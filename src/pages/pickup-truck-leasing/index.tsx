import { ApolloError } from '@apollo/client';
import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import React, { useContext, useMemo } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import SchemaJSON from 'core/atoms/schema-json';
import Image from 'core/atoms/image/Image';
import ImageV2 from 'core/atoms/image/ImageV2';
import TrustPilot from 'core/molecules/trustpilot';
import { getSectionsData } from '../../utils/getSectionsData';
import { getFeaturedClassPartial } from '../../utils/layout';
import { isWished } from '../../utils/wishlistHelpers';
import { isCompared } from '../../utils/comparatorHelpers';
import {
  HubPickupPageData,
  HubPickupPageData_hubPickupPage_sections_steps_steps as StepData,
  HubPickupPageData_hubPickupPage_sections_tiles1_tiles as AccessoryData,
  HubPickupPageDataVariables,
} from '../../../generated/HubPickupPageData';
import { HUB_PICKUP_CONTENT } from '../../gql/hub/hubPickupPage';
import createApolloClient from '../../apolloClient';
import DealOfMonth from '../../components/DealOfMonth';
import Hero, { HeroPrompt } from '../../components/Hero';
import RouterLink from '../../components/RouterLink/RouterLink';
import truncateString from '../../utils/truncateString';
import { LeaseTypeEnum, VehicleTypeEnum } from '../../../generated/globalTypes';
import { formatProductPageUrl, getLegacyUrl, getNewUrl } from '../../utils/url';
import { CompareContext } from '../../utils/comparatorTool';
import getTitleTag from '../../utils/getTitleTag';
import useWishlist from '../../hooks/useWishlist';
import useLeaseType from '../../hooks/useLeaseType';
import { PickupsSearch } from '../../models/enum/SearchByManufacturer';
import { features } from '../../components/ProductCarousel/helpers';
import Head from '../../components/Head/Head';
import Skeleton from '../../components/Skeleton';
import {
  filterList as IFilterList,
  filterListVariables as IFilterListVariables,
} from '../../../generated/filterList';
import { GET_SEARCH_POD_DATA } from '../../containers/SearchPodContainer/gql';
import {
  IPickupsPageOffersData,
  pickupsPageOffersRequest,
} from '../../utils/offers';
import { decodeData, encodeData } from '../../utils/data';
import { isServerRenderOrAppleDevice } from '../../utils/deviceType';
import NationalLeagueBanner from '../../components/NationalLeagueBanner';
import HeadingSection from '../../components/HeadingSection';
import WhyLeaseWithVanaramaTiles from '../../components/WhyLeaseWithVanaramaTiles';

import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../utils/env';
import { convertErrorToProps } from '../../utils/helpers';
import {
  IPageWithData,
  IPageWithError,
  PageTypeEnum,
} from '../../types/common';
import FeaturedOnSection from '../../components/FeaturedOnBanner';

const Icon = dynamic(() => import('core/atoms/icon'), {
  ssr: false,
});
const Flame = dynamic(() => import('core/assets/icons/Flame'), {
  ssr: false,
});
const ArrowForwardSharp = dynamic(
  () => import('core/assets/icons/ArrowForwardSharp'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Price = dynamic(() => import('core/atoms/price'));
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Media = dynamic(() => import('core/atoms/media'), {
  loading: () => <Skeleton count={3} />,
});
const Step = dynamic(() => import('core/molecules/step'), {
  loading: () => <Skeleton count={3} />,
});
const ProductCard = dynamic(
  () => import('core/molecules/cards/ProductCard/ProductCard'),
  {
    loading: () => <Skeleton count={3} />,
  },
);

type IProps = IPageWithData<
  IPickupsPageOffersData & {
    data: HubPickupPageData;
    searchPodVansData: IFilterList;
  }
>;

export const PickupsPage: NextPage<IProps> = ({
  data: encodedData,
  searchPodVansData,
  productsPickup,
  vehicleListUrlData: vehicleListUrlDataEncode,
}) => {
  const data = decodeData(encodedData);
  const vehicleListUrlData = decodeData(vehicleListUrlDataEncode);
  const titleTagText = data?.hubPickupPage.sections?.leadText?.titleTag;
  const headerText = data?.hubPickupPage.sections?.leadText?.heading;
  const descriptionText = data?.hubPickupPage.sections?.leadText?.description;
  const tiles = data?.hubPickupPage.sections?.tiles2?.tiles;
  const tilesTitle = data?.hubPickupPage.sections?.tiles2?.tilesTitle;
  const tilesTitleTag = data?.hubPickupPage.sections?.tiles2?.titleTag;
  const { cachedLeaseType } = useLeaseType(false);
  const offer = useMemo(
    () => productsPickup?.productCarousel?.find(p => p?.isOnOffer === true),
    [productsPickup],
  );

  const { wishlistVehicleIds, wishlistChange } = useWishlist();
  const { compareVehicles, compareChange } = useContext(CompareContext);

  const dealOfMonthUrl = useMemo(
    () =>
      formatProductPageUrl(
        getLegacyUrl(vehicleListUrlData.edges, offer?.capId),
        offer?.capId,
      ),
    [vehicleListUrlData, offer],
  );

  const dealOfMonthHref = useMemo(
    () => getNewUrl(vehicleListUrlData.edges, offer?.capId),
    [vehicleListUrlData, offer],
  );

  const isPersonal = cachedLeaseType === LeaseTypeEnum.PERSONAL;

  const optimisationOptions = {
    height: 620,
    width: 620,
    quality: 59,
  };

  const imageFeatured1 = getSectionsData(
    ['featured1', 'image', 'file'],
    data?.hubPickupPage.sections,
  );
  const imageFeatured2 = getSectionsData(
    ['featured2', 'image', 'file'],
    data?.hubPickupPage.sections,
  );

  return (
    <>
      <Hero searchPodVansData={searchPodVansData}>
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
              data?.hubPickupPage.sections?.hero?.image?.file?.url ||
              'https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/hilux-removebg-preview.png'
            }
          />
        </div>
        {data?.hubPickupPage.sections?.hero?.heroLabel?.[0]?.visible && (
          <HeroPrompt
            label={
              data?.hubPickupPage.sections?.hero?.heroLabel?.[0]?.link?.text ||
              ''
            }
            url={
              data?.hubPickupPage.sections?.hero?.heroLabel?.[0]?.link?.url ||
              ''
            }
            text={
              data?.hubPickupPage.sections?.hero?.heroLabel?.[0]?.text || ''
            }
            btnVisible={
              data?.hubPickupPage.sections?.hero?.heroLabel?.[0]?.link?.visible
            }
          />
        )}
      </Hero>

      <HeadingSection
        titleTag={titleTagText}
        header={headerText}
        description={descriptionText}
      />

      <hr className="-fullwidth" />

      <div className="row:featured-product">
        {offer && (
          <DealOfMonth
            isPersonal={isPersonal}
            imageSrc={
              offer?.imageUrl ||
              'https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538983/cars/BMWX70419_4_bvxdvu.jpg'
            }
            keyInfo={offer?.keyInformation || []}
            capId={offer?.capId || ''}
            vehicle={`${offer?.manufacturerName} ${offer?.rangeName}`}
            specification={offer?.derivativeName || ''}
            price={offer?.businessRate || 0}
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
                bodyStyle: 'Pickup',
                pageUrl: dealOfMonthUrl,
              });
            }}
            onCompare={() => {
              compareChange({
                ...offer,
                bodyStyle: 'Pickup',
                pageUrl: dealOfMonthUrl,
              });
            }}
          />
        )}
      </div>

      <div className="row:bg-lighter">
        <section className="row:cards-3col">
          <Heading size="large" color="black">
            Hot Deals - Fastest Delivery
          </Heading>
          {productsPickup?.productCarousel?.map((item, index) => {
            const productUrl = formatProductPageUrl(
              getLegacyUrl(vehicleListUrlData.edges, item?.capId),
              item?.capId,
            );
            const extendedProductData = item
              ? { ...item, bodyStyle: 'Pickup', pageUrl: productUrl }
              : null;

            return (
              <LazyLoadComponent
                key={item?.capId || index}
                visibleByDefault={isServerRenderOrAppleDevice}
              >
                <ProductCard
                  isBlackFridayLabel
                  optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                  key={item?.capId || index}
                  header={{
                    accentIcon: <Icon icon={<Flame />} color="white" />,
                    accentText: 'Hot Offer',
                    text: item?.leadTime || 'Factory Order',
                  }}
                  features={features(
                    item?.keyInformation || [],
                    item?.capId || '',
                    Icon,
                  )}
                  imageSrc={
                    item?.imageUrl ||
                    `${process.env.HOST_DOMAIN}/vehiclePlaceholder.jpg`
                  }
                  wished={isWished(wishlistVehicleIds, item)}
                  compared={isCompared(compareVehicles, item)}
                  onCompare={() => compareChange(extendedProductData)}
                  onWishlist={() => wishlistChange(extendedProductData)}
                  title={{
                    title: '',
                    link: (
                      <RouterLink
                        link={{
                          href: productUrl.url,
                          label: '',
                        }}
                        onClick={() =>
                          sessionStorage.setItem('capId', item?.capId || '')
                        }
                        className="heading"
                        classNames={{ size: 'large', color: 'black' }}
                      >
                        <Heading tag="span" size="large" className="-pb-100">
                          {truncateString(
                            `${item?.manufacturerName} ${item?.rangeName}`,
                          )}
                        </Heading>
                        <Heading tag="span" size="small" color="dark">
                          {item?.derivativeName || ''}
                        </Heading>
                      </RouterLink>
                    ),
                    score: item?.averageRating || 5,
                  }}
                >
                  <div className="-flex-h">
                    <Price
                      price={
                        isPersonal ? item?.personalRate : item?.businessRate
                      }
                      size="large"
                      separator="."
                      priceDescription={`Per Month ${
                        isPersonal ? 'Inc' : 'Exc'
                      }.VAT`}
                    />
                    <RouterLink
                      link={{
                        href: productUrl.url,
                        label: 'View Offer',
                      }}
                      onClick={() =>
                        sessionStorage.setItem('capId', item?.capId || '')
                      }
                      classNames={{
                        color: 'teal',
                        solid: true,
                        size: 'regular',
                      }}
                      className="button"
                    >
                      <div className="button--inner">View Offer</div>
                    </RouterLink>
                  </div>
                </ProductCard>
              </LazyLoadComponent>
            );
          })}

          <RouterLink
            link={{
              href: '/pickup-special-offers.html',
              label: 'View All Pickups',
            }}
            classNames={{ color: 'teal', size: 'large' }}
            className="button -solid"
            dataTestId="view-all-pickups"
          >
            <div className="button--inner">View All Pickups</div>
          </RouterLink>
        </section>
      </div>

      <section className="row:steps-4col">
        <Heading
          className="-a-center -mb-400"
          size="large"
          color="black"
          tag={
            getTitleTag(
              data?.hubPickupPage.sections?.steps?.titleTag || null,
            ) as keyof JSX.IntrinsicElements
          }
        >
          {data?.hubPickupPage.sections?.steps?.heading}
        </Heading>
        {data?.hubPickupPage.sections?.steps?.steps?.map(
          (step: StepData, index: number) => (
            <Step
              className="-mh-auto"
              key={step.title || index}
              heading={step.title || ''}
              step={index + 1}
              text={step.body || ''}
            />
          ),
        )}
      </section>

      <section
        className={`row:${getFeaturedClassPartial(
          data?.hubPickupPage.sections?.featured1,
        )}`}
      >
        {data?.hubPickupPage?.sections?.featured1?.video ? (
          <Media
            src={
              getSectionsData(
                ['featured1', 'video'],
                data?.hubPickupPage.sections,
              ) || ''
            }
            width="100%"
            height="360px"
          />
        ) : (
          <ImageV2
            objectFit="cover"
            width={imageFeatured1?.details.image.width ?? 1000}
            height={imageFeatured1?.details.image.height ?? 650}
            optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            src={
              imageFeatured1?.url ||
              'https://source.unsplash.com/collection/2102317/1000x650?sig=40349'
            }
          />
        )}
        <div style={{ padding: '1rem' }}>
          <Heading
            size="large"
            color="black"
            tag={
              getTitleTag(
                data?.hubPickupPage.sections?.featured1?.titleTag || 'p',
              ) as keyof JSX.IntrinsicElements
            }
          >
            {data?.hubPickupPage.sections?.featured1?.title}
          </Heading>
          <div className="markdown">
            <ReactMarkdown
              allowDangerousHtml
              source={data?.hubPickupPage.sections?.featured1?.body || ''}
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
          data?.hubPickupPage.sections?.featured2,
        )}`}
      >
        {data?.hubPickupPage?.sections?.featured2?.video ? (
          <Media
            src={
              getSectionsData(
                ['featured2', 'video'],
                data?.hubPickupPage.sections,
              ) || ''
            }
            width="100%"
            height="360px"
          />
        ) : (
          <ImageV2
            objectFit="cover"
            width={imageFeatured2?.details.image.width ?? 1000}
            height={imageFeatured2?.details.image.height ?? 650}
            optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            src={
              imageFeatured2?.url ||
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
                data?.hubPickupPage.sections?.featured2?.titleTag || 'p',
              ) as keyof JSX.IntrinsicElements
            }
          >
            {data?.hubPickupPage.sections?.featured2?.title}
          </Heading>
          <div className="markdown">
            <ReactMarkdown
              allowDangerousHtml
              source={data?.hubPickupPage.sections?.featured2?.body || ''}
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

      <section className="row:accessories">
        <Heading
          size="large"
          color="black"
          tag={
            getTitleTag(
              data?.hubPickupPage.sections?.tiles1?.titleTag || 'p',
            ) as keyof JSX.IntrinsicElements
          }
        >
          {data?.hubPickupPage.sections?.tiles1?.name}
        </Heading>
        {data?.hubPickupPage.sections?.tiles1?.tiles?.map(
          (acc: AccessoryData, index: number) => (
            <div key={acc.title || index}>
              <ImageV2
                width="100"
                height="85"
                objectFit="cover"
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                size="expand"
                src={
                  acc.image?.file?.url ||
                  'https://source.unsplash.com/collection/2102317/500x325?sig=403450'
                }
              />
              <Heading size="regular" color="black">
                {acc.title}{' '}
              </Heading>
              <Text tag="div" size="regular" color="darker">
                {acc.body}
              </Text>
            </div>
          ),
        )}
      </section>

      <hr className="fullWidth" />

      <section className="row:text">
        <Heading
          size="large"
          color="black"
          tag={
            getTitleTag(
              data?.hubPickupPage.sections?.rowText?.titleTag || 'p',
            ) as keyof JSX.IntrinsicElements
          }
        >
          {data?.hubPickupPage.sections?.rowText?.heading}
        </Heading>
        <div>
          <Text tag="p" size="regular" color="darker">
            {data?.hubPickupPage.sections?.rowText?.body}
          </Text>
          <Heading size="regular" color="black">
            {data?.hubPickupPage.sections?.rowText?.subHeading}
          </Heading>
          <RouterLink
            className="-pt-200"
            classNames={{ color: 'teal', size: 'regular' }}
            link={{
              label: 'View Leasing Guides',
              href: '/guides/van-leasing-explained',
            }}
          >
            View Leasing Guides <ArrowForwardSharp />
          </RouterLink>
        </div>
      </section>

      <hr className="fullWidth" />

      {tiles && (
        <WhyLeaseWithVanaramaTiles
          tiles={tiles}
          title={tilesTitle || ''}
          titleTag={tilesTitleTag}
        />
      )}

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
            {PickupsSearch.map(man => (
              <RouterLink
                className="button"
                classNames={{ color: 'teal', solid: true, size: 'large' }}
                link={{
                  label: man.label,
                  href: man.href,
                }}
                withoutDefaultClassName
                key={man.label}
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

      {data?.hubPickupPage.metaData && (
        <>
          <Head
            metaData={data?.hubPickupPage.metaData}
            featuredImage={data?.hubPickupPage.featuredImage}
          />
          <SchemaJSON
            json={JSON.stringify(data?.hubPickupPage.metaData.schema)}
          />
        </>
      )}
    </>
  );
};

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<IProps | IPageWithError>> {
  const client = createApolloClient({});

  try {
    const { data } = await client.query<
      HubPickupPageData,
      HubPickupPageDataVariables
    >({
      query: HUB_PICKUP_CONTENT,
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
      productsPickup,
      vehicleListUrlData,
    } = await pickupsPageOffersRequest(client);

    return {
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        pageType: PageTypeEnum.DEFAULT,
        data: encodeData(data),
        searchPodVansData,
        productsPickup: productsPickup || null,
        vehicleListUrlData: encodeData(vehicleListUrlData),
      },
    };
  } catch (error) {
    const apolloError = error as ApolloError;
    const revalidate = DEFAULT_REVALIDATE_INTERVAL_ERROR;

    // handle graphQLErrors as 404
    // Next will render our custom pages/404
    if (apolloError?.graphQLErrors?.length) {
      return {
        notFound: true,
        revalidate,
      };
    }

    return {
      revalidate,
      props: {
        pageType: PageTypeEnum.ERROR,
        error: convertErrorToProps(error),
      },
    };
  }
}

export default PickupsPage;
