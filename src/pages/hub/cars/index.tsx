import { NextPage } from 'next';
import Router from 'next/router';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { getDataFromTree } from '@apollo/react-ssr';
import ReactMarkdown from 'react-markdown/with-html';
import Flame from '@vanarama/uibook/lib/assets/icons/Flame';
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

import { useContext } from 'react';
import { isCorrectCompareType, changeCompares } from '../../../utils/helpers';
import { CompareContext } from '../../_app';
import {
  HubCarPageData,
  HubCarPageData_hubCarPage_sections_tiles_tiles as TileData,
  HubCarPageData_hubCarPage_sections_steps_steps as StepData,
} from '../../../../generated/HubCarPageData';
import { ProductCardData } from '../../../../generated/ProductCardData';
import { HUB_CAR_CONTENT } from '../../../gql/hubCarPage';
import { PRODUCT_CARD_CONTENT } from '../../../gql/productCard';
import withApollo from '../../../hocs/withApollo';

import Hero, { HeroTitle, HeroHeading } from '../../../components/Hero';
import RouterLink from '../../../components/RouterLink/RouterLink';
import getIconMap from '../../../utils/getIconMap';
import truncateString from '../../../utils/truncateString';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';
import { getProductPageUrl } from '../../../utils/url';
import { useCarDerivativesData } from '../../../containers/OrdersInformation/gql';
import getTitleTag from '../../../utils/getTitleTag';

