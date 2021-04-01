import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown/with-html';
import Media from 'core/atoms/media';
import Router from 'next/router';
import getTitleTag from 'utils/getTitleTag';
import createApolloClient from '../../apolloClient';
import { GENERIC_PAGE } from '../../gql/genericPage';
import {
  GenericPageQuery,
  GenericPageQuery_genericPage_sections_tiles_tiles as TileData,
} from '../../../generated/GenericPageQuery';
import {
  HeroEv as Hero,
  HeroPrompt,
} from '../../components/Hero';
import Skeleton from '../../components/Skeleton';
import { getFeaturedClassPartial } from 'utils/layout';
import { getFeaturedSectionsAsArray } from 'utils/sections';
import { useEffect, useState } from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import TileLink from '../../components/TileLink/TileLink';
import League from 'core/organisms/league';
import Trustpilot from 'core/molecules/trustpilot';
import Head from 'next/head';
import SchemaJSON from 'core/atoms/schema-json';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Image = dynamic(() => import('core/atoms/image'), {
  loading: () => <Skeleton count={4} />,
});
const RouterLink = dynamic(() =>
  import('../../components/RouterLink/RouterLink'),
);
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Tile = dynamic(() => import('core/molecules/tile'), {
  loading: () => <Skeleton count={3} />,
});

interface IProps {
  data: GenericPageQuery;
}

const ECarsPage: NextPage<IProps> = ({ data }) => {
  const [featuresArray, setFeaturesArray] = useState([])
  const optimisationOptions = {
    height: 620,
    width: 620,
    quality: 59,
  };
  const { sections } = data?.genericPage;
  useEffect(() => {
    const features: any = getFeaturedSectionsAsArray(sections)
    setFeaturesArray(features)
  }, [sections])

  const HeroSection = () => (
    <Hero >
      <div className="hero--left">
        <div className="nlol" style={{ left: 'auto' }}>
          <p>{sections?.hero?.title}</p>
          <h2>{sections?.hero?.body}</h2>
        </div>
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
    </Hero>
  )

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
  )

  interface ISection {
    body: string;
    title: string;
    titleTag: string;
    image?: {
      file: {
        url: string;
      }
    };
    video?: string;
  }

  const Section = ({ title, titleTag, body, image, video }: ISection) => (
    <section
      className={`row:${getFeaturedClassPartial(sections?.featured1)}`}
    >
      {video ? (
        <Media
          src={video || ''}
          width="100%"
          height="360px"
        />
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
          tag={
            getTitleTag(
              titleTag || 'p',
            ) as keyof JSX.IntrinsicElements
          }
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
  )

  const WhyLeaseWithVanarama = () => (
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
  )

  const NationalLeagueBanner = () => (
    <LazyLoadComponent
      visibleByDefault={
        typeof window === 'undefined' ||
        navigator?.vendor === 'Apple Computer, Inc.'
      }
    >
      <section className="row:league">
        <League
          clickReadMore={() => Router.push('/fan-hub.html')}
          altText="vanarama national league"
          link="/fan-hub.html"
        />
      </section>
    </LazyLoadComponent>
  )

  const FeaturedOnBanner = () => (
    <LazyLoadComponent
      visibleByDefault={
        typeof window === 'undefined' ||
        navigator?.vendor === 'Apple Computer, Inc.'
      }
    >
      <section className="row:featured-logos">
        <Heading tag="span" size="small" color="darker">
          AS FEATURED ON
          </Heading>
        <div>
          {[
            {
              label: 'bbc',
              href: `${process.env.HOST_DOMAIN}/Assets/images-optimised/home/featured/bbc.png`,
            },
            {
              label: 'btsport',
              href: `${process.env.HOST_DOMAIN}/Assets/images-optimised/home/featured/btsport.png`,
            },
            {
              label: 'dailymail',
              href: `${process.env.HOST_DOMAIN}/Assets/images-optimised/home/featured/dailymail.png`,
            },
            {
              label: 'dailymirror',
              href: `${process.env.HOST_DOMAIN}/Assets/images-optimised/home/featured/dailymirror.png`,
            },
            {
              label: 'itv',
              href: `${process.env.HOST_DOMAIN}/Assets/images-optimised/home/featured/itv.png`,
            },
            {
              label: 'metro',
              href: `${process.env.HOST_DOMAIN}/Assets/images-optimised/home/featured/metro.png`,
            },
            {
              label: 'thesun',
              href: `${process.env.HOST_DOMAIN}/Assets/images-optimised/home/featured/thesun.png`,
            },
            {
              label: 'sky',
              href: `${process.env.HOST_DOMAIN}/Assets/images-optimised/home/featured/sky.png`,
            },
            {
              label: 'thetelegraph',
              href: `${process.env.HOST_DOMAIN}/Assets/images-optimised/home/featured/thetelegraph.png`,
            },
          ].map(({ href, label }) => (
            <Image
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              key={label}
              src={href}
              alt={label}
              size="expand"
              plain
            />
          ))}
        </div>
      </section>
    </LazyLoadComponent>
  )

  return (
    <>
      <HeroSection />
      <HeadingSection />
      {featuresArray.map(({ title, body, image, titleTag, video }, i) => (
        <Section body={body} title={title} titleTag={titleTag} image={image} key={i} video={video} />
      ))}
      <WhyLeaseWithVanarama />
      <NationalLeagueBanner />
      <FeaturedOnBanner />
    </>
  )
}

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const { data, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: 'electric-leasing/cars',
      },
    });
    if (errors) {
      throw new Error(errors[0].message);
    }
    return {
      revalidate: Number(process.env.REVALIDATE_INTERVAL),
      props: {
        data,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}

export default ECarsPage