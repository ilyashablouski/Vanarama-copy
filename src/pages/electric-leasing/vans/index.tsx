import { ApolloError } from '@apollo/client';
import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import TrustPilot from 'core/molecules/trustpilot';
import SchemaJSON from 'core/atoms/schema-json';
import createApolloClient from '../../../apolloClient';
import FeaturedOnBanner from '../../../components/FeaturedOnBanner';
import NationalLeagueBanner from '../../../components/NationalLeagueBanner';
import WhyLeaseWithVanaramaTiles from '../../../components/WhyLeaseWithVanaramaTiles';
import FeaturedSection from '../../../components/FeaturedSection';
import Head from '../../../components/Head/Head';
import { HeroEv as Hero, HeroPrompt } from '../../../components/Hero';
import NewLeaseOfLifePriceHeader from '../../../components/NewLeaseOfLifePriceHeader';
import Skeleton from '../../../components/Skeleton';
import { GENERIC_PAGE } from '../../../gql/genericPage';
import { GenericPageQueryFeatured as IFeatured } from '../../../../generated/GenericPageQueryFeatured';
import { evOffersRequest, IEvOffersData } from '../../../utils/offers';
import { getFeaturedSectionsAsArray } from '../../../utils/sections';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../../../generated/GenericPageQuery';
import { formatProductPageUrl, getLegacyUrl } from '../../../utils/url';
import VehicleCard from '../../../components/VehicleCard/VehicleCard';
import truncateString from '../../../utils/truncateString';
import HeadingSection from '../../../components/HeadingSection';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../../utils/env';
import { convertErrorToProps } from '../../../utils/helpers';
import {
  IPageWithData,
  IPageWithError,
  PageTypeEnum,
} from '../../../types/common';

const ImageV2 = dynamic(() => import('core/atoms/image/ImageV2'), {
  loading: () => <Skeleton count={4} />,
});
const RouterLink = dynamic(() =>
  import('../../../components/RouterLink/RouterLink'),
);

type IProps = IPageWithData<
  IEvOffersData & {
    data: GenericPageQuery;
  }
>;

const EVansPage: NextPage<IProps> = ({
  data,
  productsElectricOnlyVan,
  vehicleListUrlData,
}) => {
  const [featuresArray, setFeaturesArray] = useState<IFeatured[]>([]);

  const { sections } = data?.genericPage;

  const heroSection = sections?.hero;
  const heroImage = heroSection?.image?.file;
  const heroLabel = sections?.hero?.heroLabel?.[0];

  const leadTextSection = sections?.leadText;
  const titleTagText = leadTextSection?.titleTag;
  const headerText = leadTextSection?.heading;
  const descriptionText = leadTextSection?.description;

  const tilesSection = data?.genericPage.sections?.tiles;
  const tiles = tilesSection?.tiles;
  const tilesTitle = tilesSection?.tilesTitle;
  const tilesTitleTag = tilesSection?.titleTag;

  useEffect(() => {
    setFeaturesArray(getFeaturedSectionsAsArray(sections));
  }, [sections]);

  const HeroSection = () => (
    <Hero>
      <div className="hero--left">
        <NewLeaseOfLifePriceHeader
          title={sections?.hero?.title}
          body={sections?.hero?.body}
        />
        {heroLabel?.visible && (
          <HeroPrompt
            label={heroLabel?.link?.text || ''}
            url={heroLabel?.link?.url || ''}
            text={heroLabel?.text || ''}
            btnVisible={heroLabel?.link?.visible}
          />
        )}
      </div>
      <div className="hero--right">
        <ImageV2
          plain
          quality={70}
          size="expand"
          optimisedHost
          lazyLoad={false}
          className="hero--image -pt-000"
          width={heroImage?.details?.image.width ?? 1710}
          height={heroImage?.details?.image.height ?? 1278}
          src={
            heroImage?.url ||
            `${process.env.HOST_DOMAIN}/vehiclePlaceholder.jpg`
          }
        />
      </div>
    </Hero>
  );

  const CardsSection = () => (
    <section className="row:bg-lighter">
      <div className="row:cards-3col">
        {productsElectricOnlyVan?.productCarousel
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
                dataUiTestId="electric-leasing-vans-page_vehicle-card"
              />
            ) : null;
          })}
      </div>
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
          dataTestId="view-all-electric-vans"
        >
          <div className="button--inner">View Latest Electric Van Deals</div>
        </RouterLink>
      </div>
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
      <CardsSection />
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
        slug: 'electric-leasing/vans',
        isPreview: !!context?.preview,
      },
    });

    const {
      productsElectricOnlyVan,
      vehicleListUrlData,
    } = await evOffersRequest(client);

    return {
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        pageType: PageTypeEnum.DEFAULT,
        data,
        productsElectricOnlyVan: productsElectricOnlyVan || null,
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

export default EVansPage;
