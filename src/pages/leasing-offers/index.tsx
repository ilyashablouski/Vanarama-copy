import dynamic from 'next/dynamic';
import { ApolloError } from '@apollo/client';
import { MutableRefObject, useRef } from 'react';
import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import SchemaJSON from 'core/atoms/schema-json';
import Breadcrumbs from 'core/atoms/breadcrumbs-v2';
import cx from 'classnames';
import createApolloClient from '../../apolloClient';
import {
  GenericPageHeadQuery,
  GenericPageHeadQueryVariables,
} from '../../../generated/GenericPageHeadQuery';
import { LeaseTypeEnum } from '../../../generated/globalTypes';
import ProductCarousel from '../../components/ProductCarousel/ProductCarousel';
import { GENERIC_PAGE_HEAD } from '../../gql/genericPage';
import { getSectionsData } from '../../utils/getSectionsData';
import Head from '../../components/Head/Head';
import Skeleton from '../../components/Skeleton';
import { ISpecialOffersData, specialOffersRequest } from '../../utils/offers';
import { decodeData, encodeData } from '../../utils/data';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../utils/env';
import {
  convertErrorToProps,
  isBlackFridayCampaignEnabled,
  isExtensionBlackFridayCampaignEnabled,
} from '../../utils/helpers';
import {
  IPageWithData,
  IPageWithError,
  PageTypeEnum,
} from '../../types/common';

const Button = dynamic(() => import('core/atoms/button/'), {
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
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

const RouterLink = dynamic(() =>
  import('../../components/RouterLink/RouterLink'),
);

type IProps = IPageWithData<
  ISpecialOffersData & {
    genericPageCMS?: GenericPageHeadQuery;
  }
>;

export const OffersPage: NextPage<IProps> = ({
  genericPageCMS,
  productsCarDerivatives,
  productsPickupDerivatives,
  productsCar,
  productsPickup,
  productsVan,
  vehicleListUrlData: encodedData,
  productsVanDerivatives,
}) => {
  const vanRef = useRef<HTMLDivElement>();
  const truckRef = useRef<HTMLDivElement>();
  const carRef = useRef<HTMLDivElement>();

  const vehicleListUrlData = decodeData(encodedData);

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
          <Breadcrumbs items={breadcrumbsItems} />
        </div>
      )}
      <div className="row:plain-hero">
        <div className="-col-100">
          <Heading
            color="black"
            size="xlarge"
            tag="h1"
            dataUiTestId="leasing-offers-heading-text"
          >
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
          <div className="free-insurance-card">
            <RouterLink
              classNames={{ color: 'teal', size: 'regular' }}
              link={{
                label: '',
                href: isBlackFridayCampaignEnabled()
                  ? '/legal/terms-and-conditions/black-friday-2021-terms-and-conditions'
                  : '/car-leasing/free-car-insurance.html',
              }}
            >
              <div
                className={cx('free-insurance-background', {
                  '-extensionBlackFriday': isExtensionBlackFridayCampaignEnabled(),
                })}
              >
                {!isBlackFridayCampaignEnabled() && (
                  <div className="free-insurance-text-container">
                    <Text color="dark" size="xsmall">
                      *
                    </Text>
                    <Text color="dark" size="xsmall">
                      FREE on all Car Hot offers only and subjects to
                      availability
                    </Text>
                  </div>
                )}
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
      <div
        className="row:bg-lighter"
        id="car-offers"
        data-uitestid="car-offers-car_carousel"
        ref={carRef as MutableRefObject<HTMLDivElement>}
      >
        <div>
          <Heading size="large" color="black">
            <span
              style={{ textAlign: 'center', display: 'block' }}
              className="-mb-400"
            >
              Car Lease Hot Offers
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
            dataUiTestIdMask="ui-leasing_offers-car"
          />
        </div>
        <div className="-justify-content-row -pt-500">
          <RouterLink
            className="button"
            dataUiTestId="car-offers-view_all_car-button"
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
              Van Lease Hot Offers
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
            dataUiTestIdMask="ui-leasing_offers-van"
          />
        </div>
        <div className="-justify-content-row -pt-500">
          <RouterLink
            className="button"
            classNames={{ color: 'teal', solid: true, size: 'regular' }}
            link={{
              label: 'View All Van Hot Offers',
              href: '/special-offers.html',
            }}
            withoutDefaultClassName
          >
            <div className="button--inner">View All Van Hot Offers</div>
          </RouterLink>
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
              Truck Lease Hot Offers
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
            dataUiTestIdMask="ui-leasing_offers-pickup"
          />
        </div>
        <div className="-justify-content-row -pt-500">
          <RouterLink
            className="button"
            classNames={{ color: 'teal', solid: true, size: 'regular' }}
            link={{
              label: 'View All Truck Hot Offers',
              href: '/pickup-special-offers.html',
            }}
            withoutDefaultClassName
          >
            <div className="button--inner">View All Truck Hot Offers</div>
          </RouterLink>
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

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<IProps | IPageWithError>> {
  const client = createApolloClient({});

  try {
    const { data } = await client.query<
      GenericPageHeadQuery,
      GenericPageHeadQueryVariables
    >({
      query: GENERIC_PAGE_HEAD,
      variables: {
        slug: 'leasing-offers',
        isPreview: !!context?.preview,
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
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        pageType: PageTypeEnum.DEFAULT,
        genericPageCMS: data,
        productsVanDerivatives: productsVanDerivatives || null,
        productsCarDerivatives: productsCarDerivatives || null,
        productsPickupDerivatives: productsPickupDerivatives || null,
        productsCar: productsCar || null,
        productsPickup: productsPickup || null,
        productsVan: productsVan || null,
        vehicleListUrlData: encodeData(vehicleListUrlData),
      },
    };
  } catch (error) {
    const apolloError = error as ApolloError;
    const revalidate = DEFAULT_REVALIDATE_INTERVAL_ERROR;

    // handle graphQLErrors as 404
    // Next will render our custom pages/404
    if (apolloError?.graphQLErrors?.length) {
      return {
        notFound: true,
        revalidate,
      };
    }

    return {
      revalidate,
      props: {
        pageType: PageTypeEnum.ERROR,
        error: convertErrorToProps(error),
      },
    };
  }
}

export default OffersPage;
