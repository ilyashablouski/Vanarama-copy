import { ApolloError } from '@apollo/client';
import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import dynamic from 'next/dynamic';
import React, { ReactNode, useEffect, useState } from 'react';
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
import { GenericPageQueryFeatured as IFeatured } from '../../../../generated/GenericPageQueryFeatured';
import { evCarHubOffersRequest, IEvOffersData } from '../../../utils/offers';
import { getFeaturedSectionsAsArray } from '../../../utils/sections';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../../../generated/GenericPageQuery';
import HeadingSection from '../../../components/HeadingSection';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../../utils/env';
import { convertErrorToProps } from '../../../utils/helpers';
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
  }
>;

const ECarsPage: NextPage<IProps> = ({
  data,
  productsElectricOnlyCar,
  productsElectricOnlyCarDerivatives,
  productsHybridOnlyCar,
  productsHybridOnlyCarDerivatives,
  vehicleListUrlData,
}) => {
  const [featuresArray, setFeaturesArray] = useState<IFeatured[]>([]);
  const optimisationOptions = {
    height: 620,
    width: 620,
    quality: 59,
  };
  const { sections } = data?.genericPage;
  const titleTagText = sections?.leadText?.titleTag;
  const headerText = sections?.leadText?.heading;
  const descriptionText = sections?.leadText?.description;
  const tiles = data?.genericPage.sections?.tiles?.tiles;
  const tilesTitle = data?.genericPage.sections?.tiles?.tilesTitle;
  const tilesTitleTag = data?.genericPage.sections?.tiles?.titleTag;

  const [isPersonal, setIsPersonal] = useState<boolean>(true);
  const isMobile = useMobileViewport();

  useEffect(() => {
    const newFeaturesArray = getFeaturedSectionsAsArray(sections);
    setFeaturesArray(newFeaturesArray);
  }, [sections]);

  const HeroSection = () => (
    <Hero>
      <div className="hero--left">
        <NewLeaseOfLifePriceHeader
          title={sections?.hero?.title}
          body={sections?.hero?.body}
        />
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
          lazyLoad
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

      <ProductCarousel
        className={cx({ '-mt-400': isMobile })}
        leaseType={isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS}
        data={{
          derivatives: derivatives || null,
          productCard: productCard || null,
          vehicleList,
        }}
        countItems={productsElectricOnlyCar?.productCarousel?.length || 6}
        dataTestIdBtn="van-view-offer"
        dataUiTestIdMask="ui-electric_leasing-van"
      />
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
        titleTag={titleTagText}
        header={headerText}
        description={descriptionText}
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
              label: 'View Latest Electric Car Deals',
              href: '/car-leasing/search',
              query: {
                fuelTypes: ['Electric'],
              },
            }}
            withoutDefaultClassName
            dataTestId="view-all-electric-cars"
          >
            <div className="button--inner">View Latest Electric Car Deals</div>
          </RouterLink>
        </div>
      </CardsSection>
      <HeadingSection
        titleTag={titleTagText}
        header={headerText}
        description={descriptionText}
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
              label: 'View Latest Hybrid Car Deals',
              href: '/car-leasing/search',
              query: {
                fuelTypes: [
                  'petrol/electric hybrid',
                  'petrol/plugin elec hybrid',
                  'diesel/plugin elec hybrid',
                  'hydrogen fuel cell',
                ],
              },
            }}
            withoutDefaultClassName
            dataTestId="view-all-electric-cars"
          >
            <div className="button--inner">View Latest Electric Car Deals</div>
          </RouterLink>
        </div>
      </CardsSection>
      {featuresArray.map(section => (
        <React.Fragment key={section.targetId}>
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

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<IProps | IPageWithError>> {
  try {
    const client = createApolloClient({});
    const { data } = await client.query<
      GenericPageQuery,
      GenericPageQueryVariables
    >({
      query: GENERIC_PAGE,
      variables: {
        slug: 'electric-leasing/cars',
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
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
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

export default ECarsPage;
