import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import Router from 'next/router';
import { useQuery } from '@apollo/client';
import ReactMarkdown from 'react-markdown/with-html';
import SchemaJSON from '@vanarama/uibook/lib/components/atoms/schema-json';
import { useContext, useEffect, useState } from 'react';
import { getSectionsData } from '../../utils/getSectionsData';
import { getFeaturedClassPartial } from '../../utils/layout';
import { isCompared } from '../../utils/comparatorHelpers';
import { CompareContext } from '../../utils/comparatorTool';
import {
  HubCarPageData,
  HubCarPageData_hubCarPage_sections_tiles_tiles as TileData,
  HubCarPageData_hubCarPage_sections_steps_steps as StepData,
} from '../../../generated/HubCarPageData';
import { ProductCardData } from '../../../generated/ProductCardData';
import { HUB_CAR_CONTENT } from '../../gql/hub/hubCarPage';
import { PRODUCT_CARD_CONTENT } from '../../gql/productCard';
import createApolloClient from '../../apolloClient';
import Hero, { HeroTitle, HeroHeading } from '../../components/Hero';
import RouterLink from '../../components/RouterLink/RouterLink';
import truncateString from '../../utils/truncateString';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { getLegacyUrl, formatProductPageUrl } from '../../utils/url';
import getTitleTag from '../../utils/getTitleTag';
import useLeaseType from '../../hooks/useLeaseType';
import {
  useVehicleListUrl,
  useVehicleListUrlFetchMore,
} from '../../gql/vehicleList';
import TileLink from '../../components/TileLink/TileLink';
import { features } from '../../components/ProductCarousel/helpers';
import Head from '../../components/Head/Head';
import Skeleton from '../../components/Skeleton';

const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Image = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/image'),
  {
    loading: () => <Skeleton count={4} />,
  },
);
const Text = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/text'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Tile = dynamic(
  () => import('@vanarama/uibook/lib/components/molecules/tile'),
  {
    loading: () => <Skeleton count={3} />,
  },
);
const Step = dynamic(
  () => import('@vanarama/uibook/lib/components/molecules/step'),
  {
    loading: () => <Skeleton count={3} />,
  },
);
const Price = dynamic(() =>
  import('@vanarama/uibook/lib/components/atoms/price'),
);
const ProductCard = dynamic(() =>
  import(
    '@vanarama/uibook/lib/components/molecules/cards/ProductCard/ProductCard'
  ),
);
const Media = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/media'),
  {
    loading: () => <Skeleton count={3} />,
  },
);
const Choiceboxes = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/choiceboxes'),
  {
    loading: () => <Skeleton count={3} />,
  },
);
const TrustPilot = dynamic(
  () => import('@vanarama/uibook/lib/components/molecules/trustpilot'),
  {
    ssr: false,
  },
);
const League = dynamic(
  () => import('@vanarama/uibook/lib/components/organisms/league'),
  {
    loading: () => <Skeleton count={2} />,
  },
);
const Icon = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/icon'),
  {
    ssr: false,
  },
);
const Flame = dynamic(() => import('@vanarama/uibook/lib/assets/icons/Flame'), {
  ssr: false,
});

type Props = {
  data: HubCarPageData;
};

