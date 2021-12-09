import { ApolloError } from '@apollo/client';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import dynamic from 'next/dynamic';
import React, { ReactNode, useState } from 'react';
import TrustPilot from 'core/molecules/trustpilot';
import SchemaJSON from 'core/atoms/schema-json';
import ToggleV2 from 'core/atoms/toggleV2';
import cx from 'classnames';
import createApolloClient from '../../../apolloClient';
import FeaturedOnBanner from '../../../components/FeaturedOnBanner';
import NationalLeagueBanner from '../../../components/NationalLeagueBanner';
import FeaturedSection from '../../../components/FeaturedSection';
import WhyLeaseWithVanaramaTiles from '../../../components/WhyLeaseWithVanaramaTiles';
import Head from '../../../components/Head/Head';
import { HeroEv as Hero, HeroPrompt } from '../../../components/Hero';
import NewLeaseOfLifePriceHeader from '../../../components/NewLeaseOfLifePriceHeader';
import Skeleton from '../../../components/Skeleton';
import { GENERIC_PAGE } from '../../../gql/genericPage';
import { evCarHubOffersRequest, IEvOffersData } from '../../../utils/offers';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../../../generated/GenericPageQuery';
import HeadingSection from '../../../components/HeadingSection';
import {
  convertErrorToProps,
  isEVCarHubCarouselFeatureFlagEnabled,
} from '../../../utils/helpers';
import {
  IPageWithData,
  IPageWithError,
  Nullable,
  PageTypeEnum,
} from '../../../types/common';
import { LeaseTypeEnum } from '../../../../generated/globalTypes';
import { ProductCardData_productCarousel } from '../../../../generated/ProductCardData';
import { GetDerivatives_derivatives } from '../../../../generated/GetDerivatives';
import { VehicleListUrl_vehicleList as IVehicleList } from '../../../../generated/VehicleListUrl';
import { useMobileViewport } from '../../../hooks/useMediaQuery';
import VehicleCard from '../../../components/VehicleCard';
import truncateString from '../../../utils/truncateString';
import { formatProductPageUrl, getLegacyUrl } from '../../../utils/url';

