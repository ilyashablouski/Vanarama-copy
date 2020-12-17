/* eslint-disable @typescript-eslint/camelcase */
import dynamic from 'next/dynamic';
import { MutableRefObject, useRef } from 'react';
import { NextPage, NextPageContext } from 'next';
import { useQuery } from '@apollo/client';
import SchemaJSON from '@vanarama/uibook/lib/components/atoms/schema-json';
import createApolloClient from '../../apolloClient';
import {
  GenericPageHeadQuery,
  GenericPageHeadQueryVariables,
} from '../../../generated/GenericPageHeadQuery';
import { ProductCardData } from '../../../generated/ProductCardData';
import { PRODUCT_CARD_CONTENT } from '../../gql/productCard';
import { useCarDerivativesData } from '../../containers/OrdersInformation/gql';
import { VehicleTypeEnum, LeaseTypeEnum } from '../../../generated/globalTypes';
import ProductCarousel from '../../components/ProductCarousel/ProductCarousel';
import { GENERIC_PAGE_HEAD } from '../../gql/genericPage';
import {
  useVehicleListUrl,
  useVehicleListUrlFetchMore,
} from '../../gql/vehicleList';
import RouterLink from '../../components/RouterLink/RouterLink';
import { getSectionsData } from '../../utils/getSectionsData';
import Head from '../../components/Head/Head';
import Skeleton from '../../components/Skeleton';

