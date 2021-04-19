import { FC } from 'react';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import dynamic from 'next/dynamic';
// import { LazyLoadComponent } from 'react-lazy-load-image-component';
// import Router from 'next/router';
import ReactMarkdown from 'react-markdown/with-html';
import SchemaJSON from 'core/atoms/schema-json';
import Media from 'core/atoms/media';
import Image from 'core/atoms/image';
import Accordion from 'core/molecules/accordion/Accordion';
import Carousel from 'core/organisms/carousel';
import useLeaseType from '../../../hooks/useLeaseType';
import { evHubOffersRequest, IEvOffersData } from '../../../utils/offers';
import createApolloClient from '../../../apolloClient';
import { getFeaturedClassPartial } from '../../../utils/layout';
import { LeaseTypeEnum } from '../../../../generated/globalTypes';
import {
  GenericPageQuery,
  GenericPageQuery_genericPage_sections_tiles_tiles as TileData,
} from '../../../../generated/GenericPageQuery';
import { GENERIC_PAGE } from '../../../gql/genericPage';
import { HeroEv as Hero, HeroHeading } from '../../../components/Hero';
import getTitleTag from '../../../utils/getTitleTag';
import ProductCarousel from '../../../components/ProductCarousel/ProductCarousel';
import Head from '../../../components/Head/Head';
import Skeleton from '../../../components/Skeleton';
import RouterLink from '../../../components/RouterLink/RouterLink';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Card = dynamic(() => import('core/molecules/cards'), {
  loading: () => <Skeleton count={5} />,
});

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
    {video && <Media src={video || ''} width="100%" height="360px" />}

    {image && (
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
      <FeaturedSection {...sections?.featured?.[0]} />
      <section className="row">
        <div className="tilebox -mv-600">
          {sections?.questionSet?.[0]?.questionAnswers?.map(set => (
            <Accordion
              items={[
                {
                  id: 'first',
                  title: set?.question || '',
                  children: (
                    <ReactMarkdown
                      allowDangerousHtml
                      source={set?.answer || ''}
                    />
                  ),
                },
              ]}
            />
          ))}
        </div>
      </section>
      <section className="row:bg-lighter">
        <div className="row:cards-3col">
          {sections?.cards?.[0]?.cards?.map(card => (
            <Card
              className="-title-only"
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              title={{
                title: card.title || '',
              }}
              imageSrc={card.image?.file?.url}
            />
          ))}
        </div>
      </section>

      <section className="row:bg-default">
        <div className="-mh-auto">
          <div className="markdown">
            <ReactMarkdown
              allowDangerousHtml
              source={sections?.rowText?.[0]?.body || ''}
              renderers={{
                link: props => {
                  const { href, children } = props;
                  return <RouterLink link={{ href, label: children }} />;
                },
                paragraph: props => <Text {...props} tag="p" color="darker" />,
              }}
            />
          </div>
          <Heading
            className="-a-center -mt-600 -pt-500"
            size="large"
            color="black"
            tag="h2"
          >
            {sections?.tiles?.[0]?.tilesTitle}
          </Heading>
          <div className="-flex-default -two-items -mt-500">
            {sections?.tiles?.[0]?.tiles?.map((tile: TileData, idx) => (
              <div key={tile.title || idx}>
                <Heading
                  size="large"
                  color="black"
                  className="-a-center -mv-500"
                  tag="span"
                >
                  {tile.title}
                </Heading>
                <Image
                  optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                  src={tile.image?.file?.url || ''}
                />
                <Heading
                  tag="span"
                  color="black"
                  size="lead"
                  className=" -a-center -mv-500 -ph-600"
                >
                  {tile.body}
                </Heading>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="row:bg-lighter">
        <div>
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
      <FeaturedSection {...sections?.featured?.[1]} />
      <FeaturedSection {...sections?.featured?.[2]} />
      <section className="row:bg-lighter">
        <div>
          <Heading
            tag="h2"
            color="black"
            size="large"
            className="-a-center -mb-600"
          >
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
      <FeaturedSection {...sections?.featured?.[3]} />
      <FeaturedSection {...sections?.featured?.[4]} />
      <section className="row:bg-deafault">
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
      <FeaturedSection {...sections?.featured?.[5]} />
      <FeaturedSection {...sections?.featured?.[6]} />
      <FeaturedSection {...sections?.featured?.[7]} />

      <section className="row:bg-default">
        <ul className="four-stats">
          {sections?.steps?.[0]?.steps?.map(step => (
            <li>
              <div className="heading -large -orange">{step.title}</div>
              <p className="heading -regular -darker">{step.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <FeaturedSection {...sections?.featured?.[8]} />
      <FeaturedSection {...sections?.featured?.[9]} />
      <FeaturedSection {...sections?.featured?.[10]} />

      <section className="row:bg-lighter">
        <div>
          <Heading color="black" size="large" className="-a-center -mb-400">
            More Articles
          </Heading>
          {sections?.carousel?.[2]?.cards && (
            <Carousel countItems={3} className="-mh-auto about-us">
              {sections?.carousel?.[2]?.cards.map((card, idx) => (
                <Card
                  optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                  key={card?.name || idx}
                  imageSrc={card?.image?.file?.url}
                  description={card?.body || ''}
                />
              ))}
            </Carousel>
          )}
        </div>
      </section>

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
    const path = `electric-leasing/cars/electric-cars-explained`;

    const { data } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: path,
        sectionsAsArray: true,
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
