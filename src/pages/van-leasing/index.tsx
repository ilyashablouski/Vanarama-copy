/* eslint-disable @typescript-eslint/camelcase */
import { NextPage } from 'next';
import Router from 'next/router';
import { useQuery } from '@apollo/client';
import { getDataFromTree } from '@apollo/react-ssr';
import ReactMarkdown from 'react-markdown/with-html';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Tile from '@vanarama/uibook/lib/components/molecules/tile';
import TrustPilot from '@vanarama/uibook/lib/components/molecules/trustpilot';
import League from '@vanarama/uibook/lib/components/organisms/league';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import ArrowForwardSharp from '@vanarama/uibook/lib/assets/icons/ArrowForwardSharp';
import Step from '@vanarama/uibook/lib/components/molecules/step';
import IconList, {
  IconListItem,
} from '@vanarama/uibook/lib/components/organisms/icon-list';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useState } from 'react';

import Media from '@vanarama/uibook/lib/components/atoms/media';
import { getFeaturedClassPartial } from '../../utils/layout';
import {
  HubVanPageData,
  HubVanPageData_hubVanPage_sections_tiles_tiles as TileData,
  HubVanPageData_hubVanPage_sections_cards_cards as CardData,
  HubVanPageData_hubVanPage_sections_steps_steps as StepData,
} from '../../../generated/HubVanPageData';
import {
  ProductCardData,
  ProductCardData_productCarousel as ProdCardData,
} from '../../../generated/ProductCardData';

import { HUB_VAN_CONTENT } from '../../gql/hub/hubVanPage';
import { PRODUCT_CARD_CONTENT } from '../../gql/productCard';
import withApollo from '../../hocs/withApollo';

import Hero, { HeroTitle, HeroHeading } from '../../components/Hero';
import DealOfMonth from '../../components/DealOfMonth';
import RouterLink from '../../components/RouterLink/RouterLink';
import { useCarDerivativesData } from '../../containers/OrdersInformation/gql';
import { VehicleTypeEnum, LeaseTypeEnum } from '../../../generated/globalTypes';
import ProductCarousel from '../../components/ProductCarousel/ProductCarousel';
import { formatProductPageUrl, getLegacyUrl, getNewUrl } from '../../utils/url';
import getTitleTag from '../../utils/getTitleTag';
import useLeaseType from '../../hooks/useLeaseType';
import { getSectionsData, getCardsName } from '../../utils/getSectionsData';
import {
  useVehicleListUrl,
  useVehicleListUrlFetchMore,
} from '../../gql/vehicleList';
import TileLink from '../../components/TileLink/TileLink';

type ProdCards = ProdCardData[];

