/* eslint-disable @typescript-eslint/camelcase */
import { NextPage } from 'next';
import Router, { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { getDataFromTree } from '@apollo/react-ssr';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Flame from '@vanarama/uibook/lib/assets/icons/FlameSharp';
import Arrow from '@vanarama/uibook/lib/assets/icons/ArrowForwardSharp';
import Redundancy from '@vanarama/uibook/lib/assets/icons/Redundancy';
import Card from '@vanarama/uibook/lib/components/molecules/cards';

import Loading from '@vanarama/uibook/lib/components/atoms/loading';

import { ProductCardData } from '../../../generated/ProductCardData';

import { PRODUCT_CARD_CONTENT } from '../../gql/productCard';
import withApollo from '../../hocs/withApollo';
import { useCarDerivativesData } from '../../containers/OrdersInformation/gql';
import { VehicleTypeEnum, LeaseTypeEnum } from '../../../generated/globalTypes';
import ProductCarousel from '../../components/ProductCarousel/ProductCarousel';
import { useGenericPageHead } from '../../gql/genericPage';
import Head from '../../components/Head/Head';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import {
  useVehicleListUrl,
  useVehicleListUrlFetchMore,
} from '../../gql/vehicleList';

export const OffersPage: NextPage = () => {
  const router = useRouter();
  const { data: genericPageCMS, loading } = useGenericPageHead(
    router.asPath.slice(1),
  );

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

  const productVanCapIds = productsVan?.productCarousel?.map(
    el => el?.capId || '',
  ) || [''];
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

  const productPickupCapIds = productsPickup?.productCarousel?.map(
    el => el?.capId || '',
  ) || [''];
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

  const productCarCapIds = productsCar?.productCarousel?.map(
    el => el?.capId || '',
  ) || [''];
  const { data: productCarDerivatives } = useCarDerivativesData(
    productCarCapIds,
    VehicleTypeEnum.CAR,
  );

  const derivativeIds = [
    ...productVanCapIds,
    ...productPickupCapIds,
    ...productCarCapIds,
  ];
  const vehicleListUrlQuery = useVehicleListUrl(derivativeIds);

  useVehicleListUrlFetchMore(vehicleListUrlQuery, derivativeIds);

  if (loading) {
    return <Loading size="large" />;
  }

  const metaData = genericPageCMS?.genericPage.metaData;

  return (
    <>
      <div className="row:title">
        <Breadcrumb />
      </div>
      <div className="row:plain-hero">
        <div className="-col-100">
          <Heading color="black" size="xlarge" tag="h1">
            <Flame /> {metaData?.name}
          </Heading>
          <Text size="large" color="darker">
            {genericPageCMS?.genericPage.intro}
          </Text>
          <div className="-flex-row -mt-500">
            <Button
              size="large"
              fill="solid"
              color="teal"
              label="Vans"
              icon={<Arrow />}
              iconColor="white"
              iconPosition="after"
              onClick={() => Router.push('/van-leasing/special-offers')}
            />
            <Button
              size="large"
              fill="solid"
              color="teal"
              label="Trucks"
              icon={<Arrow />}
              iconColor="white"
              iconPosition="after"
              onClick={() =>
                Router.push('/pickup-truck-leasing/special-offers')
              }
            />
            <Button
              size="large"
              fill="solid"
              color="teal"
              label="Cars"
              icon={<Arrow />}
              iconColor="white"
              iconPosition="after"
              onClick={() => Router.push('/car-leasing/special-offers')}
            />
          </div>
        </div>
        <div>
          <Card>
            <Redundancy />
            <Heading size="lead" color="black">
              Redundancy & Life Event Cover
            </Heading>
            <Text size="regular" color="darker">
              Included With All Lease Deals
            </Text>
            <Button
              size="regular"
              fill="clear"
              color="teal"
              label="Find Out More"
              icon={<Arrow />}
              iconColor="teal"
              iconPosition="after"
              onClick={() => Router.push('#')}
            />
          </Card>
        </div>
      </div>
      <div className="row:bg-lighter">
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
            <Button
              label="View All Van Offers"
              color="teal"
              onClick={() => Router.push('/van-leasing')}
            />
          </div>
        </div>
      </div>
      <div className="row:bg-lighter">
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
            <Button
              label="View All Truck Offers"
              color="teal"
              onClick={() => Router.push('/van-leasing?bodyStyles=Pickup')}
            />
          </div>
        </div>
      </div>
      <div className="row:bg-lighter">
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
            <Button
              label="View All Car Offers"
              color="teal"
              onClick={() => Router.push('/car-leasing')}
            />
          </div>
        </div>
      </div>
      {metaData && (
        <Head
          metaData={metaData}
          featuredImage={genericPageCMS?.genericPage.featuredImage}
        />
      )}
    </>
  );
};

export default withApollo(OffersPage, { getDataFromTree });
