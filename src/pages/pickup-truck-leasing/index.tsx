import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import Router from 'next/router';
import { useContext, useMemo } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import SchemaJSON from 'core/atoms/schema-json';
import { getSectionsData } from '../../utils/getSectionsData';
import { getFeaturedClassPartial } from '../../utils/layout';
import { isCompared } from '../../utils/comparatorHelpers';
import {
  HubPickupPageData,
  HubPickupPageData_hubPickupPage_sections_tiles1_tiles as AccessoryData,
  HubPickupPageData_hubPickupPage_sections_tiles2_tiles as TileData,
  HubPickupPageData_hubPickupPage_sections_steps_steps as StepData,
} from '../../../generated/HubPickupPageData';
import { HUB_PICKUP_CONTENT } from '../../gql/hub/hubPickupPage';
import createApolloClient from '../../apolloClient';
import DealOfMonth from '../../components/DealOfMonth';
import Hero, { HeroTitle, HeroHeading } from '../../components/Hero';
import RouterLink from '../../components/RouterLink/RouterLink';
import truncateString from '../../utils/truncateString';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { formatProductPageUrl, getLegacyUrl, getNewUrl } from '../../utils/url';
import { CompareContext } from '../../utils/comparatorTool';
import getTitleTag from '../../utils/getTitleTag';
import useLeaseType from '../../hooks/useLeaseType';
import TileLink from '../../components/TileLink/TileLink';
import { PickupsSearch } from '../../models/enum/SearchByManufacturer';
import { features } from '../../components/ProductCarousel/helpers';
import Head from '../../components/Head/Head';
import Skeleton from '../../components/Skeleton';
import {
  filterList as IFilterList,
  filterListVariables as IFilterListVariables,
} from '../../../generated/filterList';
import { GET_SEARCH_POD_DATA } from '../../containers/SearchPodContainer/gql';
import {
  IPickupsPageOffersData,
  pickupsPageOffersRequest,
} from '../../utils/offers';

const Icon = dynamic(() => import('core/atoms/icon'), {
  ssr: false,
});
const Flame = dynamic(() => import('core/assets/icons/Flame'), {
  ssr: false,
});
const ArrowForwardSharp = dynamic(
  () => import('core/assets/icons/ArrowForwardSharp'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Price = dynamic(() => import('core/atoms/price'));
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
const Step = dynamic(() => import('core/molecules/step'), {
  loading: () => <Skeleton count={3} />,
});
const ProductCard = dynamic(
  () => import('core/molecules/cards/ProductCard/ProductCard'),
  {
    loading: () => <Skeleton count={3} />,
  },
);
const TrustPilot = dynamic(() => import('core/molecules/trustpilot'), {
  ssr: false,
});
const League = dynamic(() => import('core/organisms/league'), {
  loading: () => <Skeleton count={2} />,
});

interface IProps extends IPickupsPageOffersData {
  data: HubPickupPageData;
  searchPodVansData: IFilterList;
}

export const PickupsPage: NextPage<IProps> = ({
  data,
  searchPodVansData,
  productsPickup,
  vehicleListUrlData,
}) => {
  const { cachedLeaseType } = useLeaseType(false);
  const offer = useMemo(
    () => productsPickup?.productCarousel?.find(p => p?.isOnOffer === true),
    [productsPickup],
  );

  const { compareVehicles, compareChange } = useContext(CompareContext);

  const dealOfMonthUrl = useMemo(
    () =>
      formatProductPageUrl(
        getLegacyUrl(vehicleListUrlData.edges, offer?.capId),
        offer?.capId,
      ),
    [vehicleListUrlData, offer],
  );

  const dealOfMonthHref = useMemo(
    () => getNewUrl(vehicleListUrlData.edges, offer?.capId),
    [vehicleListUrlData, offer],
  );

  const isPersonal = cachedLeaseType === 'Personal';

  const optimisationOptions = {
    height: 620,
    width: 620,
    quality: 59,
  };

  return (
    <>
      <Hero searchPodVansData={searchPodVansData}>
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
          loadImage
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
          optimisationOptions={optimisationOptions}
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
          keyInfo={offer?.keyInformation || []}
          capId={offer?.capId || ''}
          vehicle={`${offer?.manufacturerName} ${offer?.rangeName}`}
          specification={offer?.derivativeName || ''}
          price={offer?.businessRate || 0}
          rating={offer?.averageRating || 3}
          viewOfferClick={() => {
            sessionStorage.setItem('capId', offer?.capId || '');
          }}
          link={{ href: dealOfMonthHref, url: dealOfMonthUrl.url }}
          compared={isCompared(compareVehicles, offer)}
          onCompare={() => {
            compareChange(
              offer
                ? { ...offer, bodyStyle: 'Pickup', pageUrl: dealOfMonthUrl }
                : null,
            );
          }}
        />
      </div>

      <div className="row:bg-lighter">
        <section className="row:cards-3col">
          {productsPickup?.productCarousel?.map((item, idx) => {
            const productUrl = formatProductPageUrl(
              getLegacyUrl(vehicleListUrlData.edges, item?.capId),
              item?.capId,
            );
            return (
              <LazyLoadComponent
                key={`${item?.capId}_${idx}`}
                visibleByDefault={typeof window === 'undefined'}
              >
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
                      price={
                        isPersonal ? item?.personalRate : item?.businessRate
                      }
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
                      classNames={{
                        color: 'teal',
                        solid: true,
                        size: 'regular',
                      }}
                      className="button"
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
        <LazyLoadComponent visibleByDefault={typeof window === 'undefined'}>
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
        </LazyLoadComponent>
      </section>

      <section className="row:manufacturer-grid">
        <LazyLoadComponent visibleByDefault={typeof window === 'undefined'}>
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
                key={man.label}
              >
                <div className="button--inner">{man.label}</div>
              </RouterLink>
            ))}
          </div>
        </LazyLoadComponent>
      </section>

      <section className="row:league">
        <LazyLoadComponent visibleByDefault={typeof window === 'undefined'}>
          <League
            clickReadMore={() => Router.push('/fan-hub.html')}
            altText="vanarama national league"
          />
        </LazyLoadComponent>
      </section>

      <section className="row:featured-logos">
        <LazyLoadComponent visibleByDefault={typeof window === 'undefined'}>
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
        <LazyLoadComponent visibleByDefault={typeof window === 'undefined'}>
          <TrustPilot />
        </LazyLoadComponent>
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

export async function getStaticProps() {
  const client = createApolloClient({});

  try {
    const { data } = await client.query<HubPickupPageData>({
      query: HUB_PICKUP_CONTENT,
    });
    const { data: searchPodVansData } = await client.query<
      IFilterList,
      IFilterListVariables
    >({
      query: GET_SEARCH_POD_DATA,
      variables: {
        vehicleTypes: [VehicleTypeEnum.LCV],
      },
    });

    const {
      productsPickup,
      vehicleListUrlData,
    } = await pickupsPageOffersRequest(client);

    return {
      props: {
        data,
        searchPodVansData,
        productsPickup: productsPickup || null,
        vehicleListUrlData,
      },
    };
  } catch {
    return false;
  }
}

export default PickupsPage;