export const CarsPage: NextPage<Props> = ({ data }) => {
  // pass in true for car leaseType
  const { cachedLeaseType, setCachedLeaseType } = useLeaseType(true);
  const [isPersonal, setIsPersonal] = useState(cachedLeaseType === 'Personal');

  const { data: products, error: productsError } = useQuery<ProductCardData>(
    PRODUCT_CARD_CONTENT,
    {
      variables: { type: VehicleTypeEnum.CAR, size: 9, offer: true },
    },
  );

  const productsCapIds = products?.productCarousel
    ?.map(el => el?.capId || '')
    .filter(Boolean) || [''];
  const vehicleListUrlQuery = useVehicleListUrl(productsCapIds);

  useVehicleListUrlFetchMore(vehicleListUrlQuery, productsCapIds);

  const { compareVehicles, compareChange } = useContext(CompareContext);

  useEffect(() => {
    setCachedLeaseType(isPersonal ? 'Personal' : 'Business');
  }, [isPersonal, setCachedLeaseType]);

  if (productsError) {
    const err = productsError;
    return <p>Error: {err?.message}</p>;
  }

  const leaseTypes = [
    { label: 'Personal', value: 'Personal', active: isPersonal },
    { label: 'Business', value: 'Business', active: !isPersonal },
  ];

  const optimisationOptions = {
    height: 620,
    width: 620,
    quality: 59,
  };

  return (
    <>
      <Hero>
        <HeroHeading
          text={data?.hubCarPage.sections?.hero?.title || ''}
          titleTag={
            getTitleTag(
              data?.hubCarPage.sections?.hero?.titleTag || 'p',
            ) as keyof JSX.IntrinsicElements
          }
        />
        <br />
        <HeroTitle text={data?.hubCarPage.sections?.hero?.body || ''} />
        <br />
        <Image
          loadImage
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
          optimisationOptions={optimisationOptions}
          className="hero--image"
          plain
          size="expand"
          src={
            data?.hubCarPage.sections?.hero?.image?.file?.url ||
            'https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/Audi-Hero-Image-removebg-preview.png'
          }
        />
      </Hero>

      <section className="row:lead-text">
        <Heading
          size="xlarge"
          color="black"
          tag={
            getTitleTag(
              data?.hubCarPage.sections?.leadText?.titleTag || null,
            ) as keyof JSX.IntrinsicElements
          }
        >
          {data?.hubCarPage.sections?.leadText?.heading}
        </Heading>
        <Text tag="span" size="lead" color="darker">
          {data?.hubCarPage.sections?.leadText?.description}
        </Text>
      </section>

      <section className="row:eligibility-checker-cta">
        <LazyLoadComponent>
          <div>
            <Image
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              size="expand"
              plain
              src="https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/Eligibility-Checker-Arc+(2).jpg"
            />
            <Heading size="large" color="black">
              Check Your Eligibility For A New Car Lease
            </Heading>
            <RouterLink
              className="button"
              classNames={{ color: 'teal', solid: true, size: 'regular' }}
              link={{
                label: 'Check My Eligibility',
                href: '/eligibility-checker.html',
              }}
              withoutDefaultClassName
            >
              <div className="button--inner">Check My Eligibility</div>
            </RouterLink>
            <Text tag="p" color="dark" size="xsmall">
              This will not affect your credit score.
            </Text>
          </div>
          <div>
            <Image
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              src="https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/Help-Me-Choose2.jpg"
              plain
              size="expand"
            />
            <Heading size="large" color="black">
              Not Sure Which Vehicle Is Best For You?
            </Heading>
            {/* <RouterLink
            className="button"
            classNames={{ color: 'teal', solid: true, size: 'regular' }}
            link={{
              label: 'Help Me Choose',
              href: '/help-me-choose',
            }}
            withoutDefaultClassName
          >
            <div className="button--inner">Help Me Choose</div>
          </RouterLink> */}
            <Text color="orange" size="lead">
              Coming Soon
            </Text>
          </div>
        </LazyLoadComponent>
      </section>

      <div className="row:bg-lighter">
        <section className="row:cards-3col">
          <Choiceboxes
            className="-cols-2"
            choices={leaseTypes}
            onSubmit={value => {
              setIsPersonal(value.label === 'Personal');
            }}
          />
          {products?.productCarousel?.map((item, idx) => {
            const productUrl = formatProductPageUrl(
              getLegacyUrl(
                vehicleListUrlQuery.data?.vehicleList?.edges,
                item?.capId,
              ),
              item?.capId,
            );
            return (
              <LazyLoadComponent>
                <ProductCard
                  optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                  key={item?.capId || idx}
                  header={{
                    accentIcon: <Icon icon={<Flame />} color="white" />,
                    accentText: 'Hot Deal',
                    text: 'In Stock - 14-21 Days Delivery',
                  }}
                  features={features(
                    item?.keyInformation || [],
                    item?.capId || '',
                    Icon,
                  )}
                  imageSrc={item?.imageUrl || '/vehiclePlaceholder.jpg'}
                  onCompare={() =>
                    compareChange(
                      item ? { ...item, pageUrl: productUrl } : null,
                    )
                  }
                  compared={isCompared(compareVehicles, item)}
                  onWishlist={() => true}
                  title={{
                    title: '',
                    link: (
                      <RouterLink
                        link={{
                          href: productUrl.url,
                          label: '',
                        }}
                        onClick={() =>
                          sessionStorage.setItem('capId', item?.capId || '')
                        }
                        className="heading"
                        classNames={{ size: 'large', color: 'black' }}
                      >
                        <Heading tag="span" size="large" className="-pb-100">
                          {truncateString(
                            `${item?.manufacturerName} ${item?.rangeName}`,
                          )}
                        </Heading>
                        <Heading tag="span" size="small" color="dark">
                          {item?.derivativeName || ''}
                        </Heading>
                      </RouterLink>
                    ),
                    score: item?.averageRating || 5,
                  }}
                >
                  <div className="-flex-h">
                    <Price
                      price={
                        isPersonal ? item?.personalRate : item?.businessRate
                      }
                      size="large"
                      separator="."
                      priceDescription={`Per Month ${
                        isPersonal ? 'Inc.VAT' : 'Exc.VAT'
                      }`}
                    />
                    <RouterLink
                      link={{
                        href: productUrl.url,
                        label: 'View Offer',
                      }}
                      onClick={() =>
                        sessionStorage.setItem('capId', item?.capId || '')
                      }
                      classNames={{
                        color: 'teal',
                        solid: true,
                        size: 'regular',
                      }}
                      className="button"
                      dataTestId="view-offer"
                    >
                      <div className="button--inner">View Offer</div>
                    </RouterLink>
                  </div>
                </ProductCard>
              </LazyLoadComponent>
            );
          })}

          <RouterLink
            link={{
              href: '/car-leasing-special-offers.html',
              label: 'View All Cars',
            }}
            classNames={{ color: 'teal', size: 'large' }}
            className="button -solid"
            dataTestId="view-all-cars"
          >
            <div className="button--inner">View All Cars</div>
          </RouterLink>
        </section>
      </div>

      <section className="row:steps-4col">
        <Heading className="-a-center -mb-400" size="large" color="black">
          {data?.hubCarPage.sections?.steps?.heading}
        </Heading>
        {data?.hubCarPage.sections?.steps?.steps?.map((step: StepData, idx) => (
          <Step
            className="-mh-auto"
            key={step.title || idx}
            heading={step.title || ''}
            step={idx + 1}
            text={step.body || ''}
          />
        ))}
      </section>

      <section
        className={`row:${getFeaturedClassPartial(
          data?.hubCarPage.sections?.featured1,
        )}`}
      >
        {data?.hubCarPage?.sections?.featured1?.video ? (
          <Media
            src={
              getSectionsData(
                ['featured1', 'video'],
                data?.hubCarPage.sections,
              ) || ''
            }
            width="100%"
            height="360px"
          />
        ) : (
          <Image
            optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            src={
              getSectionsData(
                ['featured1', 'image', 'file', 'url'],
                data?.hubCarPage.sections,
              ) ||
              'https://source.unsplash.com/collection/2102317/1000x650?sig=40349'
            }
          />
        )}
        <div style={{ padding: '1rem' }}>
          <Heading
            size="large"
            color="black"
            tag={
              getTitleTag(
                data?.hubCarPage.sections?.featured1?.titleTag || 'p',
              ) as keyof JSX.IntrinsicElements
            }
          >
            {data?.hubCarPage.sections?.featured1?.title}
          </Heading>
          <div className="markdown">
            <ReactMarkdown
              allowDangerousHtml
              source={data?.hubCarPage.sections?.featured1?.body || ''}
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
          data?.hubCarPage.sections?.featured2,
        )}`}
      >
        {data?.hubCarPage?.sections?.featured2?.video ? (
          <Media
            src={
              getSectionsData(
                ['featured2', 'video'],
                data?.hubCarPage.sections,
              ) || ''
            }
            width="100%"
            height="360px"
          />
        ) : (
          <Image
            optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            src={
              getSectionsData(
                ['featured2', 'image', 'file', 'url'],
                data?.hubCarPage.sections,
              ) ||
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
                data?.hubCarPage.sections?.featured2?.titleTag || 'p',
              ) as keyof JSX.IntrinsicElements
            }
          >
            {data?.hubCarPage.sections?.featured2?.title}
          </Heading>
          <div className="markdown">
            <ReactMarkdown
              allowDangerousHtml
              source={data?.hubCarPage.sections?.featured2?.body || ''}
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

      <section className="row:features-4col">
        <LazyLoadComponent>
          <Heading
            size="large"
            color="black"
            tag={
              getTitleTag(
                data?.hubCarPage.sections?.tiles?.titleTag || 'p',
              ) as keyof JSX.IntrinsicElements
            }
          >
            {data && data?.hubCarPage.sections?.tiles?.tilesTitle}
          </Heading>
          {data?.hubCarPage.sections?.tiles?.tiles?.map(
            (tile: TileData, idx) => (
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
            ),
          )}
        </LazyLoadComponent>
      </section>

      <section className="row:league">
        <LazyLoadComponent>
          <League
            clickReadMore={() => Router.push('/fan-hub')}
            altText="vanarama national league"
          />
        </LazyLoadComponent>
      </section>

      <section className="row:featured-logos">
        <LazyLoadComponent>
          <Heading tag="span" size="small" color="darker">
            AS FEATURED ON
          </Heading>
          <div>
            {[
              {
                label: 'bbc',
                href:
                  'https://www.vanarama.com/Assets/images-optimised/home/featured/bbc.png',
              },
              {
                label: 'btsport',
                href:
                  'https://www.vanarama.com/Assets/images-optimised/home/featured/btsport.png',
              },
              {
                label: 'dailymail',
                href:
                  'https://www.vanarama.com/Assets/images-optimised/home/featured/dailymail.png',
              },
              {
                label: 'dailymirror',
                href:
                  'https://www.vanarama.com/Assets/images-optimised/home/featured/dailymirror.png',
              },
              {
                label: 'itv',
                href:
                  'https://www.vanarama.com/Assets/images-optimised/home/featured/itv.png',
              },
              {
                label: 'metro',
                href:
                  'https://www.vanarama.com/Assets/images-optimised/home/featured/metro.png',
              },
              {
                label: 'thesun',
                href:
                  'https://www.vanarama.com/Assets/images-optimised/home/featured/thesun.png',
              },
              {
                label: 'sky',
                href:
                  'https://www.vanarama.com/Assets/images-optimised/home/featured/sky.png',
              },
              {
                label: 'thetelegraph',
                href:
                  'https://www.vanarama.com/Assets/images-optimised/home/featured/thetelegraph.png',
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
        </LazyLoadComponent>
      </section>

      <section className="row:trustpilot">
        <LazyLoadComponent>
          <TrustPilot src="https://widget.trustpilot.com/trustboxes/53aa8912dec7e10d38f59f36/index.html?templateId=53aa8912dec7e10d38f59f36&amp;businessunitId=594a982f0000ff0005a50d80#locale=en-GB&amp;styleHeight=130px&amp;styleWidth=100%25&amp;theme=light&amp;stars=4%2C5&amp;schemaType=Organization" />
        </LazyLoadComponent>
      </section>
      {data?.hubCarPage.metaData && (
        <>
          <Head
            metaData={data?.hubCarPage.metaData}
            featuredImage={data?.hubCarPage.featuredImage}
          />
          <SchemaJSON json={JSON.stringify(data?.hubCarPage.metaData.schema)} />
        </>
      )}
    </>
  );
};

export async function getServerSideProps() {
  const client = createApolloClient({});

  try {
    const { data } = await client.query<HubCarPageData>({
      query: HUB_CAR_CONTENT,
    });

    return {
      props: {
        data,
      },
    };
  } catch {
    return false;
  }
}

export default CarsPage;
