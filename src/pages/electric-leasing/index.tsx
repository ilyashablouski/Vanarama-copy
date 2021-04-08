import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import dynamic from 'next/dynamic';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown/with-html';
import SchemaJSON from 'core/atoms/schema-json';
import Media from 'core/atoms/media';
import Image from 'core/atoms/image';
import createApolloClient from '../../apolloClient';
import { getFeaturedClassPartial } from '../../utils/layout';
import {
  GenericPageQuery,
  GenericPageQuery_genericPage_sections_tiles_tiles as TileData,
} from '../../../generated/GenericPageQuery';
// import { ProductCardData_productCarousel as ProdCardData } from '../../../generated/ProductCardData';

import { GENERIC_PAGE } from '../../gql/genericPage';
import {
  // HeroTitle,
  // HeroHeading,
  HeroEv as Hero,
  HeroPrompt,
} from '../../components/Hero';
// import ProductCarousel from '../../components/ProductCarousel/ProductCarousel';
import getTitleTag from '../../utils/getTitleTag';
// import useLeaseType from '../../hooks/useLeaseType';
import TileLink from '../../components/TileLink/TileLink';
import Head from '../../components/Head/Head';
import Skeleton from '../../components/Skeleton';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Tile = dynamic(() => import('core/molecules/tile'), {
  loading: () => <Skeleton count={3} />,
});

const TrustPilot = dynamic(() => import('core/molecules/trustpilot'), {
  ssr: false,
});
const League = dynamic(() => import('core/organisms/league'), {
  loading: () => <Skeleton count={2} />,
});
const RouterLink = dynamic(() =>
  import('../../components/RouterLink/RouterLink'),
);

interface IProps {
  data: GenericPageQuery;
}

export const EVHubPage: NextPage<IProps> = ({ data }) => {
  // const { cachedLeaseType } = useLeaseType(false);

  // const isPersonal = cachedLeaseType === 'Personal';

  const optimisationOptions = {
    height: 620,
    width: 620,
    quality: 59,
  };

  const sections = data?.genericPage.sections;

  return (
    <>
      <Hero>
        <div className="hero--left">
          {/* <HeroHeading
          text={
            sections?.hero?.title || ''
          }
          titleTag={
            getTitleTag(
              sections?.hero?.titleTag || 'p',
            ) as keyof JSX.IntrinsicElements
          }
        />
        <br />
        <HeroTitle
          text={
            sections?.hero?.body || ''
          }
        />
        <br /> */}
          <div className="nlol" style={{ left: 'auto' }}>
            <p>Find Your</p>
            <h2>New Lease Of Life</h2>
            <p>With Vanarama</p>
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

      <section
        className={`row:${getFeaturedClassPartial(sections?.featured1)}`}
      >
        {sections?.featured1?.video ? (
          <Media
            src={sections?.featured1.video || ''}
            width="100%"
            height="360px"
          />
        ) : (
          <Image
            optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            src={
              sections?.featured1?.image?.file?.url ||
              'https://source.unsplash.com/collection/2102317/1000x650?sig=40349'
            }
          />
        )}

        <div className="-inset -middle -col-400">
          <Heading
            size="large"
            color="black"
            tag={
              getTitleTag(
                sections?.featured1?.titleTag || 'p',
              ) as keyof JSX.IntrinsicElements
            }
          >
            {sections?.featured1?.title}
          </Heading>
          <div className="markdown">
            <ReactMarkdown
              allowDangerousHtml
              source={sections?.featured1?.body || ''}
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
      <section
        className={`row:${getFeaturedClassPartial(sections?.featured2)}`}
      >
        {sections?.featured2?.video ? (
          <Media
            src={sections?.featured2?.video || ''}
            width="100%"
            height="360px"
          />
        ) : (
          <Image
            optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            src={
              sections?.featured2?.image?.file?.url ||
              'https://source.unsplash.com/collection/2102317/1000x650?sig=40349'
            }
          />
        )}

        <div className="-inset -middle -col-400">
          <Heading
            size="large"
            color="black"
            tag={
              getTitleTag(
                sections?.featured2?.titleTag || 'p',
              ) as keyof JSX.IntrinsicElements
            }
          >
            {sections?.featured2?.title}
          </Heading>
          <div className="markdown">
            <ReactMarkdown
              allowDangerousHtml
              source={sections?.featured2?.body || ''}
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
      <section
        className={`row:${getFeaturedClassPartial(sections?.featured3)}`}
      >
        {sections?.featured3?.video ? (
          <Media
            src={sections?.featured3?.video || ''}
            width="100%"
            height="360px"
          />
        ) : (
          <Image
            optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            src={
              sections?.featured3?.image?.file?.url ||
              'https://source.unsplash.com/collection/2102317/1000x650?sig=40349'
            }
          />
        )}
        <div className="-inset -middle -col-400">
          <Heading
            size="large"
            color="black"
            tag={
              getTitleTag(
                sections?.featured3?.titleTag || 'p',
              ) as keyof JSX.IntrinsicElements
            }
          >
            {sections?.featured3?.title}
          </Heading>
          <div className="markdown">
            <ReactMarkdown
              allowDangerousHtml
              source={sections?.featured3?.body || ''}
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
        <section className="row:league">
          <League
            clickReadMore={() => Router.push('/fan-hub.html')}
            altText="vanarama national league"
            link="/fan-hub.html"
          />
        </section>
      </LazyLoadComponent>

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

      <LazyLoadComponent
        visibleByDefault={
          typeof window === 'undefined' ||
          navigator?.vendor === 'Apple Computer, Inc.'
        }
      >
        <section className="row:trustpilot">
          <TrustPilot />
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

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    // const paths = context?.params?.pages as string[];

    const { data, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: 'electric-leasing',
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

export default EVHubPage;
