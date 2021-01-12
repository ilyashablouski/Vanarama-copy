/* eslint-disable @typescript-eslint/camelcase */
import dynamic from 'next/dynamic';
import { MutableRefObject, useRef } from 'react';
import { NextPage } from 'next';
import SchemaJSON from 'core/atoms/schema-json';
import createApolloClient from '../../apolloClient';
import {
  GenericPageHeadQuery,
  GenericPageHeadQueryVariables,
} from '../../../generated/GenericPageHeadQuery';
import { LeaseTypeEnum } from '../../../generated/globalTypes';
import ProductCarousel from '../../components/ProductCarousel/ProductCarousel';
import { GENERIC_PAGE_HEAD } from '../../gql/genericPage';
import RouterLink from '../../components/RouterLink/RouterLink';
import { getSectionsData } from '../../utils/getSectionsData';
import Head from '../../components/Head/Head';
import Skeleton from '../../components/Skeleton';
import { ISpecialOffersData, specialOffersRequest } from '../../utils/offers';

const Button = dynamic(() => import('core/atoms/button/'), {
  loading: () => <Skeleton count={1} />,
});
const Card = dynamic(() => import('core/molecules/cards'), {
  loading: () => <Skeleton count={1} />,
});

const Icon = dynamic(() => import('core/atoms/icon'), {
  ssr: false,
});
const Flame = dynamic(() => import('core/assets/icons/Flame'), {
  ssr: false,
});
const ArrowForwardSharp = dynamic(
  () => import('core/assets/icons/ArrowForwardSharp'),
  {
    ssr: false,
  },
);
const Redundancy = dynamic(() => import('core/assets/icons/Redundancy'), {
  loading: () => <Skeleton count={1} />,
  ssr: false,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Breadcrumb = dynamic(
  () => import('../../components/Breadcrumb/Breadcrumb'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

interface IProps extends ISpecialOffersData {
  genericPageCMS?: any;
}

export const OffersPage: NextPage<IProps> = ({
  genericPageCMS,
  productsCarDerivatives,
  productsPickupDerivatives,
  productsCar,
  productsPickup,
  productsVan,
  vehicleListUrlData,
  productsVanDerivatives,
}) => {
  const vanRef = useRef<HTMLDivElement>();
  const truckRef = useRef<HTMLDivElement>();
  const carRef = useRef<HTMLDivElement>();

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
            <Icon icon={<Flame />} color="orange" /> {metaData?.name}
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
                  <Icon icon={<Flame />} color="white" /> Vans
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
                  <Icon icon={<Flame />} color="white" /> Trucks
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
                  <Icon icon={<Flame />} color="white" /> Cars
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
              derivatives: productsVanDerivatives?.derivatives || null,
              productCard: productsVan?.productCarousel || null,
              vehicleList: vehicleListUrlData,
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
              derivatives: productsPickupDerivatives?.derivatives || null,
              productCard: productsPickup?.productCarousel || null,
              vehicleList: vehicleListUrlData,
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
              derivatives: productsCarDerivatives?.derivatives || null,
              productCard: productsCar?.productCarousel || null,
              vehicleList: vehicleListUrlData,
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

export async function getStaticProps() {
  const client = createApolloClient({});

  try {
    const { data } = await client.query<
      GenericPageHeadQuery,
      GenericPageHeadQueryVariables
    >({
      query: GENERIC_PAGE_HEAD,
      variables: {
        slug: 'leasing-offers',
      },
    });
    const {
      productsVanDerivatives,
      productsCarDerivatives,
      productsPickupDerivatives,
      productsCar,
      productsPickup,
      productsVan,
      vehicleListUrlData,
    } = await specialOffersRequest(client);
    return {
      props: {
        genericPageCMS: data,
        productsVanDerivatives: productsVanDerivatives || null,
        productsCarDerivatives: productsCarDerivatives || null,
        productsPickupDerivatives: productsPickupDerivatives || null,
        productsCar: productsCar || null,
        productsPickup: productsPickup || null,
        productsVan: productsVan || null,
        vehicleListUrlData,
      },
    };
  } catch {
    return false;
  }
}

export default OffersPage;
