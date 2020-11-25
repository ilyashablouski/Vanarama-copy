/* eslint-disable @typescript-eslint/camelcase */
import { NextPage } from 'next';
import ReactMarkdown from 'react-markdown/with-html';
import { useEffect, useState } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import AddCircle from '@vanarama/uibook/lib/assets/icons/AddCircleSharp';
import SchemaJSON from '@vanarama/uibook/lib/components/atoms/schema-json';
import createApolloClient from '../../apolloClient';
import { ProductCardData } from '../../../generated/ProductCardData';
import {
  VanOffersPageData,
  VanOffersPageData_vanOffersPage_sections_iconBullets_iconBullets as VanIconBullet,
} from '../../../generated/VanOffersPageData';
import { VAN_OFFERS_CONTENT } from '../../gql/special-offers/van-offers';
import { PRODUCT_CARD_CONTENT } from '../../gql/productCard';
import { GET_CAR_DERIVATIVES } from '../../containers/OrdersInformation/gql';
import { VehicleTypeEnum, LeaseTypeEnum } from '../../../generated/globalTypes';
import ProductCarousel from '../../components/ProductCarousel/ProductCarousel';
import useLeaseType from '../../hooks/useLeaseType';
import RouterLink from '../../components/RouterLink/RouterLink';
import { getSectionsData } from '../../utils/getSectionsData';
import {
  useVehicleListUrl,
  useVehicleListUrlFetchMore,
} from '../../gql/vehicleList';
import { useImperativeQuery } from '../../hooks/useImperativeQuery';
import { GetDerivatives } from '../../../generated/GetDerivatives';
import Head from '../../components/Head/Head';

type Props = {
  pageData: any;
};

