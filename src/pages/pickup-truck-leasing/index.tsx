import { NextPage } from 'next';
import Router from 'next/router';
import { useQuery } from '@apollo/client';
import { useState, useContext } from 'react';
import { getDataFromTree } from '@apollo/react-ssr';
import ReactMarkdown from 'react-markdown/with-html';
import Flame from '@vanarama/uibook/lib/assets/icons/Flame';
import ArrowForwardSharp from '@vanarama/uibook/lib/assets/icons/ArrowForwardSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Step from '@vanarama/uibook/lib/components/molecules/step';
import Tile from '@vanarama/uibook/lib/components/molecules/tile';
import TrustPilot from '@vanarama/uibook/lib/components/molecules/trustpilot';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import ProductCard from '@vanarama/uibook/lib/components/molecules/cards/ProductCard/ProductCard';
import Price from '@vanarama/uibook/lib/components/atoms/price';
import IconList, {
  IconListItem,
} from '@vanarama/uibook/lib/components/organisms/icon-list';
import League from '@vanarama/uibook/lib/components/organisms/league';

import Media from '@vanarama/uibook/lib/components/atoms/media';
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
import getIconMap from '../../utils/getIconMap';
import truncateString from '../../utils/truncateString';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { formatProductPageUrl, getLegacyUrl } from '../../utils/url';
import { CompareContext } from '../../utils/comparatorTool';
import getTitleTag from '../../utils/getTitleTag';
import useLeaseType from '../../hooks/useLeaseType';
import Head from '../../components/Head/Head';
import { useVehicleListUrl } from '../../gql/vehicleList';
import TileLink from '../../components/TileLink/TileLink';

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

  const productsPickupsCapIds = products?.productCarousel?.map(
    el => el?.capId || '',
  ) || [''];
  const { data: prdouctPickUpsVehicles } = useVehicleListUrl(
    productsPickupsCapIds,
  );

  const { compareVehicles, compareChange } = useContext(CompareContext);

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const dealOfMonthUrl = formatProductPageUrl(
    getLegacyUrl(prdouctPickUpsVehicles?.vehicleList?.edges, offer?.capId),
    offer?.capId,
  );

  const isPersonal = cachedLeaseType === 'Personal';
  const metaData = data?.hubPickupPage?.metaData;

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
            Router.push(dealOfMonthUrl.href, dealOfMonthUrl.url);
          }}
          link={{ href: dealOfMonthUrl.href, url: dealOfMonthUrl.url }}
        />
      </div>

      <div className="row:bg-lighter">
        <section className="row:cards-3col">
          {products?.productCarousel?.map((item, idx) => {
            const iconMap = getIconMap(item?.keyInformation || []);
            const productUrl = formatProductPageUrl(
              getLegacyUrl(
                prdouctPickUpsVehicles?.vehicleList?.edges,
                item?.capId,
              ),
              item?.capId,
            );
            return (
              <ProductCard
                key={item?.capId || idx}
                header={{
                  accentIcon: <Icon icon={<Flame />} color="white" />,
                  accentText: 'Hot Deal',
                  text: 'In Stock - 14-21 Days Delivery',
                }}
                features={item?.keyInformation?.map(info => ({
                  icon: iconMap.get(info?.name?.replace(/\s+/g, '')),
                  label: info?.value || '',
                  index: `${item.capId}_${info?.name || ''}`,
                }))}
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
                        href: productUrl.href,
                        label: truncateString(
                          `${item?.manufacturerName} ${item?.rangeName}`,
                        ),
                      }}
                      as={productUrl.url}
                      onClick={() =>
                        sessionStorage.setItem('capId', item?.capId || '')
                      }
                      className="heading"
                      classNames={{ size: 'large', color: 'black' }}
                    />
                  ),
                  description: item?.derivativeName || '',
                  score: item?.averageRating || 5,
                }}
              >
                <div className="-flex-h">
                  <Price
                    price={isPersonal ? item?.personalRate : item?.businessRate}
                    size="large"
                    separator="."
                    priceDescription="Per Month Exc.VAT"
                  />
                  <RouterLink
                    link={{
                      href: productUrl.href,
                      label: 'View Offer',
                    }}
                    as={productUrl.url}
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
              href: '/van-leasing?bodyStyles=Pickup',
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
              escapeHtml={false}
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
          <IconList>
            <IconListItem iconColor="orange">
              &nbsp;&nbsp;Choose your contract length &amp; agreed mileage
            </IconListItem>
            <IconListItem iconColor="orange">
              &nbsp;&nbsp;Pay an initial payment
            </IconListItem>
            <IconListItem iconColor="orange">
              &nbsp;&nbsp;Set up your agreed fixed monthly rental
            </IconListItem>
          </IconList>
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
              escapeHtml={false}
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
          <Button
            className="-pt-200"
            label="View Leasing Guides"
            color="teal"
            fill="clear"
            size="regular"
            icon={<ArrowForwardSharp />}
            iconPosition="after"
          />
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
          {[
            'Nissan',
            'Toyota',
            'Isuzu',
            'Ford',
            'Volkswagen',
            'Mitsubishi',
            'Mercedes-Benz',
          ].map(man => (
            <Button
              key={man}
              color="teal"
              size="large"
              label={man}
              onClick={() =>
                Router.push(`/van-leasing/${man}?bodyStyles=Pickup `)
              }
            />
          ))}
        </div>
      </section>

      <section className="row:league">
        <League
          clickReadMore={() => Router.push('/fan-hub')}
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
            <Image key={label} src={href} alt={label} size="expand" plain />
          ))}
        </div>
      </section>
      <section className="row:trustpilot">
        <TrustPilot src="https://widget.trustpilot.com/trustboxes/53aa8912dec7e10d38f59f36/index.html?templateId=53aa8912dec7e10d38f59f36&amp;businessunitId=594a982f0000ff0005a50d80#locale=en-GB&amp;styleHeight=130px&amp;styleWidth=100%25&amp;theme=light&amp;stars=4%2C5&amp;schemaType=Organization" />
      </section>
      {metaData && (
        <Head
          metaData={metaData}
          featuredImage={data?.hubPickupPage?.featuredImage}
        />
      )}
    </>
  );
};

export default withApollo(PickupsPage, { getDataFromTree });
