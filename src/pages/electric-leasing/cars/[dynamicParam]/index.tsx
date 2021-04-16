import { FC } from 'react';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import dynamic from 'next/dynamic';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
// import Router from 'next/router';
import ReactMarkdown from 'react-markdown/with-html';
import SchemaJSON from 'core/atoms/schema-json';
import Media from 'core/atoms/media';
import Image from 'core/atoms/image';
import useLeaseType from '../../../../hooks/useLeaseType';
import { evHubOffersRequest, IEvOffersData } from '../../../../utils/offers';
import createApolloClient from '../../../../apolloClient';
import { getFeaturedClassPartial } from '../../../../utils/layout';
import { LeaseTypeEnum } from '../../../../../generated/globalTypes';
import {
  GenericPageQuery,
  GenericPageQuery_genericPage_sections_tiles_tiles as TileData,
} from '../../../../../generated/GenericPageQuery';
import { GENERIC_PAGE } from '../../../../gql/genericPage';
import { HeroEv as Hero, HeroHeading } from '../../../../components/Hero';
import getTitleTag from '../../../../utils/getTitleTag';
import TileLink from '../../../../components/TileLink/TileLink';
import Head from '../../../../components/Head/Head';
import Skeleton from '../../../../components/Skeleton';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Tile = dynamic(() => import('core/molecules/tile'), {
  loading: () => <Skeleton count={3} />,
});

const RouterLink = dynamic(() =>
  import('../../../../components/RouterLink/RouterLink'),
);
const ProductCarousel = dynamic(
  () => import('../../../../components/ProductCarousel/ProductCarousel'),
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
  productsElectricOnlyCar,
  productsElectricOnlyCarDerivatives,
  productsHybridOnlyCar,
  productsHybridOnlyCarDerivatives,
  vehicleListUrlData,
}) => {
  const { cachedLeaseType } = useLeaseType(null);

  const optimisationOptions = {
    height: 620,
    width: 620,
    quality: 59,
  };

  const isPersonalCar = cachedLeaseType.car === 'Personal';
  const sections = data?.genericPage.sections;

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
              sections?.hero?.image?.file?.url ||
              'https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/connect.png'
            }
          />
        </div>
        <div className="hero--right">
          <HeroHeading
            text={sections?.hero?.title || ''}
            titleTag="h1"
            color="orange"
          />
        </div>
      </Hero>

      <section className="row:bg-lighter">
        <div>
          <LazyLoadComponent
            visibleByDefault={
              typeof window === 'undefined' ||
              navigator?.vendor === 'Apple Computer, Inc.'
            }
          >
            <Heading
              tag="h2"
              color="black"
              size="large"
              className="-a-center -mb-600"
            >
              Examples of popular BEV electric cars include:
            </Heading>
            <ProductCarousel
              leaseType={
                isPersonalCar ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS
              }
              data={{
                derivatives:
                  productsElectricOnlyCarDerivatives?.derivatives || null,
                productCard:
                  productsElectricOnlyCar?.productCarousel?.slice(0, 6) || null,
                vehicleList: vehicleListUrlData,
              }}
              countItems={productsElectricOnlyCar?.productCarousel?.length || 6}
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
                  fuelTypes: ['Electric'],
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
      </section>

      <section className="row:bg-lighter">
        <div>
          <LazyLoadComponent
            visibleByDefault={
              typeof window === 'undefined' ||
              navigator?.vendor === 'Apple Computer, Inc.'
            }
          >
            <Heading tag="h2" color="black" size="large" className="-a-center">
              Examples of popular HEV models include:
            </Heading>
            <ProductCarousel
              leaseType={
                isPersonalCar ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS
              }
              data={{
                derivatives:
                  productsHybridOnlyCarDerivatives?.derivatives || null,
                productCard:
                  productsHybridOnlyCar?.productCarousel?.slice(0, 6) || null,
                vehicleList: vehicleListUrlData,
              }}
              countItems={productsHybridOnlyCar?.productCarousel?.length || 6}
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
                label: 'View All Offers',
                href: '/car-leasing/search',
                query: {
                  fuelTypes: [
                    'Diesel/plugin Elec Hybrid',
                    'Petrol/plugin Elec Hybrid',
                  ],
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

      <FeaturedSection {...sections?.featured1} />
      <FeaturedSection {...sections?.featured2} />
      <FeaturedSection {...sections?.featured3} />

      <LazyLoadComponent
        visibleByDefault={
          typeof window === 'undefined' ||
          navigator?.vendor === 'Apple Computer, Inc.'
        }
      >
        <section className="row:features-4col">
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
        </section>
      </LazyLoadComponent>

      <LazyLoadComponent
        visibleByDefault={
          typeof window === 'undefined' ||
          navigator?.vendor === 'Apple Computer, Inc.'
        }
      >
        <section className="row:bg-default">
          <ul className="four-stats">
            <li>
              <div className="heading -large -orange">140,000</div>
              <p className="heading -regular -darker">Domestic Chargers</p>
            </li>
            <li>
              <div className="heading -large -orange">9,000</div>
              <p className="heading -regular -darker">Workplace Chargers</p>
            </li>
            <li>
              <div className="heading -large -orange">22,000</div>
              <p className="heading -regular -darker">Public Chargers</p>
            </li>
            <li>
              <div className="heading -large -orange">3,500</div>
              <p className="heading -regular -darker">Rapid Chargers</p>
            </li>
          </ul>
        </section>
      </LazyLoadComponent>

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
    const path = `electric-leasing/cars/${context.params?.dynamicParam}`;

    const { data } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: path,
      },
    });

    const {
      productsElectricOnlyCar,
      productsElectricOnlyCarDerivatives,
      productsHybridOnlyCar,
      productsHybridOnlyCarDerivatives,
      vehicleListUrlData,
    } = await evHubOffersRequest(client);

    return {
      props: {
        data,
        productsElectricOnlyCar,
        productsElectricOnlyCarDerivatives,
        productsHybridOnlyCar,
        productsHybridOnlyCarDerivatives,
        vehicleListUrlData,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}

export default EVHubPage;