export const VanOffers: NextPage<Props> = ({ pageData: data }) => {
  const [productSmallVan, setProductSmallVan] = useState<
    ProductCardData | undefined
  >(undefined);
  const [productSmallVanCapIds, setProductSmallVanCapIds] = useState<string[]>(
    [],
  );
  const [productSmallVanDerivatives, setProductSmallVanDerivatives] = useState<
    GetDerivatives | undefined
  >(undefined);

  const [productMediumVan, setProductMediumVan] = useState<
    ProductCardData | undefined
  >(undefined);
  const [productMediumVanCapIds, setProductMediumVanCapIds] = useState<
    string[]
  >([]);
  const [
    productMediumVanDerivatives,
    setProductMediumVanDerivatives,
  ] = useState<GetDerivatives | undefined>(undefined);

  const [productLargeVan, setProductLargeVan] = useState<
    ProductCardData | undefined
  >(undefined);
  const [productLargeVanCapIds, setProductLargeVanCapIds] = useState<string[]>(
    [],
  );
  const [productLargeVanDerivatives, setProductLargeVanDerivatives] = useState<
    GetDerivatives | undefined
  >(undefined);

  const [productPickups, setProductPickups] = useState<
    ProductCardData | undefined
  >(undefined);
  const [productPickupsCapIds, setProductPickupsCapIds] = useState<string[]>(
    [],
  );
  const [productPickupsDerivatives, setProductPickupsDerivatives] = useState<
    GetDerivatives | undefined
  >(undefined);

  const [productSpecialistVan, setProductSpecialistVan] = useState<
    ProductCardData | undefined
  >(undefined);
  const [productSpecialistVanCapIds, setProductSpecialistVanCapIds] = useState<
    string[]
  >([]);
  const [
    productSpecialistVanDerivatives,
    setProductSpecialistVanDerivatives,
  ] = useState<GetDerivatives | undefined>(undefined);

  const [productTippers, setProductTippers] = useState<
    ProductCardData | undefined
  >(undefined);
  const [productTippersCapIds, setProductTippersCapIds] = useState<string[]>(
    [],
  );
  const [productTippersDerivatives, setProductTippersDerivatives] = useState<
    GetDerivatives | undefined
  >(undefined);

  const { cachedLeaseType } = useLeaseType(false);

  const getProduct = useImperativeQuery(PRODUCT_CARD_CONTENT);
  const getProductDerivatives = useImperativeQuery(GET_CAR_DERIVATIVES);

  useEffect(() => {
    // get Small Vans
    getProduct({
      type: VehicleTypeEnum.LCV,
      bodyType: 'SmallVan',
      size: 9,
      offer: true,
    }).then(async (response: any) => {
      setProductSmallVan(response.data);
      const capIds = response.data.productCarousel
        ?.map((el: any) => el?.capId)
        .filter(Boolean);
      if (capIds) setProductSmallVanCapIds(capIds);
      getProductDerivatives({
        ids: capIds,
        vehicleType: VehicleTypeEnum.LCV,
      }).then(resp => setProductSmallVanDerivatives(resp.data));
    });
    // get Medium Vans
    getProduct({
      type: VehicleTypeEnum.LCV,
      bodyType: 'MediumVan',
      size: 9,
      offer: true,
    }).then(response => {
      setProductMediumVan(response.data);
      const capIds = response.data.productCarousel
        ?.map((el: any) => el?.capId)
        .filter(Boolean);
      if (capIds) setProductMediumVanCapIds(capIds);
      getProductDerivatives({
        ids: capIds,
        vehicleType: VehicleTypeEnum.LCV,
      }).then(resp => setProductMediumVanDerivatives(resp.data));
    });
    // get Large Vans
    getProduct({
      type: VehicleTypeEnum.LCV,
      bodyType: 'LargeVan',
      size: 9,
      offer: true,
    }).then(response => {
      setProductLargeVan(response.data);
      const capIds = response.data.productCarousel
        ?.map((el: any) => el?.capId)
        .filter(Boolean);
      if (capIds) setProductLargeVanCapIds(capIds);
      getProductDerivatives({
        ids: capIds,
        vehicleType: VehicleTypeEnum.LCV,
      }).then(resp => setProductLargeVanDerivatives(resp.data));
    });
    // get Pickups
    getProduct({
      type: VehicleTypeEnum.LCV,
      bodyType: 'Pickup',
      size: 9,
      offer: true,
    }).then(response => {
      setProductPickups(response.data);
      const capIds = response.data.productCarousel
        ?.map((el: any) => el?.capId)
        .filter(Boolean);
      if (capIds) setProductPickupsCapIds(capIds);
      getProductDerivatives({
        ids: capIds,
        vehicleType: VehicleTypeEnum.LCV,
      }).then(resp => setProductPickupsDerivatives(resp.data));
    });
    // get Specialist
    getProduct({
      type: VehicleTypeEnum.LCV,
      bodyType: 'Specialist',
      size: 9,
      offer: true,
    }).then(response => {
      setProductSpecialistVan(response.data);
      const capIds = response.data.productCarousel
        ?.map((el: any) => el?.capId)
        .filter(Boolean);
      if (capIds) setProductSpecialistVanCapIds(capIds);
      getProductDerivatives({
        ids: capIds,
        vehicleType: VehicleTypeEnum.LCV,
      }).then(resp => setProductSpecialistVanDerivatives(resp.data));
    });
    // get DropsideTipper
    getProduct({
      type: VehicleTypeEnum.LCV,
      bodyType: 'DropsideTipper',
      size: 9,
      offer: true,
    }).then(response => {
      setProductTippers(response.data);
      const capIds = response.data.productCarousel
        ?.map((el: any) => el?.capId)
        .filter(Boolean);
      if (capIds) setProductTippersCapIds(capIds);
      getProductDerivatives({
        ids: capIds,
        vehicleType: VehicleTypeEnum.LCV,
      }).then(resp => setProductTippersDerivatives(resp.data));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const derivativeIds = [
    ...productSmallVanCapIds,
    ...productMediumVanCapIds,
    ...productLargeVanCapIds,
    ...productPickupsCapIds,
    ...productSpecialistVanCapIds,
    ...productTippersCapIds,
  ];
  const vehicleListUrlQuery = useVehicleListUrl(derivativeIds);

  useVehicleListUrlFetchMore(vehicleListUrlQuery, derivativeIds);

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

      {productSmallVan?.productCarousel &&
        productSmallVan?.productCarousel?.length > 0 && (
          <div className="row:bg-lighter">
            <div>
              <Heading size="large" color="black">
                <span
                  style={{ textAlign: 'center', display: 'block' }}
                  className="-mb-400"
                >
                  Best Small Van Lease Offers
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
          </div>
        )}

      {productMediumVan?.productCarousel &&
        productMediumVan?.productCarousel?.length > 0 && (
          <div className="row:bg-lighter">
            <div>
              <Heading size="large" color="black">
                <span
                  style={{ textAlign: 'center', display: 'block' }}
                  className="-mb-400"
                >
                  Best Medium Van Lease Offers
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
          </div>
        )}

      {productLargeVan?.productCarousel &&
        productLargeVan?.productCarousel?.length > 0 && (
          <div className="row:bg-lighter">
            <div>
              <Heading size="large" color="black">
                <span
                  style={{ textAlign: 'center', display: 'block' }}
                  className="-mb-400"
                >
                  Best Large Van Lease Offers
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
          </div>
        )}

      {productPickups?.productCarousel &&
        productPickups?.productCarousel?.length > 0 && (
          <div className="row:bg-lighter">
            <div>
              <Heading size="large" color="black">
                <span
                  style={{ textAlign: 'center', display: 'block' }}
                  className="-mb-400"
                >
                  Best Pickup Truck Lease Offers
                </span>
              </Heading>
              <ProductCarousel
                leaseType={
                  isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS
                }
                data={{
                  derivatives: productPickupsDerivatives?.derivatives || null,
                  productCard: productPickups?.productCarousel || null,
                  vehicleList: vehicleListUrlQuery.data?.vehicleList!,
                }}
                countItems={productPickups?.productCarousel?.length || 6}
                dataTestIdBtn="van-view-offer"
              />
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
          </div>
        )}

      {productTippers?.productCarousel &&
        productTippers?.productCarousel?.length > 0 && (
          <div className="row:bg-lighter">
            <div>
              <Heading size="large" color="black">
                <span
                  style={{ textAlign: 'center', display: 'block' }}
                  className="-mb-400"
                >
                  Best Dropside Tipper Offers
                </span>
              </Heading>
              <ProductCarousel
                leaseType={
                  isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS
                }
                data={{
                  derivatives: productTippersDerivatives?.derivatives || null,
                  productCard: productTippers?.productCarousel || null,
                  vehicleList: vehicleListUrlQuery.data?.vehicleList!,
                }}
                countItems={productTippers?.productCarousel?.length || 6}
                dataTestIdBtn="van-view-offer"
              />
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
          </div>
        )}

      {productSpecialistVan?.productCarousel &&
        productSpecialistVan?.productCarousel?.length > 0 && (
          <div className="row:bg-lighter">
            <div>
              <Heading size="large" color="black">
                <span
                  style={{ textAlign: 'center', display: 'block' }}
                  className="-mb-400"
                >
                  Specialist Van Lease Offers
                </span>
              </Heading>
              <ProductCarousel
                leaseType={
                  isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS
                }
                data={{
                  derivatives:
                    productSpecialistVanDerivatives?.derivatives || null,
                  productCard: productSpecialistVan?.productCarousel || null,
                  vehicleList: vehicleListUrlQuery.data?.vehicleList!,
                }}
                countItems={productSpecialistVan?.productCarousel?.length || 6}
                dataTestIdBtn="van-view-offer"
              />
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
          </div>
        )}

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
      <div className="row:text">
        <Text size="regular" color="dark">
          Photos and videos are for illustration purposes only.
        </Text>
      </div>
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

export async function getServerSideProps() {
  const client = createApolloClient({});

  try {
    const { data } = await client.query<VanOffersPageData>({
      query: VAN_OFFERS_CONTENT,
    });
    return {
      props: {
        pageData: data,
      },
    };
  } catch {
    return false;
  }
}

export default VanOffers;
