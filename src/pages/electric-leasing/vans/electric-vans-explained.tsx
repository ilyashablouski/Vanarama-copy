import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import dynamic from 'next/dynamic';
// import { LazyLoadComponent } from 'react-lazy-load-image-component';
import ReactMarkdown from 'react-markdown/with-html';
import SchemaJSON from 'core/atoms/schema-json';
import Image from 'core/atoms/image';
import Carousel from 'core/organisms/carousel';
import useLeaseType from '../../../hooks/useLeaseType';
import { LeaseTypeEnum } from '../../../../generated/globalTypes';
import { evVanHubOffersRequest, IEvOffersData } from '../../../utils/offers';
import createApolloClient from '../../../apolloClient';
import { GENERIC_PAGE } from '../../../gql/genericPage';
import { GenericPageQuery } from '../../../../generated/GenericPageQuery';
import { HeroEv as Hero, HeroHeading } from '../../../components/Hero';
import ProductCarousel from '../../../components/ProductCarousel/ProductCarousel';
import FeaturedSection from '../../../components/FeaturedSection';
import JumpMenu from '../../../components/JumpMenu/JumpMenu';
import Head from '../../../components/Head/Head';
import Skeleton from '../../../components/Skeleton';
import RouterLink from '../../../components/RouterLink/RouterLink';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Card = dynamic(() => import('core/molecules/cards'), {
  loading: () => <Skeleton count={5} />,
});

interface IProps extends IEvOffersData {
  data: GenericPageQuery;
  searchParam: String;
}

export const EVHubPage: NextPage<IProps> = ({
  data,
  productsElectricOnlyVan: evProducts,
  productsElectricOnlyVanDerivatives: evDerivatives,
  vehicleListUrlData,
  searchParam,
}) => {
  const { cachedLeaseType } = useLeaseType(null);

  const optimisationOptions = {
    height: 620,
    width: 620,
    quality: 59,
  };

  const isPersonalCar = cachedLeaseType.car === 'Personal';
  const sections = data?.genericPage.sectionsAsArray;
  return (
    <>
      <Hero>
        <div className="hero--left">
          <Image
            loadImage
            optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            optimisationOptions={optimisationOptions}
            className="hero--image"
            plain
            size="expand"
            src={
              sections?.hero?.[0]?.image?.file?.url ||
              'https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/connect.png'
            }
          />
        </div>
        <div className="hero--right">
          <HeroHeading
            text={sections?.hero?.[0]?.title || ''}
            titleTag="h1"
            color="orange"
          />
        </div>
      </Hero>

      <FeaturedSection featured={sections?.featured?.[0]} />

      {sections?.jumpMenu?.[0] && (
        <section className="row">
          <JumpMenu
            title="Learn More About Electric Cars"
            links={sections?.jumpMenu?.[0]?.links}
          />
        </section>
      )}

      <FeaturedSection featured={sections?.featured?.[1]} />
      <FeaturedSection featured={sections?.featured?.[2]} />

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
              >
                <div className="button--inner">View All Offers</div>
              </RouterLink>
            </div>
          </div>
        </section>
      )}

      <FeaturedSection featured={sections?.featured?.[3]} />
      <FeaturedSection featured={sections?.featured?.[4]} />

      <section className="row:bg-default">
        <hr className="-fullwidth" />
        <h2
          className="heading -xlarge -orange -mv-500"
          style={{ transform: 'scale(0.9)' }}
        >
          {sections?.leadText?.[0]?.heading}
        </h2>
        <hr className="-fullwidth" />
        <div className="markdown -m-zero-auto -mt-600">
          <ReactMarkdown
            allowDangerousHtml
            source={sections?.leadText?.[0]?.description || ''}
            renderers={{
              link: props => {
                const { href, children } = props;
                return <RouterLink link={{ href, label: children }} />;
              },
            }}
          />
        </div>
      </section>

      <FeaturedSection featured={sections?.featured?.[5]} />
      <FeaturedSection featured={sections?.featured?.[6]} />
      <FeaturedSection featured={sections?.featured?.[7]} />
      <FeaturedSection featured={sections?.featured?.[8]} />
      <FeaturedSection featured={sections?.featured?.[9]} />
      <FeaturedSection featured={sections?.featured?.[10]} />
      <FeaturedSection featured={sections?.featured?.[11]} />

      <section className="row:bg-default">
        <hr className="-fullwidth" />
        <h2
          className="heading -xlarge -orange -mv-500"
          style={{ transform: 'scale(0.9)' }}
        >
          {sections?.leadText?.[0]?.heading}
        </h2>
        <hr className="-fullwidth" />
        <div className="markdown -m-zero-auto -mt-600">
          <ReactMarkdown
            allowDangerousHtml
            source={sections?.leadText?.[0]?.description || ''}
            renderers={{
              link: props => {
                const { href, children } = props;
                return <RouterLink link={{ href, label: children }} />;
              },
            }}
          />
        </div>
      </section>

      <FeaturedSection featured={sections?.featured?.[12]} />
      <FeaturedSection featured={sections?.featured?.[13]} />
      <FeaturedSection featured={sections?.featured?.[14]} />
      <FeaturedSection featured={sections?.featured?.[15]} />
      <FeaturedSection featured={sections?.featured?.[16]} />
      <FeaturedSection featured={sections?.featured?.[17]} />

      {sections?.carousel?.[1] && (
        <section className="row:bg-lighter">
          <div>
            <Heading color="black" size="large" className="-a-center -mb-400">
              More Articles
            </Heading>
            {sections?.carousel?.[1]?.cards && (
              <Carousel countItems={3} className="-mh-auto about-us">
                {sections?.carousel?.[1]?.cards.map((card, idx) => (
                  <Card
                    imageSrc={card?.image?.file?.url}
                    key={card?.name || idx}
                  >
                    <div className="card-footer basic">
                      <Heading tag="p" color="black" className="-mb-400">
                        {card?.body}
                      </Heading>
                    </div>
                  </Card>
                ))}
              </Carousel>
            )}
          </div>
        </section>
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

export async function getServerSideProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const path = `electric-leasing/vans/electric-vans-explained`;

    const { data } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: path,
        sectionsAsArray: true,
      },
    });

    const {
      productsElectricOnlyVan,
      productsElectricOnlyVanDerivatives,
      vehicleListUrlData,
    } = await evVanHubOffersRequest(client);

    return {
      props: {
        data,
        productsElectricOnlyVan,
        productsElectricOnlyVanDerivatives,
        vehicleListUrlData,
        searchParam: 'van-leasing',
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}

export default EVHubPage;
