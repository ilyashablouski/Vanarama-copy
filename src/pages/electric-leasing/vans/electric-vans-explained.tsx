import { ApolloError } from '@apollo/client';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import dynamic from 'next/dynamic';
// import { LazyLoadComponent } from 'react-lazy-load-image-component';
import SchemaJSON from 'core/atoms/schema-json';
import ImageV2 from 'core/atoms/image/ImageV2';
import LeadText from 'components/LeadText/LeadText';
import EvArticlesCarousel from '../../../containers/EvContentHubContainer/EvArticlesCarousel';
import useLeaseType from '../../../hooks/useLeaseType';
import { LeaseTypeEnum } from '../../../../generated/globalTypes';
import { evVanHubOffersRequest, IEvOffersData } from '../../../utils/offers';
import createApolloClient from '../../../apolloClient';
import { GENERIC_PAGE } from '../../../gql/genericPage';
import {
  GenericPageQuery,
  GenericPageQuery_genericPage_sectionsAsArray_jumpMenu_links,
  GenericPageQueryVariables,
} from '../../../../generated/GenericPageQuery';
import { HeroEv as Hero, HeroHeading } from '../../../components/Hero';
import ProductCarousel from '../../../components/ProductCarousel/ProductCarousel';
import FeaturedSection from '../../../components/FeaturedSection';
import JumpMenu from '../../../components/JumpMenu/JumpMenu';
import Head from '../../../components/Head/Head';
import Skeleton from '../../../components/Skeleton';
import RouterLink from '../../../components/RouterLink/RouterLink';
import { IPageWithData, PageTypeEnum } from '../../../types/common';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

type IProps = IPageWithData<
  IEvOffersData & {
    data: GenericPageQuery;
    searchParam: String;
  }
>;

export const EVHubPage: NextPage<IProps> = ({
  data,
  productsElectricOnlyVan: evProducts,
  productsElectricOnlyVanDerivatives: evDerivatives,
  vehicleListUrlData,
  searchParam,
}) => {
  const { cachedLeaseType } = useLeaseType(null);

  const isPersonalCar = cachedLeaseType.lcv === LeaseTypeEnum.PERSONAL;

  const sections = data?.genericPage.sectionsAsArray;
  const heroImage = sections?.hero?.[0]?.image?.file;

  return (
    <>
      <Hero>
        <div className="hero--left">
          <ImageV2
            plain
            quality={70}
            size="expand"
            optimisedHost
            lazyLoad={false}
            className="hero--image -pt-000"
            width={heroImage?.details.image.width ?? 1710}
            height={heroImage?.details.image.height ?? 1278}
            src={
              heroImage?.url ||
              `${process.env.HOST_DOMAIN}/vehiclePlaceholder.jpg`
            }
          />
        </div>
        <div className="hero--right">
          <HeroHeading
            text={sections?.hero?.[0]?.title || ''}
            titleTag="h1"
            color="orange"
            dataUiTestId="electric-vans-explained-page_hero_title"
          />
        </div>
      </Hero>

      <FeaturedSection featured={sections?.featured?.[0]} />

      {sections?.jumpMenu?.[0] && (
        <section className="row">
          <JumpMenu
            title={sections?.jumpMenu?.[0].title}
            links={
              sections?.jumpMenu?.[0]?.links?.filter(
                link => link !== null,
              ) as GenericPageQuery_genericPage_sectionsAsArray_jumpMenu_links[]
            }
          />
        </section>
      )}

      <FeaturedSection featured={sections?.featured?.[1]} />
      <FeaturedSection featured={sections?.featured?.[2]} />
      <FeaturedSection featured={sections?.featured?.[3]} />
      <FeaturedSection featured={sections?.featured?.[4]} />

      {sections?.leadText?.[0] && (
        <LeadText leadText={sections?.leadText?.[0]} />
      )}

      <FeaturedSection featured={sections?.featured?.[5]} />

      {sections?.carousel?.[0] && (
        <section className="row:bg-lighter">
          <div>
            <Heading
              tag="h2"
              color="black"
              size="large"
              className="-a-center -mb-600"
            >
              {sections?.carousel?.[0]?.title}
            </Heading>

            <ProductCarousel
              leaseType={
                isPersonalCar ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS
              }
              data={{
                derivatives: evDerivatives?.derivatives || null,
                productCard: evProducts?.productCarousel?.slice(0, 6) || null,
                vehicleList: vehicleListUrlData,
              }}
              countItems={evProducts?.productCarousel?.length || 6}
              dataTestIdBtn="car-view-offer"
              dataUiTestIdMask="ui-electric_van_leasing-car"
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
                  label: 'View Latest Electric Car Deals',
                  href: `/${searchParam}/search`,
                  query: {
                    fuelTypes: ['Electric'],
                  },
                }}
                withoutDefaultClassName
                dataTestId="view-all-cars"
                dataUiTestId="electric-vans-explained-page_carousel_button_view-all"
              >
                <div className="button--inner">View All Offers</div>
              </RouterLink>
            </div>
          </div>
        </section>
      )}

      <FeaturedSection featured={sections?.featured?.[6]} />
      <FeaturedSection featured={sections?.featured?.[7]} />
      <FeaturedSection featured={sections?.featured?.[8]} />
      <FeaturedSection featured={sections?.featured?.[9]} />
      <FeaturedSection featured={sections?.featured?.[10]} />
      <FeaturedSection featured={sections?.featured?.[11]} />

      {sections?.leadText?.[1] && (
        <LeadText leadText={sections?.leadText?.[1]} />
      )}

      <FeaturedSection featured={sections?.featured?.[12]} />
      <FeaturedSection featured={sections?.featured?.[13]} />
      <FeaturedSection featured={sections?.featured?.[14]} />
      <FeaturedSection featured={sections?.featured?.[15]} />
      <FeaturedSection featured={sections?.featured?.[16]} />
      <FeaturedSection featured={sections?.featured?.[17]} />

      {sections?.carousel?.[1] && (
        <EvArticlesCarousel data={sections?.carousel?.[1]} />
      )}

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
): Promise<GetServerSidePropsResult<IProps>> {
  try {
    const client = createApolloClient({}, context);
    const path = `electric-leasing/vans/electric-vans-explained`;

    const { data } = await client.query<
      GenericPageQuery,
      GenericPageQueryVariables
    >({
      query: GENERIC_PAGE,
      variables: {
        slug: path,
        sectionsAsArray: true,
        isPreview: !!context?.preview,
      },
    });

    const {
      productsElectricOnlyVan,
      productsElectricOnlyVanDerivatives,
      vehicleListUrlData,
    } = await evVanHubOffersRequest(client);

    return {
      props: {
        pageType: PageTypeEnum.DEFAULT,
        data,
        productsElectricOnlyVan: productsElectricOnlyVan || null,
        productsElectricOnlyVanDerivatives:
          productsElectricOnlyVanDerivatives || null,
        vehicleListUrlData,
        searchParam: 'van-leasing',
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

export default EVHubPage;
