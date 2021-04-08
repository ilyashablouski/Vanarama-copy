import { NextPage, NextPageContext } from 'next';
import dynamic from 'next/dynamic';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import ReactMarkdown from 'react-markdown/with-html';
import SchemaJSON from 'core/atoms/schema-json';
import createApolloClient from '../../apolloClient';
import {
  VanOffersPageData,
  VanOffersPageData_vanOffersPage_sections_iconBullets_iconBullets as VanIconBullet,
} from '../../../generated/VanOffersPageData';
import { VAN_OFFERS_CONTENT } from '../../gql/special-offers/van-offers';
import { LeaseTypeEnum } from '../../../generated/globalTypes';
import useLeaseType from '../../hooks/useLeaseType';
import { getSectionsData } from '../../utils/getSectionsData';
import Head from '../../components/Head/Head';
import Skeleton from '../../components/Skeleton';
import {
  IVansSpecialOffersData,
  vansSpecialOffersRequest,
} from '../../utils/offers';
import { decodeData, encodeData } from '../../utils/data';

const AddCircle = dynamic(() => import('core/assets/icons/AddCircle'), {
  loading: () => <Skeleton count={1} />,
  ssr: false,
});
const Icon = dynamic(() => import('core/atoms/icon/'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const ProductCarousel = dynamic(
  () => import('../../components/ProductCarousel/ProductCarousel'),
  {
    loading: () => <Skeleton count={4} />,
  },
);
const RouterLink = dynamic(() =>
  import('../../components/RouterLink/RouterLink'),
);

interface IProps extends IVansSpecialOffersData {
  pageData: any;
}

export const VanOffers: NextPage<IProps> = ({
  pageData: encodedData,
  productsPickup,
  productsSmallVan,
  productsMediumVan,
  productsLargeVan,
  productsDropsideTipper,
  productsSpecialist,
  productsPickupDerivatives,
  productsSmallVanDerivatives,
  productsMediumVanDerivatives,
  productsLargeVanDerivatives,
  productsDropsideTipperDerivatives,
  productsSpecialistDerivatives,
  vehicleListUrlData: encodeVehicleListUrlData,
}) => {
  const { cachedLeaseType } = useLeaseType(false);
  const data = decodeData(encodedData);
  const vehicleListUrlData = decodeData(encodeVehicleListUrlData);

  const isPersonal = cachedLeaseType === 'Personal';
  const metaDataName = getSectionsData(
    ['metaData', 'name'],
    data?.vanOffersPage,
  );

  return (
    <>
      <div className="row:title">
        <Heading color="black" size="xlarge" tag="h1">
          {metaDataName}
        </Heading>
        <Text size="large" color="darker">
          {data?.vanOffersPage.intro}
        </Text>
      </div>

      {productsSmallVan?.productCarousel &&
        productsSmallVan?.productCarousel?.length > 0 && (
          <div className="row:bg-lighter">
            <div>
              <Heading
                size="large"
                color="black"
                tag="h2"
                className="-mb-400 -a-center"
              >
                Best Small Van Lease Offers
              </Heading>
              <ProductCarousel
                leaseType={
                  isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS
                }
                data={{
                  derivatives: productsSmallVanDerivatives?.derivatives || null,
                  productCard: productsSmallVan?.productCarousel || null,
                  vehicleList: vehicleListUrlData!,
                }}
                countItems={productsSmallVan?.productCarousel?.length || 6}
                dataTestIdBtn="van-view-offer"
              />
            </div>
            <div className="-justify-content-row -pt-500">
              <RouterLink
                className="button"
                classNames={{ color: 'teal', solid: true, size: 'regular' }}
                link={{
                  label: 'See All Small Vans',
                  href: '/small-van-leasing.html',
                }}
                withoutDefaultClassName
                dataTestId="small-van-leasing"
              >
                <div className="button--inner">See All Small Vans</div>
              </RouterLink>
            </div>
          </div>
        )}

      {productsMediumVan?.productCarousel &&
        productsMediumVan?.productCarousel?.length > 0 && (
          <div className="row:bg-lighter">
            <div>
              <Heading
                size="large"
                color="black"
                tag="h2"
                className="-mb-400 -a-center"
              >
                Best Medium Van Lease Offers
              </Heading>
              <LazyLoadComponent
                visibleByDefault={
                  typeof window === 'undefined' ||
                  navigator?.vendor === 'Apple Computer, Inc.'
                }
              >
                <ProductCarousel
                  leaseType={
                    isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS
                  }
                  data={{
                    derivatives:
                      productsMediumVanDerivatives?.derivatives || null,
                    productCard: productsMediumVan?.productCarousel || null,
                    vehicleList: vehicleListUrlData!,
                  }}
                  countItems={productsMediumVan?.productCarousel?.length || 6}
                  dataTestIdBtn="van-view-offer"
                />
              </LazyLoadComponent>
            </div>
            <div className="-justify-content-row -pt-500">
              <RouterLink
                className="button"
                classNames={{ color: 'teal', solid: true, size: 'regular' }}
                link={{
                  label: 'See All Medium Vans',
                  href: '/medium-van-leasing.html',
                }}
                withoutDefaultClassName
                dataTestId="medium-van-leasing"
              >
                <div className="button--inner">See All Medium Vans</div>
              </RouterLink>
            </div>
          </div>
        )}

      {productsLargeVan?.productCarousel &&
        productsLargeVan?.productCarousel?.length > 0 && (
          <div className="row:bg-lighter">
            <div>
              <Heading
                size="large"
                color="black"
                tag="h2"
                className="-mb-400 -a-center"
              >
                Best Large Van Lease Offers
              </Heading>
              <LazyLoadComponent
                visibleByDefault={
                  typeof window === 'undefined' ||
                  navigator?.vendor === 'Apple Computer, Inc.'
                }
              >
                <ProductCarousel
                  leaseType={
                    isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS
                  }
                  data={{
                    derivatives:
                      productsLargeVanDerivatives?.derivatives || null,
                    productCard: productsLargeVan?.productCarousel || null,
                    vehicleList: vehicleListUrlData!,
                  }}
                  countItems={productsLargeVan?.productCarousel?.length || 6}
                  dataTestIdBtn="van-view-offer"
                />
              </LazyLoadComponent>
            </div>
            <div className="-justify-content-row -pt-500">
              <RouterLink
                className="button"
                classNames={{ color: 'teal', solid: true, size: 'regular' }}
                link={{
                  label: 'See All Large Vans',
                  href: '/large-van-leasing.html',
                }}
                withoutDefaultClassName
                dataTestId="large-van-leasing"
              >
                <div className="button--inner">See All Large Vans</div>
              </RouterLink>
            </div>
          </div>
        )}

      {productsPickup?.productCarousel &&
        productsPickup?.productCarousel?.length > 0 && (
          <div className="row:bg-lighter">
            <div>
              <Heading
                size="large"
                color="black"
                tag="h2"
                className="-mb-400 -a-center"
              >
                Best Pickup Truck Lease Offers
              </Heading>
              <LazyLoadComponent
                visibleByDefault={
                  typeof window === 'undefined' ||
                  navigator?.vendor === 'Apple Computer, Inc.'
                }
              >
                <ProductCarousel
                  leaseType={
                    isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS
                  }
                  data={{
                    derivatives: productsPickupDerivatives?.derivatives || null,
                    productCard: productsPickup?.productCarousel || null,
                    vehicleList: vehicleListUrlData!,
                  }}
                  countItems={productsPickup?.productCarousel?.length || 6}
                  dataTestIdBtn="van-view-offer"
                />
              </LazyLoadComponent>
            </div>
            <div className="-justify-content-row -pt-500">
              <RouterLink
                className="button"
                classNames={{ color: 'teal', solid: true, size: 'regular' }}
                link={{
                  label: 'See All Pickup Vans',
                  href: '/pickup-special-offers.html',
                }}
                withoutDefaultClassName
                dataTestId="pickup-special-offer"
              >
                <div className="button--inner">See All Pickup Vans</div>
              </RouterLink>
            </div>
          </div>
        )}

      {productsDropsideTipper?.productCarousel &&
        productsDropsideTipper?.productCarousel?.length > 0 && (
          <div className="row:bg-lighter">
            <div>
              <Heading
                size="large"
                color="black"
                tag="h2"
                className="-mb-400 -a-center"
              >
                Best Dropside Tipper Offers
              </Heading>
              <LazyLoadComponent
                visibleByDefault={
                  typeof window === 'undefined' ||
                  navigator?.vendor === 'Apple Computer, Inc.'
                }
              >
                <ProductCarousel
                  leaseType={
                    isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS
                  }
                  data={{
                    derivatives:
                      productsDropsideTipperDerivatives?.derivatives || null,
                    productCard:
                      productsDropsideTipper?.productCarousel || null,
                    vehicleList: vehicleListUrlData!,
                  }}
                  countItems={
                    productsDropsideTipper?.productCarousel?.length || 6
                  }
                  dataTestIdBtn="van-view-offer"
                />
              </LazyLoadComponent>
            </div>
            <div className="-justify-content-row -pt-500">
              <RouterLink
                className="button"
                classNames={{ color: 'teal', solid: true, size: 'regular' }}
                link={{
                  label: 'See All Dropside Vans',
                  href: '/dropside-tipper-leasing.html',
                }}
                withoutDefaultClassName
                dataTestId="dropside-tipper-leasing"
              >
                <div className="button--inner">See All Dropside Vans</div>
              </RouterLink>
            </div>
          </div>
        )}

      {productsSpecialist?.productCarousel &&
        productsSpecialist?.productCarousel?.length > 0 && (
          <div className="row:bg-lighter">
            <div>
              <Heading
                size="large"
                color="black"
                tag="h2"
                className="-mb-400 -a-center"
              >
                Specialist Van Lease Offers
              </Heading>
              <LazyLoadComponent
                visibleByDefault={
                  typeof window === 'undefined' ||
                  navigator?.vendor === 'Apple Computer, Inc.'
                }
              >
                <ProductCarousel
                  leaseType={
                    isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS
                  }
                  data={{
                    derivatives:
                      productsSpecialistDerivatives?.derivatives || null,
                    productCard: productsSpecialist?.productCarousel || null,
                    vehicleList: vehicleListUrlData!,
                  }}
                  countItems={productsSpecialist?.productCarousel?.length || 6}
                  dataTestIdBtn="van-view-offer"
                />
              </LazyLoadComponent>
            </div>
            <div className="-justify-content-row -pt-500">
              <RouterLink
                className="button"
                classNames={{ color: 'teal', solid: true, size: 'regular' }}
                link={{
                  label: 'See All Specialist Vans',
                  href: '/crew-vans.html',
                }}
                withoutDefaultClassName
                dataTestId="crew-vans"
              >
                <div className="button--inner">See All Specialist Vans</div>
              </RouterLink>
            </div>
          </div>
        )}

      <LazyLoadComponent
        visibleByDefault={
          typeof window === 'undefined' ||
          navigator?.vendor === 'Apple Computer, Inc.'
        }
      >
        <div className="row:text -columns">
          <ReactMarkdown
            allowDangerousHtml
            source={data?.vanOffersPage.body || ''}
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
      </LazyLoadComponent>

      <LazyLoadComponent
        visibleByDefault={
          typeof window === 'undefined' ||
          navigator?.vendor === 'Apple Computer, Inc.'
        }
      >
        <div className="row:icon-list">
          <Heading tag="span" size="lead" color="black">
            {data?.vanOffersPage?.sections?.iconBullets?.title || ''}
          </Heading>
          <hr />
          {data?.vanOffersPage?.sections?.iconBullets?.iconBullets?.map(
            (item: VanIconBullet, idx: number) => (
              <>
                <Icon
                  key={`${item?.text || idx}-icon`}
                  icon={<AddCircle />}
                  color="orange"
                  size="large"
                />
                <Text
                  key={`${item?.text || idx}-text`}
                  size="regular"
                  color="darker"
                >
                  {item?.text}
                </Text>
              </>
            ),
          )}
        </div>
      </LazyLoadComponent>

      <LazyLoadComponent
        visibleByDefault={
          typeof window === 'undefined' ||
          navigator?.vendor === 'Apple Computer, Inc.'
        }
      >
        <div className="row:text -columns">
          <Heading size="large" color="black">
            {data?.vanOffersPage?.sections?.featured?.title || ''}
          </Heading>
          <div>
            <ReactMarkdown
              allowDangerousHtml
              source={data?.vanOffersPage?.sections?.featured?.body || ''}
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
      </LazyLoadComponent>

      <LazyLoadComponent
        visibleByDefault={
          typeof window === 'undefined' ||
          navigator?.vendor === 'Apple Computer, Inc.'
        }
      >
        <div className="row:text">
          <Text size="regular" color="dark">
            Photos and videos are for illustration purposes only.{' '}
            <RouterLink
              link={{
                href: '/legal/terms-and-conditions.html',
                label: 'Terms and conditions apply',
              }}
              classNames={{ color: 'teal' }}
            >
              Terms and conditions apply
            </RouterLink>
            .
          </Text>
        </div>
      </LazyLoadComponent>

      {data?.vanOffersPage.metaData && (
        <>
          <Head
            metaData={data?.vanOffersPage.metaData}
            featuredImage={data?.vanOffersPage.featuredImage}
          />
          <SchemaJSON
            json={JSON.stringify(data?.vanOffersPage.metaData.schema)}
          />
        </>
      )}
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const client = createApolloClient({}, context);
  let data;
  try {
    const { data: content } = await client.query<VanOffersPageData>({
      query: VAN_OFFERS_CONTENT,
    });
    data = content;
  } catch (e) {
    throw new Error(e);
  }
  const {
    productsPickup,
    productsSmallVan,
    productsMediumVan,
    productsLargeVan,
    productsDropsideTipper,
    productsSpecialist,
    productsPickupDerivatives,
    productsSmallVanDerivatives,
    productsMediumVanDerivatives,
    productsLargeVanDerivatives,
    productsDropsideTipperDerivatives,
    productsSpecialistDerivatives,
    vehicleListUrlData,
  } = await vansSpecialOffersRequest(client);
  return {
    props: {
      pageData: encodeData(data),
      productsPickup: productsPickup || null,
      productsSmallVan: productsSmallVan || null,
      productsMediumVan: productsMediumVan || null,
      productsLargeVan: productsLargeVan || null,
      productsDropsideTipper: productsDropsideTipper || null,
      productsSpecialist: productsSpecialist || null,
      productsPickupDerivatives: productsPickupDerivatives || null,
      productsSmallVanDerivatives: productsSmallVanDerivatives || null,
      productsMediumVanDerivatives: productsMediumVanDerivatives || null,
      productsLargeVanDerivatives: productsLargeVanDerivatives || null,
      productsDropsideTipperDerivatives:
        productsDropsideTipperDerivatives || null,
      productsSpecialistDerivatives: productsSpecialistDerivatives || null,
      vehicleListUrlData: encodeData(vehicleListUrlData),
    },
  };
}

export default VanOffers;
