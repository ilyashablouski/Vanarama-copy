import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { useQuery } from '@apollo/client';
import { useState, useContext } from 'react';
import { getDataFromTree } from '@apollo/react-ssr';
import ReactMarkdown from 'react-markdown/with-html';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import SchemaJSON from '@vanarama/uibook/lib/components/atoms/schema-json';
import { getSectionsData } from '../../utils/getSectionsData';
import { getFeaturedClassPartial } from '../../utils/layout';
import { isCompared } from '../../utils/comparatorHelpers';
import {
  HubPickupPageData,
  HubPickupPageData_hubPickupPage_sections_tiles1_tiles as AccessoryData,
  HubPickupPageData_hubPickupPage_sections_tiles2_tiles as TileData,
  HubPickupPageData_hubPickupPage_sections_steps_steps as StepData,
} from '../../../generated/HubPickupPageData';
import {
  ProductCardData,
  ProductCardData_productCarousel as ProdData,
} from '../../../generated/ProductCardData';
import { HUB_PICKUP_CONTENT } from '../../gql/hub/hubPickupPage';
import { PRODUCT_CARD_CONTENT } from '../../gql/productCard';
import withApollo from '../../hocs/withApollo';

import DealOfMonth from '../../components/DealOfMonth';
import Hero, { HeroTitle, HeroHeading } from '../../components/Hero';
import RouterLink from '../../components/RouterLink/RouterLink';
import truncateString from '../../utils/truncateString';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { formatProductPageUrl, getLegacyUrl, getNewUrl } from '../../utils/url';
import { CompareContext } from '../../utils/comparatorTool';
import getTitleTag from '../../utils/getTitleTag';
import useLeaseType from '../../hooks/useLeaseType';
import {
  useVehicleListUrl,
  useVehicleListUrlFetchMore,
} from '../../gql/vehicleList';
import TileLink from '../../components/TileLink/TileLink';
import { PickupsSearch } from '../../models/enum/SearchByManufacturer';
import { features } from '../../components/ProductCarousel/helpers';
import Head from '../../components/Head/Head';
import Skeleton from '../../components/Skeleton';