const Button = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/button/'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Card = dynamic(
  () => import('@vanarama/uibook/lib/components/molecules/cards'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Icon = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/icon/Icon'),
  {
    ssr: false,
  },
);
const ArrowForwardSharp = dynamic(
  () => import('@vanarama/uibook/lib/assets/icons/ArrowForwardSharp'),
  {
    ssr: false,
  },
);
const Redundancy = dynamic(
  () => import('@vanarama/uibook/lib/assets/icons/Redundancy'),
  {
    loading: () => <Skeleton count={1} />,
    ssr: false,
  },
);
const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Text = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/text'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Breadcrumb = dynamic(
  () => import('../../components/Breadcrumb/Breadcrumb'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

type Props = {
  genericPageCMS?: any;
};

export const OffersPage: NextPage<Props> = ({ genericPageCMS }) => {
  const vanRef = useRef<HTMLDivElement>();
  const truckRef = useRef<HTMLDivElement>();
  const carRef = useRef<HTMLDivElement>();

  const { data: productsVan } = useQuery<ProductCardData>(
    PRODUCT_CARD_CONTENT,
    {
      variables: {
        type: VehicleTypeEnum.LCV,
        excludeBodyType: 'Pickup',
        size: 9,
        offer: true,
      },
    },
  );

  const productVanCapIds = productsVan?.productCarousel
    ?.map(el => el?.capId || '')
    .filter(Boolean) || [''];
  const { data: productVanDerivatives } = useCarDerivativesData(
    productVanCapIds,
    VehicleTypeEnum.LCV,
  );

  const { data: productsPickup } = useQuery<ProductCardData>(
    PRODUCT_CARD_CONTENT,
    {
      variables: {
        type: VehicleTypeEnum.LCV,
        bodyType: 'Pickup',
        size: 9,
        offer: true,
      },
    },
  );

  const productPickupCapIds = productsPickup?.productCarousel
    ?.map(el => el?.capId || '')
    .filter(Boolean) || [''];
  const { data: productPickupDerivatives } = useCarDerivativesData(
    productPickupCapIds,
    VehicleTypeEnum.LCV,
  );

  const { data: productsCar } = useQuery<ProductCardData>(
    PRODUCT_CARD_CONTENT,
    {
      variables: {
        type: VehicleTypeEnum.CAR,
        size: 9,
        offer: true,
      },
    },
  );

  const productCarCapIds = productsCar?.productCarousel
    ?.map(el => el?.capId || '')
    .filter(Boolean) || [''];
  const { data: productCarDerivatives } = useCarDerivativesData(
    productCarCapIds,
    VehicleTypeEnum.CAR,
  );

  const derivativeIds = [
    ...productVanCapIds,
    ...productPickupCapIds,
    ...productCarCapIds,
  ].filter(Boolean);
  const vehicleListUrlQuery = useVehicleListUrl(derivativeIds);

  useVehicleListUrlFetchMore(vehicleListUrlQuery, derivativeIds);

  // NOTE: can still be made use of for products loading states combined

  /* if (loading) {
    return <Loading size="large" />;
  } */

  const metaData = getSectionsData(['metaData'], genericPageCMS?.genericPage);
  const featuredImage = getSectionsData(
    ['featuredImage'],
    genericPageCMS?.genericPage,
  );
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <>
      {breadcrumbsItems && (
        <div className="row:title">
          <Breadcrumb items={breadcrumbsItems} />
        </div>
      )}
      <div className="row:plain-hero">
        <div className="-col-100">
          <Heading color="black" size="xlarge" tag="h1">
            <Icon name="Flame" color="orange" /> {metaData?.name}
          </Heading>
          <Text size="large" color="darker">
            {genericPageCMS?.genericPage.intro}
          </Text>
          <div className="hero-buttons -mt-500">
            <Button
              size="large"
              fill="solid"
              color="orange"
              label={
                <>
                  <Icon name="Flame" color="white" /> Vans
                </>
              }
              icon={<ArrowForwardSharp />}
              iconColor="white"
              iconPosition="after"
              onClick={() => {
                window.scrollTo(0, vanRef!.current!.offsetTop);
              }}
              className="-d-block"
            />
            <Button
              size="large"
              fill="solid"
              color="orange"
              label={
                <>
                  <Icon name="Flame" color="white" /> Trucks
                </>
              }
              icon={<ArrowForwardSharp />}
              iconColor="white"
              iconPosition="after"
              onClick={() => {
                window.scrollTo(0, truckRef!.current!.offsetTop);
              }}
              className="-d-block"
            />
            <Button
              size="large"
              fill="solid"
              color="orange"
              label={
                <>
                  <Icon name="Flame" color="white" /> Cars
                </>
              }
              icon={<ArrowForwardSharp />}
              iconColor="white"
              iconPosition="after"
              onClick={() => {
                window.scrollTo(0, carRef!.current!.offsetTop);
              }}
              className="-d-block"
            />
          </div>
        </div>
        <div>
          <Card optimisedHost={process.env.IMG_OPTIMISATION_HOST}>
            <Redundancy />
            <Heading size="lead" color="black">
              Redundancy & Life Event Cover
            </Heading>
            <Text size="regular" color="darker">
              Included With All Lease Deals
            </Text>
            <RouterLink
              classNames={{ color: 'teal', size: 'regular' }}
              link={{
                label: 'Find Out More',
                href: '/redundancy-and-life-event-cover.html',
              }}
            >
              Find Out More <ArrowForwardSharp />
            </RouterLink>
          </Card>
        </div>
      </div>
      <div
        className="row:bg-lighter"
        id="van-offers"
        ref={vanRef as MutableRefObject<HTMLDivElement>}
      >
        <div>
          <Heading size="large" color="black">
            <span
              style={{ textAlign: 'center', display: 'block' }}
              className="-mb-400"
            >
              Van Offers
            </span>
          </Heading>
          <ProductCarousel
            leaseType={LeaseTypeEnum.BUSINESS}
            data={{
              derivatives: productVanDerivatives?.derivatives || null,
              productCard: productsVan?.productCarousel || null,
              vehicleList: vehicleListUrlQuery.data?.vehicleList!,
            }}
            countItems={productsVan?.productCarousel?.length || 6}
            dataTestIdBtn="van-view-offer"
          />
          <div className="-justify-content-row -pt-500">
            <RouterLink
              className="button"
              classNames={{ color: 'teal', solid: true, size: 'regular' }}
              link={{
                label: 'View All Van Offers',
                href: '/special-offers.html',
              }}
              withoutDefaultClassName
            >
              <div className="button--inner">View All Van Offers</div>
            </RouterLink>
          </div>
        </div>
      </div>
      <div
        className="row:bg-lighter"
        id="truck-offers"
        ref={truckRef as MutableRefObject<HTMLDivElement>}
      >
        <div>
          <Heading size="large" color="black">
            <span
              style={{ textAlign: 'center', display: 'block' }}
              className="-mb-400"
            >
              Truck Offers
            </span>
          </Heading>
          <ProductCarousel
            leaseType={LeaseTypeEnum.BUSINESS}
            data={{
              derivatives: productPickupDerivatives?.derivatives || null,
              productCard: productsPickup?.productCarousel || null,
              vehicleList: vehicleListUrlQuery.data?.vehicleList!,
            }}
            countItems={productsPickup?.productCarousel?.length || 6}
            dataTestIdBtn="pickup-view-offer"
          />
          <div className="-justify-content-row -pt-500">
            <RouterLink
              className="button"
              classNames={{ color: 'teal', solid: true, size: 'regular' }}
              link={{
                label: 'View All Truck Offers',
                href: '/pickup-special-offers.html',
              }}
              withoutDefaultClassName
            >
              <div className="button--inner">View All Truck Offers</div>
            </RouterLink>
          </div>
        </div>
      </div>
      <div
        className="row:bg-lighter"
        id="car-offers"
        ref={carRef as MutableRefObject<HTMLDivElement>}
      >
        <div>
          <Heading size="large" color="black">
            <span
              style={{ textAlign: 'center', display: 'block' }}
              className="-mb-400"
            >
              Car Offers
            </span>
          </Heading>
          <ProductCarousel
            leaseType={LeaseTypeEnum.PERSONAL}
            data={{
              derivatives: productCarDerivatives?.derivatives || null,
              productCard: productsCar?.productCarousel || null,
              vehicleList: vehicleListUrlQuery.data?.vehicleList!,
            }}
            countItems={productsCar?.productCarousel?.length || 6}
            dataTestIdBtn="car-view-offer"
          />
          <div className="-justify-content-row -pt-500">
            <RouterLink
              className="button"
              classNames={{ color: 'teal', solid: true, size: 'regular' }}
              link={{
                label: 'View All Car Offers',
                href: '/car-leasing-special-offers.html',
              }}
              withoutDefaultClassName
            >
              <div className="button--inner">View All Car Offers</div>
            </RouterLink>
          </div>
        </div>
      </div>
      {metaData && (
        <>
          <Head metaData={metaData} featuredImage={featuredImage} />
          <SchemaJSON json={JSON.stringify(metaData.schema)} />
        </>
      )}
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const client = createApolloClient({});
  const path = context.req?.url || '';

  try {
    const { data } = await client.query<
      GenericPageHeadQuery,
      GenericPageHeadQueryVariables
    >({
      query: GENERIC_PAGE_HEAD,
      variables: {
        slug: path.slice(1),
      },
    });
    return {
      props: {
        genericPageCMS: data,
      },
    };
  } catch {
    return false;
  }
}

export default OffersPage;
