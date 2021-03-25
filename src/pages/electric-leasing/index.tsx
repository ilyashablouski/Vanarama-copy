/* eslint-disable @typescript-eslint/camelcase */
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown/with-html';
import SchemaJSON from 'core/atoms/schema-json';
import createApolloClient from '../../apolloClient';
import { getFeaturedClassPartial } from '../../utils/layout';
import {
  GenericPageQuery,
  GenericPageQuery_genericPage_sections_tiles_tiles as TileData,
  GenericPageQuery_genericPage_sections_cards_cards as CardData,
} from '../../../generated/GenericPageQuery';
// import { ProductCardData_productCarousel as ProdCardData } from '../../../generated/ProductCardData';

import { GENERIC_PAGE } from '../../gql/genericPage';
import Hero, {
  // HeroTitle,
  // HeroHeading,
  HeroPrompt,
} from '../../components/Hero';
// import ProductCarousel from '../../components/ProductCarousel/ProductCarousel';
import getTitleTag from '../../utils/getTitleTag';
// import useLeaseType from '../../hooks/useLeaseType';
import { getSectionsData, getCardsName } from '../../utils/getSectionsData';
import TileLink from '../../components/TileLink/TileLink';
import Head from '../../components/Head/Head';
import Skeleton from '../../components/Skeleton';