export const VansPage: NextPage = () => {
  const [offers, setOffers] = useState<ProdCards>([]);
  const { data, loading, error } = useQuery<HubVanPageData>(HUB_VAN_CONTENT);
  const { cachedLeaseType } = useLeaseType(false);

  // pluck random offer until offer position available
  const offer: ProdCardData = offers[Math.floor(Math.random() * offers.length)];

  const { data: productSmallVan } = useQuery<ProductCardData>(
    PRODUCT_CARD_CONTENT,
    {
      variables: {
        type: VehicleTypeEnum.LCV,
        bodyType: 'SmallVan',
        size: 9,
        offer: true,
      },
      onCompleted: prods => {
        const topProduct = prods?.productCarousel?.find(
          p => p?.isOnOffer === true,
        );
        if (topProduct) setOffers([...offers, topProduct]);
      },
    },
  );

  const productSmallVanCapIds = productSmallVan?.productCarousel?.map(
    el => el?.capId || '',
  ) || [''];
  const { data: productSmallVanDerivatives } = useCarDerivativesData(
    productSmallVanCapIds,
    VehicleTypeEnum.LCV,
  );

  const { data: productMediumVan } = useQuery<ProductCardData>(
    PRODUCT_CARD_CONTENT,
    {
      variables: {
        type: VehicleTypeEnum.LCV,
        bodyType: 'MediumVan',
        size: 9,
        offer: true,
      },
      onCompleted: prods => {
        const topProduct = prods?.productCarousel?.find(
          p => p?.isOnOffer === true,
        );
        if (topProduct) setOffers([...offers, topProduct]);
      },
    },
  );

  const productMediumVanCapIds = productMediumVan?.productCarousel?.map(
    el => el?.capId || '',
  ) || [''];
  const { data: productMediumVanDerivatives } = useCarDerivativesData(
    productMediumVanCapIds,
    VehicleTypeEnum.LCV,
  );

  const { data: productLargeVan } = useQuery<ProductCardData>(
    PRODUCT_CARD_CONTENT,
    {
      variables: {
        type: VehicleTypeEnum.LCV,
        bodyType: 'LargeVan',
        size: 9,
        offer: true,
      },
      onCompleted: prods => {
        const topProduct = prods?.productCarousel?.find(
          p => p?.isOnOffer === true,
        );
        if (topProduct) setOffers([...offers, topProduct]);
      },
    },
  );

  const productLargeVanCapIds = productLargeVan?.productCarousel?.map(
    el => el?.capId || '',
  ) || [''];
  const { data: productLargeVanDerivatives } = useCarDerivativesData(
    productLargeVanCapIds,
    VehicleTypeEnum.LCV,
  );

  const derivativeIds = [
    ...productSmallVanCapIds,
    ...productMediumVanCapIds,
    ...productLargeVanCapIds,
  ];
  const vehicleListUrlQuery = useVehicleListUrl(derivativeIds);

  useVehicleListUrlFetchMore(vehicleListUrlQuery, derivativeIds);

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
          text={
            getSectionsData(['hero', 'title'], data?.hubVanPage.sections) || ''
          }
          titleTag={
            getTitleTag(
              getSectionsData(
                ['hero', 'titleTag'],
                data?.hubVanPage.sections,
              ) || 'p',
            ) as keyof JSX.IntrinsicElements
          }
        />
        <br />
        <HeroTitle
          text={
            getSectionsData(['hero', 'body'], data?.hubVanPage.sections) || ''
          }
        />
        <Button
          size="lead"
          fill="outline"
          label=" View Special Offers"
          color="white"
        />
        <br />
        <Image
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
          className="hero--image"
          plain
          size="expand"
          src={
            getSectionsData(
              ['hero', 'image', 'file', 'url'],
              data?.hubVanPage.sections,
            ) ||
            'https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/connect.png'
          }
        />
      </Hero>
      <div className="row:lead-text">
        <Heading
          size="xlarge"
          color="black"
          tag={
            getTitleTag(
              getSectionsData(
                ['leadText', 'titleTag'],
                data?.hubVanPage.sections,
              ) || null,
            ) as keyof JSX.IntrinsicElements
          }
        >
          {getSectionsData(['leadText', 'heading'], data?.hubVanPage.sections)}
        </Heading>
        <Text tag="span" size="lead" color="darker">
          {getSectionsData(
            ['leadText', 'description'],
            data?.hubVanPage.sections,
          )}
        </Text>
      </div>
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
          price={(isPersonal ? offer?.personalRate : offer?.businessRate) || 0}
          rating={offer?.averageRating || 3}
          viewOfferClick={() => {
            sessionStorage.setItem('capId', offer?.capId || '');
            Router.push(dealOfMonthUrl.href, dealOfMonthUrl.url);
          }}
          link={{ href: dealOfMonthHref, url: dealOfMonthUrl.url }}
        />
      </div>
      <div className="row:bg-lighter">
        <div>
          <Heading size="large" color="black" tag="h2">
            <span
              style={{ textAlign: 'center', display: 'block' }}
              className="-mb-400"
            >
              Small Vans
            </span>
          </Heading>
          <ProductCarousel
            leaseType={
              isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS
            }
            data={{
              derivatives: productSmallVanDerivatives?.derivatives || null,
              productCard: productSmallVan?.productCarousel || null,
              vehicleList: vehicleListUrlQuery.data?.vehicleList!,
            }}
            countItems={productSmallVan?.productCarousel?.length || 6}
            dataTestIdBtn="van-view-offer"
          />
          <div className="-justify-content-row -pt-500">
            <Button
              label="View Small Vans"
              color="teal"
              onClick={() => Router.push('/van-leasing?bodyStyles=Small+Van')}
            />
          </div>
        </div>
      </div>
      <div className="row:bg-lighter">
        <div>
          <Heading size="large" color="black" tag="h2">
            <span
              style={{ textAlign: 'center', display: 'block' }}
              className="-mb-400"
            >
              Medium Vans
            </span>
          </Heading>
          <ProductCarousel
            leaseType={
              isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS
            }
            data={{
              derivatives: productMediumVanDerivatives?.derivatives || null,
              productCard: productMediumVan?.productCarousel || null,
              vehicleList: vehicleListUrlQuery.data?.vehicleList!,
            }}
            countItems={productMediumVan?.productCarousel?.length || 6}
            dataTestIdBtn="van-view-offer"
          />
          <div className="-justify-content-row -pt-500">
            <Button
              label="View Medium Vans"
              color="teal"
              onClick={() => Router.push('/van-leasing?bodyStyles=Medium+Van')}
            />
          </div>
        </div>
      </div>
      <div className="row:bg-lighter">
        <div>
          <Heading size="large" color="black" tag="h2">
            <span
              style={{ textAlign: 'center', display: 'block' }}
              className="-mb-400"
            >
              Large Vans
            </span>
          </Heading>
          <ProductCarousel
            leaseType={
              isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS
            }
            data={{
              derivatives: productLargeVanDerivatives?.derivatives || null,
              productCard: productLargeVan?.productCarousel || null,
              vehicleList: vehicleListUrlQuery.data?.vehicleList!,
            }}
            countItems={productLargeVan?.productCarousel?.length || 6}
            dataTestIdBtn="van-view-offer"
          />
          <div className="-justify-content-row -pt-500">
            <Button
              label="View Large Vans"
              color="teal"
              onClick={() => Router.push('/van-leasing?bodyStyles=Large+Van')}
            />
          </div>
        </div>
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
                  data?.hubVanPage.sections,
                ) || null,
              ) as keyof JSX.IntrinsicElements
            }
          >
            {getCardsName(data?.hubVanPage)}
          </Heading>
          <Text
            className="-justify-content-row -mb-400"
            tag="p"
            size="regular"
            color="darker"
          >
            {getSectionsData(
              ['cards', 'description'],
              data?.hubVanPage.sections,
            )}
          </Text>
          {(getSectionsData(
            ['cards', 'cards'],
            data?.hubVanPage.sections,
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
                      href: card.link?.url || '#',
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
        </div>
      </div>

      <section className="row:steps-4col">
        <Heading
          className="-a-center -mb-400"
          size="large"
          color="black"
          tag={
            getTitleTag(
              getSectionsData(
                ['steps', 'titleTag'],
                data?.hubVanPage.sections,
              ) || null,
            ) as keyof JSX.IntrinsicElements
          }
        >
          {getSectionsData(['steps', 'heading'], data?.hubVanPage.sections)}
        </Heading>
        {(getSectionsData(
          ['steps', 'steps'],
          data?.hubVanPage.sections,
        ) as StepData[])?.map((step: StepData, idx) => (
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
          getSectionsData(['featured1'], data?.hubVanPage.sections),
        )}`}
      >
        {data?.hubVanPage?.sections?.featured1?.video ? (
          <Media
            src={
              getSectionsData(
                ['featured1', 'video'],
                data?.hubVanPage.sections,
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
                data?.hubVanPage.sections,
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
                getSectionsData(
                  ['featured1', 'titleTag'],
                  data?.hubVanPage.sections,
                ) || 'p',
              ) as keyof JSX.IntrinsicElements
            }
          >
            {getSectionsData(['featured1', 'title'], data?.hubVanPage.sections)}
          </Heading>
          <div className="markdown">
            <ReactMarkdown
              escapeHtml={false}
              source={
                getSectionsData(
                  ['featured1', 'body'],
                  data?.hubVanPage.sections,
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
          getSectionsData(['featured2'], data?.hubVanPage.sections),
        )}`}
      >
        {data?.hubVanPage?.sections?.featured2?.video ? (
          <Media
            src={
              getSectionsData(
                ['featured2', 'video'],
                data?.hubVanPage.sections,
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
                data?.hubVanPage.sections,
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
                getSectionsData(
                  ['featured2', 'titleTag'],
                  data?.hubVanPage.sections,
                ) || 'p',
              ) as keyof JSX.IntrinsicElements
            }
          >
            {getSectionsData(['featured2', 'title'], data?.hubVanPage.sections)}
          </Heading>
          <div className="markdown">
            <ReactMarkdown
              escapeHtml={false}
              source={
                getSectionsData(
                  ['featured2', 'body'],
                  data?.hubVanPage.sections,
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
                data?.hubVanPage.sections,
              ) || 'p',
            ) as keyof JSX.IntrinsicElements
          }
        >
          {getSectionsData(['rowText', 'heading'], data?.hubVanPage.sections)}
        </Heading>
        <div>
          <Text tag="p" size="regular" color="darker">
            {getSectionsData(['rowText', 'body'], data?.hubVanPage.sections)}
          </Text>
          <Heading size="regular" color="black">
            {getSectionsData(
              ['rowText', 'subHeading'],
              data?.hubVanPage.sections,
            )}
          </Heading>
          <Button
            className="-pt-200"
            label="Veiw Leasing Guides"
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
              getSectionsData(
                ['tiles', 'titleTag'],
                data?.hubVanPage.sections,
              ) || 'p',
            ) as keyof JSX.IntrinsicElements
          }
        >
          {getSectionsData(['tiles', 'tilesTitle'], data?.hubVanPage.sections)}
        </Heading>
        {(getSectionsData(
          ['tiles', 'tiles'],
          data?.hubVanPage.sections,
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
            'Ford',
            'Toyota',
            'Isuzu',
            'Volkswagen',
            'Mitsubishi',
            'Mercedes-Benz',
          ].map(man => (
            <Button
              key={man}
              color="teal"
              size="large"
              label={man}
              onClick={() => Router.push(`/van-leasing/${man} `)}
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
    </>
  );
};

export default withApollo(VansPage, { getDataFromTree });
