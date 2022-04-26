import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { ApolloError } from '@apollo/client';
import dynamic from 'next/dynamic';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import ReactMarkdown from 'react-markdown/with-html';
import SchemaJSON from 'core/atoms/schema-json';
import Media from 'core/atoms/media';
import ImageV2 from 'core/atoms/image/ImageV2';
import React, { useContext, useEffect, useState } from 'react';
import TrustPilot from 'core/molecules/trustpilot';
import NextHead from 'next/head';
import decode from 'decode-html';
import CardLabel from 'core/molecules/cards/CardLabel';
import FreeHomeCharger from 'core/assets/icons/FreeHomeCharger';
import FreeInsuranceCardLabelIcon from 'core/assets/icons/FreeInsuranceCardLabelIcon';
import { IServiceBanner } from 'core/molecules/service-banner/interfaces';
import { decodeData, encodeData, normalizeString } from '../../utils/data';
import { ProductCardData_productCarousel as IProduct } from '../../../generated/ProductCardData';
import { getSectionsData } from '../../utils/getSectionsData';
import { getFeaturedClassPartial } from '../../utils/layout';
import { isWished } from '../../utils/wishlistHelpers';
import { isCompared } from '../../utils/comparatorHelpers';
import { CompareContext } from '../../utils/comparatorTool';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import css from '!!raw-loader!../../../public/styles/pages/car-leasing.css';
import {
  HubCarPageData,
  HubCarPageData_hubCarPage_sections_steps_steps as StepData,
  HubCarPageDataVariables,
} from '../../../generated/HubCarPageData';
import { HUB_CAR_CONTENT } from '../../gql/hub/hubCarPage';
import createApolloClient from '../../apolloClient';
import Hero, { HeroPrompt } from '../../components/Hero';
import WhyLeaseWithVanaramaTiles from '../../components/WhyLeaseWithVanaramaTiles';
import RouterLink from '../../components/RouterLink/RouterLink';
import truncateString from '../../utils/truncateString';
import { LeaseTypeEnum, VehicleTypeEnum } from '../../../generated/globalTypes';
import {
  formatProductPageUrl,
  getLegacyUrl,
  getManufacturerJson,
  isManufacturerMigrated,
  ManufacturersSlugContext,
} from '../../utils/url';
import getTitleTag from '../../utils/getTitleTag';
import useWishlist from '../../hooks/useWishlist';
import useLeaseType from '../../hooks/useLeaseType';
import { features } from '../../components/ProductCarousel/helpers';
import Head from '../../components/Head/Head';
import FeaturedOnSection from '../../components/FeaturedOnBanner';
import Skeleton from '../../components/Skeleton';
import {
  filterList as IFilterList,
  filterListVariables as IFilterListVariables,
} from '../../../generated/filterList';
import { GET_SEARCH_POD_DATA } from '../../containers/SearchPodContainer/gql';
import { carsPageOffersRequest, ICarsPageOffersData } from '../../utils/offers';
import { isServerRenderOrAppleDevice } from '../../utils/deviceType';
import { freeInsuranceSmallPrint } from './free-car-insurance';
import { FuelTypeEnum } from '../../../entities/global';
import NationalLeagueBanner from '../../components/NationalLeagueBanner';
import HeadingSection from '../../components/HeadingSection';
import { getServiceBannerData } from '../../utils/serviceBannerHelper';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Step = dynamic(() => import('core/molecules/step'), {
  loading: () => <Skeleton count={3} />,
});
const Price = dynamic(() => import('core/atoms/price'));
const ProductCard = dynamic(() =>
  import('core/molecules/cards/ProductCard/ProductCard'),
);
const Choiceboxes = dynamic(() => import('core/atoms/choiceboxes'), {
  loading: () => <Skeleton count={3} />,
});
const Icon = dynamic(() => import('core/atoms/icon'), {
  ssr: false,
});
const Flame = dynamic(() => import('core/assets/icons/Flame'), {
  ssr: false,
});

const getFuelType = (product: IProduct | null) =>
  product?.keyInformation?.find(item => item?.name === 'Fuel Type')?.value;

interface IProps extends ICarsPageOffersData {
  data: HubCarPageData;
  searchPodCarsData: IFilterList;
  serviceBanner?: IServiceBanner;
}