const Image = dynamic(() => import('core/atoms/image'), {
  loading: () => <Skeleton count={4} />,
});
const RouterLink = dynamic(() =>
  import('../../../components/RouterLink/RouterLink'),
);
const ProductCarousel = dynamic(
  () => import('../../../components/ProductCarousel'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

type IProps = IPageWithData<
  IEvOffersData & {
    data: GenericPageQuery;
    isEvCarCarouselFeatureFlag: boolean;
  }
>;

const ECarsPage: NextPage<IProps> = ({
  data,
  productsElectricOnlyCar,
  productsElectricOnlyCarDerivatives,
  productsHybridOnlyCar,
  productsHybridOnlyCarDerivatives,
  vehicleListUrlData,
  isEvCarCarouselFeatureFlag,
}) => {
  const optimisationOptions = {
    height: 620,
    width: 620,
    quality: 59,
  };
  const { sectionsAsArray } = data?.genericPage;
  const featuresArray = sectionsAsArray?.featured || [];
  const tiles = sectionsAsArray?.tiles?.[0]?.tiles;
  const tilesTitle = sectionsAsArray?.tiles?.[0]?.tilesTitle;
  const tilesTitleTag = sectionsAsArray?.tiles?.[0]?.titleTag;

  const [isPersonal, setIsPersonal] = useState<boolean>(true);
  const isMobile = useMobileViewport();

  const HeroSection = () => (
    <Hero>
      <div className="hero--left">
        <NewLeaseOfLifePriceHeader
          title={sectionsAsArray?.hero?.[0]?.title}
          body={sectionsAsArray?.hero?.[0]?.body}
        />
        {sectionsAsArray?.hero?.[0]?.heroLabel?.[0]?.visible && (
          <HeroPrompt
            label={sectionsAsArray?.hero?.[0]?.heroLabel?.[0]?.link?.text || ''}
            url={sectionsAsArray?.hero?.[0]?.heroLabel?.[0]?.link?.url || ''}
            text={sectionsAsArray?.hero?.[0]?.heroLabel?.[0]?.text || ''}
            btnVisible={
              sectionsAsArray?.hero?.[0]?.heroLabel?.[0]?.link?.visible
            }
          />
        )}
      </div>
      <div className="hero--right">
        <Image
          lazyLoad
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
          optimisationOptions={optimisationOptions}
          className="hero--image"
          plain
          size="expand"
          src={
            sectionsAsArray?.hero?.[0]?.image?.file?.url ||
            'https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/connect.png'
          }
        />
      </div>
    </Hero>
  );

  interface ICardsSection {
    derivatives: Nullable<GetDerivatives_derivatives[]>;
    productCard: Nullable<(ProductCardData_productCarousel | null)[]>;
    vehicleList: IVehicleList;
    children: ReactNode;
  }

  const CardsSection = ({
    derivatives,
    productCard,
    vehicleList,
    children,
  }: ICardsSection) => (
    <section className="row:bg-lighter -p-relative">
      {isEvCarCarouselFeatureFlag && (
        <div className="toggle-wrapper">
          <ToggleV2
            leftLabel="Personal"
            checked={isPersonal}
            leftValue={LeaseTypeEnum.PERSONAL}
            rightValue={LeaseTypeEnum.BUSINESS}
            rightLabel="Business"
            leftId="r1"
            rightId="r2"
            leftDataTestId="personal"
            rightDataTestId="business"
            onChange={value => setIsPersonal(value === LeaseTypeEnum.PERSONAL)}
          />
        </div>
      )}

      {isEvCarCarouselFeatureFlag && (
        <ProductCarousel
          className={cx({ '-mt-400': isMobile })}
          leaseType={
            isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS
          }
          data={{
            derivatives: derivatives || null,
            productCard: productCard || null,
            vehicleList,
          }}
          countItems={productsElectricOnlyCar?.productCarousel?.length || 6}
          dataTestIdBtn="van-view-offer"
          dataUiTestIdMask="ui-electric_leasing-van"
        />
      )}
      {!isEvCarCarouselFeatureFlag && (
        <div className="row:cards-3col">
          {productsElectricOnlyCar?.productCarousel
            ?.slice(0, 6)
            .map((item, index) => {
              const productUrl = formatProductPageUrl(
                getLegacyUrl(vehicleListUrlData.edges, item?.capId),
                item?.capId,
              );
              return item ? (
                <VehicleCard
                  data={item}
                  key={item?.capId || index}
                  isPersonalPrice={false}
                  url={productUrl?.url}
                  title={{
                    title: truncateString(
                      `${item?.manufacturerName} ${item?.modelName}`,
                    ),
                    description: item?.derivativeName || '',
                  }}
                />
              ) : null;
            })}
        </div>
      )}
      {children}
    </section>
  );

  const TrustPilotBanner = () => (
    <section className="row:trustpilot">
      <TrustPilot />
    </section>
  );

  return (
    <>
      <HeroSection />
      <HeadingSection
        titleTag="h1"
        header={
          isEvCarCarouselFeatureFlag
            ? sectionsAsArray?.carousel?.[0]?.title
            : sectionsAsArray?.leadText?.[0]?.heading
        }
        description={
          isEvCarCarouselFeatureFlag
            ? sectionsAsArray?.carousel?.[0]?.subtitle
            : sectionsAsArray?.leadText?.[0]?.description
        }
      />
      <CardsSection
        derivatives={productsElectricOnlyCarDerivatives?.derivatives || null}
        productCard={productsElectricOnlyCar?.productCarousel || null}
        vehicleList={vehicleListUrlData}
      >
        <div className="-justify-content-row -pt-500">
          <RouterLink
            className="button"
            classNames={{
              color: 'teal',
              solid: true,
              size: 'regular',
            }}
            link={{
              label: `${
                isEvCarCarouselFeatureFlag
                  ? 'Browse Electric Car Deals'
                  : 'View Latest Electric Car Deals'
              }`,
              href: `${
                isEvCarCarouselFeatureFlag
                  ? '/car-leasing/electric'
                  : '/car-leasing/search'
              }`,
              query: isEvCarCarouselFeatureFlag
                ? {}
                : {
                    fuelTypes: [
                      'petrol/electric hybrid',
                      'petrol/plugin elec hybrid',
                      'Electric',
                      'diesel/plugin elec hybrid',
                      'hydrogen fuel cell',
                    ],
                  },
            }}
            withoutDefaultClassName
            dataTestId="view-all-electric-cars"
            dataUiTestId="electric-leasing-cars-view_electric_car-button"
          >
            <div className="button--inner">
              {isEvCarCarouselFeatureFlag
                ? 'Browse Electric Car Deals'
                : 'View Latest Electric Car Deals'}
            </div>
          </RouterLink>
        </div>
      </CardsSection>
      {isEvCarCarouselFeatureFlag && (
        <>
          <HeadingSection
            titleTag="h1"
            header={sectionsAsArray?.carousel?.[1]?.title}
            description={sectionsAsArray?.carousel?.[1]?.subtitle}
          />
          <CardsSection
            derivatives={productsHybridOnlyCarDerivatives?.derivatives || null}
            productCard={productsHybridOnlyCar?.productCarousel || null}
            vehicleList={vehicleListUrlData}
          >
            <div className="-justify-content-row -pt-500">
              <RouterLink
                className="button"
                classNames={{
                  color: 'teal',
                  solid: true,
                  size: 'regular',
                }}
                link={{
                  label: 'Browse Hybrid Car Deals',
                  href: '/car-leasing/hybrid',
                }}
                withoutDefaultClassName
                dataTestId="view-all-hybrid-cars"
                dataUiTestId="electric-leasing-cars-view_hybrid_car-button"
              >
                <div className="button--inner">Browse Hybrid Car Deals</div>
              </RouterLink>
            </div>
          </CardsSection>
        </>
      )}
      {featuresArray.map(section => (
        <React.Fragment key={section?.targetId}>
          <FeaturedSection featured={section} />
        </React.Fragment>
      ))}
      {tiles && (
        <WhyLeaseWithVanaramaTiles
          tiles={tiles}
          title={tilesTitle || ''}
          titleTag={tilesTitleTag}
        />
      )}
      <NationalLeagueBanner />
      <FeaturedOnBanner />
      <TrustPilotBanner />
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

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<IProps | IPageWithError>> {
  try {
    const client = createApolloClient({});
    const isEvCarCarouselFeatureFlag = isEVCarHubCarouselFeatureFlagEnabled(
      context.req.headers.cookie,
    );
    const { data } = await client.query<
      GenericPageQuery,
      GenericPageQueryVariables
    >({
      query: GENERIC_PAGE,
      variables: {
        slug: 'electric-leasing/cars',
        sectionsAsArray: true,
        isPreview: !!context?.preview,
      },
    });

    const {
      productsElectricOnlyCar,
      productsHybridOnlyCar,
      productsElectricOnlyCarDerivatives,
      productsHybridOnlyCarDerivatives,
      vehicleListUrlData,
    } = await evCarHubOffersRequest(client);

    return {
      props: {
        isEvCarCarouselFeatureFlag,
        pageType: PageTypeEnum.DEFAULT,
        data,
        productsElectricOnlyCar: productsElectricOnlyCar || null,
        productsElectricOnlyCarDerivatives:
          productsElectricOnlyCarDerivatives || null,
        productsHybridOnlyCar: productsHybridOnlyCar || null,
        productsHybridOnlyCarDerivatives:
          productsHybridOnlyCarDerivatives || null,
        vehicleListUrlData: vehicleListUrlData || null,
      },
    };
  } catch (error) {
    const apolloError = error as ApolloError;

    // handle graphQLErrors as 404
    // Next will render our custom pages/404
    if (apolloError?.graphQLErrors?.length) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        pageType: PageTypeEnum.ERROR,
        error: convertErrorToProps(error),
      },
    };
  }
}

export default ECarsPage;