const Icon = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/icon'),
  {
    ssr: false,
  },
);
const Flame = dynamic(() => import('@vanarama/uibook/lib/assets/icons/Flame'), {
  ssr: false,
});
const ArrowForwardSharp = dynamic(
  () => import('@vanarama/uibook/lib/assets/icons/ArrowForwardSharp'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Price = dynamic(() =>
  import('@vanarama/uibook/lib/components/atoms/price'),
);
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
    ssr: false,
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
const Media = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/media'),
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
const ProductCard = dynamic(
  () =>
    import(
      '@vanarama/uibook/lib/components/molecules/cards/ProductCard/ProductCard'
    ),
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

export const PickupsPage: NextPage = () => {
  const [offer, setOffer] = useState<ProdData>();
  const { cachedLeaseType } = useLeaseType(false);
  const { data, loading, error } = useQuery<HubPickupPageData>(
    HUB_PICKUP_CONTENT,
  );

  const { data: products } = useQuery<ProductCardData>(PRODUCT_CARD_CONTENT, {
    variables: {
      type: VehicleTypeEnum.LCV,
      bodyType: 'Pickup',
      size: 9,
      offer: true,
    },
    onCompleted: prods => {
      const topProduct = prods?.productCarousel?.find(
        p => p?.isOnOffer === true,
      );
      if (topProduct) setOffer(topProduct);
    },
  });

  const productsPickupsCapIds = products?.productCarousel
    ?.map(el => el?.capId || '')
    .filter(Boolean) || [''];
  const vehicleListUrlQuery = useVehicleListUrl(productsPickupsCapIds);

  useVehicleListUrlFetchMore(vehicleListUrlQuery, productsPickupsCapIds);

  const { compareVehicles, compareChange } = useContext(CompareContext);

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const dealOfMonthUrl = formatProductPageUrl(
    getLegacyUrl(vehicleListUrlQuery.data?.vehicleList?.edges, offer?.capId),
    offer?.capId,
  );

  const dealOfMonthHref = getNewUrl(
    vehicleListUrlQuery.data?.vehicleList?.edges,
    offer?.capId,
  );

  const isPersonal = cachedLeaseType === 'Personal';

  return (
    <>
      <Hero>
        <HeroHeading
          text={data?.hubPickupPage.sections?.hero?.title || ''}
          titleTag={
            getTitleTag(
              data?.hubPickupPage.sections?.hero?.titleTag || 'p',
            ) as keyof JSX.IntrinsicElements
          }
        />
        <br />
        <HeroTitle text={data?.hubPickupPage.sections?.hero?.body || ''} />
        <br />
        <Image
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
          className="hero--image"
          plain
          size="expand"
          src={
            data?.hubPickupPage.sections?.hero?.image?.file?.url ||
            'https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/hilux-removebg-preview.png'
          }
        />
      </Hero>

      <section className="row:lead-text">
        <Heading
          size="xlarge"
          color="black"
          tag={
            getTitleTag(
              data?.hubPickupPage.sections?.leadText?.titleTag || null,
            ) as keyof JSX.IntrinsicElements
          }
        >
          {data?.hubPickupPage.sections?.leadText?.heading}
        </Heading>
        <Text tag="span" size="lead" color="darker">
          {data?.hubPickupPage.sections?.leadText?.description}
        </Text>
      </section>
      <hr className="-fullwidth" />

      <div className="row:featured-product">
        <DealOfMonth
          isPersonal={isPersonal}
          imageSrc={
            offer?.imageUrl ||
            'https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538983/cars/BMWX70419_4_bvxdvu.jpg'
          }
          vehicle={`${offer?.manufacturerName} ${offer?.rangeName}`}
          specification={offer?.derivativeName || ''}
          price={offer?.businessRate || 0}
          rating={offer?.averageRating || 3}
          viewOfferClick={() => {
            sessionStorage.setItem('capId', offer?.capId || '');
          }}
          link={{ href: dealOfMonthHref, url: dealOfMonthUrl.url }}
        />
      </div>

      <div className="row:bg-lighter">
        <section className="row:cards-3col">
          {products?.productCarousel?.map((item, idx) => {
            const productUrl = formatProductPageUrl(
              getLegacyUrl(
                vehicleListUrlQuery.data?.vehicleList?.edges,
                item?.capId,
              ),
              item?.capId,
            );
            return (
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
                onCompare={() => {
                  compareChange(
                    item
                      ? { ...item, bodyStyle: 'Pickup', pageUrl: productUrl }
                      : null,
                  );
                }}
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
                    price={isPersonal ? item?.personalRate : item?.businessRate}
                    size="large"
                    separator="."
                    priceDescription={`Per Month ${
                      isPersonal ? 'Inc' : 'Exc'
                    }.VAT`}
                  />
                  <RouterLink
                    link={{
                      href: productUrl.url,
                      label: 'View Offer',
                    }}
                    onClick={() =>
                      sessionStorage.setItem('capId', item?.capId || '')
                    }
                    classNames={{ color: 'teal', solid: true, size: 'regular' }}
                    className="button"
                  >
                    <div className="button--inner">View Offer</div>
                  </RouterLink>
                </div>
              </ProductCard>
            );
          })}

          <RouterLink
            link={{
              href: '/pickup-special-offers.html',
              label: 'View All Pickups',
            }}
            classNames={{ color: 'teal', size: 'large' }}
            className="button -solid"
            dataTestId="view-all-pickups"
          >
            <div className="button--inner">View All Pickups</div>
          </RouterLink>
        </section>
      </div>

      <section className="row:steps-4col">
        <Heading
          className="-a-center -mb-400"
          size="large"
          color="black"
          tag={
            getTitleTag(
              data?.hubPickupPage.sections?.steps?.titleTag || null,
            ) as keyof JSX.IntrinsicElements
          }
        >
          {data?.hubPickupPage.sections?.steps?.heading}
        </Heading>
        {data?.hubPickupPage.sections?.steps?.steps?.map(
          (step: StepData, idx: number) => (
            <Step
              className="-mh-auto"
              key={step.title || idx}
              heading={step.title || ''}
              step={idx + 1}
              text={step.body || ''}
            />
          ),
        )}
      </section>

      <section
        className={`row:${getFeaturedClassPartial(
          data?.hubPickupPage.sections?.featured1,
        )}`}
      >
        {data?.hubPickupPage?.sections?.featured1?.video ? (
          <Media
            src={
              getSectionsData(
                ['featured1', 'video'],
                data?.hubPickupPage.sections,
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
                data?.hubPickupPage.sections,
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
                data?.hubPickupPage.sections?.featured1?.titleTag || 'p',
              ) as keyof JSX.IntrinsicElements
            }
          >
            {data?.hubPickupPage.sections?.featured1?.title}
          </Heading>
          <div className="markdown">
            <ReactMarkdown
              allowDangerousHtml
              source={data?.hubPickupPage.sections?.featured1?.body || ''}
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
          data?.hubPickupPage.sections?.featured2,
        )}`}
      >
        {data?.hubPickupPage?.sections?.featured2?.video ? (
          <Media
            src={
              getSectionsData(
                ['featured2', 'video'],
                data?.hubPickupPage.sections,
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
                data?.hubPickupPage.sections,
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
                data?.hubPickupPage.sections?.featured2?.titleTag || 'p',
              ) as keyof JSX.IntrinsicElements
            }
          >
            {data?.hubPickupPage.sections?.featured2?.title}
          </Heading>
          <div className="markdown">
            <ReactMarkdown
              allowDangerousHtml
              source={data?.hubPickupPage.sections?.featured2?.body || ''}
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

      <section className="row:accessories">
        <Heading
          size="large"
          color="black"
          tag={
            getTitleTag(
              data?.hubPickupPage.sections?.tiles1?.titleTag || 'p',
            ) as keyof JSX.IntrinsicElements
          }
        >
          {data?.hubPickupPage.sections?.tiles1?.name}
        </Heading>
        {data?.hubPickupPage.sections?.tiles1?.tiles?.map(
          (acc: AccessoryData, idx: number) => (
            <div key={acc.title || idx}>
              <Image
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                size="expand"
                src={
                  acc.image?.file?.url ||
                  'https://source.unsplash.com/collection/2102317/500x325?sig=403450'
                }
              />
              <Heading size="regular" color="black">
                {acc.title}{' '}
              </Heading>
              <Text tag="div" size="regular" color="darker">
                {acc.body}
              </Text>
            </div>
          ),
        )}
      </section>

      <hr className="fullWidth" />
      <section className="row:text">
        <Heading
          size="large"
          color="black"
          tag={
            getTitleTag(
              data?.hubPickupPage.sections?.rowText?.titleTag || 'p',
            ) as keyof JSX.IntrinsicElements
          }
        >
          {data?.hubPickupPage.sections?.rowText?.heading}
        </Heading>
        <div>
          <Text tag="p" size="regular" color="darker">
            {data?.hubPickupPage.sections?.rowText?.body}
          </Text>
          <Heading size="regular" color="black">
            {data?.hubPickupPage.sections?.rowText?.subHeading}
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

      <section className="row:features-4col">
        <Heading
          size="large"
          color="black"
          tag={
            getTitleTag(
              data?.hubPickupPage.sections?.tiles2?.titleTag || 'p',
            ) as keyof JSX.IntrinsicElements
          }
        >
          {data && data?.hubPickupPage.sections?.tiles2?.tilesTitle}
        </Heading>
        {data?.hubPickupPage.sections?.tiles2?.tiles?.map(
          (tile: TileData, idx: number) => (
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
      </section>

      <section className="row:manufacturer-grid">
        <Heading
          size="large"
          color="black"
          className="-a-center -mb-500"
          tag="h2"
        >
          Search By Manufacturer
        </Heading>
        <div>
          {PickupsSearch.map(man => (
            <RouterLink
              className="button"
              classNames={{ color: 'teal', solid: true, size: 'large' }}
              link={{
                label: man.label,
                href: man.href,
              }}
              withoutDefaultClassName
            >
              <div className="button--inner">{man.label}</div>
            </RouterLink>
          ))}
        </div>
      </section>

      <section className="row:league">
        <League
          clickReadMore={() => Router.push('/fan-hub.html')}
          altText="vanarama national league"
        />
      </section>

      <section className="row:featured-logos">
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
      </section>
      <section className="row:trustpilot">
        <TrustPilot src="https://widget.trustpilot.com/trustboxes/53aa8912dec7e10d38f59f36/index.html?templateId=53aa8912dec7e10d38f59f36&amp;businessunitId=594a982f0000ff0005a50d80#locale=en-GB&amp;styleHeight=130px&amp;styleWidth=100%25&amp;theme=light&amp;stars=4%2C5&amp;schemaType=Organization" />
      </section>
      {data?.hubPickupPage.metaData && (
        <>
          <Head
            metaData={data?.hubPickupPage.metaData}
            featuredImage={data?.hubPickupPage.featuredImage}
          />
          <SchemaJSON
            json={JSON.stringify(data?.hubPickupPage.metaData.schema)}
          />
        </>
      )}
    </>
  );
};

export default withApollo(PickupsPage, { getDataFromTree });