export const CarsPage: NextPage<IProps> = ({
  data: encodedData,
  searchPodCarsData: searchPodCarsDataEncoded,
  productsCar,
  vehicleListUrlData: vehicleListUrlDataEncoded,
}) => {
  const data: HubCarPageData = decodeData(encodedData);
  const searchPodCarsData = decodeData(searchPodCarsDataEncoded);
  const vehicleListUrlData = decodeData(vehicleListUrlDataEncoded);

  const sections = data?.hubCarPage.sections;

  const heroSection = sections?.hero;
  const heroImage = heroSection?.image?.file;

  const leadTextSection = sections?.leadText;
  const titleTagText = leadTextSection?.titleTag;
  const headerText = leadTextSection?.heading;
  const descriptionText = leadTextSection?.description;

  const tilesSection = sections?.tiles;
  const tiles = tilesSection?.tiles;
  const tilesTitle = tilesSection?.tilesTitle;
  const tilesTitleTag = tilesSection?.titleTag;

  // pass in true for car leaseType
  const { cachedLeaseType, setCachedLeaseType } = useLeaseType(true);
  const [isPersonal, setIsPersonal] = useState(
    cachedLeaseType === LeaseTypeEnum.PERSONAL,
  );

  const { wishlistVehicleIds, wishlistChange } = useWishlist();
  const { compareVehicles, compareChange } = useContext(CompareContext);
  const { vehicles: migratedManufacturers } = useContext(
    ManufacturersSlugContext,
  );

  useEffect(() => {
    setCachedLeaseType(
      isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS,
    );
  }, [isPersonal, setCachedLeaseType]);

  const leaseTypes = [
    { label: 'Personal', value: 'Personal', active: isPersonal },
    { label: 'Business', value: 'Business', active: !isPersonal },
  ];

  const imageFeatured1 = getSectionsData(
    ['featured1', 'image', 'file'],
    data?.hubCarPage.sections,
  );
  const imageFeatured2 = getSectionsData(
    ['featured2', 'image', 'file'],
    data?.hubCarPage.sections,
  );

  return (
    <>
      <NextHead>
        {/* eslint-disable-next-line react/no-danger */}
        <style dangerouslySetInnerHTML={{ __html: decode(css) }} />
      </NextHead>

      <Hero
        searchPodCarsData={searchPodCarsData}
        smallPrint={freeInsuranceSmallPrint}
        customCTALink="/car-leasing/free-car-insurance"
        dataUiTestId="car-leasing-page_hero"
      >
        <div className="nlol nlol-free-insurance">
          <p>Find Your New Lease Of Life</p>
          <h2>1 Year&apos;s FREE Insurance</h2>
          <p>On Car Hot Offers</p>
        </div>
        <div>
          <ImageV2
            plain
            quality={70}
            size="expand"
            optimisedHost
            lazyLoad={false}
            className="hero--image -pt-000"
            width={heroImage?.details.image.width ?? 695}
            height={heroImage?.details.image.height ?? 359}
            src={
              heroImage?.url ||
              `${process.env.HOST_DOMAIN}/vehiclePlaceholder.jpg`
            }
          />
        </div>
        {data?.hubCarPage.sections?.hero?.heroLabel?.[0]?.visible && (
          <HeroPrompt
            label={
              data?.hubCarPage.sections?.hero?.heroLabel?.[0]?.link?.text || ''
            }
            url={
              data?.hubCarPage.sections?.hero?.heroLabel?.[0]?.link?.url || ''
            }
            text={data?.hubCarPage.sections?.hero?.heroLabel?.[0]?.text || ''}
            btnVisible={
              data?.hubCarPage.sections?.hero?.heroLabel?.[0]?.link?.visible
            }
          />
        )}
      </Hero>

      <HeadingSection
        titleTag={titleTagText}
        header={headerText}
        description={descriptionText}
        dataUiTestId="car-leasing-page_heading-section"
      />

      <section className="row:eligibility-checker-cta">
        <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
          <div>
            <ImageV2
              width="800"
              height="400"
              quality={60}
              src="https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/Eligibility-Checker-Arc+(2).jpg"
              size="expand"
              plain
            />
            <Heading size="large" color="black">
              Check Your Eligibility For A New Car Lease
            </Heading>
            <RouterLink
              className="button"
              classNames={{ color: 'teal', solid: true, size: 'regular' }}
              link={{
                label: 'Check My Eligibility',
                href: '/lease-eligibility-checker',
              }}
              dataUiTestId="eligibility-Checker-btn"
              withoutDefaultClassName
            >
              <div className="button--inner">Check My Eligibility</div>
            </RouterLink>
            <Text tag="p" color="dark" size="xsmall">
              This will not affect your credit score.
            </Text>
          </div>
          <div>
            <ImageV2
              width="800"
              height="400"
              quality={60}
              src="https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/Help-Me-Choose2.jpg"
              size="expand"
              plain
            />
            <Heading size="large" color="black">
              Not Sure Which Vehicle Is Best For You?
            </Heading>
            <RouterLink
              className="button"
              classNames={{ color: 'teal', solid: true, size: 'regular' }}
              dataUiTestId="car-leasing-page_help-me-choose-button"
              link={{
                label: 'Help Me Choose',
                href: '/help-me-choose',
              }}
              withoutDefaultClassName
            >
              <div className="button--inner">Help Me Choose</div>
            </RouterLink>
          </div>
        </LazyLoadComponent>
      </section>

      <div className="row:bg-lighter">
        <section className="row:cards-3col">
          <Choiceboxes
            className="-cols-2"
            choices={leaseTypes}
            onSubmit={value => {
              setIsPersonal(value.label === 'Personal');
            }}
          />
          {productsCar?.productCarousel?.map((item, index) => {
            const productUrl = formatProductPageUrl(
              getLegacyUrl(
                vehicleListUrlData.edges,
                item?.capId,
                isManufacturerMigrated(
                  migratedManufacturers?.car?.manufacturers,
                  item?.manufacturerName || '',
                ),
              ),
              item?.capId,
            );
            const extendedProductData = item
              ? { ...item, pageUrl: productUrl }
              : null;

            return (
              <LazyLoadComponent
                key={item?.capId || index}
                visibleByDefault={isServerRenderOrAppleDevice}
              >
                <ProductCard
                  dataUiTestId="car-leasing-page_product-card"
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
                            `${item?.manufacturerName} ${item?.modelName}`,
                          )}
                        </Heading>
                        <Heading
                          tag="span"
                          size="small"
                          color="dark"
                          dataUiTestId="car-leasing-page_product-card_derivative-name"
                        >
                          {item?.derivativeName || ''}
                        </Heading>
                      </RouterLink>
                    ),
                    score: item?.averageRating ?? 0,
                  }}
                  extrasRender={
                    getFuelType(item) === FuelTypeEnum.ELECTRIC ||
                    (item?.freeInsurance &&
                      item?.vehicleType === VehicleTypeEnum.CAR) ? (
                      <>
                        {getFuelType(item) === FuelTypeEnum.ELECTRIC && (
                          <CardLabel
                            text="Free Home charger"
                            icon={<FreeHomeCharger />}
                          />
                        )}
                        {item?.freeInsurance &&
                          item?.vehicleType === VehicleTypeEnum.CAR && (
                            <CardLabel
                              text="1yr Free Insurance"
                              icon={<FreeInsuranceCardLabelIcon />}
                            />
                          )}
                      </>
                    ) : null
                  }
                >
                  <div className="-flex-h">
                    <Price
                      price={
                        isPersonal ? item?.personalRate : item?.businessRate
                      }
                      size="large"
                      separator="."
                      priceDescription={`Per Month ${
                        isPersonal ? 'Inc.VAT' : 'Exc.VAT'
                      }`}
                      dataUitestId="car-leasing-page_product-card"
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
                      dataTestId="view-offer"
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
              href: '/car-leasing-special-offers.html',
              label: 'View All Cars',
            }}
            classNames={{ color: 'teal', size: 'large' }}
            className="button -solid"
            dataTestId="view-all-cars"
            dataUiTestId="car-leasing-page_view-all-cars_button"
          >
            <div className="button--inner">View All Cars</div>
          </RouterLink>
        </section>
      </div>

      <section className="row:steps-4col">
        <Heading
          className="-a-center -mb-400"
          size="large"
          color="black"
          dataUiTestId={`car-leasing-page_${normalizeString(
            data?.hubCarPage.sections?.steps?.heading,
          )}`}
        >
          {data?.hubCarPage.sections?.steps?.heading}
        </Heading>
        {data?.hubCarPage.sections?.steps?.steps?.map(
          (step: StepData, index) => (
            <Step
              className="-mh-auto"
              key={step.title || index}
              heading={step.title || ''}
              step={index + 1}
              text={step.body || ''}
              dataUiTestId="car-leasing-page_leasing-step"
            />
          ),
        )}
      </section>

      <section
        className={`row:${getFeaturedClassPartial(
          data?.hubCarPage.sections?.featured1,
        )}`}
      >
        {data?.hubCarPage?.sections?.featured1?.video ? (
          <Media
            src={
              getSectionsData(
                ['featured1', 'video'],
                data?.hubCarPage.sections,
              ) || ''
            }
            width="100%"
            height="360px"
            dataUiTestId={`car-leasing-page_${normalizeString(
              data?.hubCarPage.sections?.featured1?.title,
            )}_media`}
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
            dataUiTestId={`car-leasing-page_${normalizeString(
              data?.hubCarPage.sections?.featured1?.title,
            )}`}
          />
        )}
        <div className="-inset -middle -col-400">
          <Heading
            dataUiTestId={`car-leasing-page_${normalizeString(
              data?.hubCarPage.sections?.featured1?.title,
            )}`}
            size="large"
            color="black"
            tag={
              getTitleTag(
                data?.hubCarPage.sections?.featured1?.titleTag || 'p',
              ) as keyof JSX.IntrinsicElements
            }
          >
            {data?.hubCarPage.sections?.featured1?.title}
          </Heading>
          <div className="markdown">
            <ReactMarkdown
              allowDangerousHtml
              source={data?.hubCarPage.sections?.featured1?.body || ''}
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
          data?.hubCarPage.sections?.featured2,
        )}`}
      >
        {data?.hubCarPage?.sections?.featured2?.video ? (
          <Media
            src={
              getSectionsData(
                ['featured2', 'video'],
                data?.hubCarPage.sections,
              ) || ''
            }
            width="100%"
            height="360px"
            dataUiTestId={`car-leasing-page_${normalizeString(
              data?.hubCarPage.sections?.featured2?.title,
            )}_media`}
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
            dataUiTestId={`car-leasing-page_${normalizeString(
              data?.hubCarPage.sections?.featured2?.title,
            )}`}
          />
        )}
        <div className="-inset -middle -col-400">
          <Heading
            size="large"
            color="black"
            tag={
              getTitleTag(
                data?.hubCarPage.sections?.featured2?.titleTag || 'p',
              ) as keyof JSX.IntrinsicElements
            }
          >
            {data?.hubCarPage.sections?.featured2?.title}
          </Heading>
          <div className="markdown">
            <ReactMarkdown
              allowDangerousHtml
              source={data?.hubCarPage.sections?.featured2?.body || ''}
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

      {tiles && (
        <WhyLeaseWithVanaramaTiles
          tiles={tiles}
          title={tilesTitle || ''}
          titleTag={tilesTitleTag}
          dataUiTestId="car-leasing-page_why-lease-with-vanarama-titles"
        />
      )}

      <NationalLeagueBanner dataUiTestId="car-leasing-page_national-league-banner" />

      <FeaturedOnSection dataUiTestId="car-leasing-page_featured-on" />

      <section
        className="row:trustpilot"
        data-uitestid="car-leasing-page_trustpilot_section"
      >
        <TrustPilot />
      </section>

      {data?.hubCarPage.metaData && (
        <>
          <Head
            metaData={data?.hubCarPage.metaData}
            featuredImage={data?.hubCarPage.featuredImage}
          />
          <SchemaJSON json={JSON.stringify(data?.hubCarPage.metaData.schema)} />
        </>
      )}
    </>
  );
};

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<IProps>> {
  const client = createApolloClient({}, context);

  try {
    const [
      { data: hubCarPage },
      migrationSlugs,
      { serviceBanner },
    ] = await Promise.all([
      client.query<HubCarPageData, HubCarPageDataVariables>({
        query: HUB_CAR_CONTENT,
        variables: {
          isPreview: !!context?.preview,
        },
      }),
      getManufacturerJson(),
      getServiceBannerData(client),
    ]);
    const { data: searchPodCarsData } = await client.query<
      IFilterList,
      IFilterListVariables
    >({
      query: GET_SEARCH_POD_DATA,
      variables: {
        vehicleTypes: [VehicleTypeEnum.CAR],
      },
    });

    const { productsCar, vehicleListUrlData } = await carsPageOffersRequest(
      client,
    );

    return {
      props: {
        data: encodeData(hubCarPage),
        migrationSlugs: migrationSlugs || null,
        searchPodCarsData: encodeData(searchPodCarsData),
        productsCar: productsCar || null,
        vehicleListUrlData: encodeData(vehicleListUrlData),
        serviceBanner: serviceBanner || null,
      },
    };
  } catch (error) {
    const apolloError = error as ApolloError;

    // handle graphQLErrors as 404
    // Next will render our custom pages/404
    if (apolloError?.graphQLErrors?.length) {
      return { notFound: true };
    }

    // throw any other errors
    // Next will render our custom pages/_error
    throw error;
  }
}

export default CarsPage;
