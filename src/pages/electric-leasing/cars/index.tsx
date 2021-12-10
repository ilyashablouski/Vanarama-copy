import { ApolloError } from '@apollo/client';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import dynamic from 'next/dynamic';
import React, { ReactNode } from 'react';
import TrustPilot from 'core/molecules/trustpilot';
import SchemaJSON from 'core/atoms/schema-json';
import createApolloClient from '../../../apolloClient';
import FeaturedOnBanner from '../../../components/FeaturedOnBanner';
import NationalLeagueBanner from '../../../components/NationalLeagueBanner';
import FeaturedSection from '../../../components/FeaturedSection';
import WhyLeaseWithVanaramaTiles from '../../../components/WhyLeaseWithVanaramaTiles';
import Head from '../../../components/Head/Head';
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
  PageTypeEnum,
} from '../../../types/common';
import VehicleCard from '../../../components/VehicleCard';
import truncateString from '../../../utils/truncateString';
import { formatProductPageUrl, getLegacyUrl } from '../../../utils/url';
import ElectricCarHubPageContainer from '../../../containers/ElectricCarHubPageContainer';
import HeroSection from '../../../containers/ElectricCarHubPageContainer/HeroSection';

const RouterLink = dynamic(() =>
  import('../../../components/RouterLink/RouterLink'),
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
  const { sectionsAsArray } = data?.genericPage;
  const featuresArray = sectionsAsArray?.featured || [];
  const tiles = sectionsAsArray?.tiles?.[0]?.tiles;
  const tilesTitle = sectionsAsArray?.tiles?.[0]?.tilesTitle;
  const tilesTitleTag = sectionsAsArray?.tiles?.[0]?.titleTag;

  interface ICardsSection {
    children: ReactNode;
  }

  const CardsSection = ({ children }: ICardsSection) => (
    <section className="row:bg-lighter -p-relative">
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
      {children}
    </section>
  );

  const TrustPilotBanner = () => (
    <section className="row:trustpilot">
      <TrustPilot />
    </section>
  );

  // using for new page design
  if (isEvCarCarouselFeatureFlag) {
    return (
      <ElectricCarHubPageContainer
        data={data}
        pageType={PageTypeEnum.DEFAULT}
        productsElectricOnlyCar={productsElectricOnlyCar || null}
        productsElectricOnlyCarDerivatives={
          productsElectricOnlyCarDerivatives || null
        }
        productsHybridOnlyCar={productsHybridOnlyCar || null}
        productsHybridOnlyCarDerivatives={
          productsHybridOnlyCarDerivatives || null
        }
        vehicleListUrlData={vehicleListUrlData || null}
      />
    );
  }
  // TODO: remove when new design will release
  return (
    <>
      <HeroSection sectionsAsArray={sectionsAsArray} />
      <HeadingSection
        titleTag="h1"
        header={sectionsAsArray?.leadText?.[0]?.heading}
        description={sectionsAsArray?.leadText?.[0]?.description}
      />
      <CardsSection>
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
            <div className="button--inner">View Latest Electric Car Deals</div>
          </RouterLink>
        </div>
      </CardsSection>
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