export const CarsPage: NextPage = () => {
  const { data, loading, error } = useQuery<HubCarPageData>(HUB_CAR_CONTENT);

  const { data: products, error: productsError } = useQuery<ProductCardData>(
    PRODUCT_CARD_CONTENT,
    {
      variables: { type: VehicleTypeEnum.CAR, size: 9, offer: true },
    },
  );

  const { data: productsCarDerivatives } = useCarDerivativesData(
    products?.productCarousel?.map(el => el?.capId || '') || [''],
    VehicleTypeEnum.CAR,
  );

  const {
    compareVehicles,
    setCompareVehicles,
    setModalCompareTypeError,
  } = useContext(CompareContext);

  if (loading) {
    return <Loading size="large" />;
  }

  if (error || productsError) {
    const err = error || productsError;
    return <p>Error: {err?.message}</p>;
  }

  return (
    <>
      <Hero>
        <HeroHeading
          text={data?.hubCarPage.sections.hero?.title || ''}
          titleTag={
            getTitleTag(
              data?.hubCarPage.sections.hero?.titleTag || 'p',
            ) as keyof JSX.IntrinsicElements
          }
        />
        <br />
        <HeroTitle text={data?.hubCarPage.sections.hero?.body || ''} />
        <br />
        <Image
          className="hero--image"
          plain
          size="expand"
          src={
            data?.hubCarPage.sections.hero?.image?.file?.url ||
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
              data?.hubCarPage.sections.leadText?.titleTag || null,
            ) as keyof JSX.IntrinsicElements
          }
        >
          {data?.hubCarPage.sections.leadText?.heading}
        </Heading>
        <Text tag="span" size="lead" color="darker">
          {data?.hubCarPage.sections.leadText?.description}
        </Text>
      </section>

      <section className="row:eligibility-checker-cta">
        <div />
        <div>
          <Image
            size="expand"
            plain
            src="https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/Eligibility-Checker-Arc+(2).jpg"
          />
          <Heading size="large" color="black">
            Check Your Eligibility For A New Car Lease
          </Heading>
          <Link href="/eligibility-checker">
            <Button
              label="Check My Eligibility"
              size="lead"
              fill="solid"
              color="teal"
            />
          </Link>
          <Text tag="p" color="dark" size="xsmall">
            This will not affect your credit score.
          </Text>
        </div>
        <div>
          <Image
            src="https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/Help-Me-Choose2.jpg"
            plain
            size="expand"
          />
          <Heading size="large" color="black">
            Not Sure Which Vehicle Is Best For You?
          </Heading>
          <Button
            label="Help Me Choose"
            size="lead"
            fill="solid"
            color="teal"
          />
        </div>
      </section>

      <div className="row:bg-lighter">
        <section className="row:cards-3col">
          {products?.productCarousel?.map((item, idx) => {
            const iconMap = getIconMap(item?.keyInformation || []);
            const productUrl = getProductPageUrl(
              item!,
              productsCarDerivatives?.derivatives || null,
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
                }))}
                imageSrc={item?.imageUrl || '/vehiclePlaceholder.jpg'}
                onCompare={async () => {
                  if (isCorrectCompareType(item, compareVehicles)) {
                    const compares = await changeCompares({
                      ...item,
                      bodyStyle: '',
                    });
                    setCompareVehicles(compares);
                  } else {
                    setModalCompareTypeError(true);
                  }
                }}
                compared={compareVehicles.some(
                  vehicle => `${vehicle.capId}` === `${item?.capId}`,
                )}
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
                    price={item?.businessRate}
                    size="large"
                    separator="."
                    priceDescription="Per Month Exc.VAT"
                  />
                  <Button
                    color="teal"
                    fill="solid"
                    label="View Offer"
                    onClick={() => {
                      sessionStorage.setItem('capId', item?.capId || '');
                      Router.push(productUrl.href, productUrl.url);
                    }}
                    size="regular"
                  />
                </div>
              </ProductCard>
            );
          })}

          <Button
            label="View All Cars"
            size="large"
            color="teal"
            onClick={() => Router.push('/car-leasing')}
          />
        </section>
      </div>

      <section className="row:steps-4col">
        <Heading className="-a-center -mb-400" size="large" color="black">
          {data?.hubCarPage.sections.steps?.heading}
        </Heading>
        {data?.hubCarPage.sections.steps?.steps?.map((step: StepData, idx) => (
          <Step
            className="-mh-auto"
            key={step.title || idx}
            heading={step.title || ''}
            step={idx + 1}
            text={step.body || ''}
          />
        ))}
      </section>

      <section className="row:featured-right">
        <div style={{ padding: '1rem' }}>
          <Heading
            size="large"
            color="black"
            tag={
              getTitleTag(
                data?.hubCarPage.sections.featured1?.titleTag || 'p',
              ) as keyof JSX.IntrinsicElements
            }
          >
            {data?.hubCarPage.sections.featured1?.title}
          </Heading>
          <Text className="markdown" tag="div" size="regular" color="darker">
            <ReactMarkdown
              escapeHtml={false}
              source={data?.hubCarPage.sections.featured1?.body || ''}
            />
          </Text>
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
        <Image
          src={
            data?.hubCarPage.sections.featured1?.image?.file?.url ||
            'https://source.unsplash.com/collection/2102317/1000x650?sig=40349'
          }
        />
      </section>

      <section className="row:featured-left">
        <Image
          src={
            data?.hubCarPage.sections.featured2?.image?.file?.url ||
            'https://source.unsplash.com/collection/2102317/1000x650?sig=40349'
          }
        />
        <div className="-inset -middle -col-400">
          <Heading
            size="large"
            color="black"
            tag={
              getTitleTag(
                data?.hubCarPage.sections.featured2?.titleTag || 'p',
              ) as keyof JSX.IntrinsicElements
            }
          >
            {data?.hubCarPage.sections.featured2?.title}
          </Heading>
          <Text className="markdown" tag="div" size="regular" color="darker">
            <ReactMarkdown
              escapeHtml={false}
              source={data?.hubCarPage.sections.featured2?.body || ''}
            />
          </Text>
        </div>
      </section>

      <section className="row:features-4col">
        <Heading
          size="large"
          color="black"
          tag={
            getTitleTag(
              data?.hubCarPage.sections.tiles?.titleTag || 'p',
            ) as keyof JSX.IntrinsicElements
          }
        >
          {data && data.hubCarPage.sections.tiles?.tilesTitle}
        </Heading>
        {data?.hubCarPage.sections.tiles?.tiles?.map((tile: TileData, idx) => (
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
              <a className="tile--link" href="##">
                <Heading tag="span" size="regular" color="black">
                  {tile.title}
                </Heading>
              </a>
              <Text tag="p">{tile.body}</Text>
            </Tile>
          </div>
        ))}
      </section>

      <section className="row:league">
        <League altText="vanarama national league" />
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
    </>
  );
};

export default withApollo(CarsPage, { getDataFromTree });