const ArrowForwardSharp = dynamic(
  () => import('core/assets/icons/ArrowForwardSharp'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Image = dynamic(() => import('core/atoms/image'), {
  loading: () => <Skeleton count={4} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Tile = dynamic(() => import('core/molecules/tile'), {
  loading: () => <Skeleton count={3} />,
});
const Media = dynamic(() => import('core/atoms/media'), {
  loading: () => <Skeleton count={3} />,
});
const Card = dynamic(() => import('core/molecules/cards'), {
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

  return (
    <>
      <Hero>
        {/* <HeroHeading
          text={
            getSectionsData(['hero', 'title'], data?.genericPage.sections) || ''
          }
          titleTag={
            getTitleTag(
              getSectionsData(
                ['hero', 'titleTag'],
                data?.genericPage.sections,
              ) || 'p',
            ) as keyof JSX.IntrinsicElements
          }
        />
        <br />
        <HeroTitle
          text={
            getSectionsData(['hero', 'body'], data?.genericPage.sections) || ''
          }
        />
        <br /> */}
        <div className="nlol">
          <p>Find Your</p>
          <h2>New Lease Of Life</h2>
          <p>With Vanarama</p>
        </div>
        <div>
          <Image
            loadImage
            optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            optimisationOptions={optimisationOptions}
            className="hero--image"
            plain
            size="expand"
            src={
              getSectionsData(
                ['hero', 'image', 'file', 'url'],
                data?.genericPage.sections,
              ) ||
              'https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/connect.png'
            }
          />
        </div>
        {data?.genericPage.sections?.hero?.heroLabel?.[0]?.visible && (
          <HeroPrompt
            label={
              data?.genericPage.sections?.hero?.heroLabel?.[0]?.link?.text || ''
            }
            url={
              data?.genericPage.sections?.hero?.heroLabel?.[0]?.link?.url || ''
            }
            text={data?.genericPage.sections?.hero?.heroLabel?.[0]?.text || ''}
            btnVisible={
              data?.genericPage.sections?.hero?.heroLabel?.[0]?.link?.visible
            }
          />
        )}
      </Hero>
      <div className="row:lead-text">
        <Heading
          size="xlarge"
          color="black"
          tag={
            getTitleTag(
              getSectionsData(
                ['leadText', 'titleTag'],
                data?.genericPage.sections,
              ) || null,
            ) as keyof JSX.IntrinsicElements
          }
        >
          {getSectionsData(['leadText', 'heading'], data?.genericPage.sections)}
        </Heading>
        <Text tag="span" size="lead" color="darker">
          {getSectionsData(
            ['leadText', 'description'],
            data?.genericPage.sections,
          )}
        </Text>
      </div>

      <div className="row:bg-lighter ">
        <div className="row:cards-4col">
          <Heading
            size="large"
            color="black"
            tag={
              getTitleTag(
                getSectionsData(
                  ['cards', 'titleTag'],
                  data?.genericPage.sections,
                ) || null,
              ) as keyof JSX.IntrinsicElements
            }
          >
            {getCardsName(data?.genericPage)}
          </Heading>
          <Text
            className="-justify-content-row -mb-400"
            tag="p"
            size="regular"
            color="darker"
          >
            {getSectionsData(
              ['cards', 'description'],
              data?.genericPage.sections,
            )}
          </Text>
          <LazyLoadComponent
            visibleByDefault={
              typeof window === 'undefined' ||
              navigator?.vendor === 'Apple Computer, Inc.'
            }
          >
            {(getSectionsData(
              ['cards', 'cards'],
              data?.genericPage.sections,
            ) as CardData[])?.map((card: CardData, idx) => (
              <Card
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                key={card.title || idx}
                title={{
                  title: '',
                  withBtn: true,
                  link: (
                    <RouterLink
                      link={{
                        href: card.link?.legacyUrl || card.link?.url || '#',
                        label: card.title || '',
                      }}
                      className="heading"
                      classNames={{ size: 'lead', color: 'black' }}
                    >
                      <Heading
                        size="regular"
                        color="black"
                        tag={
                          getTitleTag(
                            card.titleTag || null,
                          ) as keyof JSX.IntrinsicElements
                        }
                      >
                        {card.title}
                      </Heading>
                    </RouterLink>
                  ),
                }}
                imageSrc={card.image?.file?.url}
                description={card.body || ''}
              />
            ))}
          </LazyLoadComponent>
        </div>
      </div>

      <section
        className={`row:${getFeaturedClassPartial(
          getSectionsData(['featured1'], data?.genericPage.sections),
        )}`}
      >
        {data?.genericPage?.sections?.featured1?.video ? (
          <LazyLoadComponent
            visibleByDefault={
              typeof window === 'undefined' ||
              navigator?.vendor === 'Apple Computer, Inc.'
            }
          >
            <Media
              src={
                getSectionsData(
                  ['featured1', 'video'],
                  data?.genericPage.sections,
                ) || ''
              }
              width="100%"
              height="360px"
            />
          </LazyLoadComponent>
        ) : (
          <Image
            optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            src={
              getSectionsData(
                ['featured1', 'image', 'file', 'url'],
                data?.genericPage.sections,
              ) ||
              'https://source.unsplash.com/collection/2102317/1000x650?sig=40349'
            }
          />
        )}

        <div className="" style={{ padding: '1rem' }}>
          <Heading
            size="large"
            color="black"
            tag={
              getTitleTag(
                getSectionsData(
                  ['featured1', 'titleTag'],
                  data?.genericPage.sections,
                ) || 'p',
              ) as keyof JSX.IntrinsicElements
            }
          >
            {getSectionsData(
              ['featured1', 'title'],
              data?.genericPage.sections,
            )}
          </Heading>
          <div className="markdown">
            <ReactMarkdown
              allowDangerousHtml
              source={
                getSectionsData(
                  ['featured1', 'body'],
                  data?.genericPage.sections,
                ) || ''
              }
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
        className={`row:${getFeaturedClassPartial(
          getSectionsData(['featured2'], data?.genericPage.sections),
        )}`}
      >
        {data?.genericPage?.sections?.featured2?.video ? (
          <Media
            src={
              getSectionsData(
                ['featured2', 'video'],
                data?.genericPage.sections,
              ) || ''
            }
            width="100%"
            height="360px"
          />
        ) : (
          <div>
            <Image
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              src={
                getSectionsData(
                  ['featured2', 'image', 'file', 'url'],
                  data?.genericPage.sections,
                ) ||
                'https://source.unsplash.com/collection/2102317/1000x650?sig=40349'
              }
            />
          </div>
        )}
        <div className="-inset -middle -col-400">
          <Heading
            size="large"
            color="black"
            tag={
              getTitleTag(
                getSectionsData(
                  ['featured2', 'titleTag'],
                  data?.genericPage.sections,
                ) || 'p',
              ) as keyof JSX.IntrinsicElements
            }
          >
            {getSectionsData(
              ['featured2', 'title'],
              data?.genericPage.sections,
            )}
          </Heading>
          <div className="markdown">
            <ReactMarkdown
              allowDangerousHtml
              source={
                getSectionsData(
                  ['featured2', 'body'],
                  data?.genericPage.sections,
                ) || ''
              }
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
        className={`row:${getFeaturedClassPartial(
          getSectionsData(['featured3'], data?.genericPage.sections),
        )}`}
      >
        {data?.genericPage?.sections?.featured3?.video ? (
          <Media
            src={
              getSectionsData(
                ['featured3', 'video'],
                data?.genericPage.sections,
              ) || ''
            }
            width="100%"
            height="360px"
          />
        ) : (
          <div>
            <Image
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              src={
                getSectionsData(
                  ['featured3', 'image', 'file', 'url'],
                  data?.genericPage.sections,
                ) ||
                'https://source.unsplash.com/collection/2102317/1000x650?sig=40349'
              }
            />
          </div>
        )}
        <div className="-inset -middle -col-400">
          <Heading
            size="large"
            color="black"
            tag={
              getTitleTag(
                getSectionsData(
                  ['featured3', 'titleTag'],
                  data?.genericPage.sections,
                ) || 'p',
              ) as keyof JSX.IntrinsicElements
            }
          >
            {getSectionsData(
              ['featured3', 'title'],
              data?.genericPage.sections,
            )}
          </Heading>
          <div className="markdown">
            <ReactMarkdown
              allowDangerousHtml
              source={
                getSectionsData(
                  ['featured3', 'body'],
                  data?.genericPage.sections,
                ) || ''
              }
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

      <hr className="fullWidth" />
      <section className="row:text">
        <Heading
          size="large"
          color="black"
          tag={
            getTitleTag(
              getSectionsData(
                ['rowText', 'titleTag'],
                data?.genericPage.sections,
              ) || 'p',
            ) as keyof JSX.IntrinsicElements
          }
        >
          {getSectionsData(['rowText', 'heading'], data?.genericPage.sections)}
        </Heading>
        <div>
          <Text tag="p" size="regular" color="darker">
            {getSectionsData(['rowText', 'body'], data?.genericPage.sections)}
          </Text>
          <Heading size="regular" color="black">
            {getSectionsData(
              ['rowText', 'subHeading'],
              data?.genericPage.sections,
            )}
          </Heading>
          <RouterLink
            className="-pt-200"
            classNames={{ color: 'teal', size: 'regular' }}
            link={{
              label: 'View Leasing Guides',
              href: '/van-leasing-explained.html',
            }}
          >
            View Leasing Guides <ArrowForwardSharp />
          </RouterLink>
        </div>
      </section>

      <hr className="fullWidth" />

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
                getSectionsData(
                  ['tiles', 'titleTag'],
                  data?.genericPage.sections,
                ) || 'p',
              ) as keyof JSX.IntrinsicElements
            }
          >
            {getSectionsData(
              ['tiles', 'tilesTitle'],
              data?.genericPage.sections,
            )}
          </Heading>
          {(getSectionsData(
            ['tiles', 'tiles'],
            data?.genericPage.sections,
          ) as TileData[])?.map((tile: TileData, idx) => (
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

export async function getStaticProps() {
  const client = createApolloClient({});

  try {
    const { data } = await client.query<GenericPageQuery>({
      query: GENERIC_PAGE,
    });

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
