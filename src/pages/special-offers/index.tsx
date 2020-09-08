/* eslint-disable @typescript-eslint/camelcase */
import { NextPage } from 'next';
import Router from 'next/router';
import { useQuery } from '@apollo/client';
import { getDataFromTree } from '@apollo/react-ssr';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Flame from '@vanarama/uibook/lib/assets/icons/FlameSharp';
import Arrow from '@vanarama/uibook/lib/assets/icons/ArrowForwardSharp';
import Redundancy from '@vanarama/uibook/lib/assets/icons/Redundancy';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
// import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { ProductCardData } from '../../../generated/ProductCardData';

import { PRODUCT_CARD_CONTENT } from '../../gql/productCard';
import withApollo from '../../hocs/withApollo';
import { useCarDerivativesData } from '../../containers/OrdersInformation/gql';
import { VehicleTypeEnum, LeaseTypeEnum } from '../../../generated/globalTypes';
import ProductCarousel from '../../components/ProductCarousel/ProductCarousel';
import { GENERIC_PAGE_HEAD } from '../../gql/genericPage';
import {
  GenericPageHeadQuery,
  GenericPageHeadQueryVariables,
} from '../../../generated/GenericPageHeadQuery';
import Head from '../../components/Head/Head';

export const OffersPage: NextPage = () => {
  const { data: genericPageCMS } = useQuery<
    GenericPageHeadQuery,
    GenericPageHeadQueryVariables
  >(GENERIC_PAGE_HEAD, {
    variables: {
      slug: '/offers',
    },
  });

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

  const { data: productVanDerivatives } = useCarDerivativesData(
    productsVan?.productCarousel?.map(el => el?.capId || '') || [''],
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

  const { data: productPickupDerivatives } = useCarDerivativesData(
    productsPickup?.productCarousel?.map(el => el?.capId || '') || [''],
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

  const { data: productCarDerivatives } = useCarDerivativesData(
    productsCar?.productCarousel?.map(el => el?.capId || '') || [''],
    VehicleTypeEnum.CAR,
  );

  /* if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  } */

  const metaData = genericPageCMS?.genericPage.metaData;

  return (
    <>
      {metaData && (
        <Head
          metaData={metaData}
          featuredImage={genericPageCMS?.genericPage.featuredImage}
        />
      )}
      <div className="row:plain-hero">
        <div className="-col-100">
          <Heading size="xlarge" color="black">
            <Flame /> The Latest Offers
          </Heading>
          <Text size="large" color="darker">
            Brand New Vehicles Available Now
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
              onClick={() => Router.push('/van-leasing')}
            />
            <Button
              size="large"
              fill="solid"
              color="teal"
              label="Trucks"
              icon={<Arrow />}
              iconColor="white"
              iconPosition="after"
              onClick={() => Router.push('/van-leasing?bodyStyles=Pickup')}
            />
            <Button
              size="large"
              fill="solid"
              color="teal"
              label="Cars"
              icon={<Arrow />}
              iconColor="white"
              iconPosition="after"
              onClick={() => Router.push('/car-leasing')}
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
            leaseType={LeaseTypeEnum.PERSONAL}
            data={{
              derivatives: productVanDerivatives?.derivatives || null,
              productCard: productsVan?.productCarousel || null,
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
            leaseType={LeaseTypeEnum.PERSONAL}
            data={{
              derivatives: productPickupDerivatives?.derivatives || null,
              productCard: productsPickup?.productCarousel || null,
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
    </>
  );
};

export default withApollo(OffersPage, { getDataFromTree });
