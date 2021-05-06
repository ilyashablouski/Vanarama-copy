import dynamic from 'next/dynamic';
import { FC } from 'react';
// import { LazyLoadComponent } from 'react-lazy-load-image-component';
import ReactMarkdown from 'react-markdown/with-html';
import SchemaJSON from 'core/atoms/schema-json';
import Image from 'core/atoms/image';
import Carousel from 'core/organisms/carousel';
import useLeaseType from '../../hooks/useLeaseType';
import { LeaseTypeEnum } from '../../../generated/globalTypes';
import { IEvOffersData } from '../../utils/offers';
import {
  GenericPageQuery,
  GenericPageQuery_genericPage_sections_tiles_tiles as TileData,
} from '../../../generated/GenericPageQuery';
import { ProductCardData } from '../../../generated/ProductCardData';
import { GetDerivatives } from '../../../generated/GetDerivatives';
import { HeroEv as Hero, HeroHeading } from '../../components/Hero';
import ProductCarousel from '../../components/ProductCarousel/ProductCarousel';
import FeaturedSection from '../../components/FeaturedSection';
import JumpMenu from '../../components/JumpMenu/JumpMenu';
import Head from '../../components/Head/Head';
import Skeleton from '../../components/Skeleton';
import RouterLink from '../../components/RouterLink/RouterLink';

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
  evProducts?: ProductCardData | undefined;
  evDerivatives?: GetDerivatives | undefined;
  hevProducts?: ProductCardData | undefined;
  hevDerivatives?: GetDerivatives | undefined;
  searchParam: String;
}

export const EVLeaseExplainedContainer: FC<IProps> = ({
  data,
  evProducts,
  evDerivatives,
  hevProducts,
  hevDerivatives,
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
            title={sections?.jumpMenu?.[0].title}
            links={sections?.jumpMenu?.[0]?.links}
          />
        </section>
      )}

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

      <section className="row:bg-default" id="vs-hybrid">
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
          <div className="markdown -mt-500">
            <ReactMarkdown
              allowDangerousHtml
              source={sections?.rowText?.[1]?.body || ''}
              renderers={{
                link: props => {
                  const { href, children } = props;
                  return <RouterLink link={{ href, label: children }} />;
                },
                paragraph: props => <Text {...props} tag="p" color="darker" />,
              }}
            />
          </div>
        </div>
      </section>
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
              {sections?.carousel?.[1]?.title}
            </Heading>
            <ProductCarousel
              leaseType={
                isPersonalCar ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS
              }
              data={{
                derivatives: hevDerivatives?.derivatives || null,
                productCard: hevProducts?.productCarousel?.slice(0, 6) || null,
                vehicleList: vehicleListUrlData,
              }}
              countItems={hevProducts?.productCarousel?.length || 6}
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
                  href: `/${searchParam}/search`,
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
      )}
      <FeaturedSection featured={sections?.featured?.[3]} />
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
      <FeaturedSection featured={sections?.featured?.[4]} />
      <FeaturedSection featured={sections?.featured?.[5]} />
      <FeaturedSection featured={sections?.featured?.[6]} />
      <FeaturedSection featured={sections?.featured?.[7]} />
      <FeaturedSection featured={sections?.featured?.[8]} />

      <section className="row:bg-default">
        <ul className="four-stats">
          {sections?.steps?.[0]?.steps?.map((step, idx) => (
            <li key={step.title || idx}>
              <div className="heading -large -orange">{step.title}</div>
              <p className="heading -regular -darker">{step.body}</p>
            </li>
          ))}
        </ul>
      </section>
      <FeaturedSection featured={sections?.featured?.[9]} />
      <FeaturedSection featured={sections?.featured?.[10]} />
      <FeaturedSection featured={sections?.featured?.[11]} />
      {sections?.carousel?.[2] && (
        <section className="row:bg-lighter">
          <div>
            <Heading color="black" size="large" className="-a-center -mb-400">
              More Articles
            </Heading>
            {sections?.carousel?.[2]?.cards && (
              <Carousel countItems={3} className="-mh-auto about-us">
                {sections?.carousel?.[2]?.cards.map((card, idx) => (
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

export default EVLeaseExplainedContainer;
