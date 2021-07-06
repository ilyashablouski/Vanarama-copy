import SchemaJSON from 'core/atoms/schema-json';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import Media from 'core/atoms/media';
import TrustPilot from 'core/molecules/trustpilot';
import createApolloClient from '../../../apolloClient';
import FeaturedOnBanner from '../../../components/FeaturedOnBanner';
import NationalLeagueBanner from '../../../components/NationalLeagueBanner';
import Head from '../../../components/Head/Head';
import { HeroEv as Hero, HeroPrompt } from '../../../components/Hero';
import NewLeaseOfLifePriceHeader from '../../../components/NewLeaseOfLifePriceHeader';
import Skeleton from '../../../components/Skeleton';
import TileLink from '../../../components/TileLink/TileLink';
import { GENERIC_PAGE } from '../../../gql/genericPage';
import getTitleTag from '../../../utils/getTitleTag';
import { getFeaturedClassPartial } from '../../../utils/layout';
import { evOffersRequest, IEvOffersData } from '../../../utils/offers';
import { getFeaturedSectionsAsArray } from '../../../utils/sections';
import truncateString from '../../../utils/truncateString';
import { formatProductPageUrl, getLegacyUrl } from '../../../utils/url';
import {
  GenericPageQuery,
  GenericPageQuery_genericPage_sections_tiles_tiles as TileData,
} from '../../../../generated/GenericPageQuery';
import { isServerRenderOrAppleDevice } from '../../../utils/deviceType';
import VehicleCard from '../../../components/VehicleCard';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Image = dynamic(() => import('core/atoms/image'), {
  loading: () => <Skeleton count={4} />,
});
const RouterLink = dynamic(() =>
  import('../../../components/RouterLink/RouterLink'),
);
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Tile = dynamic(() => import('core/molecules/tile'), {
  loading: () => <Skeleton count={3} />,
});

interface IProps extends IEvOffersData {
  data: GenericPageQuery;
}

const ECarsPage: NextPage<IProps> = ({
  data,
  productsElectricOnlyCar,
  vehicleListUrlData,
}) => {
  const [featuresArray, setFeaturesArray] = useState([]);
  const optimisationOptions = {
    height: 620,
    width: 620,
    quality: 59,
  };
  const { sections } = data?.genericPage;
  useEffect(() => {
    const featuresArry: any = getFeaturedSectionsAsArray(sections);
    setFeaturesArray(featuresArry);
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

  const HeadingSection = () => (
    <div className="row:lead-text">
      <Heading
        size="xlarge"
        color="black"
        tag={
          getTitleTag(
            sections?.leadText?.titleTag || null,
          ) as keyof JSX.IntrinsicElements
        }
      >
        {sections?.leadText?.heading}
      </Heading>
      <Text tag="span" size="lead" color="darker">
        {sections?.leadText?.description}
      </Text>
    </div>
  );

  const CardsSection = () => (
    <section className="row:bg-lighter">
      <div className="row:cards-3col">
        {productsElectricOnlyCar?.productCarousel
          ?.slice(0, 6)
          .map((item, idx) => {
            const productUrl = formatProductPageUrl(
              getLegacyUrl(vehicleListUrlData.edges, item?.capId),
              item?.capId,
            );
            return item ? (
              <VehicleCard
                data={item}
                key={item?.capId || idx}
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
        >
          <div className="button--inner">View Latest Electric Car Deals</div>
        </RouterLink>
      </div>
    </section>
  );

  interface ISection {
    body: string;
    title: string;
    titleTag: string;
    image?: {
      file: {
        url: string;
      };
    };
    video?: string;
    index: number;
  }

  const Section = ({
    title,
    titleTag,
    body,
    image,
    video,
    index,
  }: ISection) => (
    <section className={`row:${getFeaturedClassPartial(featuresArray[index])}`}>
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

      <div>
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

  const WhyLeaseWithVanarama = () => (
    <section className="row:features-4col">
      <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
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
      </LazyLoadComponent>
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
      <HeadingSection />
      <CardsSection />
      {featuresArray.map(({ title, body, image, titleTag, video }, index) => (
        <Section
          index={index}
          body={body}
          title={title}
          titleTag={titleTag}
          image={image}
          key={title}
          video={video}
        />
      ))}
      <WhyLeaseWithVanarama />
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

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const { data, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: 'electric-leasing/cars',
        ...(context?.preview && { isPreview: context?.preview }),
      },
    });
    if (errors) {
      throw new Error(errors[0].message);
    }
    const {
      productsElectricOnlyCar,
      vehicleListUrlData,
    } = await evOffersRequest(client);

    return {
      revalidate: context?.preview
        ? 1
        : Number(process.env.REVALIDATE_INTERVAL),
      props: {
        data: data || null,
        productsElectricOnlyCar: productsElectricOnlyCar || null,
        vehicleListUrlData: vehicleListUrlData || null,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}

export default ECarsPage;
